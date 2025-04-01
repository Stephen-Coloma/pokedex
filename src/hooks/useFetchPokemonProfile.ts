import { PokemonAbility, PokemonDetails, PokemonMove, PokemonStat } from "@/types/PokemonDetails";
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
export function useFetchPokemonProfile({id, name, photo, type}: Pokemon): ApiResponse<PokemonDetails> {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("");
  const [data, setData] = useState<PokemonDetails | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // This method is used for firing the get request
  const executeGetRequest = async (url: string) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.get(url);
      setStatus(response.status);
      setStatusText(response.statusText);

      const {height, weight, base_experience, abilities, moves, cries, stats } = response.data;

      const formattedAbilities = await fetchAbilities(abilities);
      const formattedMoves = await fetchMoves(moves);
      const evolutionChainData  = await fetchEvolutionChain(id);
      const formattedCry = processCries(cries);
      const formattedStats = processStats(stats);
      const weaknesses = getWeaknesses(type);

      const pokemonProfile: PokemonDetails = {
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
        evolutionChain: evolutionChainData
      }

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
  throw new Error("Function not implemented.");
}

async function fetchMoves(moves: any): Promise<PokemonMove[]> {
  throw new Error("Function not implemented.");
}

async function fetchEvolutionChain(id: number): Promise<Pick<Pokemon, 'id' | 'name' | 'photo'>> {
  throw new Error("Function not implemented.");
}

function processCries(cries: any): string {
  throw new Error("Function not implemented.");
}

function processStats(stats: any): PokemonStat {
  throw new Error("Function not implemented.");
}

