import PokemonList from "./components/PokemonList/PokemonList";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import { SearchContextProvider } from "./context/SearchContext";

const App = () => {
  return (
    <SearchContextProvider>
      <div className="app">
        <h1>Pokémon List</h1>
      </div>
      <SearchBar />
      <PokemonList />
    </SearchContextProvider>
  );
};

export default App;
