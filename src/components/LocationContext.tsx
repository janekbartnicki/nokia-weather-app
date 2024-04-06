import React, { createContext, Dispatch, useReducer } from "react";
import { WeatherData } from "../types/WeatherData";

enum actionTypes {
    SET_SELECTED_COUNTRY = 'SET_SELECTED_COUNTRY',
    SET_INFO = 'SET_INFO',
    SET_MODE = 'SET_MODE'
}

interface LocationState {
    selectedCountry: {
        name: string;
        iso: string;
    },
    info: WeatherData | null,
    countryMode: boolean
}

interface LocationAction {
    type: actionTypes | string;
    payload: any;
}

const initialState: LocationState = {
    selectedCountry: {
        name: 'Select a specific country',
        iso: ''
    },
    info: null,
    countryMode: true
}

const reducer = (state: LocationState, action: LocationAction) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_COUNTRY:
            return {
                ...state,
                selectedCountry: action.payload
            };
        case actionTypes.SET_INFO:
            return {
                ...state,
                info: action.payload
            };
        case actionTypes.SET_MODE:
            return {
                ...state,
                countryMode: action.payload
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