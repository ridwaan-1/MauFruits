import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Error from '../../Components/Error';
import Loader from '../../Components/Loader';
import useRequest from '../../hooks/useRequest';
import './address.css';
import { serverUrl } from '../../Constants/serverUrl';

const Addresses = () => {
    const [address, setAddress] = useState([]);
    const { fetchData, loading, error } = useRequest();
    const user = useSelector(state => state.user);
    
    useEffect(() => {
        if (user.registered) {
            fetchData({ 
                url: `${serverUrl}/userAddress`,
                headers: { 'Authorization': 'Bearer ' + user.auth.accessToken }
            }, (response) => {
                setAddress(response);
            })
        };
        
    }, [user, fetchData]);

    return ( 
        <main>
            <div className='address-page-header flex spaceBetween center-v'>
                <h2>Addresses associated with your account:</h2>
            </div>
            {loading && <Loader />}
            {error && !loading && <Error error={error} />}
            <div className='flex wrap gap20 m-top-20'>
                {address.map((addr, index) => (
                    <div key={index} className="addr-container">
                        <h3>{addr.addressLine}</h3>
                        <p className='bold-text'>{addr.city}</p>
                        <p className='bold-text'>{addr.contactNumber}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
 
export default Addresses;