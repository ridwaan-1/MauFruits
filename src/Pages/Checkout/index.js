import React, { useState, useEffect } from 'react';
import CheckoutProgress from '../../Components/CheckoutProgress'
import OrderConfirmation from './OrderConfimation';
import ShippingInfo from './ShippingInfo';
import PaymentOption from './PaymentOption';
import useRequest from '../../hooks/useRequest';
import PopUp from '../../Components/PopUp';
import './checkout.css';
import Error from '../../Components/Error';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import { updateCart } from '../../ReduxStore/slices/cartSlice';
import { serverUrl } from '../../Constants/serverUrl';

const Checkout = () => {
    const dispatch = useDispatch()
    const { user:userInfo, cart } = useSelector(state => state);
    const [progressNum, setProgressNum] = useState(1);
    const [existingAddr, setExistingAddr] = useState([]);
    const [checkoutFormInfo, setCheckoutFormInfo] = useState({ registered: userInfo.registered });
    const { loading, error, fetchData } = useRequest();
    const [basketError, setBasketError] = useState([]);
    const [shippingFormValidity, setShippingFormValidity] = useState();
    const [orderUnsuccessful, setOrderUnsuccessful] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        setCheckoutFormInfo({ registered: userInfo.registered });
        setProgressNum(1);
        if (userInfo.registered) {
            fetchData({ 
                url: `${serverUrl}/userAddress`,
                headers: { 'Authorization': 'Bearer ' + userInfo.auth.accessToken }
            }, (response) => {
                setExistingAddr(response);
            });
        }   
    }, [fetchData, userInfo]);

    
    const navigateToAuthPage = (url) => {
        navigate(url, {
            state: {
                redirectUrl: '/MauFruits/checkout'
            }
        })
    } 
    
    const availabilityHandler = (id) => {
        const error = basketError.find(elem => elem.id === id);
        if(error)
            return (
                <div className='unavailable-msg'>
                    <p>{error.errMsg}</p>
                    <button onClick={()=>updateCartHandler(error.id, error.qty)}>Update Basket</button>
                </div>
            );
        
        return;
    }

    const updateCartHandler = (id, qty) => {
        basketError.length > 1 ? setBasketError(basketError.map(elem => elem.id!==id)) : setBasketError([]);
        dispatch(updateCart({
            id, 
            qty
        }));
    }

    let shippingProps = {
        onClick: setProgressNum,
        loading,
        open: progressNum===1,
        checkoutFormInfo,
        setCheckoutFormInfo,
        availabilityHandler,
        basketError,
        shippingFormValidity,
        existingAddr, 
        setExistingAddr
    }

    return ( 
        <React.Fragment>
            {(cart.totalItems===0) ? <PopUp>
                <div className='noItem-popup'>
                    <p>Basket is empty.<br/>Please add item to your basket before checking out.</p>
                    <Button onClick={() => navigateToAuthPage('/MauFruits/market')}>Ok</Button>
                </div>
            </PopUp> : 
            orderUnsuccessful ? <OrderConfirmation success={!orderUnsuccessful} /> :
            <main>
                {!userInfo.registered ? <PopUp>
                    <div className='checkout-popup'>
                        <h2 className='green-text center-text'>Create an account with MauFruits.</h2>
                        <h3 className='m-top-20'><b>Please create an account before proceeding to checkout</b></h3>
                        <p className='m-top-10'>Benefits of creating an account:</p>
                        <p> - Access to some exclusive deals</p>
                        <p> - No need to input existing details for checkout</p>
                        <Button onClick={() => navigateToAuthPage('/MauFruits/login')} width>Sign up</Button>
                    </div>
                </PopUp> :
                <React.Fragment>
                    <CheckoutProgress progressNum={progressNum} />
                    <section className='shippingForm'>
                        <div className='form-container flex'>
                            {error ? <Error error={error} /> :
                            <React.Fragment>
                                <ShippingInfo { ...shippingProps } />
                                <PaymentOption 
                                    onClick={setProgressNum} 
                                    checkoutFormInfo={checkoutFormInfo} 
                                    setCheckoutFormInfo={setCheckoutFormInfo} 
                                    setBasketError={setBasketError}
                                    setOrderUnsuccessful={setOrderUnsuccessful}
                                    setShippingFormValidity={setShippingFormValidity}
                                    shippingFormValidity={shippingFormValidity}
                                    open={progressNum===2}
                                />
                            </React.Fragment>
                            }
                        </div>
                    </section>
                </React.Fragment>}
            </main>}
        </React.Fragment>
    );
}

export default Checkout;