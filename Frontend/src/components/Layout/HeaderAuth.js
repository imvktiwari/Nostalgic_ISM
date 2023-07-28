import React from 'react';
import { useNavigate } from "react-router";
import imgSrc from "./assests/logo.svg"
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

export default function HeaderAuth() {
  const navigate = useNavigate();
  return (
    <>
      <MDBNavbar fixed='top' dark bgColor='dark'>
        <MDBContainer fluid style={{ color: "white", fontWeight: "bolder", fontSize: "28px" }}>
          <MDBNavbarBrand onClick={() => {
            navigate("/Login")
          }}>
            Nostalgic_ISM
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}