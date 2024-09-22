import "./PokemonList.css";
import { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import { fetchPokemons } from "../../services/pokemonApi";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import CustomFallback from "../CustomFallback/CustomFallback";
import { fetchPokemonDetail } from "../../services/pokemonApi";
import PokemonDescription from "../PokemonDescription/PokemonDescription";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemonId, setpokemonId] = useState("");
  const [pokemonDetail, setPokemonDetail] = useState(null);

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

  const handleClick = (id: string) => {
    setpokemonId(id);
  };

  useEffect(() => {
    setLoading(true);
    const getPokemonDetail = async () => {
      try {
        if (!pokemonId) return;
        const response = await fetchPokemonDetail(pokemonId);
        setPokemonDetail(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPokemonDetail();
  }, [pokemonId]);

  const handleClose = () => {
    setPokemonDetail(null);
    setpokemonId("");
  };

  console.log(pokemonDetail);
  if (loading) {
    return <CustomFallback text="Loading..." />;
  }
  if (error) {
    return <CustomFallback text={error} />;
  }

  if (pokemons.length === 0) {
    return <CustomFallback text="No Pokemon Data found..." />;
  }

  if (pokemonDetail) {
    return <PokemonDescription pokemon={pokemonDetail} onClose={handleClose} />;
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon: { name: string; url: string }, index) => (
        <PokemonCard
          key={index}
          name={pokemon.name}
          url={pokemon.url}
          onclick={handleClick}
        />
      ))}
    </div>
  );
};

export default PokemonList;

// import "./PokemonList.css";
// import { useEffect, useState, useContext } from "react";
// import PokemonCard from "../PokemonCard/PokemonCard";
// import { fetchPokemons } from "../../services/pokemonApi";
// import { SearchContext } from "../../context/SearchContext";
// import CustomFallback from "../CustomFallback/CustomFallback";
// import Pagination from "../Pagination/Pagination";

// interface Pokemon {
//   name: string;
//   url: string;
// }

// const PokemonList: React.FC = () => {
//   const [pokemons, setPokemons] = useState<Pokemon[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(0);

//   const {
//     searchData: { searchValue },
//   } = useContext(SearchContext);

//   useEffect(() => {
//     const getPokemon = async () => {
//       setLoading(true);

//       try {
//         const response = await fetchPokemons(currentPage);
//         if (response && response.results) {
//           setTotalPages(Math.ceil(response.count / 20));

//           if (searchValue) {
//             const newFilterPokemon = response.results.filter(
//               (pokemon: Pokemon) =>
//                 pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
//             );
//             setPokemons(newFilterPokemon);
//           } else {
//             setPokemons(response.results);
//           }
//         }
//       } catch (error) {
//         setError("Something went wrong. Please try again!");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPokemon();
//   }, [searchValue, currentPage]);

//   if (loading) {
//     return <CustomFallback text="Loading..." />;
//   }
//   if (error) {
//     return <CustomFallback text={error} />;
//   }
//   if (pokemons.length === 0) {
//     return <CustomFallback text="No Pokémon data found..." />;
//   }

//   return (
//     <div>
//       <div className="pokemon-list">
//         {pokemons.map((pokemon: Pokemon, index: number) => (
//           <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
//         ))}
//       </div>
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   );
// };

// export default PokemonList;
