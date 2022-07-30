import React from 'react';
import './loader.css';

const Loader = ({ noBackground=false, msg='' }) => {
    return ( 
        <React.Fragment>
            {noBackground ? <div className='loader mini-loader'></div> : 
            <div>
                <div className='loader-backdrop'></div>
                <div className='div-loader'>
                    <div className='loader big-loader'></div>
                    {msg && <p className='center-text'>{msg}</p>}
                </div>
            </div>}
        </React.Fragment>
    );
}
 
export default Loader;