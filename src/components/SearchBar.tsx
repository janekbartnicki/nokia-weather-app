import { useState } from "react";


interface SearchBarProps {
    isCountry?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isCountry = false }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    console.log(searchTerm);

    return (
        <div className="flex items-center align-middle justify-center mt-10 mb-20">
            <input 
                type="text"
                placeholder="Search for country..."
                className="input input-bordered w-full max-w-xs p-7"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />
        </div>
    )
    
}

export default SearchBar;