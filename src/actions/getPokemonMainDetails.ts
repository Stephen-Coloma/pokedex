import { getPhotoURL } from "@/lib/utils";
import { NamedAPIResource } from "@/types/NamedAPIResource";
import { Pokemon } from "@/types/Pokemon";
import axios from "axios";

/**
 * A helper function that fetches individual pokemon details such as id, name, photos and types.
 * @param initialResults the initial results of the api call to fetch all pokemon
 */
export async function getPokemonMainDetails(initialResults: NamedAPIResource[]): Promise<Pokemon[]> {
  try {
    const pokemonPromises = initialResults.map(async (item) => {
      const response = await axios.get(item.url);
      const { id, name, types } = response.data;
      const photoUrl = getPhotoURL(id);
      const pokemon: Pokemon = {
        id: id,
        name: name,
        types: types.map((t: { type: { name: string } }) => t.type.name),
        photo: photoUrl,
      };

      return pokemon;
    });

    // Wait for all requests to complete
    const pokemonResults = await Promise.all(pokemonPromises);

    return pokemonResults;
  } catch (error) {
    throw error;
  }
}