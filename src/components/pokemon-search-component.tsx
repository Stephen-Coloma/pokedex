import { useMemo, useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Pokemon } from "@/types/Pokemon";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";

type PokemonSearchComponentProps = {
  onSearchPokemon: (searchPokemons: Pokemon[]) => void;
};

export function PokemonSearchComponent({ onSearchPokemon }: PokemonSearchComponentProps) {
  const { data, loading } = usePokemonSearch();

  // Use useMemo to debounce the search
  const debouncedResults = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        if (loading) {
          return onSearchPokemon([]);
        }

        if (!term) {
          const resetData = data ? data.slice(0, 10) : [];
          return onSearchPokemon(resetData);
        }

        let searchResults: Pokemon[] = [];
        if (/[0123456789]/.test(term)) { // id searching
          searchResults = data
            ? data.filter((pokemon) => pokemon.id.toString().includes(term))
            : [];
        } else { // name searching
          searchResults = data
            ? data.filter((pokemon) => pokemon.name.includes(term))
            : [];
        }

        onSearchPokemon(searchResults);
      }, 300), // 300ms debounce delay
    [data, loading, onSearchPokemon] // Re-create debounce when these dependencies change
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
