import "./PokemonCard.css";

interface Props {
  name: string;
  url: string;
  onclick: (id: string) => void;
}

const PokemonCard: React.FC<Props> = ({ name, url, onclick }) => {
  const getPokemonID = (url: string) => {
    const splitedUrl = url.split("/");
    const pokemonId = splitedUrl[splitedUrl.length - 2];
    return pokemonId;
  };
  const pokemonId = getPokemonID(url);

  const formatedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div
      className="pokemon-card"
      onClick={() => {
        onclick(pokemonId);
      }}
    >
      <div className="pokemon-image-placeholder">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        />
      </div>
      <h3 className="pokemon-name">{formatedName}</h3>
    </div>
  );
};

export default PokemonCard;
