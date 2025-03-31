import { Pokemon } from "@/types/Pokemon";
import Axios, { AxiosResponse } from "axios";
import { setupCache } from "axios-cache-interceptor";
import { useEffect, useState } from "react";

const instance = Axios.create();
const axios = setupCache(instance);

/**
 * Represents the complete state of an API response, including data, loading state,
 * and error information. This is particularly useful for UI state management.
 *
 * @property {number} status - HTTP status code of the response (e.g., 200, 404)
 * @property {string} statusText - HTTP status text (e.g., "OK", "Not Found")
 * @property {Pokemon[] | null} data - The successfully fetched and preprocessed data payload, otherwise null
 * @property {unknown} error - Error object if the request failed, null otherwise
 * @property {boolean} loading - Indicates whether the request is in progress
 */
export type ApiResponse = {
  status: number;
  statusText: string;
  data: Pokemon[] | null;
  error: any;
  loading: boolean;
};

/**
 * A type that is matched to the request result of the endpoint:
 * https://pokeapi.co/api/v2/{endpoint}/
 * to better manage types.
 */
export type NamedAPIResourceList = {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
};

/**
 * A type that is matched to the type of "results" in NamedAPIResourceList that is based on
 * the same api endpoint.
 */
export type NamedAPIResource = {
  name: string;
  url: string;
};

/**
 * A custom hook that utilized for fetching pokemon array for the homepage.
 * @param url specified url with offset and limits as query parameters
 * @returns an API response type of object. Useful for managing errors
 * and loading states in UI.
 */
export function useFetchPokemons(url: string): ApiResponse {
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("");
  const [data, setData] = useState<Pokemon[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // This method is used for firing the get request
  const executeGetRequest = async (url: string) => {
    setLoading(true);

    try {
      const response: AxiosResponse = await axios.get(url);
      setStatus(response.status);
      setStatusText(response.statusText);

      //fetch every pokemon's initial details
      const pokemonArray = await fetchPokemonDetails(
        response.data.results as NamedAPIResource[]
      );

      setData(pokemonArray);
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
 * A helper function that fetches individual pokemon details such as id, name, photos and types.
 * @param initialResults the initial results of the api call
 */
async function fetchPokemonDetails(
  initialResults: NamedAPIResource[]
): Promise<Pokemon[]> {
  try {
    const pokemonPromises = initialResults.map(async (item) => {
      const response = await axios.get(item.url);
      const { id, name, types } = response.data;
      const photoUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png `;
      const pokemon: Pokemon = {
        id: id,
        name: name,
        type: types.map((t: { type: { name: string } }) => t.type.name),
        photo: photoUrl,
      };

      return pokemon;
    });

    // Wait for all requests to complete
    const pokemonResults = await Promise.all(pokemonPromises);

    return pokemonResults;
  } catch (error) {
    throw new Error("Failed to fetch Pokémon details");
  }
}
