import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import worldMap from '../custom.geo.json';
import { CSSProperties, useContext } from 'react';
import { CountryContext } from './CountryContext';

interface MapProps {
    fill?: string;
    activeFill?: string;
    stroke?: string;
    customCSS?: CSSProperties;
}

const defaultCSS: CSSProperties = {
    outline: 'none',
    border: 'none'
}

const Map: React.FC<MapProps> = ({ fill='#EAEAEC', activeFill='#787878', stroke='#D6D6DA', customCSS=defaultCSS }) => {

    //handling and checking the context
    const context = useContext(CountryContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { selectedCountry, setSelectedCountry } = context;

    //@types/react-simple-maps does not provide type "geographies"
    const handleClick = (geo: any): void => {
        setSelectedCountry({name: geo.properties.name, iso: geo.properties.iso_a2});
        console.log(geo.properties.iso_a2);
    }

    //TODO: change the height prop
    return (
        <ComposableMap className='h-[50rem] w-full bg-blue-500' style={{background: `url("/globe_lines.svg")`}}>
            <Geographies geography={worldMap}>
                {
                    ({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography 
                                key={geo.rsmKey} 
                                geography={geo} 
                                fill={selectedCountry.name === geo.properties.name ? activeFill : fill}
                                stroke={stroke}
                                onClick={() => handleClick(geo)}
                                style={{
                                    default: customCSS,
                                    hover: customCSS,
                                    pressed: customCSS
                                }}
                            />
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}

export default Map;