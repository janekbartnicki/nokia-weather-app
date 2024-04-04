import { useEffect, useState } from "react";

import Map from "./components/Map";
import { CountryContext, SelectedCountryStateType } from "./components/CountryContext";
import CountryDetails from "./components/CountryDetails";
import { fetchWeatherByCountry } from "./utils/weatherUtils";
import { WeatherData } from "./types/WeatherData";

const App: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<SelectedCountryStateType>({
        name: 'Select a specific country',
        iso: ''
    });

    const [countryInfo, setCountryInfo] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetchWeatherByCountry(selectedCountry);
            setCountryInfo(response.data);
        }

        if(selectedCountry.iso)
            fetchWeatherData();
        
    }, [selectedCountry]);

    return (
        <>
            <div className="text-center text-6xl font-thin my-24">
                FreshAir<sup className="text-4xl">&copy;</sup>
            </div>

            <CountryContext.Provider value={ {selectedCountry, setSelectedCountry} }>
                <div className="mb-[80px] mx-28 hidden lg:block">
                    <Map/>
                </div>
                <CountryDetails info={countryInfo}/>
            </CountryContext.Provider>
        </>
    )
}

export default App;