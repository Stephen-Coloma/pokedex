import { Pokemon, PokemonType } from "./Pokemon";

/**
 * Represents detailed information about a Pokémon
 * Extends the base `Pokemon` interface to include additional attributes
 * baseExperience - xp gained when this pokemon is defeated
 * cry - sounds of the pokemon
 * stats - the 6 stats of every pokemon
 * weaknesses - pokemon type/s that is a weakness of the pokemon
 * evolution - to be utilized in displaying the evolution chain of the pokemon
 */
export interface PokemonDetails extends Pokemon {
  height: number;
  weight: number;
  baseExperience: number;
  abilities: PokemonAbility[],
  moves: PokemonMove[],
  cry: string,
  stats: PokemonStat,
  weaknesses: PokemonType[],
  evolutionChain?: Pick<Pokemon, 'id' | 'name' | 'photo'>;
}

/**
 * Represents a Pokémon's ability
 * effect - description of the ability
 */
export type PokemonAbility = {
  name: string;
  effect: string; 
};

/**
 * Represent the types of the move. 
 */
export type MoveType = PokemonType;

/**
 * Represents a move the pokemon has. Only the first 3 moves of the pokemon is included.
 * effect - decription of the move (short description).
 */
export type PokemonMove = {
  name: string;
  power: number;
  accuracy: number;
  effect: string;
  type: MoveType[];
};

/**
 * Represents the Pokémon's base stats.
 */
export type PokemonStat = {
  hp: number,
  attack: number,
  defense: number,
  specialAttack: number,
  specialDefense: number,
  speed: number
};