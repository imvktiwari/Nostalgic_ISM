import React, { useState } from 'react';
import { MDBCol } from 'mdb-react-ui-kit';

import { MDBRipple } from 'mdb-react-ui-kit';
export default function Card(props) {
    const [showTitle, setShowTitle] = useState(false);
    let title;
    if (showTitle) {
        title = <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <div className='d-flex justify-content-center align-items-center h-100'> 
                <p className='text-white mb-0' style={{ fontStyle: "italic"}}>"{props.title}"</p>
            </div>
        </div>;
    }
    else
        title = '';
    return (
        <MDBCol className='p-0' >
            <MDBRipple className='bg-image' rippleTag='div' rippleColor='light'  onMouseEnter={() => setShowTitle(true)}
                onMouseLeave={() => setShowTitle(false)}>
                <img src={props.url} className='w-100' />
                {title}
                <div className='hover-overlay'>
                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                </div>
            </MDBRipple>
        </MDBCol>
    );
}