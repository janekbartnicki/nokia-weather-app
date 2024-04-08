import { useContext, useEffect, useState } from "react"

import { LocationContext } from "./LocationContext";


const CountryDetails: React.FC = () => {
    //handling and checking the context
    const context = useContext(LocationContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { locationState } = context;

    const [weatherIcon, setWeatherIcon] = useState<string | null>(null);

    useEffect(() => {
        if(locationState.countryInfo?.weather[0].icon)
            setWeatherIcon(`http://openweathermap.org/img/w/${locationState.countryInfo.weather[0].icon}.png`);
    }, [locationState.countryInfo])

    return (
        <div className="mx-10 lg:md:mx-20 mb-36 p-10 lg:mx-52 border-[1px] border-gray-400 rounded-sm">
            <h1 className="flex justify-center text-3xl pb-10">
                <p className="bg-black text-center text-white px-10 py-3">
                    {locationState.selectedCountry.name ? locationState.selectedCountry.name : "Unable to find "}
                </p>
            </h1>

            { 
                locationState.countryInfo ? (
                    <>
                        <p className="text-center pb-5">
                            {
                                locationState.countryInfo.weather[0].description ?
                                    locationState.countryInfo.weather[0].description.charAt(0).toUpperCase() + locationState.countryInfo.weather[0].description.slice(1) 
                                    : null
                            }
                        </p>
                        <div className="font-thin">
                            <div className="flex justify-center align-middle">
                                <div className="font-bold">
                                    {weatherIcon ? <img src={weatherIcon} alt="Weather icon" /> : null}
                                    {locationState.countryInfo.main.temp}&deg;C
                                </div>
                                
                            </div>
                            <h3 className="text-md text-center my-5">Exact location: {locationState.countryInfo.name}</h3>
                            <div className="flex justify-center space-x-14">
                                <div>
                                    <ul>
                                        <li>
                                            <span className="font-normal">
                                                Perceived temperature: 
                                            </span> {locationState.countryInfo.main.feels_like} &deg;C
                                        </li>
                                        <li>
                                            <span className="font-normal">
                                                Maximum temperature: 
                                            </span> {locationState.countryInfo.main.temp_max} &deg;C</li>
                                        <li>
                                            <span className="font-normal">
                                            Minimum temperature:
                                            </span> {locationState.countryInfo.main.temp_min} &deg;C</li>
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        <li>
                                            <span className="font-normal">
                                                Humidity:
                                            </span> {locationState.countryInfo.main.humidity} %</li>
                                        <li>
                                            <span className="font-normal">
                                                Wind speed:
                                            </span> {locationState.countryInfo.wind.speed} m/s
                                        </li>
                                        <li>
                                            <span className="font-normal">
                                                Wind direction:
                                                </span> {locationState.countryInfo.wind.deg} &deg;
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null
            }
            
        </div>
    )
}

export default CountryDetails;