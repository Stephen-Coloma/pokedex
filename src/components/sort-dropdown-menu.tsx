"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown01, ArrowDown10, ArrowDownAZ, ArrowDownWideNarrow, ArrowDownZA, ArrowUpDown } from "lucide-react";

export type SortDropDownMenuProps = {
  onSortChange: (sortOption: string) => void;
}

export function SortDropDownMenu({onSortChange}: SortDropDownMenuProps) {
  const [sortOption, setSortOption] = React.useState("id-asc");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          {(sortOption === 'name-asc' && <ArrowDownAZ></ArrowDownAZ>)}
          {(sortOption === 'name-desc' && <ArrowDownZA></ArrowDownZA>)}
          {(sortOption === 'id-asc' && <ArrowDown01></ArrowDown01>)}
          {(sortOption === 'id-desc' && <ArrowDown10></ArrowDown10>)}
          <span className="sr-only md:not-sr-only md:inline capitalize">
            {sortOption.split('-')[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuRadioGroup
          value={sortOption}
          onValueChange={(value) => {
            setSortOption(value);
            onSortChange(value); // Notify parent component
          }}

        >
          <DropdownMenuRadioItem value="name-asc">
            Name (A - Z)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name-desc">
            Name (Z - A)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="id-asc">
            ID (Lowest - Highest)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="id-desc">
            ID (Highest - Lowest)
          </DropdownMenuRadioItem>

        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );  
}
