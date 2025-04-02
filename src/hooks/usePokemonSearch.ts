import { Pokemon } from "@/types/Pokemon";
import Axios, { AxiosResponse } from "axios";
import { setupCache } from "axios-cache-interceptor";
import { useEffect, useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import getPhotoURL from "@/lib/getPhotoURL";
import { fetchPokemonMainDetails, NamedAPIResource } from "./useFetchPokemons";

const axios = setupCache(Axios.create());

/**
 * A custom hook that utilized for fetching pokemon array for the homepage.
 * @returns an API response type of object that contains pokemon array. Useful for 
 * managing errors and loading states in UI.
 */
export function usePokemonSearch(): ApiResponse<Pokemon[]> {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=1025&offset=0"
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("");
  const [data, setData] = useState<Pokemon[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // This method is used for firing the get request
  const executeGetRequest = async () => {
    setLoading(true);
    console.log('mounted');
    
    
    try {
      const response: AxiosResponse = await axios.get(url);
      setStatus(response.status);
      setStatusText(response.statusText);

      //fetch every pokemon's main details
      const pokemonArray = await fetchPokemonMainDetails(
        response.data.results as NamedAPIResource[]
      );

      setData(pokemonArray);
      console.log(pokemonArray);
      
    } catch (error: unknown) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeGetRequest();
  }, []); // run once

  return { status, statusText, data, error, loading, executeGetRequest};
}