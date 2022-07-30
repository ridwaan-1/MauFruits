import React from 'react';
import './inputField.css';

const InputField = ({ placeholder, valid=true, type='text', name, value='', onChange, children }) => {
    return ( 
        <div className={`input-data input-data-input ${valid ? '' : 'invalid'}`}>
            <input type={type} name={name} defaultValue={value} placeholder={placeholder} onChange={onChange} required />
            {children}
        </div>
    );
}   
 
export default InputField;