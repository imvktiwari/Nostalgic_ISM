import React, { useEffect, useState } from 'react';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBTypography,
    MDBCardFooter,
    MDBCardImage
} from 'mdb-react-ui-kit';
export default function Card(props) {

    //Getting User's Information

    const [userData, setUserData] = useState('');
    const BACKEND_BASE_URL = "https://nostalgic-ism-backend.onrender.com";
    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(`${BACKEND_BASE_URL}/userinformation/${(props.email).replace(/['"]+/g, '')}`);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            setUserData(responseData);
        };
        fetchDetails().catch((error) => {
            alert("Something wrong happened!");
        });
    }, []);

    return (
        <>
            <MDBCard className="square border border-dark p-0">
                <MDBCardHeader className="bg-dark fs-4 text-white bg-opacity-75  fw-bold fst-italic" >{props.title}</MDBCardHeader>
                <MDBCardBody className="bg-secondary bg-opacity-25">
                    <MDBTypography blockquote className='mb-0 fs-6'>
                        <p>{props.description}</p>
                    </MDBTypography>
                </MDBCardBody>
                <MDBCardFooter className="bg-dark fs-6 text-white bg-opacity-50 fst-italic" >
                    - {userData.firstName} {userData.lastName} , Batch of {userData.batch}
                    {/* <cite title='Source Title'>Source Title</cite> */}
                </MDBCardFooter>
            </MDBCard>
        </>

    );
}