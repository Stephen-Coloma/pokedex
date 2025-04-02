"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { PokemonCard } from "@/components/pokemon-card";
import { PokemonCardSkeleton } from "@/components/pokemon-card-skeleton";
import { Button } from "@/components/ui/button";
import { useFetchAllPokemons } from "@/hooks/useFetchPokemons";
import { useState } from "react";

export default function Home() {
  const { status, statusText, data, error, loading } = useFetchAllPokemons();
  const [cardPerPage, setCardPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const totalPages = data ? Math.ceil(data.length / cardPerPage) : 0;

  const indexOfLastCard = currentPage * cardPerPage; //index 1 * 10 = 10
  const indexOfFirstCard = indexOfLastCard - cardPerPage; // 10 - 10 = 0;
  const visibleCards = data
    ? data.slice(indexOfFirstCard, indexOfLastCard)
    : [];

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <>
      <ModeToggle/>
      <div className="mx-auto w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {loading &&
          new Array(8).fill('t').map((_, index) => (
            <PokemonCardSkeleton key={index}/>
          ))
        }

        {visibleCards &&
          visibleCards.map((pokemon, index) => (
            // 1by1 grid to contain the card
            <div key={index} className="grid grid-cols-1 pt-10 px-5">
              <PokemonCard {...pokemon} />
            </div>
          ))}
      </div>
      
      <div className="flex justify-center gap-4 w-full my-10">
        <Button onClick={handlePreviousPage}>Prev</Button>
        <Button onClick={handleNextPage}>Next</Button>
      </div>
    </>
  );
}
