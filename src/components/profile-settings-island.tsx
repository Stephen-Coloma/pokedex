"use client";

import { House, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";


export default function ProfileSettingsIsland({id} : {id: number}) {
  const router = useRouter();
  const nextId = parseInt(id.toString()) + 1;
  const prevId = parseInt(id.toString()) - 1;

  const handleClickNextPokemon = () => {
    router.push(`/pokemon/${nextId}`)
  };
  
  const handleClickPrevPokemon = () => {
    router.push(`/pokemon/${prevId}`)
  };

  const handleClickHome = () => {
    router.push(`/`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full p-4 z-10 flex justify-center w-full">
      <div className="flex justify-center items-center w-fit rounded-full">
        <Card className="w-full max-w-4xl shadow-lg hover:shadow-xl transition-all duration-300 p-2 rounded-full bg-muted">
          <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap">
            
            {/* Previous Button */}
            <Button
              size="sm"
              onClick={handleClickPrevPokemon}
              className="ml-auto rounded-full text-xs"
            >
              <ChevronLeft></ChevronLeft>
              Prev
              
            </Button>

            <Separator orientation="vertical" className="h-6 hidden md:block" />
                
            {/* HOME BUTTON */}
            <Button
              size="sm"
              onClick={handleClickHome}
              className="ml-auto rounded-full text-xs"
            >
              <House></House>
            </Button>

            <Separator orientation="vertical" className="h-6 hidden md:block" />

            {/* Next Button */}
            <Button
              size="sm"
              onClick={handleClickNextPokemon}
              className="ml-auto rounded-full text-xs"
            >
              Next
              <ChevronRight></ChevronRight>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
