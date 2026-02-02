import { Pokemon } from "@/types/Pokemon";
import { create } from "zustand";

type PokemonStore = {
  pokemons: Pokemon[];
  setPokemons: (pokemons: Pokemon[]) => void;

  limit: number;
  setLimit: (limit: number) => void;

  offset: number;
  setOffset: (offset: number) => void;

  displayedPokemons: Pokemon[];
  setDisplayedPokemons: (displayedPokemons: Pokemon[]) => void;

  isLoadingMore: boolean;
  setIsLoadingMore: (isLoadingMore: boolean) => void;  

  searchedResults: Pokemon[];
  setSearchedResults: (searchedPokemons: Pokemon[]) => void;

  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;

  inSearchingState: boolean;
  setInSearchingState: (inSearchingState: boolean) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemons: [],
  setPokemons: (pokemons: Pokemon[]) => set({pokemons: pokemons}),

  limit: 10,
  setLimit: (limit: number) => set({limit: limit}),

  offset: 0,
  setOffset: (offset: number) => set({offset: offset}),

  displayedPokemons: [],
  setDisplayedPokemons: (displayedPokemons: Pokemon[]) => set({displayedPokemons: displayedPokemons}),

  isLoadingMore: false,
  setIsLoadingMore: (isLoadingMore: boolean) => set({isLoadingMore: isLoadingMore}),

  searchedResults: [],
  setSearchedResults: (searchedPokemons: Pokemon[]) => set({searchedResults: searchedPokemons}),

  isSearching: false,
  setIsSearching: (isSearching: boolean) => set({isSearching: isSearching}),

  inSearchingState: false,
  setInSearchingState: (inSearchingState: boolean) => set({inSearchingState: inSearchingState}),
}))