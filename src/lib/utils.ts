import { PokemonType } from "@/types/Pokemon";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { typeWeaknesses } from "./constants";
import { PokemonStat } from "@/types/PokemonProfile";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

/**
 * This function returns the photo url of a pokemon id.
 * It formates the id by these conditions:
 * 1. 1 digit - add two zeros as start padding.
 * 2. 2 digit - add one zero as start padding.
 * 3. 3 digit or more - retains the id.
 * 
 * @param id pokemon id
 * @returns formatted photo url for displaying.
 */
export function getPhotoURL(id: number): string {
	let formattedId = '';
  if (id < 10) {
		formattedId = id.toString().padStart(3, '0');
  } else if (id < 100) {
    formattedId = id.toString().padStart(3, '0');
  } else {
    formattedId = id.toString();
  }
	return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`
}

/**
 * This function parses the types that comes from the API call to 
 * PokemonType[].
 * 
 * @param types fetch that results from the call to the pokemon endpoint
 * @returns 
 */
export function formatTypes(types: any): PokemonType[] {
  const formattedTypes: PokemonType[] = types.map((t: { type: { name: string } }) => t.type.name)
  return formattedTypes;
}


/**
 * This function formats the stats from the pokemon endpoint call.
 * This makes it easier to display in UI as unnecessary fields are removed.
 *
 * @param stats that comes from the pokemon endpoint for further preprocesing
 * @returns pokemon stats
 */
export function processStats(stats: any): PokemonStat {
  try {
    const pokemonStats: PokemonStat = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };

    // loop each stats
    stats.forEach((stat: { stat: { name: string }; base_stat: number }) => {
      switch (stat.stat.name) {
        case "hp":
          pokemonStats.hp = stat.base_stat;
          break;
        case "attack":
          pokemonStats.attack = stat.base_stat;
          break;
        case "defense":
          pokemonStats.defense = stat.base_stat;
          break;
        case "special-attack":
          pokemonStats.specialAttack = stat.base_stat;
          break;
        case "special-defense":
          pokemonStats.specialDefense = stat.base_stat;
          break;
        case "speed":
          pokemonStats.speed = stat.base_stat;
          break;
        default:
          console.warn(`Unknown stat name: ${stat.stat.name}`);
      }
    });

    return pokemonStats;
  } catch (error) {
    throw error;
  }
}
