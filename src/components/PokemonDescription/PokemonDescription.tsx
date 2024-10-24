import React from "react";
import "./PokemonDescription.css"; // Ensure you have the CSS file for styling

interface Ability {
  ability: {
    name: string;
  };
}

interface Sprites {
  front_default: string;
  back_default: string;
}

interface Pokemon {
  name: string;
  abilities: Ability[];
  height: number;
  weight: number;
  sprites: Sprites;
}

interface PokemonDescriptionProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonDescription: React.FC<PokemonDescriptionProps> = ({
  pokemon,
  onClose,
}) => {
  const { name, abilities, height, weight, sprites } = pokemon;

  return (
    <div className="pokemon-description">
      <div className="image-container" style={{ flex: "1" }}>
        <img
          src={sprites.front_default}
          alt={name}
          className="pokemon-sprite"
        />
      </div>
      <div className="info-container">
        <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        <p>
          <strong>Height:</strong> {height / 10} m
        </p>
        <p>
          <strong>Weight:</strong> {weight / 10} kg
        </p>
        <h3>Abilities: </h3>
        <ul>
          {abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PokemonDescription;
