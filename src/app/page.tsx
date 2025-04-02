"use client";

import { PokemonCard } from "@/components/pokemon-card";
import SettingsIsland from "@/components/settings-island";
import { Button } from "@/components/ui/button";
import { useFetchAllPokemons } from "@/hooks/useFetchPokemons";
import { useState } from "react";

export default function Home() {
  const { status, statusText, data, error, loading } = useFetchAllPokemons(10, 0);
  const [cardPerPage, setCardPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("id-ascending");

  const totalPages = data ? Math.ceil(data.length / cardPerPage) : 0;

  //appy sorting to the data when it is available
  // if negative value, a comes before b, otherwise a comes after b 
  const sortedData = data
    ? [...data].sort((pokemon1, pokemon2) => {
        if (sortOption === "name-asc")
          return pokemon1.name.localeCompare(pokemon2.name);
        if (sortOption === "name-desc")
          return pokemon2.name.localeCompare(pokemon1.name);
        if (sortOption === "id-asc") return pokemon1.id - pokemon2.id;
        if (sortOption === "id-desc") return pokemon2.id - pokemon1.id;
        return 0;
      })
    : [];

  //pagination
  const indexOfLastCard = currentPage * cardPerPage; //index 1 * 10 = 10
  const indexOfFirstCard = indexOfLastCard - cardPerPage; // 10 - 10 = 0;
  const visibleCards = sortedData
    ? sortedData.slice(indexOfFirstCard, indexOfLastCard)
    : [];

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handleSortChange = (sortOptionChosen: string) => {
    setSortOption(sortOptionChosen);
  };

  return (
    <>
      <SettingsIsland onSortChange={handleSortChange}></SettingsIsland>
      <div className="mx-auto container w-fit grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-5 p-5 lg:gap-8 lg:p-12">
        {loading &&
          <h1>loading</h1>
        }

        {visibleCards &&
          visibleCards.map((pokemon, index) => (
              <PokemonCard key={index} {...pokemon} />
          ))}
      </div>

      <div className="flex justify-center gap-4 w-full my-10">
        <Button onClick={handlePreviousPage}>Prev</Button>
        <Button onClick={handleNextPage}>Next</Button>
      </div>
    </>
  );
}
