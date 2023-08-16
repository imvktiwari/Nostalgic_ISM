import React, { useState } from "react";
import classes from './PostButton.module.css'
import {
    MDBBtn,
    MDBIcon,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBInput,
    MDBTextArea,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";

export default function PostButton() {
    const BACKEND_BASE_URL = "https://nostalgic-ism-backend.onrender.com";
    const [basicModal, setBasicModal] = useState(false);
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');

    //for toggling the modal
    const toggleShow = () => setBasicModal(!basicModal);
    //Submit Handler

    const submitHandler = (event) => {
        event.preventDefault();
        if (enteredTitle.length === 0) {
            toast.error("Enter a valid title for the incident !", {
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
        else if (enteredDescription.length === 0) {
            toast.error("Enter some description about the incident !", {
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
        else {
            //Send to data base
            let today = new Date();
            let todaydate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            let currtime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            todaydate += " at " + currtime;
            const LoggedInEmail = localStorage.getItem("Nostalgic_ISM");
            const loggedEmail = `${LoggedInEmail.replace(/['"]+/g, '')}`;//to replace double inverted from email-id.
            const enteredData = {
                title: enteredTitle,
                description: enteredDescription,
                date: todaydate,
                email: loggedEmail,
            };

            const entryData = async () => {
                const response = await fetch(
                    `${BACKEND_BASE_URL}/newpost`, {
                    method: 'POST',
                    body: JSON.stringify(enteredData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                //ERROR
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                //SUCCESS
                toast.success('Shared!', {
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
                toast.error('Something went wrong!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });

            toggleShow();
            setEnteredTitle('');
            setEnteredDescription('');
        }
    };
    return (
        <>
            <MDBBtn floating size='lg' style={{ backgroundColor: 'black' }} className={classes.postButton} onClick={toggleShow}>
                <MDBIcon far icon="comments" />
            </MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' >
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBInput label='Title for the incident' id='typeText' type='text' value={enteredTitle} onChange={(event) => { setEnteredTitle(event.target.value) }} />
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBTextArea label='Description about the incident mentioned.' id='textAreaExample' rows={4} value={enteredDescription} onChange={(event) => { setEnteredDescription(event.target.value) }} />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <section className='mb-4'>
                                <MDBBtn type='submit' className='w-100' style={{ backgroundColor: "black" }} onClick={submitHandler}>Share with ISM Family !</MDBBtn>
                            </section>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}