'use client'

import { useFetchAllPokemons } from "@/hooks/useFetchPokemons";

export default function Home() {
  const{ status, statusText, data, error, loading } = useFetchAllPokemons();

  console.log(data);
  

  return (
    <h1>Hello world</h1>
  );
}
