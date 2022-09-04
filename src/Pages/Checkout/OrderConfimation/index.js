import React from 'react';
import { BsCheckCircleFill } from "react-icons/bs";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import CheckoutProgress from '../../../Components/CheckoutProgress';
import Button from '../../../Components/Button';
import './orderConfirmation.css';

const SuccessfulMsg = (
    <React.Fragment>
        <BsCheckCircleFill className='orderPlaced-icon'/>
        <h1 className='m-top-30'>Order Successful</h1>
        <div className='confirmation-text'>
            <p className='bold-text'>Thank you so much for your order!</p>
            <p>We will send you a confirmation email.</p>
            <p className='bold-text'>Feel free to contact us if you have any queries</p>
            <h2>MauFruits</h2>
        </div>
        <Link to='/MauFruits/'>
            <Button className='m-top-30'>Return to Home Page</Button>
        </Link>
    </React.Fragment>
);

const UnsuccessfulMsg = (
    <React.Fragment>
        <FaTimesCircle className='unsuccessful-icon' />
        <h1 className='unsuccessful-text m-top-30'>Order Unsuccessful</h1>
        <div className='confirmation-text'>
            <p>Your order could not be processed!</p>
            <p className='bold-text'>Please try again.</p>
            <p>Please contact us if the problem persists.</p>
        </div>
        <Link to='/MauFruits/'>
            <Button className='m-top-30 btn-red'>Return to Home Page</Button>
        </Link>
    </React.Fragment>
);

const OrderConfirmation = (props) => {
    return ( 
        <main>
            <CheckoutProgress progressNum={3} />
            <section className='message-container'>
                <div className={'flex center-v flex-col'}>
                    {props.success ? SuccessfulMsg : UnsuccessfulMsg}
                </div>
            </section>
        </main>
    );
}
    
export default OrderConfirmation;