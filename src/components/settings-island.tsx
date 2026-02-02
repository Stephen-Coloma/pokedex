"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./mode-toggle";
import { usePokemonStore } from "@/store/pokemonStore";
import { SortDropDownMenu } from "./sort-dropdown-menu";

export default function SettingsIsland() {
  const limit = usePokemonStore((state)=> state.limit);
  const offset = usePokemonStore((state)=> state.offset);
  const pokemons = usePokemonStore((state)=> state.pokemons);
  const setOffset = usePokemonStore((state)=> state.setOffset);
  const isLoadingMore = usePokemonStore((state)=> state.isLoadingMore);
  const searchResults = usePokemonStore((state)=> state.searchedResults);
  const setIsLoadingMore = usePokemonStore((state)=> state.setIsLoadingMore);
  const isInSearchingState = usePokemonStore((state)=> state.inSearchingState);
  const setDisplayedPokemons = usePokemonStore((state)=> state.setDisplayedPokemons);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoadingMore(false);

    if(isInSearchingState){ //if on searching state, loading more means loading from the searched results 
      setDisplayedPokemons(searchResults.slice(0, offset + limit));
      setOffset(offset + limit);
    }else{
      setDisplayedPokemons(pokemons.slice(0, offset + limit));
      setOffset(offset + limit);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full p-4 z-10 flex justify-center w-full">
      <div className="flex justify-center items-center w-fit rounded-full">
        <Card className="w-full max-w-4xl shadow-lg hover:shadow-xl transition-all duration-300 p-2 rounded-full bg-muted">
          <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap">

            <SortDropDownMenu ></SortDropDownMenu>

            <Separator orientation="vertical" className="h-6 hidden md:block" />

            <ModeToggle></ModeToggle>

            <Separator orientation="vertical" className="h-6 hidden md:block" />

            <Button
              size="sm"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="ml-auto rounded-full text-xs bg-red-500 hover:bg-red-100 text-white hover:text-red-600 hover:border-red-500 hover:border"
            >
              {(isLoadingMore) ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : null}
              See More
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
