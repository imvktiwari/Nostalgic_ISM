import React, { useEffect, useState } from 'react';
import Card from './Card'
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBTypography
} from 'mdb-react-ui-kit';
export default function RecordsCard() {
  const navigate = useNavigate();
  const [previous, setPrevious] = useState([]);

  const BACKEND_BASE_URL = "https://nostalgic-ism-backend.onrender.com";
  const URL = `${BACKEND_BASE_URL}/allpostsinformation`;//to replace double inverted from email-id.
  useEffect(() => {
    if (!localStorage["Nostalgic_ISM"]) {
      navigate("/login");
    }
    const fetchDetails = async () => {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      // console.log(responseData);

      const loadedHistory = [];
      for (const key in responseData) {
        loadedHistory.push({
          id: key,
          email: responseData[key].email,
          title: responseData[key].title,
          description: responseData[key].description,
          date: responseData[key].date,
        });
      };
      setPrevious(loadedHistory);
    }
    fetchDetails().catch((error) => {
      alert(error.message);
    });
  }, []);

  const LoggedInEmail = localStorage.getItem("Nostalgic_ISM");
  let loggedEmail = '';
  if (LoggedInEmail)
    loggedEmail = `${LoggedInEmail.replace(/["']/g, "")}`;//to replace double inverted from email-id.

  const filtereditem = previous.filter((item) => {
    return item.email.toString() === loggedEmail.toString();
  });

  const HistoryItems = (
    <MDBRow className="d-grid gap-3">
      {previous.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          email={item.email}
          title={item.title}
          description={item.description}
          date={item.date}
        />
      ))}
    </MDBRow>
  );
  const filteredHistoryItems = (
    <MDBRow className="d-grid gap-3">
      {filtereditem.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          email={item.email}
          title={item.title}
          description={item.description}
          date={item.date}
        />
      ))}
    </MDBRow>
  );

  const HistoryModalContent = (
    <MDBContainer className='p-4'>
      {previous.length == 0 && <h4>No records found !</h4>}
      {HistoryItems}
    </MDBContainer>
  );

  const filteredHistoryModalContent = (
    <MDBContainer className='p-4'>
      {filtereditem.length == 0 && <h4>No records found !</h4>}
      {filteredHistoryItems}
    </MDBContainer>
  );


  const [fillActive, setFillActive] = useState('tab1');

  const handleFillClick = (value: string) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };
  return (
    <>
      {/* {HistoryModalContent} */}
      <MDBTabs pills fill className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => { handleFillClick('tab1') }} active={fillActive === 'tab1'} >
            For you
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
            Your Posts
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={fillActive === 'tab1'}>{HistoryModalContent}</MDBTabsPane>
        <MDBTabsPane show={fillActive === 'tab2'}>{filteredHistoryModalContent}</MDBTabsPane>
      </MDBTabsContent>

    </>
  );
}