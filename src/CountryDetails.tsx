import { useContext } from "react"
import { CountryContext } from "./CountryContext"

const CountryDetails: React.FC = () => {

    //handling and checking the context
    const context = useContext(CountryContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { selectedCountry } = context;

    return <div className="text-3xl font-bold">{selectedCountry.name}</div>
}

export default CountryDetails;