import { POKEMON_BASE_URL } from "@/lib/constants";
import { axios } from "@/hooks/useFetchPokemons";
import { PokemonProfile } from "@/types/PokemonProfile";
import { getAbilities } from "./getAbilities";
import { getEvolutionChain } from "./getEvolutionChain";
import { getPokemonDescription } from "./getPokemonDescription";
import { getPhotoURL, getWeaknesses, formatTypes, processStats } from "@/lib/utils";

export async function getPokemonProfile(id: number) {
  const url = `${POKEMON_BASE_URL}/${id}`;
  try {
    const response = await axios.get(url);
    const { name, height, weight, base_experience, abilities, cries, stats, types } = response.data;
    const [formattedAbilities, evolutionChainData, descriptions] = await Promise.all([
      getAbilities(abilities),
      getEvolutionChain(id),
      getPokemonDescription(id)
    ]);
    const formattedTypes = formatTypes(types);
    const formattedStats = processStats(stats);
    const weaknesses = getWeaknesses(formattedTypes);
    const latestCry = cries.latest;
    const pokemonProfile: PokemonProfile = {
      id: id,
      name: name,
      photo: getPhotoURL(id),
      types: formattedTypes,
      height: height,
      weight: weight,
      descriptions: descriptions,
      baseExperience: base_experience,
      abilities: formattedAbilities,
      cry: latestCry,
      stats: formattedStats,
      weaknesses: weaknesses,
      evolutionChain: evolutionChainData,
    };
    return pokemonProfile;
  } catch (error: unknown) {
    throw error;
  }
}