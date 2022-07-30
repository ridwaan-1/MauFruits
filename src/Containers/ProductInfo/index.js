import React, { useState } from 'react';
import Card from '../../Components/Card';
import PopUp from '../../Components/PopUp';
import './productInfo.css';
import { AiFillCloseCircle } from "react-icons/ai";
import Button from '../../Components/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../ReduxStore/slices/cartSlice';


const ProductInfo = ({ productData }) => {
    
    const dispatch = useDispatch();
    const [openPopUp, setOpenPopUp] = useState(false);
    const [counter, setCounter] = useState(1);

    const popUpHandler = () => {
        setOpenPopUp(!openPopUp);
    }

    const onChangeCounter = (e) => {
        const value = parseInt(e.target.value);
        if (value<1) {
            setCounter(1);
        }
        setCounter(value);  
    }

    const addToCartHandler = () => {
        dispatch(addToCart({
            id: productData.product_id,
            imgPath: productData.imgPath,
            qty: counter,
            name: productData.name,
            unitMeasure: productData.unitMeasure,
            grade: productData.grade,
            sellingPrice: parseInt(productData.sellingPrice)
        }))
    }   

    return ( 
        <React.Fragment>
            {openPopUp && <PopUp popUpHandler={popUpHandler}>
                <div className='product-closeIcon' onClick={popUpHandler} >
                    <AiFillCloseCircle />
                </div>
                <div className='product-display'>
                    <div className='product-img'>
                        <img src={productData.imgPath} alt={productData.name} />
                    </div>
                    <div className='product-info'>
                        <div className='product-info-desc'>
                            <h1>{productData.name}</h1>
                            <h3>Grade {productData.grade}</h3>
                            <p className='m-top-20'>{productData.description}</p>
                        </div>
                       
                        <p className='price flex center-v m-top-20'>{counter} x {productData.unitMeasure} <span>Rs{productData.sellingPrice * counter}</span></p>
                        <span>Stock {productData.numInStock}</span>
                        <div className='product-controls flex m-top-10'>
                            <div>
                                <label htmlFor='counter'>Quantity:</label>
                                <input id='counter' value={counter} onChange={onChangeCounter} min='1' max={productData.numInStock} type='number' />
                            </div>
                            <Button onClick={addToCartHandler} light={false}>Add to basket</Button>
                        </div>

                    </div>
                </div>
            </PopUp>}
            <Card 
                productData={productData}
                popUpHandler={popUpHandler}
            />
        </React.Fragment>
    );
}




export default ProductInfo;