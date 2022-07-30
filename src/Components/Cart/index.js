import './cart.css';
import { BsBasket } from "react-icons/bs";
import CartItem from './CartItem';
import Button from '../Button';
import { Link } from 'react-router-dom';

const Cart = (props) => {

    const {totalItems, totalPrice, items} = props.cartData;
    
    return ( 
        <div className='cart'>
            <div className="cart-display flex center-v spaceBetween">
                <BsBasket className='cartIcon'/>
                <div className='cart-info'>
                    <p>Item: <span className='number'>{totalItems}</span></p>
                </div>
                <div className='cart-info'>
                    <p>Price: <span className='green-text'>Rs</span><span className='number'>{totalPrice}</span></p>
                </div>
            </div>

            <div className='cart-items'>
                {items.map((item, index) => (
                    <CartItem 
                        key={index}
                        id={item.id}
                        name={item.name}
                        imgPath={item.imgPath}
                        unitprice={item.sellingPrice}
                        unitMeasure={item.unitMeasure}
                        qty={item.qty}
                        grade={item.grade}
                    />
                ))}
                <Link to='/checkout'>
                    <Button width={true} light={false}>
                        Proceed to checkout
                    </Button>
                </Link>
            </div>

        </div>
    );
}
 
export default Cart;