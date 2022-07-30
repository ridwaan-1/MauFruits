import React from 'react';
import InputField from '../../Components/InputField';
import Loader from '../../Components/Loader';

const NewAddressForm = ({ addr, addrHandler, addAddrHandler, loading, success }) => {

    return ( 
        <form onSubmit={addAddrHandler} className='newaddr'>      
            <InputField name='addressLine' value={addr.addressLine} placeholder={'Address'} onChange={addrHandler} />
            <div className='name-field flex spaceBetween'>
                <InputField name='city' value={addr.city} placeholder={'City'} onChange={addrHandler} />
                <InputField name='contactNumber' value={addr.contactNumber} placeholder={'Contact Number'} onChange={addrHandler} />
            </div>

            <div>
                <div className='flex center-v m-top-10'>
                    <button type='submit' className='btn'>Add address</button>
                    {loading && <Loader noBackground={true} />}
                </div>
                {success && <p>Address added successfully</p>}
            </div>
        </form>
    );
}
 
export default NewAddressForm;