import React from 'react';
import '../InputField/inputField.css';

const TextareaField = ({ placeholder, value='', onChange, name }) => {
    return ( 
        <div className='input-data input-data-textarea'>
            <textarea type={'text'} defaultValue={value} name={name} onChange={onChange} placeholder={placeholder} required />
        </div>
    );
}
 
export default TextareaField;