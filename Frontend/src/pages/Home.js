import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import Header from '../components/Layout/Header';
import RecordsCard from '../components/PreviousRecords/RecordsCard';
import PostButton from '../components/PostButton/PostButton';
import classes from './Summary.module.css';
import Footer from '../components/Layout/Footer';
const Home = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage["Nostalgic_ISM"]) {
            navigate("/login");
        }
    }, []);

    return (
        <Fragment className=" bg-dark">
            <Header></Header>
            <div
                className=' text-center bg-image'
                style={{ backgroundImage: "url('https://cdc.iitism.ac.in/assets/img/heritageedit1.jpg')", height: 400 }}
            ></div>
            <section className={classes.summary}>
                <RecordsCard></RecordsCard>
            </section>
            <PostButton></PostButton>
            <br></br>
            <Footer></Footer>
            <ToastContainer></ToastContainer>
        </Fragment>);
}

export default Home;


