import { useContext, useEffect, useState } from "react";
import { WeatherData } from "../types/WeatherData";
import { LocationContext } from "./LocationContext";

const CityDetails: React.FC<{cityInfo: WeatherData}> = ({cityInfo}) => {
    const context = useContext(LocationContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { locationDispatch } = context;

    const [weatherIcon, setWeatherIcon] = useState<string | null>(null);

    useEffect(() => {
        if(cityInfo.weather[0].icon)
            setWeatherIcon(`http://openweathermap.org/img/w/${cityInfo.weather[0].icon}.png`);
    }, [cityInfo])

    const removeCity = () => {
        locationDispatch({
            type: 'REMOVE_CITY',
            payload: cityInfo.id
        })
    }

    return (
        <div className="border border-1 border-black py-5 px-10 h-[35rem] rounded-sm mb-4 mx-2">
            <div className="flex justify-center text-3xl pb-10">
                <p className="bg-black text-center text-white px-5 py-2 max-w-52">
                    {cityInfo.name}
                </p>
            </div>
            <p className="text-center pb-5">
                {cityInfo.weather[0].description.charAt(0).toUpperCase() + cityInfo.weather[0].description.slice(1)}
            </p>
            <div className="flex flex-col justify-center align-middle items-center">
                <div className="font-bold mb-5">
                    {weatherIcon ? <img src={weatherIcon} alt="Weather icon" /> : null}
                    {cityInfo.main.temp}&deg;C
                </div>
                <ul className="font-thin text-center space-y-1 mb-5">
                    <li className='feels_like'>
                        <span className="font-normal">
                            Perceived temperature: 
                        </span> {cityInfo.main.feels_like} &deg;C
                    </li>
                    <li className='temp_max'>
                        <span className="font-normal">
                            Maximum temperature: 
                        </span> {cityInfo.main.temp_max} &deg;C
                    </li>
                    <li className='temp_min'>
                        <span className="font-normal">
                        Minimum temperature:
                        </span> {cityInfo.main.temp_min} &deg;C
                    </li>
                    <li className='humidity'>
                        <span className="font-normal">
                            Humidity:
                        </span> {cityInfo.main.humidity} %</li>
                    <li className='speed'>
                        <span className="font-normal">
                            Wind speed:
                        </span> {cityInfo.wind.speed} m/s
                    </li>
                    <li className='deg'>
                        <span className="font-normal">
                            Wind direction:
                            </span> {cityInfo.wind.deg} &deg;
                    </li>
                    <li className='pressure'>
                        <span className="font-normal">
                            Pressure:
                            </span> {cityInfo.main.pressure} hPa
                    </li>
                </ul>
            </div>
            <div className="flex justify-center">
                <button className="btn btn-outline" onClick={removeCity}>Remove</button>
            </div>
        </div>
    )
}

export default CityDetails;