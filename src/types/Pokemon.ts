import { PokemonType } from "./PokemonType";

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
  types: PokemonType[];
}
