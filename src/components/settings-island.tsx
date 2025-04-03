"use client";

import { useEffect, useState } from "react";
import {
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { SortDropDownMenu } from "./sort-dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { Pokemon } from "@/types/Pokemon";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";

type SettingsIslandProps = {
  onSortChange: (sortOption: string) => void;
  onLoadMorecards: (loadedCards: Pokemon[]) => void;
  limit: number,
  offset: number
}

export default function SettingsIsland({onSortChange, onLoadMorecards, limit, offset}: SettingsIslandProps) {
  const { status, data, loading, executeGetRequest} = useFetchPokemons(limit, offset, false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleLoadMore = () => {
    executeGetRequest!();
  };

  useEffect(() => {
    if (status === 200 && data) {
      onLoadMorecards(data as Pokemon[]); // Append new cards
    }
  }, [status, data]); // Runs when the data or status changes

  return (
    <div className="flex justify-center items-center w-fit rounded-full">
      <Card className="w-full max-w-4xl shadow-lg hover:shadow-xl transition-all duration-300 p-2 rounded-full bg-muted">
        <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap">

          <SortDropDownMenu onSortChange={onSortChange}></SortDropDownMenu>

          <Separator orientation="vertical" className="h-6 hidden md:block" />

          <div className="flex items-center gap-2">
            <VolumeX
              className={`h-4 w-4 transition-all ${
                soundEnabled ? "-rotate-90 scale-0" : "rotate-0 scale-100"
              }`}
            />
            <Volume2
              className={`h-4 w-4 absolute transition-all ${
                soundEnabled ? "rotate-0 scale-100" : "rotate-90 scale-0"
              }`}/>
            <Switch
              id="sounds"
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
              aria-label="Toggle sounds"
            />
          </div>

          <Separator orientation="vertical" className="h-6 hidden md:block" />

          <ModeToggle></ModeToggle>

          <Separator orientation="vertical" className="h-6 hidden md:block" />

          <Button
            size="sm"
            onClick={handleLoadMore}
            disabled={loading}
            className="ml-auto rounded-full text-xs"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : null}
            See More
          </Button>
        </div>
      </Card>
    </div>
  );
}
