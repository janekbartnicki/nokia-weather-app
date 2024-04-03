import { createContext } from "react";

export interface SelectedCountryStateType {
    name: string;
    iso: string;
}

export const CountryContext = createContext<{selectedCountry: SelectedCountryStateType, setSelectedCountry: React.Dispatch<React.SetStateAction<SelectedCountryStateType>>} | null>(null);