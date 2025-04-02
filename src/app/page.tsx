"use client";

import { Header } from "@/components/header";
import { PokemonCard } from "@/components/pokemon-card";
import SettingsIsland from "@/components/settings-island";
import { Separator } from "@/components/ui/separator";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";
import { Pokemon } from "@/types/Pokemon";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Banner } from "@/components/banner";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const limit = 10;
  const [offset, setOffset] = useState<number>(0);
  const { status, statusText, data, error, loading } = useFetchPokemons(limit, offset);
  const [visibleCards, setVisibleCards] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (status === 200) {
      setVisibleCards(data as Pokemon[]);
    }
  }, [loading]);

  const handleSortChange = (sortOptionChosen: string) => {
    // if negative value, a comes before b, otherwise a comes after b
    const sortedCards = visibleCards
      ? [...visibleCards].sort((pokemon1, pokemon2) => {
          if (sortOptionChosen === "name-asc")
            return pokemon1.name.localeCompare(pokemon2.name);
          if (sortOptionChosen === "name-desc")
            return pokemon2.name.localeCompare(pokemon1.name);
          if (sortOptionChosen === "id-asc") return pokemon1.id - pokemon2.id;
          if (sortOptionChosen === "id-desc") return pokemon2.id - pokemon1.id;
          return 0;
        })
      : [];

    setVisibleCards(sortedCards);
  };

  const handleLoadMoreCards = (loadedCards: Pokemon[]) => {
    setVisibleCards((prev) => [...prev, ...loadedCards]);
    setOffset((prev) => (prev + limit)); //10 + 10;
  };

  return (
    <div className="container mx-auto w-full px-5">
      <Header></Header>
      <Separator></Separator>
      <Banner></Banner>

      {/* Search */}
      <div className="flex justify-end w-full">
        <div className="flex items-center max-w-sm space-x-2 bg-muted rounded-lg px-2 py-2">
          <SearchIcon className="h-4 w-4" />
          <Input type="search" placeholder="Search by Name or Id" className="text-sm md:text-base w-full border-0 h-8 font-light tracking-wider" />
        </div>
      </div>


      <div className="w-fit grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-5 py-5 lg:gap-8 lg:py-12">
        {loading && <h1>loading</h1>}

        {visibleCards &&
          visibleCards.map((pokemon, index) => (
            <PokemonCard key={index} {...pokemon} />
          ))}
      </div>

      <div className="h-[60px] md:h-[60px] lg:h-[40px]">
        <div className="fixed bottom-0 left-0 right-0 w-full p-4 z-10 flex justify-center w-full">
          <SettingsIsland onSortChange={handleSortChange} onLoadMorecards={handleLoadMoreCards} limit={limit} offset={offset+limit}/>
        </div>
      </div>
    </div>
  );
}
