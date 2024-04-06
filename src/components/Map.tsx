import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import worldMap from '../../custom.geo.json';
import { CSSProperties, useContext } from 'react';
import { LocationContext } from './LocationContext';
import { GeographiesProps } from '../types/GeographiesProps';

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
    const context = useContext(LocationContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { locationState, locationDispatch } = context;

    //@types/react-simple-maps does not provide type "geographies"
    const handleClick = (geo: GeographiesProps): void => {
        locationDispatch({
            type: 'SET_SELECTED_COUNTRY',
            payload: {name: geo.properties.name as string, iso: geo.properties.iso_a2 as string}
        });

        //scrolling to the details section
        setTimeout(() => {
            const element = document.getElementById('details');
            element?.scrollIntoView({behavior: 'smooth'});
        }, 200)
        
    }

    //TODO: change the height prop
    return (
        <ComposableMap className='h-[50rem] w-full bg-blue-500' style={{background: `url("/globe_lines.svg")`}}>
            <Geographies geography={worldMap}>
                {
                    ({ geographies }) =>
                        geographies.map((geo: GeographiesProps) => (
                            <Geography 
                                key={geo.rsmKey} 
                                geography={geo} 
                                fill={locationState.selectedCountry.name === geo.properties.name ? activeFill : fill}
                                stroke={stroke}
                                onClick={() => handleClick(geo)}
                                style={{
                                    default: customCSS,
                                    hover: customCSS,
                                    pressed: customCSS
                                }}
                                className='transition-all duration-500'
                            />
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}

export default Map;