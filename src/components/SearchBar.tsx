import { useContext, useState } from "react";
import { BsSortDown } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

import { fetchWeatherByCity } from "../utils/weatherUtils";
import { LocationContext } from "./LocationContext";
import { WeatherData } from "../types/WeatherData";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import SortFilter from "./SortFilter";
import { MdError } from "react-icons/md";

const SearchBar: React.FC = () => {
    const context = useContext(LocationContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { locationState, locationDispatch } = context;

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value.toLowerCase());
    }

    const handleCityFetch = async () => {
        try {
            const response = await fetchWeatherByCity(searchTerm.trim());

            if(!response) {
                setError(true);
            } else {
                const cityData = response.data as WeatherData;
                
                if(!locationState.cities.filter(city => city.id === cityData.id).length) {
                    locationDispatch({type: 'ADD_CITY', payload: cityData});
                    setSearchTerm('');
                    setError(false);
                }
            }
            
        } catch(e) {
            throw new Error('Unable to find city.');
        }
    }

    return (
        <div className="flex flex-col space-y-8 items-center mt-10 mb-10">
            <input 
                type="text"
                placeholder="Search for city..."
                className="input input-bordered w-full max-w-xs p-7 focus:outline-none text-center"
                onChange={(event) => handleChange(event)}
                value={searchTerm.toUpperCase()}
            />

            { 
                error ? <p className="px-5 py-2 flex justify-center align-middle items-center space-x-2 text-red-500 font-thin border-[1px] border-red-500">
                    <MdError/> <span>Unable to find the specified city.</span>
                    </p> : null
            }

            <div className="flex justify-center align-middle items-center">
                <div className="dropdown mr-2">
                    <div tabIndex={0} role="button" className="btn m-1">
                        Sort Options <BsSortDown/>
                    </div>
                    <ul id='sort-dropdown' onClick={() => document.getElementById('sort-dropdown')?.blur()} tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <SortFilter text='By temperature' icon={<GoSortDesc />} keyValue='temp' asc/>
                        </li>
                        <li>
                            <SortFilter text='By temperature' icon={<GoSortAsc />} keyValue='temp'/>
                        </li>
                        <li>
                            <SortFilter text='By perceived temp.' icon={<GoSortDesc />} keyValue='feels_like' asc/>
                        </li>
                        <li>
                            <SortFilter text='By perceived temp.' icon={<GoSortAsc />} keyValue='feels_like'/>
                        </li>
                        <li>
                            <SortFilter text='By max temperature' icon={<GoSortDesc />} keyValue='temp_max' asc/>
                        </li>
                        <li>
                            <SortFilter text='By max temperature' icon={<GoSortAsc />} keyValue='temp_max'/>
                        </li>
                        <li>
                            <SortFilter text='By min temperature' icon={<GoSortDesc />} keyValue='temp_min' asc/>
                        </li>
                        <li>
                            <SortFilter text='By min temperature' icon={<GoSortAsc />} keyValue='temp_min'/>
                        </li>
                        <li>
                            <SortFilter text='By pressure' icon={<GoSortDesc />} keyValue='pressure' asc/>
                        </li>
                        <li>
                            <SortFilter text='By pressure' icon={<GoSortAsc />} keyValue='pressure'/>
                        </li>
                        <li>
                            <SortFilter text='By humidity' icon={<GoSortDesc />} keyValue='humidity' asc/>
                        </li>
                        <li>
                            <SortFilter text='By humidity' icon={<GoSortAsc />} keyValue='humidity'/>
                        </li>
                        <li>
                            <SortFilter text='By wind speed' icon={<GoSortDesc />} keyValue='speed' asc/>
                        </li>
                        <li>
                            <SortFilter text='By wind speed' icon={<GoSortAsc />} keyValue='speed'/>
                        </li>
                    </ul>
                </div>
                <button className="btn btn-outline" onClick={handleCityFetch}>
                    Search & Add <IoSearchOutline/>
                </button>
            </div>
        </div>
    )
    
}

export default SearchBar;