import React from 'react';
import Cart from '../../Components/Cart';
import { useSelector } from 'react-redux';

const CartWrapper = (props) => {

    const cartData = useSelector(state => state.cart);
    
    return (  
        <React.Fragment>
            {props.children}
            {cartData.items.length > 0 && <Cart cartData={cartData}/>}
        </React.Fragment>
    );
}
 
export default CartWrapper;