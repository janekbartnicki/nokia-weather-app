import { useContext } from "react";
import { LocationContext } from "./LocationContext";

interface SortFilterProps {
    text: string;
    icon?: React.ReactNode
    keyValue: string
    asc?: boolean
}

const SortFilter: React.FC<SortFilterProps> = ({ text, icon, keyValue, asc = false }) => {
    const context = useContext(LocationContext);
    if(!context) {
        throw new Error('An error occurred while loading the context.');
    }
    const { locationDispatch } = context;

    const handleSortChoice = () => {
        locationDispatch({ type: 'SORT_CITIES', payload: { 
            value: keyValue,
            asc: asc
         }});
        
        locationDispatch({type: 'CITIES_SORTED_BY', payload: keyValue});
    }

    return (
        <p onClick={handleSortChoice}>
            {text} {icon ? icon : null}
        </p>
    )
}

export default SortFilter;