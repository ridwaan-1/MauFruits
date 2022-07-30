import React from "react";
import { createPortal } from "react-dom";
import './popup.css';

const Backdrop = (props) => <div onClick={props.onClick} className="popUp-backdrop"></div>

const container = document.getElementById('popUp-container');

const PopUp = (props) => {
    return ( 
        <React.Fragment>
            {createPortal(<Backdrop onClick={props.popUpHandler} />, container)}
            {createPortal(<div className="popUp-content">
                {props.children}
            </div>, container)}
        </React.Fragment>
    );
}
 
export default PopUp;