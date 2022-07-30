import React, { useEffect, useState } from 'react';
import DropDown from '../../../Components/DropDown';
import NewAddressForm from '../NewAddressForm';
import { Radio, RadioGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import CartItem from '../../../Components/Cart/CartItem';
import './shippingInfo.css';
import Loader from '../../../Components/Loader';
import Button from '../../../Components/Button';
import useRequest from '../../../hooks/useRequest';
import ErrorMessage from '../../../Components/ErrorMessage';
import { serverUrl } from '../../../Constants/serverUrl';

const ShippingInfo = (props) => {
    const cartItems = useSelector(state => state.cart.items);
    const user = useSelector(state => state.user);

    const [newAddrHandler, setNewAddrHandler] = useState(false);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [addrAdded, setAddrAdded] = useState(false);
    const { loading, fetchData } = useRequest();
    const [addrId, setAddrId] = useState('');
    const [delMethod, setDelMethod] = useState('');
    const [addr, setAddr] = useState({});   

    useEffect(()=>{
        setDelMethod('');
    }, [user])
    
    const optionsHandler = (e) => {
        const { name, value } = e.target;
        if (name==='address') {
            setAddrId(value);
        } else {
            setDelMethod(value);
        }

        const prevState = props.checkoutFormInfo;
        prevState[name] = value;
        props.setCheckoutFormInfo(prevState);
    }

    const addrFormHandler = event => {
        const { value, name } = event.target;
        const newAddr = addr;
        newAddr[name] = value;
        setAddr(newAddr);
        if(!props.registeredUser) props.setCheckoutFormInfo({ ...props.checkoutFormInfo, address: newAddr })
    }

    const addAddrHandler = (event) => {
        event.preventDefault();
        fetchData( {
            url: `${serverUrl}/userAddress`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.auth.accessToken
            }, 
            body: {
                address: addr
            }
        }, (response) => {
            props.setExistingAddr([ {addrId: response.insertId, ...addr}, ...props.existingAddr]);
            setAddrId(response.insertId);
            props.setCheckoutFormInfo({ ...props.checkoutFormInfo, address: response.insertId })
            setAddrAdded(true);
        });
    }

    const addressForm = props.existingAddr.length === 0 ? <NewAddressForm addr={addr} addrHandler={addrFormHandler} addAddrHandler={addAddrHandler} loading={loading} success={addrAdded} /> : 
                    <React.Fragment>
                        <DropDown onClick={()=>setOpenDropDown(!openDropDown)} title={'Choose from existing addresses'} height={`${70*props.existingAddr.length}px`} openNow={false}>
                            <RadioGroup value={addrId} aria-labelledby="existing address" name="existing address" onChange={optionsHandler}>
                            {props.existingAddr.map((addr, index) => (
                                <React.Fragment key={index}>
                                    <li className='flex'>
                                        <Radio
                                            value={addr.addrId}
                                            name="address"
                                            inputProps={{ 'aria-label': `${addr.addrId}` }}
                                        />
                                        <div>
                                            <p className='addr bold-text'>{addr.addressLine},<br /> {addr.city}</p>
                                            <p className='contactNum bold-text'>{addr.contactNumber}</p>
                                        </div>
                                    </li>
                                    <hr />
                                </React.Fragment>
                            ))}
                            </RadioGroup>   
                        </DropDown>
                        {!openDropDown && 
                            <p className='new-address-billingForm' onClick={()=>{setNewAddrHandler(!newAddrHandler)}}>+ Add new address</p>
                        }
                        
                        {newAddrHandler && !openDropDown && 
                            <div className='addNewAddrForm'>
                                <NewAddressForm addr={addr} addrHandler={addrFormHandler} addAddrHandler={addAddrHandler} loading={loading} success={addrAdded} />
                            </div>
                        }
                    </React.Fragment>
   
    return (  
        <div className={`billingInfo-container ${props.open ? 'open-shippingInfo' : ''}`}>       
            {props.loading && <Loader />}
            {!props.loading && 
                <React.Fragment>
                    <div className='flex info'>
                        <section className='shippingInfo'>
                            {props.shippingFormValidity && <ErrorMessage msg={props.shippingFormValidity} />}
                            <h2>Delivery address</h2>
                            {addressForm}

                            <h2 className='m-top-30'>Delivery method</h2>
                            <div className='shipping-option'>
                                <p>Choose delivery method:</p>  
                                <span>*Delivery price depends on city and total purchase</span>
                                <RadioGroup value={delMethod} aria-labelledby="delivery options" name="delivery options" onChange={optionsHandler} >
                                    <div className='m-top-10 flex center-v'>
                                        <Radio
                                            name='deliveryOption'
                                            value={'delivery'}
                                            inputProps={{ 'aria-label': 'MauFruits Delivery' }}
                                        />
                                        <p className='shipping-option-name'>MauFruits Delivery <span className='cost'>Rs125~200</span></p>
                                    </div>
                                    
                                    <div className='flex center-v'>
                                        <Radio
                                            name='deliveryOption'
                                            value={'pick up'}
                                            inputProps={{ 'aria-label': 'Pick Up' }}
                                        />
                                        <p className='shipping-option-name'>In store pick up <span className='cost'>Rs0</span></p>
                                    </div>
                                </RadioGroup>
                            </div>
                        </section>

                        <section className='cartInfo'>
                            <h2>Basket Items</h2>
                            {props.basketError.length > 0 ? <p className='itemUnvailableMsg'>*Some items are unavailable. Please  update your basket</p> : ''}
                            <div className='cartInfo-items'>
                                {cartItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {props.availabilityHandler(item.id)}
                                        <CartItem 
                                            key={index}
                                            id={item.id}
                                            name={item.name}
                                            imgPath={item.imgPath}
                                            unitprice={item.sellingPrice}
                                            unitMeasure={item.unitMeasure}
                                            qty={item.qty}
                                            grade={item.grade}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>
                        </section>
                    </div>
                    
                    <div className='flex center-h'>
                        <Button className='formBtn' onClick={() => props.onClick(2)}>Continue</Button>
                    </div>
                </React.Fragment>
            }
        </div>
    );
}
 
export default ShippingInfo;