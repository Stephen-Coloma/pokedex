"use client";

import { useFetchPokemonProfile } from "@/hooks/useFetchPokemonProfile";
import { Pokemon } from "@/types/Pokemon";
import getPhotoURL from "@/utils/getPhotoURL";

export default function Home() {
  const pokemon: Pokemon = {
    id: 132,
    name: "bulbasaur",
    photo: getPhotoURL(132),
    type: ["Grass"],
  };

  const { status, statusText, data, error, loading } =
    useFetchPokemonProfile(pokemon);

  return(
    <>
      <img src={pokemon.photo} alt="" />
      <audio id="pokemonCry" src="https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/132.ogg" preload="auto"></audio>

    </>
  )
}
