export const POKEMON_BASE_URL = `https://pokeapi.co/api/v2/pokemon`;
export const POKEMON_SPECIES_URL = `https://pokeapi.co/api/v2/pokemon-species`;
export const MAX_POKEMON_ID = 1025;

import { PokemonType } from "@/types/PokemonType";

/**
 * This represents the record of the weaknesses of each type of pokemon
 * The reference for this record is based on this link: https://www.eurogamer.net/pokemon-go-type-chart-effectiveness-weaknesses
 */
export const typeWeaknesses: Record<PokemonType, PokemonType[]> = {
  normal:   ["fighting"],
  fire:     ["ground", "rock", "water"],
  water:    ["grass", "electric"],
  electric: ["ground"],
  grass:    ["flying", "poison", "bug", "fire", "ice"],
  ice:      ["fighting", "rock", "steel", "fire"],
  fighting: ["flying", "psychic", "fairy"],
  poison:   ["ground", "psychic"],
  ground:   ["water", "grass", "ice"],
  flying:   ["rock", "electric", "ice"],
  psychic:  ["bug", "ghost", "dark", "psychic"],
  bug:      ["flying", "rock", "fire"],
  rock:     ["fighting", "ground", "steel", "water", "grass"],
  ghost:    ["ghost", "dark"],
  dragon:   ["ice", "dragon", "fairy"],
  dark:     ["fighting", "bug", "fairy"],
  steel:    ["fighting", "ground", "fire"],
  fairy:    ["poison", "steel"],
};
