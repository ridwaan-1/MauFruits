import './footer.css';
import { BsTwitter, BsPinterest, BsInstagram } from "react-icons/bs";

const Footer = () => {  
    return ( 
        <footer className='m-top-20'>
            <h1>MauFruits</h1>
            <div className='m-top-20'>
                <BsTwitter className='social-icon' />
                <BsPinterest className='social-icon' />
                <BsInstagram className='social-icon' />
            </div>
            <p className='m-top-20'>
                <span>TERMS & CONDITIONS</span> | <span>PRIVACY</span> | <span>LEGAL NOTICE</span>
            </p>
        </footer>
    );
}
 
export default Footer;