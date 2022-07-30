import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import { hotDealsIcon, deliveryIcon, varietyIcon, landingPic } from '../../Constants/images';
import './intro.css';

const Intro = () => {
    return ( 
        <section className='landing-section'>
            <div className='flex spaceBetween center-v'>
                <div className='company-info'>
                    <h1 className='company-slogan'>
                        Get <span className='green-text'>Fresh</span> <br /><span>Fruits</span> Today
                    </h1>
                    <p className='company-desc'>
                        We deliver fresh fruits to your doorstep with just one click. 
                        We have all the healthier snacks you need to meet your fruit 
                        quota for the day.
                    </p>
                    <Link to={'/market'}>
                        <Button light={false}>Visit Market</Button>
                    </Link>
                </div>

                <img className='landing-image' src={landingPic} alt={"Delicious fruits"} />
            </div>

            <h1 className='m-top-30 center-text'>Why MauFruits?</h1>
            <div className='about-us flex wrap center-h'>
                <div className='desc-container flex center-v'>
                    <img className='img' src={hotDealsIcon} alt={"Hot deals icon"} />
                    <div className='desc'>
                        <p>Hot deals</p>
                        <p>We provide some of the most competitive prices on the market.</p>
                    </div>
                </div>

                <div className='desc-container flex center-v'>
                    <img className='img' src={varietyIcon} alt={"Huge variety icon"} />
                    <div className='desc'>
                        <p>Wide Variety of Fruits</p>
                        <p>We have a huge variety of fruits and other products in our store.</p>
                    </div>
                </div>

                <div className='desc-container flex center-v'>
                    <img className='img' src={deliveryIcon} alt={"Delivery icon"} />
                    <div className='desc'>
                        <p>Fast delivery</p>
                        <p>Choose your products, we will deliver as fast as possible.</p>
                    </div>
                </div>
            </div>
            
        </section>
    );
}
 
export default Intro;