import React from 'react';
import Footer from '../../Containers/Footer';
import Header from '../../Containers/Header';
import Intro from '../../Containers/Intro';
import CartWrapper from '../../Containers/CartWrapper';
import AboutUs from '../../Containers/Intro/AboutUs';
import ProductsCarousels from '../../Containers/ProductsCarousels'; 


const Home = () => {

    return ( 
        <React.Fragment>
            <Header />
            <main>
                <Intro />
                <ProductsCarousels />
                <AboutUs />
                <CartWrapper />
            </main>
            <Footer />
        </React.Fragment>
    );
}
 
export default Home;