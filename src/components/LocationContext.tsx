import React, { createContext, Dispatch, useReducer } from "react";
import { WeatherData } from "../types/WeatherData";

enum locationActionTypes {
    SET_SELECTED_COUNTRY = 'SET_SELECTED_COUNTRY',
    SET_COUNTRY_INFO = 'SET_COUNTRY_INFO',
    ADD_CITY = 'ADD_CITY',
    REMOVE_CITY = 'REMOVE_CITY'

}

interface LocationState {
    selectedCountry: {
        name: string;
        iso: string;
    },
    countryInfo: WeatherData | null,
    cities: WeatherData[]
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
    cities: []
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