import { PokemonType } from "@/types/Pokemon";

/**
 * This represents the record of the weaknesses of each type of pokemon
 * The reference for this record is based on this link: https://www.eurogamer.net/pokemon-go-type-chart-effectiveness-weaknesses
 */
const typeWeaknesses: Record<PokemonType, PokemonType[]> = {
  normal: ["fighting"],
  fire: ["ground", "rock", "water"],
  water: ["grass", "electric"],
  electric: ["ground"],
  grass: ["flying", "poison", "bug", "fire", "ice"],
  ice: ["fighting", "rock", "steel", "fire"],
  fighting: ["flying", "psychic", "fairy"],
  poison: ["ground", "psychic"],
  ground: ["water", "grass", "ice"],
  flying: ["rock", "electric", "ice"],
  psychic: ["bug", "ghost", "dark", "psychic"],
  bug: ["flying", "rock", "fire"],
  rock: ["fighting", "ground", "steel", "water", "grass"],
  ghost: ["ghost", "dark"],
  dragon: ["ice", "dragon", "fairy"],
  dark: ["fighting", "bug", "fairy"],
  steel: ["fighting", "ground", "fire"],
  fairy: ["poison", "steel"],
};

/**
 * This function returns the weaknesses of the pokemon type/s.
 * It creates a set that will contain the final returned value.
 * It iterates the given type/s of the pokemon, and using the current type, 
 * it retrieves the weaknesses of that current type from the record.
 * 
 * @param types the pokemon type/s 
 * @returns the types where the pokemon is vulnerable to.
 */
export default function getWeaknesses(types: PokemonType[]): PokemonType[] {
  const weaknesses = new Set<PokemonType>();

  types.forEach((currentType) => {
    typeWeaknesses[currentType]?.forEach((weaknessesOfCurrentType) => {
      weaknesses.add(weaknessesOfCurrentType);
    });
  });

  return Array.from(weaknesses);
}
