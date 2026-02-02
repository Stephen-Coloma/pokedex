"use client";

import { Header } from "@/components/header";
import { PokemonCard } from "@/components/pokemon-card";
import SettingsIsland from "@/components/settings-island";
import { Separator } from "@/components/ui/separator";
import { Pokemon } from "@/types/Pokemon";
import { useEffect } from "react";
import { Banner } from "@/components/banner";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useRouter } from "next/navigation";
import { SearchPokemon } from "@/components/search-pokemon";
import { usePokemonStore } from "@/store/testStore";

type HomePageProps = {
  initialPokemons: Pokemon[];
}

export default function HomePage({initialPokemons}: HomePageProps) {
  const pokemons = usePokemonStore((state) => state.pokemons);
  const setPokemons = usePokemonStore((state) => state.setPokemons);
  const setDisplayedPokemons = usePokemonStore((state) => state.setDisplayedPokemons);
  const isLoadingMore = usePokemonStore((state) => state.isLoadingMore);
  const setIsLoadingMore = usePokemonStore((state) => state.setIsLoadingMore);
  const isSearching = usePokemonStore((state) => state.isSearching);
  const setIsSearching = usePokemonStore((state) => state.setIsSearching);
  const limit = usePokemonStore((state) => state.limit);
  const offset = usePokemonStore((state) => state.offset);
  const setOffset = usePokemonStore((state) => state.setOffset);
  const displayedPokemons = usePokemonStore((state) => state.displayedPokemons);

  // hydrate the global store
  useEffect(()=>{
    setPokemons(initialPokemons);
    // initial 10 pokemons
    setDisplayedPokemons(initialPokemons.slice(0, 10));
  }, [initialPokemons])

  const router = useRouter();

  // const handleSortChange = (sortOptionChosen: string) => {
  //   // if negative value, a comes before b, otherwise a comes after b
  //   const sortedCards = visibleCards
  //     ? [...visibleCards].sort((pokemon1, pokemon2) => {
  //         if (sortOptionChosen === "name-asc")
  //           return pokemon1.name.localeCompare(pokemon2.name);
  //         if (sortOptionChosen === "name-desc")
  //           return pokemon2.name.localeCompare(pokemon1.name);
  //         if (sortOptionChosen === "id-asc") return pokemon1.id - pokemon2.id;
  //         if (sortOptionChosen === "id-desc") return pokemon2.id - pokemon1.id;
  //         return 0;
  //       })
  //     : [];

  //   setVisibleCards(sortedCards);
  // };

  const handleSortChange = (sortOptionChosen: string) => {
    console.log('test');
    
  }

  const handleLoadMoreCards = async () => {
    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoadingMore(false);
    setDisplayedPokemons(pokemons.slice(offset, offset + limit));
    setOffset(offset + limit);
  };

  const handleViewProfile = (id: number) => {
    router.push(`/pokemon/${id}`)
  };

  return (
    <div className="container mx-auto flex flex-col w-full min-h-screen px-5">
      <Header></Header>
      <Separator></Separator>
      <Banner></Banner>

      <SearchPokemon/>

      <Separator className="mt-10"></Separator>

      {isLoadingMore || isSearching ? 
        <div className="flex justify-center py-10 flex-grow">
          <DotLottieReact
            src="https://lottie.host/6b970764-42a6-4f36-9983-2792f3df8edc/bIa223kckN.lottie"
            loop
            autoplay
            className="w-30"
          />
        </div>
        :
          <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-5 py-5 lg:gap-8 lg:py-12">
            {displayedPokemons &&
              displayedPokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} {...pokemon} onViewProfile={handleViewProfile}/>
              ))}
          </div>
      }

      <div className="py-10 border-t-2">
        <SettingsIsland
          onSortChange={handleSortChange}
          onLoadMorecards={handleLoadMoreCards}
          isSearching={isSearching}
          limit={limit}
          offset={offset + limit}
        />
      </div>
    </div>
  );
}
