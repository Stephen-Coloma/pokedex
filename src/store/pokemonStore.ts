import { create } from "zustand";
import { AxiosResponse } from "axios";
import { Pokemon } from "@/types/Pokemon"; // Adjust the path
import {
  fetchPokemonMainDetails,
  NamedAPIResource,
} from "@/hooks/useFetchPokemons"; // Adjust the path

import {axios} from '@/hooks/useFetchPokemons'

interface PokemonState {
  pokemonData: Pokemon[];
  fetchPokemon: () => Promise<void>;
}

/**
 * This Store will only be utilized in searching ONLY.
 * PokeAPI does not support get request with search params. 
 * One solution is request all the pokemon and store it globall. 
 * But the call should be asynchronous so that it wont block parent component.
 * I made this as a global state so that it will manage communication between components 
 * specifially SettingsIsland and SearchPokemon Component.
 */
export const usePokemonStore = create<PokemonState>((set) => ({
  pokemonData: [],
  fetchPokemon: async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const url = "https://pokeapi.co/api/v2/pokemon/?limit=1025&offset=0";
      const response: AxiosResponse = await axios.get(url);

      const pokemonArray = await fetchPokemonMainDetails(
        response.data.results as NamedAPIResource[]
      );

      set({ pokemonData: pokemonArray});
    } catch (error: unknown) {
      set({pokemonData: []})
      console.error("Error fetching the data:", error);
    }
  },
}));
