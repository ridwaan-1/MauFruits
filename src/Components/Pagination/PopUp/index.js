import React from 'react';
import ReactDOM from 'react-dom';
import './popUp.css';

const BackDrop = (props) => (
    <div className='backdrop' onClick={props.popUpHandler} />
);

const PopUpContent = (props) => (
    <div className='popUp'>
        {props.children}
    </div>
);

const popUpContainer = document.getElementById('popUp-container');

const PopUp = (props) => {
    return ( 
        <React.Fragment>
            {ReactDOM.createPortal(
                <BackDrop popUpHandler={props.popUpHandler} />,
                popUpContainer
            )}
            {ReactDOM.createPortal(
                <PopUpContent>{props.children}</PopUpContent>,
                popUpContainer
            )}
        </React.Fragment>
    );
}
 
export default PopUp;