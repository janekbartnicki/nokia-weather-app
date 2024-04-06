import { useContext, useEffect } from "react";

import Map from "./components/Map";
import CountryDetails from "./components/CountryDetails";
import { fetchWeatherByCountry } from "./utils/weatherUtils";
import SearchBar from "./components/SearchBar";
import { LocationContext } from "./components/LocationContext";

const App: React.FC = () => {
    const context = useContext(LocationContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { locationState, locationDispatch } = context;

    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetchWeatherByCountry(locationState.selectedCountry);
            locationDispatch({
                type: 'SET_INFO',
                payload: response?.data ? response.data : null
            })
        }

        if(locationState.selectedCountry.iso)
            fetchWeatherData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationState.selectedCountry]);

    return (
        <>
            <div className="text-center text-6xl font-thin my-24">
                FreshAir<sup className="text-4xl">&copy;</sup>
            </div>

            <div className="mb-[80px] mx-28 hidden lg:block">
                <Map/>
            </div>
            <SearchBar/>
            <CountryDetails info={locationState.info}/>
        </>
    )
}

export default App;