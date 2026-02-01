import { PokemonAbility } from "@/types/PokemonProfile";
import { axios } from "@/lib/axios";

/**
 * This function fetches additional details of the abilities that a pokemon possess.
 *
 * @param abilities abilities that are from pokemon endpoint call.
 * @returns the pokemon abilities (in array) showing name and effect of each ability
 */
export async function getAbilities(abilities: any): Promise<PokemonAbility[]> {
  try {
    const abilityPromises = abilities.map(
      async ({
        ability,
      }: {
        ability: {
          name: string;
          url: string;
        };
      }): Promise<PokemonAbility> => {
        const response = await axios.get(ability.url);

        //ability effect in english language
        const effect = response.data.effect_entries.filter(
          (entry: any) => entry.language.name === "en"
        ).map((entry: any) => entry.effect.replace(/[\f\n\r]+/g, " "))[0]; // Remove line breaks

        return {
          name: ability.name,
          effect: effect,
        };
      }
    );

    const pokemonAbilities: PokemonAbility[] = await Promise.all(
      abilityPromises
    );

    return pokemonAbilities;
  } catch (error: unknown) {
    throw error;
  }
}