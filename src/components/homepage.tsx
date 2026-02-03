"use client";

import { Header } from "@/components/header";
import { PokemonCard } from "@/components/pokemon-card";
import SettingsIsland from "@/components/settings-island";
import { Separator } from "@/components/ui/separator";
import { Pokemon } from "@/types/Pokemon";
import { useEffect, useRef } from "react";
import { Banner } from "@/components/banner";
import { useRouter } from "next/navigation";
import { SearchPokemon } from "@/components/search-pokemon";
import { PokemonWaveLoader } from "./pokemon-wave-loader";
import { usePokemonStore } from "@/store/pokemonStore";
import Image from "next/image";

type HomePageProps = {
  initialPokemons: Pokemon[];
};

export default function HomePage({ initialPokemons }: HomePageProps) {
  const setOffset = usePokemonStore((state) => state.setOffset);
  const isSearching = usePokemonStore((state) => state.isSearching);
  const setPokemons = usePokemonStore((state) => state.setPokemons);
  const isLoadingMore = usePokemonStore((state) => state.isLoadingMore);
  const displayedPokemons = usePokemonStore((state) => state.displayedPokemons);
  const setDisplayedPokemons = usePokemonStore((state) => state.setDisplayedPokemons);

  const loaderRef = useRef<HTMLDivElement>(null);

  // hydrate the global store
  useEffect(() => {
    setPokemons(initialPokemons);
    // initial 10 pokemons
    setDisplayedPokemons(initialPokemons.slice(0, 10));
    setOffset(10);
  }, [initialPokemons]);

  // Auto-scroll to loader when it appears
  useEffect(() => {
    if ((isLoadingMore || isSearching) && loaderRef.current) {
      loaderRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isLoadingMore, isSearching]);

  const router = useRouter();

  const handleViewProfile = (id: number) => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <div className="container mx-auto flex flex-col w-full min-h-screen px-5">
      <Header></Header>
      <Separator></Separator>
      <Banner></Banner>

      <SearchPokemon />

      <Separator className="mt-10"></Separator>

      {/* Main Container */}
      <div className="flex-1 justify-center items-center">
        {displayedPokemons.length > 0 && !isSearching && (
          <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-5 py-5 lg:gap-8 lg:py-12">
            {displayedPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                {...pokemon}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        )}

        {displayedPokemons.length === 0 && !isSearching && !isLoadingMore && (
          <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center py-10 md:py-20 gap-4">
            <Image
              src="/icons/snorlax.png"
              alt="Loading"
              width={128}
              height={128}
              className="w-24 h-24 sm:w-32 sm:h-32"
            />
            <h3 className="text-xl font-semibold text-muted-foreground text-center">
              No Pokémon Found
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Try searching for a different Pokémon name or ID
            </p>
          </div>
        )}

        {(isLoadingMore || isSearching) && (
          <div ref={loaderRef}>
            <PokemonWaveLoader />
          </div>
        )}
      </div>

      <div className="py-10">
        <SettingsIsland />
      </div>
    </div>
  );
}
