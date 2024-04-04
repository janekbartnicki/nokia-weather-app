import axios, { AxiosResponse } from 'axios';
import * as capitalsJSON from '../../capitals.json';
import * as problematicCapitalsJSON from '../../problematic_countries.json';

import { SelectedCountryStateType } from "../components/CountryContext";
import { WeatherData } from '../types/WeatherData';

const API_KEY: string = import.meta.env.VITE_OPENWEATHERAPP_API_KEY;

const allCapitals: { [key: string]: string } = capitalsJSON; //adding a type to the JSON import
const problematicCapitals: { [key: string]: string } = problematicCapitalsJSON; //adding a type to the JSON import

//function searches for weather in a country based on its capital city
export const fetchWeatherByCountry = async (country: SelectedCountryStateType) => {
    let capital: (string | undefined) = allCapitals[country.name];

    //some countries are written in an unfriendly way for the JSON file, so to avoid the error I made an additional JSON with the countries where errors can arise
    if(!capital) {
        capital = problematicCapitals[country.iso];
    }

    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: capital,
                appid: API_KEY
            }
        })
    
        return response;
    } catch(e) {
        throw new Error('Unable to fetch data from the API.');
    }
}

//TODO: searching by city
// export const fetchWeatherByCity = () => {
    
// }