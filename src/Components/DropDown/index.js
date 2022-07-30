import React, { useState } from 'react';
import { FaChevronDown,FaChevronUp } from "react-icons/fa";

import './dropDown.css';

const DropDown = (props) => {

    const [openDropDown, setOpenDropDown] = useState(props.openNow);
    const onClickHandler = () => {
        setOpenDropDown(!openDropDown);
        props.onClick && props.onClick();
    }

    return ( 
        <div className="dropdown">
            <div onClick={onClickHandler} className='dropdown-title flex spaceBetween center-v'>
                <p>{props.title}</p>
                { openDropDown ? <FaChevronUp /> : <FaChevronDown /> }        
            </div>
            <ul style={{height:`${openDropDown ? props.height : '0'}`}} className={`dropdown-options ${openDropDown ? 'open' : ''}`}>
                {props.children}
            </ul>   
        </div>
    );
}
 
export default DropDown;