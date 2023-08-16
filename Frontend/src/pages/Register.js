import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '../components/Layout/Footer';
import HeaderAuth from '../components/Layout/HeaderAuth';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';

//NOW USING REACT TO VALIDATE FORM
const isEmpty = (value) => value.trim() === '';
const isEightChars = (value) => value.trim().length >= 8;
const isTenChars = (value) => value.trim().length === 4;
const validateEmail = (email) => {
    const atIndex = email.indexOf('@');
    return atIndex === -1;
}
const validateRepeatPassword = (password, repeatPassword) => {
    return password === repeatPassword;
}

function Register() {

    const BACKEND_BASE_URL = "https://nostalgic-ism-backend.onrender.com";
    const navigate = useNavigate();
    function errorMsg(noti) {
        toast.error(noti, {
            toastId: 'failure1',
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const [formInputsValidity, setFormInputsValidity] = useState({
        firstName: true,
        lastName: true,
        userName: true,
        batch: true,
        email: true,
        password: true,
        repeatPassword: true,
    });

    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const userNameInputRef = useRef();
    const batchInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const repeatPasswordInputRef = useRef();


    const submitHandler = async (event) => {

        event.preventDefault();

        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredUserName = userNameInputRef.current.value;
        const enteredbatch = batchInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredRepeatPassword = repeatPasswordInputRef.current.value;


        const enteredFirstNameIsValid = !isEmpty(enteredFirstName);
        const enteredUserNameIsValid = !isEmpty(enteredUserName);
        const enteredbatchIsValid = isTenChars(enteredbatch);
        const enteredEmailIsValid = !validateEmail(enteredEmail);
        const enteredPasswordIsValid = isEightChars(enteredPassword);
        const enteredRepeatPasswordIsValid = validateRepeatPassword(enteredPassword, enteredRepeatPassword);

        setFormInputsValidity(
            {
                firstName: enteredFirstNameIsValid,
                lastName: true,
                userName: enteredUserNameIsValid,
                batch: enteredbatchIsValid,
                email: enteredEmailIsValid,
                password: enteredPasswordIsValid,
                repeatPassword: enteredRepeatPasswordIsValid,
            }
        );
        const formIsValid =
            enteredFirstNameIsValid && enteredUserNameIsValid && enteredEmailIsValid && enteredPasswordIsValid &&
            enteredRepeatPasswordIsValid && enteredbatchIsValid;

        if (!formIsValid) {
            return;
        }

        //Send to data base
        const enteredData = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            userName: enteredUserName,
            batch: enteredbatch,
            email: enteredEmail,
            password: enteredPassword,
            repeatPassword: enteredRepeatPassword,
        };

        const entryData = async () => {
            const response = await fetch(
                `${BACKEND_BASE_URL}/register`, {
                method: 'POST',
                body: JSON.stringify(enteredData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //ERROR
            if (!response.ok) {
                throw new Error('You are already logged in!');
            }
            //SUCCESS
            setTimeout(() => {
                navigate("/login");
            }, 3000);
            toast.success('Registered!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            // console.log(enteredData);
        };


        entryData().catch((error) => {
            toast.error('You are already registered', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            firstNameInputRef.current.value = '';


            firstNameInputRef.current.value = '';
            lastNameInputRef.current.value = '';
            userNameInputRef.current.value = '';
            batchInputRef.current.value = '';
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';
            repeatPasswordInputRef.current.value = '';

        });

    };

    useEffect(() => {
        if (localStorage["Nostalgic_ISM"]) {
            navigate("/");
        }
    }, []);


    return (
        <>
            <HeaderAuth></HeaderAuth>
            <MDBContainer fluid className='mt-5'>
                <section className='background-radial-gradient overflow-hidden'>
                    <div className='container px-4 py-5 px-md-5 text-center text-lg-start my-5'>
                        <div className='row gx-lg-5 align-items-center mb-5'>
                            {/* Text-Generator */}
                            <div className='col-lg-6 mb-5 mb-lg-0' style={{ zIndex: 10 }}>
                                <h1 className='my-5 display-4 fw-bold ls-tight' style={{ color: '#543e00' }}>
                                    Bahut BT tha ! <br />
                                    <span style={{ color: 'black' }}>#ISM_Diaries</span>
                                </h1>
                                <p className='mb-4 opacity-80' style={{ color: 'black', fontStyle: "italic" }}>
                                    "One may extricate an individual from the realm of ISM, yet the essence of ISM shall forever dwell within that very soul."
                                    <br></br>Nostalgic ISM is a dedicated social platform, lovingly created for ISM peers❤️, enabling them to share their college memories, past relationships, and personal achievements.
                                </p>
                            </div>
                            {/* SignUp Form  */}
                            <div className='col-lg-6 mb-5 mb-lg-0 position-relative'>
                                <div id='radius-shape-1' className='position-absolute rounded-circle shadow-5-strong'></div>
                                <div id='radius-shape-2' className='position-absolute shadow-5-strong'></div>

                                <div
                                    className='card cascading-right'
                                    style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}
                                >
                                    <div className='card-body p-5 shadow-5 text-center'>
                                        <h2 className='fw-bold mb-5'>Sign up now</h2>
                                        <form onSubmit={submitHandler}>
                                            <MDBRow className='mb-4'>
                                                <MDBCol>
                                                    <MDBInput className='mb-4' ref={firstNameInputRef} id='first2' label='First name' />
                                                    {!formInputsValidity.firstName && errorMsg("Please Enter a valid first name!")}
                                                </MDBCol>
                                                <MDBCol>
                                                    <MDBInput className='mb-4' ref={lastNameInputRef} id='last2' label='Last name' />
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBInput className='mb-4' type='text' ref={userNameInputRef} id='registerUsername' label='College Nick Name' />
                                            {!formInputsValidity.userName && errorMsg("Please Enter a valid user name!")}
                                            <MDBInput className='mb-4' type='number' ref={batchInputRef} id='registerPhone' label='Year of Graduation' />
                                            {!formInputsValidity.batch && errorMsg("Please Enter a valid Batch!")}
                                            <MDBInput className='mb-4' type='email' ref={emailInputRef} id='registerEmail' label='Email' />
                                            {!formInputsValidity.email && errorMsg("Please Enter a valid email address!")}
                                            <MDBInput className='mb-4' type='password' ref={passwordInputRef} id='registerPassword' label='Password' />
                                            {!formInputsValidity.password && errorMsg("Password must be eight chars long")}
                                            <MDBInput className='mb-4' type='password' ref={repeatPasswordInputRef} id='registerRepeatPassword' label='Repeat password' />
                                            {!formInputsValidity.repeatPassword && errorMsg("Both password entries must be same")}
                                            <MDBBtn type='submit' block className='mb-4' style={{ color: "white", background: "black" }}>
                                                Sign up
                                            </MDBBtn>

                                            <div className='text-center'>
                                                <p>Already have an account ?</p>
                                                <MDBBtn color='link' type='button' className='mx-1' style={{ color: "black" }} onClick={() => {
                                                    navigate("/Login")
                                                }}>Sign in here</MDBBtn>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section ><ToastContainer></ToastContainer>
            </MDBContainer >
            <Footer></Footer>
        </>
    );
}

export default Register;
