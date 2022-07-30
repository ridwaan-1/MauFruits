import React from 'react';
import { FaSearch } from "react-icons/fa";

import './searchBar.css';

const SearchBar = ({ searchName, setSearchName, requestHandler }) => {
    const searchHandler = (e) => {
        setSearchName(e.target.value);
    }

    return ( 
        <div className="search-container flex center-v center-h">
            <input type="text" autoComplete="off" value={searchName} onChange={searchHandler} name="search" placeholder="Search..." className="search-input" />
            <div onClick={requestHandler} className="search-btn">
                <FaSearch className='searchBtn-icon' />      
            </div>
        </div>
    );
}

export default SearchBar;