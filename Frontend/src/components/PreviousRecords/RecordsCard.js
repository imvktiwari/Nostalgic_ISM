import React, { useEffect, useState } from 'react';
import Card from './Card'
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';

export default function RecordsCard() {

  const [previous, setPrevious] = useState([]);

  const BACKEND_BASE_URL = "https://chitra-generator-backend.onrender.com";
  const URL = `${BACKEND_BASE_URL}/allpostsinformation`;//to replace double inverted from email-id.
  useEffect(() => {
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
          url: responseData[key].url,
          title: responseData[key].title,
        });
      };
      setPrevious(loadedHistory);
    }
    fetchDetails().catch((error) => {
      alert(error.message);
    });
  },[]);

  const HistoryItems = (
    <MDBRow className='row-cols-1 row-cols-md-4 ' >
      {previous.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          email={item.email}
          title={item.title}
          url={item.url}
        />
      ))}
    </MDBRow>
  );

  const HistoryModalContent = (
    <MDBContainer className='p-4'>
      <section className='mb-4'>
        <p className='pt-2' style={{ fontSize: "1.25rem" }}>
          <strong>THE COMMUNITY SHOWCASE</strong>
        </p>
      </section>
      <section className='mb-4'>
        {previous.length == 0 && <h4>No records found !</h4>}
        {HistoryItems}
      </section>
    </MDBContainer>
  );

  return (
    <>
      {HistoryModalContent}
    </>
  );
}