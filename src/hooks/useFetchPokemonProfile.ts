import {
  PokemonAbility,
  PokemonProfile,
  PokemonMove,
  PokemonStat,
  EvolutionChain,
} from "@/types/PokemonProfile";
import Axios, { AxiosResponse } from "axios";
import { setupCache } from "axios-cache-interceptor";
import { useEffect, useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import { Pokemon } from "@/types/Pokemon";
import getWeaknesses from "@/utils/getWeaknesses";
import getPhotoURL from "@/utils/getPhotoURL";

const axios = setupCache(Axios.create());

/**
 * A custom hook that utilized for fetching compelete pokemon details.
 * @returns an API response type of object that contains pokemon details.
 * Useful for managing errors and loading states in UI.
 */
export function useFetchPokemonProfile({
  id,
  name,
  photo,
  type,
}: Pokemon): ApiResponse<PokemonProfile> {
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
      setStatus(response.status);
      setStatusText(response.statusText);

      const {
        height,
        weight,
        base_experience,
        abilities,
        moves,
        cries,
        stats,
      } = response.data;

      const formattedAbilities = await fetchAbilities(abilities);
      const formattedMoves = await fetchMoves(moves);
      const evolutionChainData = await fetchEvolutionChain(id);
      const latestCry = cries.latest;
      const formattedStats = processStats(stats);
      const weaknesses = getWeaknesses(type);

      const pokemonProfile: PokemonProfile = {
        id: id,
        name: name,
        photo: photo,
        type: type,
        height: height,
        weight: weight,
        baseExperience: base_experience,
        abilities: formattedAbilities,
        moves: formattedMoves,
        cry: latestCry,
        stats: formattedStats,
        weaknesses: weaknesses,
        evolutionChain: evolutionChainData,
      };

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
        const effect =
          response.data.effect_entries[response.data.effect_entries.length - 1]
            .effect;
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
 * This function fetches the first four moves of the pokemon.
 *
 * @param moves moves that are from pokemon endpoint call.
 * @returns a formatted moves for easier display on the UI
 */
async function fetchMoves(moves: any): Promise<PokemonMove[]> {
  try {
    const movesPromises = moves.slice(0, 4).map(
      async ({
        move,
      }: {
        move: {
          name: string;
          url: string;
        };
      }): Promise<PokemonMove> => {
        const response = await axios.get(move.url);
        const { name, power, accuracy, effect_entries, type } = response.data;
        //move short effect in english language
        const shortEffect =
          effect_entries[effect_entries.length - 1].short_effect;
        return {
          name: name,
          power: power || 0,
          accuracy: accuracy || 0,
          effect: shortEffect,
          type: type.name,
        };
      }
    );

    const pokemonMoves: PokemonMove[] = await Promise.all(movesPromises);

    return pokemonMoves;
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
    const buildEvolutionChain = (chainData: any): EvolutionChain => {
      const currentPokemon = chainData.species;

      const evolution: EvolutionChain = {
        name: currentPokemon.name,
        photo: getPhotoURL(id),
        evolvesTo: chainData.evolves_to.length
          ? chainData.evolves_to.map(buildEvolutionChain) // Recursively build evolvesTo
          : [],
      };

      return evolution;
    };

    // Return the first evolution chain starting point
    const evolutionChain = buildEvolutionChain(chain);
    return evolutionChain;
  } catch (error: unknown) {
    throw error;
  }
}

/**
 * This function formats the stats from the pokemon endpoint call.
 * This makes it easier to display in UI as unnecessary fields are removed.
 *
 * @param stats that comes from the pokemon endpoint for further preprocesing
 * @returns pokemon stats
 */
function processStats(stats: any): PokemonStat {
  try {
    let pokemonStats: PokemonStat = {
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
