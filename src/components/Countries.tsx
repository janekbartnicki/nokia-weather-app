import { useContext, useEffect } from "react";
import { fetchWeatherByCountry } from "../utils/weatherUtils";
import { LocationContext } from "./LocationContext";
import { scrollTo } from "../utils/scrollTo";
import CountryDetails from "./CountryDetails";
import Map from "./Map";

const Countries: React.FC = () => {
    const context = useContext(LocationContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { locationState, locationDispatch } = context;

    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetchWeatherByCountry(locationState.selectedCountry);
            locationDispatch({
                type: 'SET_COUNTRY_INFO',
                payload: response?.data ? response.data : null
            })
        }

        if(locationState.selectedCountry.iso)
            fetchWeatherData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationState.selectedCountry]);

    return (
        <>
            <div className="text-center text-3xl font-thin mt-10 mb-16">
                Click on country...&nbsp;&nbsp;
                <span 
                    className="underline underline-offset-8 hover:no-underline cursor-pointer hover:bg-black hover:text-white transition-all hover:p-5"
                    onClick={() => scrollTo('cities-comparison')}
                >
                    or compare cities.
                </span>
                </div>
                <div className="mb-[80px] mx-28">
                    <Map/>
            </div>
            <div id="country-details" className="pt-16">
                <CountryDetails/>
            </div>
        </>
        
    )
}

export default Countries;