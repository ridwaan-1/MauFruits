import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import Button from '../../Components/Button';
import './header.css';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../ReduxStore/slices/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [openMenu, setOpenMenu] = useState(false);    
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState('');

    useEffect(()=>{
        setActiveMenu(location.pathname);
    }, [location.pathname]);

    const logoutHandler = () => {
        dispatch(signOut());
    }
    return ( 
        <header className='flex center-v spaceBetween'>
            <div className={`menuIcon ${openMenu ? 'openMenu' : ''}`} onClick={()=>(setOpenMenu(!openMenu))}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <Link to='/'>
                <h1>MauFruits</h1>
            </Link>
            <ul className={`${openMenu ? 'show' : ''}`}>
                <Link to='/'>
                    <li><p className={`${activeMenu==='/' ? 'active' : ''}`}>Home</p></li>
                </Link>
                <Link to='/market'>
                    <li><p className={`${activeMenu==='/market' ? 'active' : ''}`}>Market</p></li>
                </Link>
                <Link to='/contact'>
                    <li><p className={`${activeMenu==='/contact' ? 'active' : ''}`}>Contact</p></li>
                </Link>
            </ul>

            {user.registered ? 
                <div className='authUser bold-text'>
                    <FaUserCircle className='userIcon green-text'/>
                    <p className='green-text'>{user.auth.name}</p>
                    <div className='authUser-dropdown'>
                        <Link to='/addresses'>
                            <p>Addresses</p>
                        </Link>
                        <p onClick={logoutHandler}>Log out</p>
                    </div>
                </div> :
                <Link to='/login'>
                    <Button light={false}>Sign up</Button>
                </Link>
            }
        </header>
    );
}
  
 export default Header;