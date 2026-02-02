"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { SortTypeEnum } from "@/types/SortTypeEnum";
import { usePokemonStore } from "@/store/pokemonStore";
import { ArrowDown01, ArrowDown10, ArrowDownAZ, ArrowDownZA } from "lucide-react";

export function SortDropDownMenu() {
  const [sortOption, setSortOption] = useState(SortTypeEnum.NAME_ASC);
  const displayedPokemons = usePokemonStore((state)=> state.displayedPokemons);
  const setDisplayedPokemons = usePokemonStore((state)=> state.setDisplayedPokemons);

  const handleSortChange = (value: SortTypeEnum) => {
    setSortOption(value);
    // Create a NEW array before sorting - .sort() mutates in place
    const sortedCards = [...displayedPokemons].sort((pokemon1, pokemon2) => {
      if (value === SortTypeEnum.NAME_ASC)
        return pokemon1.name.localeCompare(pokemon2.name);
      if (value === SortTypeEnum.NAME_DESC)
        return pokemon2.name.localeCompare(pokemon1.name);
      if (value === SortTypeEnum.ID_ASC) return pokemon1.id - pokemon2.id;
      if (value === SortTypeEnum.ID_DESC) return pokemon2.id - pokemon1.id;
      return 0;
    });

    setDisplayedPokemons(sortedCards);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 rounded-full"
        >
          {(sortOption === SortTypeEnum.NAME_ASC && <ArrowDownAZ></ArrowDownAZ>)}
          {(sortOption === SortTypeEnum.NAME_DESC && <ArrowDownZA></ArrowDownZA>)}
          {(sortOption === SortTypeEnum.ID_ASC && <ArrowDown01></ArrowDown01>)}
          {(sortOption === SortTypeEnum.ID_DESC && <ArrowDown10></ArrowDown10>)}
          <span className="sr-only md:not-sr-only md:inline capitalize">
            {sortOption.split("-")[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-fit">
        <DropdownMenuRadioGroup
          value={sortOption}
          onValueChange={(value) => {handleSortChange(value as SortTypeEnum)}}

        >
          <DropdownMenuLabel className="text-xs md:text-sm tracking-wider font-light">Sort Pokemon</DropdownMenuLabel>
          <Separator></Separator>
          <DropdownMenuRadioItem value={SortTypeEnum.NAME_ASC} className="text-xs md:text-sm tracking-wider font-light">
            Name (A - Z)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={SortTypeEnum.NAME_DESC} className="text-xs md:text-sm tracking-wider font-light">
            Name (Z - A)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={SortTypeEnum.ID_ASC} className="text-xs md:text-sm tracking-wider font-light">
            ID (Lowest - Highest)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={SortTypeEnum.ID_DESC} className="text-xs md:text-sm tracking-wider font-light">
            ID (Highest - Lowest)
          </DropdownMenuRadioItem>

        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
