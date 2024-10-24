import "./PokemonList.css";
import { useEffect, useState, useContext } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import { fetchPokemons, fetchPokemonDetail } from "../../services/pokemonApi";
import { SearchContext } from "../../context/SearchContext";
import CustomFallback from "../CustomFallback/CustomFallback";
import Pagination from "../Pagination/Pagination";
import PokemonDescription from "../PokemonDescription/PokemonDescription";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonList {
  onDescriptionToggle: (isOpen: boolean) => void;
}

const PokemonList: React.FC<PokemonList> = ({ onDescriptionToggle }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pokemonId, setPokemonId] = useState<string>("");
  const [pokemonDetail, setPokemonDetail] = useState<any>(null);

  const {
    searchData: { searchValue },
  } = useContext(SearchContext);

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetchPokemons(currentPage);
        if (response && response.results) {
          setTotalPages(Math.ceil(response.count / 20));
          const filteredPokemons = searchValue
            ? response.results.filter((pokemon: Pokemon) =>
                pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
              )
            : response.results;
          setPokemons(filteredPokemons);
        }
      } catch (error) {
        setError("Something went wrong. Please try again!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPokemons();
  }, [searchValue, currentPage]);

  useEffect(() => {
    const getPokemonDetail = async () => {
      if (!pokemonId) return;
      setLoading(true);
      try {
        const response = await fetchPokemonDetail(pokemonId);
        setPokemonDetail(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPokemonDetail();
  }, [pokemonId]);

  const handleClick = (id: string) => {
    setPokemonId(id);
    onDescriptionToggle(true);
  };

  const handleClose = () => {
    setPokemonDetail(null);
    setPokemonId("");
    onDescriptionToggle(false);
  };

  if (loading) {
    return <CustomFallback text="Loading..." />;
  }
  if (error) {
    return <CustomFallback text={error} />;
  }
  if (pokemons.length === 0) {
    return <CustomFallback text="No Pokémon data found..." />;
  }
  if (pokemonDetail) {
    return <PokemonDescription pokemon={pokemonDetail} onClose={handleClose} />;
  }

  return (
    <div>
      <div className="pokemon-list">
        {pokemons.map((pokemon: Pokemon, index: number) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            url={pokemon.url}
            onclick={handleClick}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PokemonList;
