"use client";

import { House, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileSettingsIsland({id} : {id: number}) {
  const router = useRouter();
  const nextId = parseInt(id.toString()) + 1;
  const prevId = parseInt(id.toString()) - 1;
  const [isHoveringNext, setIsHoveringNext] = useState(false);
  const [isHoveringPrev, setIsHoveringPrev] = useState(false);

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
              className="rounded-full text-xs flex items-center "
              onMouseEnter={() => setIsHoveringPrev(true)}
              onMouseLeave={() => setIsHoveringPrev(false)}
            >
              <div
                className={`flex items-center transition-all duration-200 ease-in-out`}
                style={{
                  opacity: isHoveringPrev ? 1 : 0,
                  transform: isHoveringPrev ? 'translateX(0)' : 'translateX(15px)', // Adjust the initial translation
                  marginRight: isHoveringPrev ? '0.25rem' : '-0.50rem', // Adjust margins for spacing
                  width: isHoveringPrev ? 'auto' : 0,
                  overflow: 'hidden',
                }}
                >
                <ChevronLeft size={16} />
              </div>
                Prev
            </Button>

            <Separator orientation="vertical" className="h-6 hidden md:block" />
                
            {/* HOME BUTTON */}
            <Button
              size="sm"
              onClick={handleClickHome}
              className="ml-auto rounded-full text-xs bg-red-500 hover:bg-red-100 text-white hover:text-red-600 hover:border-red-500 hover:border"
            >
              <House></House>
            </Button>

            <Separator orientation="vertical" className="h-6 hidden md:block" />

            {/* Next Button */}
            <Button
              size="sm"
              onClick={handleClickNextPokemon}
              className="rounded-full text-xs flex items-center "
              onMouseEnter={() => setIsHoveringNext(true)}
              onMouseLeave={() => setIsHoveringNext(false)}
            >
              Next
              <div
                className={`flex items-center transition-all duration-200 ease-in-out`}
                style={{
                  opacity: isHoveringNext ? 1 : 0,
                  transform: isHoveringNext ? 'translateX(0)' : 'translateX(-15px)', // Adjust the initial translation
                  marginLeft: isHoveringNext ? '0.25rem' : '-0.50rem', // Adjust margins for spacing
                  width: isHoveringNext ? 'auto' : 0,
                  overflow: 'hidden',
                }}
              >
                <ChevronRight size={16} />
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
