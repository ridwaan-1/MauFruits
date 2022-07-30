import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import ProductInfo from '../../Containers/ProductInfo';
import './cardSlider.css';

const CardSlider = ({ title, numDisplayProd, productsData }) => {
    const [numClicked, setNumClicked] = useState(0);
    const [maxSlides, setMaxSlides] = useState(0);
    const ref = useRef()
    
    const getMaxClick = useCallback(() => { 
        try {
            const containerWidth = ref.current.offsetWidth;
            const maxElem = Math.floor(containerWidth/240); 
            setMaxSlides(numDisplayProd - maxElem);
        } catch {
            return;
        }
    }, [numDisplayProd]);    

    useEffect(() => {
        getMaxClick();
    }, [getMaxClick]);

    const moveSlider = (i) => {
        const n = numClicked+i;
        if (n > -1 && n <= maxSlides) {
            setNumClicked(n);
        }
    }

    window.addEventListener('resize', getMaxClick);
  
    return ( 
        <div ref={ref} className='cardSlider'>
            <div className='flex spaceBetween center-v'>
                <h1>{title}</h1>

                <div className='cardSlider-controls'>
                    <FaArrowLeft className='cardSlider-control' onClick={()=>{moveSlider(-1)}} /> 
                    <FaArrowRight className='cardSlider-control' onClick={()=>{moveSlider(1)}} />
                </div>
            </div>
            
            <div style={{transform: `translateX(${numClicked*-240}px)`}} className='cardSlider-contents flex m-top-20'>
                {productsData.map((data, index) => (
                    <ProductInfo
                        key={index}
                        productData={data}
                    />
                ))}
            </div>
        </div>
    );
}
 
export default CardSlider;