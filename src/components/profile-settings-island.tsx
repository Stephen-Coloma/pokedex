"use client";

import { useState } from "react";
import { Volume2, VolumeX, Loader2, House, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./mode-toggle";
import { useRouter } from "next/navigation";


export default function ProfileSettingsIsland({id} : {id: number}) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [nextLoading, setNextLoading] = useState<boolean>(false); //loading simulation
  const [prevLoading, setPrevLoading] = useState<boolean>(false); //loading simulation
  const router = useRouter();
  const nextId = parseInt(id.toString()) + 1;
  const prevId = parseInt(id.toString()) - 1;

  const handleClickNextPokemon = () => {
    setNextLoading(true);
    setTimeout(()=>{
      setNextLoading(false);
      router.push(`/pokemon/${nextId}`)
    }, 500);
  };
  
  const handleClickPrevPokemon = () => {
    setPrevLoading(true);
    setTimeout(()=>{
      setPrevLoading(false);
      router.push(`/pokemon/${prevId}`)
    }, 500);
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
              disabled={prevLoading}
              className="ml-auto rounded-full text-xs"
            >
              <ChevronLeft></ChevronLeft>
              Prev
              {(prevLoading) ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : null}
            </Button>

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
                }`}
              />
              <Switch
                id="sounds"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
                aria-label="Toggle sounds"
              />
            </div>

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

            <ModeToggle></ModeToggle>

            <Separator orientation="vertical" className="h-6 hidden md:block" />

            {/* Next Button */}
            <Button
              size="sm"
              onClick={handleClickNextPokemon}
              disabled={nextLoading}
              className="ml-auto rounded-full text-xs"
            >
              {(nextLoading) ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : null}
              Next
              <ChevronRight></ChevronRight>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
