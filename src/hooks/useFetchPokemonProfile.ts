import {
  PokemonAbility,
  PokemonProfile,
  EvolutionChain,
} from "@/types/PokemonProfile";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "@/lib/axios";
import { formatTypes, processStats, getWeaknesses, getPhotoURL } from "@/lib/utils";

/**
 * A custom hook that utilized for fetching compelete pokemon details.
 * 
 * @returns an API response type of object that contains pokemon details.
 * Useful for managing errors and loading states in UI.
 */
export function useFetchPokemonProfile(id: number): ApiResponse<PokemonProfile> {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("");
  const [data, setData] = useState<PokemonProfile | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // This method is used for firing the get request
  const executeGetRequest = async (url: string) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.get(url);
      
      const {
        name,
        height,
        weight,
        base_experience,
        abilities,
        cries,
        stats,
        types,
      } = response.data;
      
      const [formattedAbilities, evolutionChainData, descriptions] = await Promise.all([
        fetchAbilities(abilities),
        fetchEvolutionChain(id),
        fetchPokemonDescription(id)
      ]);

      const formattedTypes = formatTypes(types);
      const latestCry = cries.latest;
      const formattedStats = processStats(stats);
      const weaknesses = getWeaknesses(formattedTypes);
      
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
      
      setStatus(response.status);
      setStatusText(response.statusText);
      setData(pokemonProfile);
    } catch (error: unknown) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    executeGetRequest(url);
  }, [url]); // run when url is changed
  
  return { status, statusText, data, error, loading };
}

/**
 * This function fetches additional details of the abilities that a pokemon possess.
 *
 * @param abilities abilities that are from pokemon endpoint call.
 * @returns the pokemon abilities (in array) showing name and effect of each ability
 */
async function fetchAbilities(abilities: any): Promise<PokemonAbility[]> {
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

/**
 * This function fetches the evolution chain of a pokemon.
 *
 * @param id the id of the pokemon where you want to find its evolution chain
 * @returns the evolution chain of the pokemon. empty array if there are no evolution.
 * It uses self-referential type to represent nested evolution
 */
async function fetchEvolutionChain(id: number): Promise<EvolutionChain> {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
  try {
    const speciesResponse = await axios.get(url);
    const evolutionChainURL = speciesResponse.data.evolution_chain.url;
    const evolutionChainResponse = await axios.get(evolutionChainURL);
    const chain = evolutionChainResponse.data.chain;

    // Function to build the evolution chain recursively
    const buildEvolutionChain = async (chainData: any): Promise<EvolutionChain> => {
      if(chain.evolves_to.length === 0){
        return {
          name: chainData.species.name,
          photo: getPhotoURL(id),
          evolvesTo: []
        }
      } else{
        const currentPokemon = chainData.species;
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.name}`);
        const evolvesToPromises = chainData.evolves_to.map(buildEvolutionChain); // Create an array of promises
        const evolvesTo = await Promise.all(evolvesToPromises); // Await all promises to get the resolved values

        const evolution: EvolutionChain = {
          name: currentPokemon.name,
          photo: getPhotoURL(pokemonResponse.data.id),
          evolvesTo: evolvesTo, // Use the resolved array of evolution objects
        };

        return evolution;
      }
    };

    // Return the first evolution chain starting point
    return buildEvolutionChain(chain);
  } catch (error: unknown) {
    throw error;
  }
}

/**
 * This function fetches the description for the pokemon.
 * 
 * @param id of the pokemon
 * @returns string aarray
 */
async function fetchPokemonDescription(id: number) {
  try{
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = response.data;

    // english desc
    const descriptions: string[] = data.flavor_text_entries
      .filter((entry: any) => entry.language.name === "en")
      .map((entry: any) => entry.flavor_text.replace(/[\f\n\r]+/g, " ")); // Remove line breaks
  
    // set to remove dupes
    const uniqueDescriptions = [...new Set(descriptions)];
  
    return uniqueDescriptions;
  }catch(error: unknown){
    throw error;
  }
}
