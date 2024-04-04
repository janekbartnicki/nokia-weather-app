import { useContext } from "react"
import { CountryContext } from "./CountryContext"
import { WeatherData } from "../types/WeatherData";

interface CountryDetailsProps {
    info: WeatherData | null;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ info }) => {

    //handling and checking the context
    const context = useContext(CountryContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { selectedCountry } = context;

    return <div className="text-3xl font-thin text-center">{selectedCountry.name}</div>
}

export default CountryDetails;