/**
 * Represents a Pokémon entity with basic details.
 * id - unique identifier of the pokemin
 * name - name of the pokemon
 * photo - photo of the pokemon
 * types - type/s of the pokemon such as fire, water
 */
export interface Pokemon {
  id: number;
  name: string;
  photo: string;
  type: PokemonType[];
}

/**
 * Type representing all possible Pokémon types. A total of 18 types are present
 */
export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";
