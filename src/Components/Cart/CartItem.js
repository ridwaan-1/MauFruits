import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../ReduxStore/slices/cartSlice';
import './cart.css';

const CartItem = ({id, name, imgPath, unitprice, unitMeasure, qty, grade}) => {
    const dispatch = useDispatch();

    const removeItemHandler = () => {
        dispatch(removeFromCart(id));
    }

    return (  
        <div className='item flex center-v spaceBetween'>
            <div className='item-desc flex'>
                <img className='item-img' src={imgPath} alt={name} />
                <div>
                    <p className='bold-text'>{name}</p>
                    <p>Grade {grade}</p>
                    <p><span>Rs</span>{unitprice}<span>/{unitMeasure}</span></p>
                    <p className='item-amount green-text bold-text'><span>x</span>{qty}</p>
                </div>
            </div>
            <div className='item-price'>
                <AiFillCloseCircle onClick={removeItemHandler} className='item-removeIcon' />
                <p className='green-text'><span>Rs</span>{unitprice * qty}</p>
            </div>
        </div>
    );
}
 
export default CartItem;