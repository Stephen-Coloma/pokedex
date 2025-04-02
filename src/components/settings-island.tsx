"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { SortDropDownMenu } from "./sort-dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "next-themes";

type SettingsIslandProps = {
  onSortChange: (sortOption: string) => void;
}

export default function SettingsIsland({onSortChange}: SettingsIslandProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center w-fit">
      <Card className="w-full max-w-4xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-2">
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
            disabled={isLoading}
            className="ml-auto"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : null}
            See More
          </Button>
        </div>
      </Card>
    </div>
  );
}
