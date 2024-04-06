import { useContext, useEffect, useState } from "react"

import { WeatherData } from "../types/WeatherData";
import { LocationContext } from "./LocationContext";

interface CountryDetailsProps {
    info: WeatherData | null;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ info }) => {
    //handling and checking the context
    const context = useContext(LocationContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { locationState } = context;

    const [weatherIcon, setWeatherIcon] = useState<string | null>(null);

    useEffect(() => {
        if(info?.weather[0].icon)
            setWeatherIcon(`http://openweathermap.org/img/w/${info.weather[0].icon}.png`);
    }, [info])

    console.log(info);

    return (
        <div id="details" className="mx-10 lg:md:mx-20 mb-20 p-10 lg:mx-52 border-[1px] border-gray-400 rounded-sm">
            <h1 className="text-center text-3xl p-5 pb-2">
                {locationState.selectedCountry.name ? locationState.selectedCountry.name : "Unable to find "}
            </h1>

            { 
                info ? (
                    <>
                        <p className="text-center pb-5">
                            {
                                info.weather[0].description ?
                                    info.weather[0].description.charAt(0).toUpperCase() + info.weather[0].description.slice(1) 
                                    : null
                            }
                        </p>
                        <div className="font-thin">
                            <div className="flex justify-center align-middle">
                                <div className="font-bold">
                                    {weatherIcon ? <img src={weatherIcon} alt="Weather icon" /> : null}
                                    {info.main.temp}&deg;C
                                </div>
                                
                            </div>
                            <h3 className="text-md text-center my-5">Exact location: {info.name}</h3>
                            <div className="flex justify-center space-x-14">
                                <div>
                                    <ul>
                                        <li>
                                            <span className="font-normal">
                                                Perceived temperature: 
                                            </span> {info.main.feels_like} &deg;C
                                        </li>
                                        <li>
                                            <span className="font-normal">
                                                Maximum temperature: 
                                            </span> {info.main.temp_max} &deg;C</li>
                                        <li>
                                            <span className="font-normal">
                                            Minimum temperature:
                                            </span> {info.main.temp_min} &deg;C</li>
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        <li>
                                            <span className="font-normal">
                                                Humidity:
                                            </span> {info.main.humidity} %</li>
                                        <li>
                                            <span className="font-normal">
                                                Wind speed:
                                            </span> {info.wind.speed} m/s
                                        </li>
                                        <li>
                                            <span className="font-normal">
                                                Wind direction:
                                                </span> {info.wind.deg} &deg;
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