import { Pokemon } from "./Pokemon";
import { PokemonType } from "./PokemonType";
import { EvolutionChain } from "./EvolutionChain";
import { PokemonAbility } from "./PokemonAbility";
import { PokemonStat } from "./PokemonStat";

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
  descriptions: string[];
  baseExperience: number;
  abilities: PokemonAbility[];
  cry: string;
  stats: PokemonStat;
  weaknesses: PokemonType[];
  evolutionChain?: EvolutionChain;
}
