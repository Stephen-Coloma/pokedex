import {
  PokemonAbility,
  PokemonProfile,
  PokemonMove,
  PokemonStat,
} from "@/types/PokemonProfile";
import Axios, { AxiosResponse } from "axios";
import { setupCache } from "axios-cache-interceptor";
import { useEffect, useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import { Pokemon } from "@/types/Pokemon";
import { getWeaknesses } from "@/utils/getWeaknesses";

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
      const formattedCry = processCries(cries);
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
        cry: formattedCry,
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
      }) : Promise<PokemonAbility> => {
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

async function fetchEvolutionChain(
  id: number
): Promise<Pick<Pokemon, "id" | "name" | "photo">> {
  throw new Error("Function not implemented.");
}

function processCries(cries: any): string {
  throw new Error("Function not implemented.");
}

function processStats(stats: any): PokemonStat {
  throw new Error("Function not implemented.");
}
