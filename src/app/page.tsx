import { Pokemon } from "@/types/Pokemon";
import HomePage from "@/components/homepage";
import { POKEMON_BASE_URL, MAX_POKEMON_ID } from "@/lib/constants";
import { NamedAPIResource } from "@/types/NamedAPIResource";
import { getPokemonMainDetails } from "@/actions/getPokemonMainDetails";

// Fetch all Pokémon at build time + Incremental Site Regeneration every 15 days
export const getAllPokemons = async (): Promise<Pokemon[]> => {
  const response = await fetch(
    `${POKEMON_BASE_URL}?limit=${MAX_POKEMON_ID}&offset=0`, 
    {
      next: { revalidate: 60 * 60 * 24 * 15 }, // 15 days revalidation
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  const data: { results: NamedAPIResource[] } = await response.json();

  // Call helper to get full details (sprites, types, etc.)
  const pokemonArray: Pokemon[] = await getPokemonMainDetails(data.results);

  return pokemonArray;
};


export default async function App() {
  const pokemons = await getAllPokemons();

  return (
    <HomePage initialPokemons={pokemons}></HomePage>  
  );
}