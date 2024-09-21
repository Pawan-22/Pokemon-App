import "./PokemonCard.css";

interface Props {
  name: string;
  url: string;
}

const PokemonCard: React.FC<Props> = ({ name, url }) => {
  const getPokemonID = (url: string) => {
    let splitedUrl = url.split("/");
    let pokemonId = splitedUrl[splitedUrl.length - 2];
    return pokemonId;
  };
  const formatedName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const pokemonId = getPokemonID(url);
  return (
    <div className="pokemon-card">
      <div className="pokemon-image-placeholder">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        />
      </div>
      <h3 className="pokemon-name">{formatedName(name)}</h3>
    </div>
  );
};

export default PokemonCard;
