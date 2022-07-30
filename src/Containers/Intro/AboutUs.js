import { about1, about2 } from '../../Constants/images';

const AboutUs = () => {
    return ( 
        <section className='aboutUs m-top-30'>
            <h1 className='center-text'>Who are we?</h1>
            <div className='aboutUs-section flex'>
                <img className='aboutUs-img' src={about2} alt={"Lots of fruits"} />
                <p>MauFruits is a fruit store that has been supplying the local area 
                with fresh fruit for years. We only focus  on the freshest and highest 
                quality produce, which is why we are the best place to get your day to 
                day fruit requirements. We offer a variety of products including apples, 
                oranges, grapefruits, kiwis and more. We can also help you satisfy your 
                sweet tooth with our delicious range of fruit juices.</p>
            </div>
            <div className='aboutUs-section flex m-top-30'>
                <p>MauFruits is a company committed to providing our customers with high 
                quality products. We are always looking for suppliers who can meet our 
                high standards of quality and sustainability, and we will never compromise 
                on these values. We also offer a delivery service to make things even easier 
                for you.<br /><br />
                If you're looking for an easy way to order your daily fruit requirements, 
                take a look at what MauFruits has to offer!</p>
                <img className='aboutUs-img' src={about1} alt={"Lots of fruits"} />
            </div>
        </section>
    );
}

export default AboutUs;