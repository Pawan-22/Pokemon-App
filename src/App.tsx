import { useState } from "react";
import PokemonList from "./components/PokemonList/PokemonList";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import { SearchContextProvider } from "./context/SearchContext";

const App = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleDescriptionToggle = (isOpen: boolean) => {
    setIsDescriptionOpen(isOpen);
  };

  return (
    <SearchContextProvider>
      <div className="app">
        <h1>Pokémon List</h1>
        {!isDescriptionOpen && <SearchBar />}
        <PokemonList onDescriptionToggle={handleDescriptionToggle} />
      </div>
    </SearchContextProvider>
  );
};

export default App;
