import { useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Pokemon } from "@/types/Pokemon";
import { usePokemonStore } from "@/store/pokemonStore";

type PokemonSearchComponentProps = {
  onSearchPokemon: (searchPokemons: Pokemon[], isSearching: boolean, isSearchDataLoading: boolean, isFetchError: boolean) => void;
};

export function SearchPokemon({ onSearchPokemon }: PokemonSearchComponentProps) {
  const pokemonData = usePokemonStore((state) => state.pokemonData);
  const fetchPokemon = usePokemonStore((state) => state.fetchPokemon);
  const setSearchResults = usePokemonStore((state) => state.setSearchResults);
  const fetchError = usePokemonStore((state) => state.error);

    // trigger fetching the all pokemon when search bar mounts
    useEffect(() => {
      fetchPokemon();
    }, [fetchPokemon]);

  // Use useMemo to debounce the search to prevent multiple call request per user type.
  const debouncedResults = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();

        if(fetchError){
          return onSearchPokemon([], true, false, true);
        }

        //empty pokemon Data - not yet fetched
        if(pokemonData.length === 0){
          return onSearchPokemon([], true, true, false);
        }

        if (!term && pokemonData) {
          const resetData = pokemonData.slice(0, 10);
          onSearchPokemon(resetData, false, false, false);
          return;
        }

        //store the search results on the global store so that island settings will have access to it.
        let tempSearchResults: Pokemon[] = [];
        if (/[0123456789]/.test(term)) { 
          // id searching
          tempSearchResults = pokemonData.filter((pokemon) => pokemon.id.toString().includes(term));
          setSearchResults(tempSearchResults);
        } else { 
          // name searching
          tempSearchResults = pokemonData.filter((pokemon) => pokemon.name.includes(term));
          setSearchResults(tempSearchResults);
        }
        onSearchPokemon(tempSearchResults.slice(0, 10), true, false, false);
      }, 300), // 300ms debounce delay

    [pokemonData, onSearchPokemon] 
  );

  useEffect(() => {
    return () => {
      debouncedResults.cancel(); // clean up
    };
  }, [debouncedResults]);

  return (
    <div className="flex justify-center w-full mt-8">
      <div className="flex items-center  w-full md:max-w-xl lg:max-w-2xl space-x-2 bg-muted rounded-lg px-2 py-2">
        <SearchIcon className="h-4 w-4" />
        <Input
          type="search"
          placeholder="Search by Name or Id"
          className="text-sm md:text-base w-full border-0 h-8 font-light tracking-wider"
          onChange={debouncedResults}
        />
      </div>
    </div>
  );
}
