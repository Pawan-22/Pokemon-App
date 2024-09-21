import { SearchContext } from "../../context/SearchContext";
import { useContext } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const {
    setSearchValue,
    searchData: { searchValue },
  } = useContext(SearchContext);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
