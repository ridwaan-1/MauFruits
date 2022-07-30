import React, { useState, useEffect } from 'react';
import { FaFilter } from "react-icons/fa";
import FiltersSection from '../../Containers/FiltersSection';
import SearchBar from '../../Components/SearchBar';
import './market.css';
import ProductInfo from '../../Containers/ProductInfo';
import CartWrapper from '../../Containers/CartWrapper';
import Loader from '../../Components/Loader';
import useRequest from '../../hooks/useRequest';
import Pagination from '../../Components/Pagination';
import Error from '../../Components/Error';
import { serverUrl } from '../../Constants/serverUrl';

const getMaxItems = () => {
    if (window.innerWidth > 1340) return 15;
    if (window.innerWidth > 1140) return 12;
    if (window.innerWidth > 740) return 9;
    return 6;
}
const Market = () => {
    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const [reqUrl, setReqUrl] = useState(`${serverUrl}/product/all?limit=${getMaxItems()}`);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchName, setSearchName] = useState('');   
    const [priceFilter, setPriceFilter] = useState('');
    const [gradeFilter, setGradeFilter] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [productsData, setProductsData] = useState({
        num: 0,
        data: []
    });
    const { loading, error, fetchData } = useRequest();
    
    const filterHandler = (e) => {
        const { value, name } = e.target;
        if(name==='category') {
            setCategoryFilter(categoryFilter===value ? '' : value);
            return;
        }
        setPriceFilter(priceFilter===value ? '' : value);
    }
    
    const gradeHandler = (e) => {
        const { value, checked } = e.target;
        setGradeFilter(s => {
            let prevState = s;
            prevState = checked ? [...prevState, value] : prevState.filter(g => g !== value);
            return prevState;
        })
    }

    const applyFilterHandler = () => {
        setPageNum(1);
        createNewReq(1);
    }
    
    const createNewReq = (pageNumber=pageNum) => {
        let newUrl = `${serverUrl}/product/`;
        const filtersAdded = [];
        
        newUrl += categoryFilter ? `${categoryFilter.toLowerCase()}?` : 'all?';
        
        filtersAdded.push(`page=${pageNumber}`);
        if (searchName) filtersAdded.push(`name=${searchName}`);
        if (gradeFilter.length!==0) filtersAdded.push(`grade=${gradeFilter.join(',')}`);
        if (priceFilter) filtersAdded.push(`price=${priceFilter==='High → Low' ? 'DESC' : 'ASC'}`);

        setReqUrl(newUrl + `limit=${getMaxItems()}&` + filtersAdded.join('&'));
        setSearchName('');
    }
    
    const newPageHandler = (e) => {
        setPageNum(e.target.value);
        createNewReq(e.target.value);
    }

    useEffect(() => {
        fetchData({ url: reqUrl }, (response) => {
            setProductsData(response);
        });
        
        window.scrollTo(0, 0);
    }, [reqUrl, fetchData]);

    return (
        <main className='store-contents flex'>
            <FiltersSection 
                filterMenuHandler={setOpenFilterMenu}
                openFilterMenu={openFilterMenu}
                categoryFilter={categoryFilter}
                priceFilter={priceFilter}
                gradeFilter={gradeFilter}
                filterHandler={filterHandler}
                gradeHandler={gradeHandler}
                requestHandler={applyFilterHandler}
            />
            <section className='store-products'>
                <div className='searchBar-container flex center-v'>
                    <div className='filterIcon-container' onClick={()=>(setOpenFilterMenu(!openFilterMenu))}>
                        <FaFilter />
                    </div>
                    
                    <SearchBar 
                        searchName={searchName}
                        setSearchName={setSearchName}
                        requestHandler={applyFilterHandler}
                    />
                </div>  
                <div className='productsDisplay'>
                    {error && <Error error={error} />}
                    {loading && <Loader />}

                    {!error && !loading && productsData.data.map((data, index) => (
                        <ProductInfo key={index} productData={data} /> 
                    ))}
                </div>
                <div className='flex center-h'>
                    <Pagination onClick={newPageHandler} currentActive={pageNum} totalProducts={productsData.num} productLimit={getMaxItems()} />
                </div>
            </section>
            <CartWrapper />
        </main>
    );
}
 
export default Market;