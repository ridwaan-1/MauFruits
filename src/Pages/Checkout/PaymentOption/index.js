import React, { useEffect, useState} from 'react';
import { RadioGroup, Radio } from '@mui/material';
import Button from '../../../Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import useRequest from '../../../hooks/useRequest';
import { MdCelebration } from "react-icons/md";
import './paymentOption.css';
import Loader from '../../../Components/Loader';
import ErrorDiv from '../../../Components/ErrorMessage';
import { emptyCart } from '../../../ReduxStore/slices/cartSlice';
import { serverUrl } from '../../../Constants/serverUrl'; 

const BankTransfer = () => {
    return (
        <div className='payment-option'>
            <p>Bank transfer to our MCB account</p>
            <p>Bank account: <span className='bold-text'>0009876782847</span></p>
            <p className='bold-text'>Note: Please specify the order id in the description field when transfering money.</p>
        </div>
    );
}

const PaymentOption = (props) => {   
    const { onClick:slideFunction, setBasketError} = props;   
    const { cart:cartItems, user } = useSelector(state => state); 
    const dispatch = useDispatch();
    const { fetchData, loading, error } = useRequest();
    const [paymentOption, setPaymentOption] = useState('');
    const [basketInfo, setBasketInfo] = useState({});

    const paymentOptHandler = (e) => {
        const { name, value } = e.target;
        setPaymentOption(value);
        const prevForm = props.checkoutFormInfo;
        prevForm[name] = value;
        props.setCheckoutFormInfo(prevForm);
    }
    
    const placeOrderHandler = () => {
        fetchData({ 
            url: `${serverUrl}/checkout/payment`,
            method: 'POST',
            headers: { 
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + user.auth.accessToken
            },
            body: { 
                email: user.auth.email,
                cart: cartItems.items,
                ...props.checkoutFormInfo,
            }
        }, (response) => {
            if(response.status) {
                dispatch(emptyCart());
                if(response.sessionUrl) window.location.href = response.sessionUrl;
                if(response.successUrl) window.location.href = response.successUrl;
            }
        })

    }
    
    useEffect(() => {
        setPaymentOption('');
        fetchData({ 
            url: `${serverUrl}/checkout/placeOrder`,
            method: 'POST',
            headers: { 
                'content-type': 'application/json', 
                'Authorization': 'Bearer ' + user.auth.accessToken 
            },
            body: { 
                deliveryOption: props.checkoutFormInfo.deliveryOption,
                cart: cartItems.items.map(item => ({ id: item.id, qty: item.qty }))
            }
        }, (response) => {
            if(!response.error) {
                setBasketInfo(response);
            } else {
                setBasketError(response.error);
                slideFunction(1);
            }
        })

    }, [fetchData, props.checkoutFormInfo.deliveryOption, cartItems, setBasketError, slideFunction, user.auth.accessToken]);

    const errorShippingHandler = () => {
        if(error.shippingFormError) {
            if(error.shippingFormError.errorField==='delivery') {
                props.setShippingFormValidity(error.shippingFormError.message);
                slideFunction(1);
            } else {
                return <ErrorDiv msg={error.shippingFormError.message} />
            }
        } else {
            props.setOrderUnsuccessful(true);
        }
    }

    return ( 
        <div className={`payment-page ${props.open ? 'open-paymentOption' : ''}`}>
            <div className='flex'>
                {loading && <Loader msg='Please do not close this window. We are processing your order' />}
                <div className='payment-options'>
                    {error && !loading && errorShippingHandler()}
                    <h2>Payment Method</h2>
                    <RadioGroup value={paymentOption} aria-labelledby="payment-options" name="payment-options" onChange={paymentOptHandler}>               
                        <p className='bold-text'><Radio name='paymentOption' value='card' color="success" onChange={paymentOptHandler}/>Debit/Credit Card</p>
                        {paymentOption === 'card' && 
                            <div className='payment-option'>
                                <p>You will be redirected to a secure page for payment.</p>
                            </div>
                        }
                        <p className='bold-text'><Radio name='paymentOption' value='bank transfer' color="success" onChange={paymentOptHandler} /> Bank Transfer</p>
                        {paymentOption === 'bank transfer' && <BankTransfer />}
                        <p className='bold-text'><Radio name='paymentOption' value='on delivery' color="success" onChange={paymentOptHandler}/> Pay on delivery</p>
                        {paymentOption === 'on delivery' &&  
                            <div className='payment-option'>
                                <p>You will be able to pay by cash on delivery.</p>
                            </div>
                        }
                    </RadioGroup>
                </div>

                <div className='finalCart-summary bold-text'> 
                { !loading &&
                    <React.Fragment>
                        <h2>Order summary</h2>
                        {basketInfo.discount > 0 &&<div className='congratMsg flex center-v m-top-10'>
                            <MdCelebration className='congratIcon' />
                            <p>{basketInfo.discountMsg}</p>
                        </div>}
                        <div className='orderSummary m-top-10'>
                            <div className='flex spaceBetween'>
                                <p>Basket Totals: </p>
                                <p>Rs{basketInfo.basketTotal}</p>
                            </div>
                            <div className='flex spaceBetween'>
                                <p>Delivery: </p>
                                <p>Rs{basketInfo.shipping}</p>
                            </div>
                            <div className='flex spaceBetween'>
                                <p>Discount: </p>
                                <p>Rs{basketInfo.discount}</p>
                            </div>
                            <hr />
                            <div className='flex spaceBetween orderSummary-totalPrice'>
                                <p>Total Price: </p>
                                <p>Rs{basketInfo.basketTotal + basketInfo.shipping - basketInfo.discount}</p>
                            </div>
                        </div>
                        <Button onClick={placeOrderHandler} width>Place order</Button>
                    </React.Fragment> }
                </div>
            </div>

            <div className='flex center-h center-v'>
                <Button className='formBtn' onClick={() => props.onClick(1)}>Go back</Button>
            </div>
        </div>
    );
}
 
export default PaymentOption;