"use client";

import { Header } from "@/components/header";
import { PokemonCard } from "@/components/pokemon-card";
import SettingsIsland from "@/components/settings-island";
import { Separator } from "@/components/ui/separator";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";
import { Pokemon } from "@/types/Pokemon";
import { useEffect, useState } from "react";
import { Banner } from "@/components/banner";
import { SearchPokemon } from "../components/search-pokemon";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {
  const limit = 10;
  const [offset, setOffset] = useState<number>(0);
  const { status, data, loading } = useFetchPokemons(limit,offset);
  const [visibleCards, setVisibleCards] = useState<Pokemon[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // first 10 cards
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
    setOffset((prev) => prev + limit); //10 + 10;
  };

  const handleSearchPokemon = (searchResults: Pokemon[], isSearching: boolean) => {
    setOffset(0); //always return offset to zero when searching
    setIsSearching(isSearching);
    setVisibleCards(searchResults);
  };

  return (
    <div className="container mx-auto w-full px-5">
      <Header></Header>
      <Separator></Separator>
      <Banner></Banner>

      <SearchPokemon onSearchPokemon={handleSearchPokemon}/>

      {loading ? 
        <div className="flex justify-center py-10">
        <DotLottieReact
            src="https://lottie.host/6b970764-42a6-4f36-9983-2792f3df8edc/bIa223kckN.lottie"
            loop
            autoplay
            className="w-96"
          />
        </div>
        :
        <div className="w-fit grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-5 py-5 lg:gap-8 lg:py-12">
          {visibleCards &&
            visibleCards.map((pokemon, index) => (
              <PokemonCard key={index} {...pokemon} />
            ))}
        </div>
      }

      <div className="h-[60px] md:h-[60px] lg:h-[40px]">
        <div className="fixed bottom-0 left-0 right-0 w-full p-4 z-10 flex justify-center w-full">
          <SettingsIsland
            onSortChange={handleSortChange}
            onLoadMorecards={handleLoadMoreCards}
            isSearching={isSearching}
            limit={limit}
            offset={offset + limit}
          />
        </div>
      </div>
    </div>
  );
}
