import { useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Pokemon } from "@/types/Pokemon";
import { usePokemonStore } from "@/store/pokemonStore";

export function SearchPokemon() {
  const pokemon = usePokemonStore((state) => state.pokemons);
  const setSearchResults = usePokemonStore((state) => state.setSearchedResults);
  const setDisplayedPokemons = usePokemonStore((state) => state.setDisplayedPokemons);
  const setIsSearching = usePokemonStore((state) => state.setIsSearching);
  const setInSearchingState = usePokemonStore((state) => state.setInSearchingState);
  const setOffset = usePokemonStore((state) => state.setOffset);

  // Use useMemo to debounce the search to prevent multiple call request per user type.
  const debouncedResults = useMemo(
    () =>
      debounce(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
          setInSearchingState(true);
          setIsSearching(true);
          await new Promise((resolve) => setTimeout(resolve, 500));
          setIsSearching(false);

          const term = e.target.value.toLowerCase();

          if (!term && pokemon) {
            const resetData = pokemon.slice(0, 10);
            setDisplayedPokemons(resetData);
            setInSearchingState(false);
            setOffset(10);
            return;
          }

          //store the search results on the global store so that island settings will have access to it.
          let tempSearchResults: Pokemon[] = [];
          if (/[0123456789]/.test(term)) { 
            // id searching
            tempSearchResults = pokemon.filter((pokemon) => pokemon.id.toString().includes(term));
            setSearchResults(tempSearchResults);
            setDisplayedPokemons(tempSearchResults.slice(0, 10));
            setOffset(10);
          } else { 
            // name searching
            tempSearchResults = pokemon.filter((pokemon) => pokemon.name.includes(term));
            setSearchResults(tempSearchResults);
            setDisplayedPokemons(tempSearchResults.slice(0, 10));
            setOffset(10);
          }
      }, 300), // 300ms debounce delay

    [pokemon, setSearchResults] 
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
