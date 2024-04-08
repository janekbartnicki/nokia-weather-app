import { useContext } from "react";
import SearchBar from "./SearchBar";
import { LocationContext } from "./LocationContext";
import CityDetails from "./CityDetails";

const Cities: React.FC = () => {
    const context = useContext(LocationContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { locationState } = context;

    const renderCities = () => {
        const citiesArray: JSX.Element[] = [];

        for(const city of locationState.cities) {
            citiesArray.push(<CityDetails cityInfo={city} key={city.id}/>);
        }

        return citiesArray;
    }

    
    return (
        <div className="w-full mb-10">
            <div className="text-3xl font-thin text-center">Cities Comparison</div>
            <SearchBar/>
            <div className="flex flex-wrap justify-center items-center align-middle my-20">
                { renderCities() }
            </div>
        </div>
    )
}

export default Cities;