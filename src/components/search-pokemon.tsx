import { useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Pokemon } from "@/types/Pokemon";
import { usePokemonStore } from "@/store/pokemonStore";

type PokemonSearchComponentProps = {
  onSearchPokemon: (searchPokemons: Pokemon[]) => void;
};

export function SearchPokemon({ onSearchPokemon }: PokemonSearchComponentProps) {
  const { pokemonData, fetchPokemon } = usePokemonStore();

    // trigger fetching the all pokemon when search bar mounts
    useEffect(() => {
      fetchPokemon();
    }, [fetchPokemon]);

  // Use useMemo to debounce the search to prevent multiple call request per user type.
  const debouncedResults = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;

        //empty pokemon Data - not yet fetched
        if(pokemonData.length === 0){
          return onSearchPokemon([]);
        }

        if (!term && pokemonData) {
          const resetData = pokemonData.slice(0, 10);
          return onSearchPokemon(resetData);
        }

        let searchResults: Pokemon[] = [];
        if (/[0123456789]/.test(term)) { 
          // id searching
          searchResults = pokemonData.filter((pokemon) => pokemon.id.toString().includes(term))
        } else { 
          // name searching
          searchResults = pokemonData.filter((pokemon) => pokemon.name.includes(term))
        }

        return onSearchPokemon(searchResults);
      }, 300), // 300ms debounce delay

    [pokemonData, onSearchPokemon] // Re-create debounce when these dependencies change
  );

  useEffect(() => {
    return () => {
      debouncedResults.cancel(); // Cleanup the debounced function on unmount
    };
  }, [debouncedResults]);

  return (
    <div className="flex justify-end w-full">
      <div className="flex items-center max-w-sm space-x-2 bg-muted rounded-lg px-2 py-2">
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
