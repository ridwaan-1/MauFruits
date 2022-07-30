import React from 'react';
import './checkoutProgress.css';

const CheckoutProgress = ({ progressNum }) => {
    return ( 
        <section className="billingProgress">
            <ul className="billingProgress-list flex center-h">
                <li className={`billingProgress-item ${progressNum===1 ? 'current-item' : ''} `}>
                    <span className="progress-count">1</span>
                    <span className="progress-label">Shipping Info</span>
                </li>
                <li className={`billingProgress-item ${progressNum===2 ? 'current-item' : ''} `}>
                    <span className="progress-count">2</span>
                    <span className="progress-label">Payment</span>
                </li>
                <li className={`billingProgress-item ${progressNum===3 ? 'current-item' : ''} `}>
                    <span className="progress-count">3</span>
                    <span className="progress-label">Confirmation</span>
                </li>
            </ul>
        </section>
    );
}
 
export default CheckoutProgress;