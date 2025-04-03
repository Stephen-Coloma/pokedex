import { Pokemon } from "@/types/Pokemon";
import Axios, { AxiosResponse } from "axios";
import { setupCache } from "axios-cache-interceptor";
import { useEffect, useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import getPhotoURL from "@/lib/getPhotoURL";

export const axios = setupCache(Axios.create());

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
 * @returns an API response type of object that contains pokemon array. Useful for 
 * managing errors and loading states in UI.
 */
export function useFetchPokemons(limit: number, offset: number, autoFetch: boolean = true): ApiResponse<Pokemon[]> {
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("");
  const [data, setData] = useState<Pokemon[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // This method is used for firing the get request
  const executeGetRequest = async () => {
    setLoading(true);

    try {
      const response: AxiosResponse = await axios.get(url);
      setStatus(response.status);
      setStatusText(response.statusText);

      //fetch every pokemon's main details
      const pokemonArray = await fetchPokemonMainDetails(
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
    if(autoFetch){
      executeGetRequest();
    }
  }, [autoFetch]); // run when url is changed

  return { status, statusText, data, error, loading, executeGetRequest};
}

/**
 * A helper function that fetches individual pokemon details such as id, name, photos and types.
 * @param initialResults the initial results of the api call to fetch all pokemon
 */
export async function fetchPokemonMainDetails(initialResults: NamedAPIResource[]): Promise<Pokemon[]> {
  try {
    const pokemonPromises = initialResults.map(async (item) => {
      const response = await axios.get(item.url);
      const { id, name, types } = response.data;
      const photoUrl = getPhotoURL(id);
      const pokemon: Pokemon = {
        id: id,
        name: name,
        types: types.map((t: { type: { name: string } }) => t.type.name),
        photo: photoUrl,
      };

      return pokemon;
    });

    // Wait for all requests to complete
    const pokemonResults = await Promise.all(pokemonPromises);

    return pokemonResults;
  } catch (error) {
    throw error;
  }
}
