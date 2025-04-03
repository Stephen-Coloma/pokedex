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
export interface PokemonProfile extends Pokemon {
  height: number;
  weight: number;
  description: string[];
  baseExperience: number;
  abilities: PokemonAbility[],
  cry: string,
  stats: PokemonStat,
  weaknesses: PokemonType[],
  evolutionChain?: EvolutionChain;
}

/**
 * Type that represents the evolution chain of the pokemon
 */
export type EvolutionChain = {
  name: string,
  photo: string,
  evolvesTo: EvolutionChain[],
};

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