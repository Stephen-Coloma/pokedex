'use client'

import { useFetchPokemonProfile } from "@/hooks/useFetchPokemonProfile";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function PokemonProfile({id} : {id: number}) {
  const { data, loading} = useFetchPokemonProfile(id);
  const router = useRouter();
  const prevId =parseInt(id.toString()) - 1;
  const nextId = parseInt(id.toString()) + 1; 


  const handlePreviousPokemon = () =>{
    router.push(`/pokemon/${prevId}`)
  }
  const handleNextPokemon = () =>{
    router.push(`/pokemon/${nextId}`)
  }

  return (
    <>
      {data && 
        <>
        <h1>ID: {data.id}</h1>
        <h1>NAME: {data.name}</h1>
        <h1>HEIGHT: {data.height}</h1>
        <h1>WEIGHT: {data.weight}</h1>
        <img src={`${data.photo}`} alt=""></img>
        </>
      }

      {loading &&
        <h1>LOADEDING</h1>
      }

      <div className="flex gap-2">
        <Button onClick={handlePreviousPokemon}>Previous</Button>
        <Button onClick={handleNextPokemon}>Next</Button>
      </div>
    </>
  );
}
