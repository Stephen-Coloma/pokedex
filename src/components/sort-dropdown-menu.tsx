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
import { ArrowDownWideNarrow } from "lucide-react";

export type SortDropDownMenuProps = {
  onSortChange: (sortOption: string) => void;
}

export function SortDropDownMenu({onSortChange}: SortDropDownMenuProps) {
  const [sortOption, setSortOption] = React.useState("id-ascending");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ArrowDownWideNarrow/>  
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>Filter by Name</DropdownMenuLabel>
        <DropdownMenuSeparator /> 
        <DropdownMenuRadioGroup 
          value={sortOption}
          onValueChange={(value) => {
            setSortOption(value);
            onSortChange(value); // Notify parent component
          }}
        >
          <DropdownMenuRadioItem value="name-ascending">Aa - Zz</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name-descending">Zz - Aa</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuLabel>Filter by ID</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={sortOption}
          onValueChange={(value) => {
            setSortOption(value);
            onSortChange(value); // Notify parent component
          }}
        >
          <DropdownMenuRadioItem value="id-ascending">1 - 1025</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="id-descending">1025 - 1</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );  
}
