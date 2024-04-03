import { useState } from "react";

import Map from "./Map";
import { CountryContext, SelectedCountryStateType } from "./CountryContext";
import CountryDetails from "./CountryDetails";

const App: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<SelectedCountryStateType>({
        name: 'Select a specific country',
        iso: ''
    });

    //TODO: due to an error in the map file, I will have to check before the API request if the country's ISO code is misspelled

    return (
        <>
            <div className="text-center text-6xl font-thin my-24">
                FreshAir<sup className="text-4xl">&copy;</sup>
            </div>

            <CountryContext.Provider value={ {selectedCountry, setSelectedCountry} }>
                <div className="mb-[80px] mx-28 hidden lg:block">
                    <Map/>
                </div>
                <CountryDetails/>
            </CountryContext.Provider>
        </>
    )
}

export default App;