import { useState } from "react";
import './search.css';
import SearchOut from "../searchout/searchout";
import RecentSearch from "../recentsearch/recentsearch";
import {GEO_API_URL, API_KEY} from "../../getOptions";

const Search = ({onSearchChange, unitSet}) => {
    const [search, setSearch] = useState('');
    const [cityList, setCityList] = useState([]); // List of searched cities
    const [toggled, setToggled] = useState(false);


    const handleFocus = () => {
        setSearch(null); // Clear value on focus if desired
    };

    const handleCitySelect = (selectedOption) => {
        if (selectedOption) {
            setSearch(selectedOption); // Update the input
            setCityList((prevList) => {
                // Check if the city is already in the list
                const cityIndex = prevList.findIndex((city) => city.label === selectedOption.label);
                
                if (cityIndex !== -1) {
                    // If the city is found, move it to the top
                    const updatedList = [...prevList];
                    const [cityToMove] = updatedList.splice(cityIndex, 1); // Remove the city
                    updatedList.unshift(cityToMove); // Add it to the top
                    return updatedList;
                } else {
                    // If the city is not in the list, add it to the beginning
                    return [selectedOption, ...prevList];
                }
            });
        }
    };

    const handleCityClick = (city) => {
        setSearch(city); // Populate the search box with the clicked city
        handleOnChange(city);
    };
    
    const handleOnChange = (searchData) =>{
        setSearch(searchData);
        handleCitySelect(searchData);
        onSearchChange(searchData, unitSet);
    };

    const loadOptions = async (inputValue) => {
        if (inputValue.length > 3) {
            const response = await fetch(
            `${GEO_API_URL}?q=${inputValue}&limit=5&appid=${API_KEY}`
            );
            const json = await response.json();
            const options = json.map((city) => ({
                                value: `${city.lat} ${city.lon}`,  // Use lat and lon for value
                                label: `${city.name}, ${city.country}`,  // Use name and country for label
                              }));
            return {options};
        }
        return { options: [] };
        };

    return(
        <div>
            <SearchOut
                search={search}
                setSearch={setSearch}
                handleOnChange={handleOnChange}
                handleFocus={handleFocus}
                loadOptions={loadOptions}
            />
            <RecentSearch cityList={cityList} handleCityClick={handleCityClick} />
            {cityList.length > 0 && (<div>
            <span className='m-unit'>Metric </span>
            <button className={`t-btn ${toggled ? 'toggled' :'' }`} 
                onClick={()=> {  
                    setToggled(!toggled)
                    unitSet = unitSet ==='metric'? 'imperial':'metric';
                    if(cityList.length > 0){
                        handleOnChange(cityList[0]);
                    }
                    }
                }>
                    <div className='thumb' />
                    </button>
            <span className='i-unit'>  Imperial</span>
            </div>)}
        </div>
        
    )
}

export default Search;