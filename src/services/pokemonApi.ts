import axios from "axios";

const BASE_URL = " https://pokeapi.co/api/v2/pokemon";

// export const fetchPokemons = async () => {
//   const response = await axios.get(BASE_URL);
//   return response;
// };

export const fetchPokemonDetail = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response;
};

export const fetchPokemons = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      offset: (page - 1) * 20,
      limit: 20,
    },
  });
  return response.data;
};
