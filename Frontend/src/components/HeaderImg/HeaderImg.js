import React, { useState } from 'react';
import classes from './HeaderImg.module.css'

export default function HeaderImg() {

    return (
        <div className={classes['main-image']}>
            <img src='https://wallpapercave.com/dwp1x/wp12194603.jpg' alt='A table full of delicious food!' />
        </div>
    );
}