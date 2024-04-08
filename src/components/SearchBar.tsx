import { useContext, useState } from "react";
import { fetchWeatherByCity } from "../utils/weatherUtils";
import { LocationContext } from "./LocationContext";
import { WeatherData } from "../types/WeatherData";

const SearchBar: React.FC = () => {
    const context = useContext(LocationContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { locationState ,locationDispatch } = context;

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
                }
            }
            
        } catch(e) {
            throw new Error('Unable to find city.');
        }
    }

    return (
        <div className="flex flex-col space-y-8 items-center mt-10 mb-20">
            <input 
                type="text"
                placeholder="Search for city..."
                className="input input-bordered w-full max-w-xs p-7 focus:outline-none text-center"
                onChange={(event) => handleChange(event)}
                value={searchTerm.toUpperCase()}
            />
            <button className="btn btn-outline" onClick={handleCityFetch}>Search & Add</button>
        </div>
    )
    
}

export default SearchBar;