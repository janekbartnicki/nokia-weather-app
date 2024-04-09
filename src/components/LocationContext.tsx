import React, { createContext, Dispatch, useReducer } from "react";
import { WeatherData } from "../types/WeatherData";

enum locationActionTypes {
    SET_SELECTED_COUNTRY = 'SET_SELECTED_COUNTRY',
    SET_COUNTRY_INFO = 'SET_COUNTRY_INFO',
    ADD_CITY = 'ADD_CITY',
    REMOVE_CITY = 'REMOVE_CITY',
    SORT_CITIES = 'SORT_CITIES',
    SET_CITIES_EXTREMES = 'SET_CITIES_EXTREMES',
    CITIES_SORTED_BY = 'CITIES_SORTED_BY'
}

interface LocationState {
    selectedCountry: {
        name: string;
        iso: string;
    },
    countryInfo: WeatherData | null,
    cities: WeatherData[],
    citiesSortedBy: string | null
}

interface LocationAction {
    type: locationActionTypes | string;
    payload: any;
}

const initialState: LocationState = {
    selectedCountry: {
        name: 'Select a specific country',
        iso: ''
    },
    countryInfo: null,
    cities: [],
    citiesSortedBy: null
}

const reducer = (state: LocationState, action: LocationAction) => {
    switch (action.type) {
        case locationActionTypes.SET_SELECTED_COUNTRY:
            return {
                ...state,
                selectedCountry: action.payload
            };
        case locationActionTypes.SET_COUNTRY_INFO:
            return {
                ...state,
                countryInfo: action.payload
            };
        case locationActionTypes.ADD_CITY:
            return {
                ...state,
                cities: [ ...state.cities, action.payload]
            };
        case locationActionTypes.REMOVE_CITY:
            return {
                ...state,
                cities: state.cities.filter(city => city.id != action.payload)
            };
        case locationActionTypes.SORT_CITIES: {
            const options: { value: (keyof Pick<WeatherData, 'main' | 'wind'>), asc: boolean} = action.payload;

            const sortingFunction = (a: WeatherData, b: WeatherData) => {
                if(options.value in a.main) {
                    if(options.asc) {
                        return Number(b.main[options.value]) - Number(a.main[options.value]);
                    } else return Number(a.main[options.value]) - Number(b.main[options.value]);
                } else if (options.value in a.wind) {
                    if(options.asc) {
                        return Number(b.wind[options.value]) - Number(a.wind[options.value]);
                    } else return Number(a.wind[options.value]) - Number(b.wind[options.value]);
                } else {
                    throw new Error('Cannot sort the cities array.');
                }
            }

            const sortedCitiesState = state.cities.sort(sortingFunction);
            return { ...state, cities: sortedCitiesState };
        }
        case locationActionTypes.CITIES_SORTED_BY:
            return {
                ...state,
                citiesSortedBy: action.payload
            }
        default:
            return state;
    }
}

type LocationContextType = {
    locationState: LocationState;
    locationDispatch: Dispatch<LocationAction>;
};

export const LocationContext = createContext<LocationContextType | null>(null);

export const LocationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [locationState, locationDispatch] = useReducer<React.Reducer<LocationState, LocationAction>>(reducer, initialState);

    return (
        <LocationContext.Provider value={{locationState, locationDispatch}}>
            {children}
        </LocationContext.Provider>
    )
}