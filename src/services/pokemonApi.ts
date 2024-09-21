import axios from "axios";

const BASE_URL = " https://pokeapi.co/api/v2/pokemon";

export const fetchPokemons = async () => {
  const response = await axios.get(BASE_URL);
  return response;
};
