import React, { useState } from 'react';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBTypography,
    MDBCardFooter
} from 'mdb-react-ui-kit';
export default function Card(props) {

    return (
        <>
            <MDBCard className="square border border-dark p-0">
                <MDBCardHeader className="bg-dark fs-4 text-white bg-opacity-75  fw-bold fst-italic" >{props.title}</MDBCardHeader>
                <MDBCardBody className="bg-secondary bg-opacity-25">
                    <MDBTypography blockquote className='mb-0 fs-6'>
                        <p>{props.description}</p>
                    </MDBTypography>
                </MDBCardBody>
                <MDBCardFooter className="bg-dark fs-6 text-white bg-opacity-50 fst-italic" >{props.email}<cite title='Source Title'>Source Title</cite></MDBCardFooter>
            </MDBCard>
        </>

    );
}