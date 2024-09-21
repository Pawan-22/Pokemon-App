import "./PokemonList.css";
import { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import { fetchPokemons } from "../../services/pokemonApi";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import CustomFallback from "../CustomFallback/CustomFallback";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    searchData: { searchValue },
  } = useContext(SearchContext);

  useEffect(() => {
    const getPokemon = async () => {
      setLoading(true);

      try {
        const response = await fetchPokemons();
        if (response && response.data && response.data.results) {
          if (searchValue) {
            const newFilterPokemon = response.data.results.filter(
              (pokemon: { name: string; url: string }) => {
                return pokemon.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              }
            );

            setPokemons(newFilterPokemon);
          } else {
            setPokemons(response.data.results);
          }
        }
      } catch (error: any) {
        setError("Something went wrong. Please try again!");

        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPokemon();
  }, [searchValue]);

  if (loading) {
    return <CustomFallback text="Loading..." />;
  }
  if (error) {
    return <CustomFallback text={error} />;
  }

  if (pokemons.length === 0) {
    return <CustomFallback text="No Pokemon Data found..." />;
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon: { name: string; url: string }, index) => (
        <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  );
};

export default PokemonList;
