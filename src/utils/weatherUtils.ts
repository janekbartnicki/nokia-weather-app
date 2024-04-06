import axios from 'axios';
import * as capitalsJSON from '../../capitals.json';
import * as problematicCapitalsJSON from '../../problematic_countries.json';

const API_KEY: string = import.meta.env.VITE_OPENWEATHERAPP_API_KEY;

const allCapitals: { [key: string]: string } = capitalsJSON; //adding a type to the JSON import
const problematicCapitals: { [key: string]: string } = problematicCapitalsJSON; //adding a type to the JSON import

/**
 * Function searches for weather in a country based on its capital city
 * @param country {name: string; iso: string} object
 * @returns response from openweathermap.org API
 */
export const fetchWeatherByCountry = async (country: {name: string; iso: string}) => {
    let capital: (string | undefined) = allCapitals[country.name];

    //some countries are written in an unfriendly way for the JSON file, so to avoid the error I made an additional JSON with the countries where errors can arise
    if(!capital) {
        capital = problematicCapitals[country.iso];
    }

    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: capital,
                units: 'metric',
                appid: API_KEY
            }
        })
    
        return response;
    } catch(e) {
        console.error(`Failed request with params: ${country.iso}, ${country.name}`)
        return null;
    }
}

export const fetchWeatherByCity = async (cityName: string) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: cityName,
                units: 'metric',
                appid: API_KEY
            }
        })
    
        return response;
    } catch(e) {
        console.error(`Failed request with params: ${cityName}`)
        return null;
    }
}