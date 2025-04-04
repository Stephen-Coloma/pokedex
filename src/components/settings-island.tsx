"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SortDropDownMenu } from "./sort-dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { Pokemon } from "@/types/Pokemon";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";
import { usePokemonStore } from "@/store/pokemonStore";

type SettingsIslandProps = {
  onSortChange: (sortOption: string) => void;
  onLoadMorecards: (loadedCards: Pokemon[]) => void;
  isSearching: boolean,
  limit: number,
  offset: number
}

export default function SettingsIsland({onSortChange, onLoadMorecards, isSearching, limit, offset}: SettingsIslandProps) {
  const { status, data, loading, executeGetRequest} = useFetchPokemons(limit, offset, false);
  const searchResults = usePokemonStore((state)=> state.searchResults);
  const [localLoading, setLocalLoading] = useState<boolean>(false); // loading for viewing searched cards


  const handleLoadMore = () => {
    if(isSearching){ //if on searching state, return from the filtered global pokemon store.   
      setLocalLoading(true);

      setTimeout(()=>{
        onLoadMorecards(searchResults.slice(offset, offset+limit))
        setLocalLoading(false);
      }, 500)

    }else{
      executeGetRequest!();
    }
  };

  useEffect(() => {
    if (status === 200 && data) {
      onLoadMorecards(data as Pokemon[]); // Append new cards
    }
  }, [status, data]); // Runs when the data or status changes

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full p-4 z-10 flex justify-center w-full">
      <div className="flex justify-center items-center w-fit rounded-full">
        <Card className="w-full max-w-4xl shadow-lg hover:shadow-xl transition-all duration-300 p-2 rounded-full bg-muted">
          <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap">

            <SortDropDownMenu onSortChange={onSortChange}></SortDropDownMenu>

            <Separator orientation="vertical" className="h-6 hidden md:block" />

            <ModeToggle></ModeToggle>

            <Separator orientation="vertical" className="h-6 hidden md:block" />

            <Button
              size="sm"
              onClick={handleLoadMore}
              disabled={loading}
              className="ml-auto rounded-full text-xs"
            >
              {(loading || localLoading) ? (
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
