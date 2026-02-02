import Test from "@/components/test";
import { POKEMON_BASE_URL } from "@/lib/constants";
import { getPokemonMainDetails } from "@/actions/getPokemonMainDetails";
import { Pokemon } from "@/types/Pokemon";
import { NamedAPIResource } from "@/types/NamedAPIResource";

// Fetch all Pokémon at build time + Incremental Site Regeneration every 15 days
export const getAllPokemons = async (): Promise<Pokemon[]> => {
  const response = await fetch(`${POKEMON_BASE_URL}/pokemon?limit=1025&offset=0`, {
    next: { revalidate: 60 * 60 * 24 * 15 }, // 15 days revalidation
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  const data: { results: NamedAPIResource[] } = await response.json();

  // Call helper to get full details (sprites, types, etc.)
  const pokemonArray: Pokemon[] = await getPokemonMainDetails(data.results);

  return pokemonArray;
};


export default async function Home() {
  const pokemons = await getAllPokemons();

  return (
    <Test pokemons={pokemons}></Test>
  );
}