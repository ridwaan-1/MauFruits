import React from 'react';
import { useDispatch } from 'react-redux';
import { BsBasketFill } from "react-icons/bs";
import Button from '../Button';
import './card.css';
import { addToCart } from '../../ReduxStore/slices/cartSlice';

const Card = (props) => {
    const { product_id, name, sellingPrice, unitMeasure, grade, imgPath, numInStock } = props.productData;
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addToCart({
            id: product_id,
            imgPath,
            qty: 1,
            name,
            unitMeasure,
            grade,
            sellingPrice: parseInt(sellingPrice)
        }));
    }

    return ( 
        <React.Fragment>
        <div className='productCard'>
            <div className='productCard-wrapper'>
                <div onClick={props.popUpHandler}>
                    <div className='productCard-img'>
                        <img src={imgPath} alt={name} />
                    </div>

                    <p className='productCard-name'>{name}<br />
                        <span>Stock: {numInStock}</span>
                    </p>
                    <p></p>
                </div>

                <div className='productCard-priceInfo flex spaceBetween center-v'>
                    <p>Rs{sellingPrice}<span>/{unitMeasure}</span><br />Grade {grade}</p>
                    <Button onClick={addToCartHandler}>
                        <div className='cardIcon-container'>
                            <BsBasketFill className='card-addIcon' />
                        </div>
                    </Button>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
}

export default Card;