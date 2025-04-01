import { PokemonType } from "@/types/Pokemon";

/**
 * This represents the record of the weaknesses of each type of pokemon
 * The reference for this record is based on this link: https://www.eurogamer.net/pokemon-go-type-chart-effectiveness-weaknesses
 */
const typeWeaknesses: Record<PokemonType, PokemonType[]> = {
  Normal: ["Fighting"],
  Fire: ["Ground", "Rock", "Water"],
  Water: ["Grass", "Electric"],
  Electric: ["Ground"],
  Grass: ["Flying", "Poison", "Bug", "Fire", "Ice"],
  Ice: ["Fighting", "Rock", "Steel", "Fire"],
  Fighting: ["Flying", "Psychic", "Fairy"],
  Poison: ["Ground", "Psychic"],
  Ground: ["Water", "Grass", "Ice"],
  Flying: ["Rock", "Electric", "Ice"],
  Psychic: ["Bug", "Ghost", "Dark", "Psychic"],
  Bug: ["Flying", "Rock", "Fire"],
  Rock: ["Fighting", "Ground", "Steel", "Water", "Grass"],
  Ghost: ["Ghost", "Dark"],
  Dragon: ["Ice", "Dragon", "Fairy"],
  Dark: ["Fighting", "Bug", "Fairy"],
  Steel: ["Fighting", "Ground", "Fire"],
  Fairy: ["Poison", "Steel"],
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
export function getWeaknesses(types: PokemonType[]): PokemonType[] {
  const weaknesses = new Set<PokemonType>();

  types.forEach((currentType) => {
    typeWeaknesses[currentType]?.forEach((weaknessesOfCurrentType) => {
      weaknesses.add(weaknessesOfCurrentType);
    });
  });

  return Array.from(weaknesses);
}
