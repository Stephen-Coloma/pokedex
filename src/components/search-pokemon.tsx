import { useMemo, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Pokemon } from "@/types/Pokemon";
import {AxiosResponse } from "axios";
import { fetchPokemonMainDetails, NamedAPIResource } from "@/hooks/useFetchPokemons";
import { axios } from '@/hooks/useFetchPokemons';

type PokemonSearchComponentProps = {
  onSearchPokemon: (searchPokemons: Pokemon[]) => void;
};

export function SearchPokemon({ onSearchPokemon }: PokemonSearchComponentProps) {
  const pokemonData = useRef<Pokemon[]>([]);

  // fetch all the data in async
  useEffect(()=>{
    async function fetchData(){
      try{
        await new Promise((resolve) => setTimeout(resolve, 600))
        const url = "https://pokeapi.co/api/v2/pokemon/?limit=1025&offset=0";
        const response: AxiosResponse = await axios.get(url);
        
        //fetch every pokemon's main details
        const pokemonArray = await fetchPokemonMainDetails(
          response.data.results as NamedAPIResource[]
        );
        
        return pokemonData.current = pokemonArray;        
      }catch(error: unknown){
        console.log('error fetching the data', error);
      }
    }
    
    fetchData();
  }, []) // run only once

  // Use useMemo to debounce the search
  const debouncedResults = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;

        //empty pokemon Data - not yet fetched
        if(pokemonData.current.length === 0){
          return onSearchPokemon([]);
        }

        if (!term && pokemonData) {
          const resetData = pokemonData.current.slice(0, 10);
          return onSearchPokemon(resetData);
        }

        let searchResults: Pokemon[] = [];
        if (/[0123456789]/.test(term)) { 
          // id searching
          searchResults = pokemonData.current.filter((pokemon) => pokemon.id.toString().includes(term))
        } else { 
          // name searching
          searchResults = pokemonData.current.filter((pokemon) => pokemon.name.includes(term))
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
