import axios from "axios";
import { POKEMON_SPECIES_URL } from "@/lib/constants";

/**
 * This function fetches the description for the pokemon.
 * 
 * @param id of the pokemon
 * @returns string aarray
 */
export async function getPokemonDescription(id: number) {
  const url = `${POKEMON_SPECIES_URL}/${id}`;

  try{
    const response = await axios.get(url);
    const data = response.data;

    // english desc
    const descriptions: string[] = data.flavor_text_entries
      .filter((entry: any) => entry.language.name === "en")
      .map((entry: any) => entry.flavor_text.replace(/[\f\n\r]+/g, " ")); // Remove line breaks
  
    // set to remove dupes
    const uniqueDescriptions = [...new Set(descriptions)];
  
    return uniqueDescriptions;
  }catch(error: unknown){
    throw error;
  }
}