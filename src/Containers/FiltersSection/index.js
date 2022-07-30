import React from 'react';
import DropDown from '../../Components/DropDown';
import Button from '../../Components/Button';
import { FaFilter, FaTimes } from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import './filtersSection.css';


const FiltersSection = ({filterMenuHandler, openFilterMenu, filterHandler, gradeHandler, categoryFilter, priceFilter, gradeFilter, requestHandler}) => {

    return ( 
        <div className={`filterSection ${openFilterMenu ? 'open-filterMenu' : ''}`}>
            <div className='filterSection-title'>
                <p><FaFilter className='filterIcon'/>Filters</p>
                <FaTimes className='closeFilterIcon' onClick={()=>(filterMenuHandler(!openFilterMenu))}/>
            </div>
            <div className='filterSection-types'>
                <DropDown title={'Category'} height={'85px'} openNow={true}>
                    <RadioGroup value={categoryFilter} aria-labelledby="radio-buttons-group-category" name="radio-buttons-group-category" onClick={filterHandler} >
                        {['New', 'Popular'].map((option, index) => (
                            <li key={index} className='flex center-v'>
                                <Radio name='category' value={option} color="success" />
                                <p className='dropdown-options-name'>{option}</p>
                            </li>
                        ))}
                    </RadioGroup>
                </DropDown>

                <DropDown title={'Price'} height={'85px'} openNow={false}>
                    <RadioGroup value={priceFilter} aria-labelledby="radio-buttons-group-price" name="radio-buttons-group-price" onClick={filterHandler} >
                        {['Low → High', 'High → Low'].map((option, index) => (
                            <li key={index} className='flex center-v'>
                                <Radio name='price' value={option} color="success" />
                                <p className='dropdown-options-name'>{option}</p>
                            </li>
                        ))}
                    </RadioGroup>    
                </DropDown>

                <DropDown title={'Grades'} height={'125px'} openNow={false} >
                    {['A', 'B', 'C'].map((option, index) => (
                    <li key={index} className='flex center-v'>
                        <Checkbox name={'grade'} value={option} onChange={gradeHandler} color="success"/>
                        <p className='dropdown-options-name'>Grade {option}</p>
                    </li>
                    ))}
                </DropDown>

                <Button width={true} onClick={requestHandler}>Apply Filters</Button>
            </div>
        </div>
    );
}

export default FiltersSection;