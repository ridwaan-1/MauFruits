import React, { useEffect, useState } from "react";
import CardSlider from "../../Components/CardSlider";
import Error from "../../Components/Error";
import Loader from "../../Components/Loader";
import useRequest from "../../hooks/useRequest";
import { serverUrl } from "../../Constants/serverUrl";

const ProductsCarousels = () => {
    const { loading, error, fetchData } = useRequest();
    const [productData, setProductData] = useState({
        newProduct: [],
        popular: []
    });


    useEffect(() => {
        fetchData({url: `${serverUrl}/product/homepage?limit=8`}, (response) => {
            if (response.success) setProductData(response.data);
        });
    }, [fetchData]);

    return ( 
        <section style={{position:'relative', minHeight:'300px'}} className='products-display'>
            {error && <Error error={error} />}
            {loading && <Loader />}
            {!error && !loading &&
            <React.Fragment>
                <CardSlider title={"New Arrivals"} numDisplayProd={8} productsData={productData.newProduct} />
                <CardSlider title={"Top Sales"} numDisplayProd={8} productsData={productData.popular} />
            </React.Fragment>
            }
        </section>
    );
}
 
export default ProductsCarousels;