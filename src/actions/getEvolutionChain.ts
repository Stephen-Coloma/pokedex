import { POKEMON_BASE_URL, POKEMON_SPECIES_URL } from "@/lib/constants";
import { getPhotoURL } from "@/lib/utils";
import { EvolutionChain } from "@/types/PokemonProfile";
import axios from "axios";

/**
 * This function fetches the evolution chain of a pokemon.
 *
 * @param id the id of the pokemon where you want to find its evolution chain
 * @returns the evolution chain of the pokemon. empty array if there are no evolution.
 * It uses self-referential type to represent nested evolution
 */
export async function getEvolutionChain(id: number): Promise<EvolutionChain> {
  const url = `${POKEMON_SPECIES_URL}/${id}/`;

  try {
    const speciesResponse = await axios.get(url);
    const evolutionChainURL = speciesResponse.data.evolution_chain.url;
    const evolutionChainResponse = await axios.get(evolutionChainURL);
    const chain = evolutionChainResponse.data.chain;

    // Function to build the evolution chain recursively
    const buildEvolutionChain = async (chainData: any): Promise<EvolutionChain> => {
      if(chain.evolves_to.length === 0){
        return {
          name: chainData.species.name,
          photo: getPhotoURL(id),
          evolvesTo: []
        }
      } else{
        try{
          const currentPokemon = chainData.species;
          const pokemonResponse = await axios.get(`${POKEMON_BASE_URL}/${currentPokemon.name}`);
          const evolvesToPromises = chainData.evolves_to.map(buildEvolutionChain); // Create an array of promises
          const evolvesTo = await Promise.all(evolvesToPromises); // Await all promises to get the resolved values

          const evolution: EvolutionChain = {
            name: currentPokemon.name,
            photo: getPhotoURL(pokemonResponse.data.id),
            evolvesTo: evolvesTo, // Use the resolved array of evolution objects
          };

          return evolution;
        }catch(error){
          console.error('Error fetching evolution chain:', error);
          return {
            name: '',
            photo: '',
            evolvesTo: []
          };
        }
      }
    };

    // Return the first evolution chain starting point
    return buildEvolutionChain(chain);
  } catch (error: unknown) {
    return {
      name: '',
      photo: '',
      evolvesTo: []
    };
  }
}