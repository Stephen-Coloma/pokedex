import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export function EvolutionChainCard({ evolution }: { evolution: any }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  if (!evolution) return null;

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setTimeout(checkScrollability, 300);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setTimeout(checkScrollability, 300);
    }
  };

  const renderEvolution = (evo: any, level = 0) => {
    return (
      <div key={evo.name} className="flex flex-col items-center min-w-[100px]">
        <div className="relative w-20 h-20 mb-2">
          {evo.photo && (
            <Image
            src={evo.photo || "/placeholder.svg"}
            alt={evo.name}
            fill
            priority
            className="object-contain"
          />
          )}
        </div>
        <div className="text-center font-medium">{evo.name}</div>

        {evo.evolvesTo.length > 0 && (
          <>
            {evo.evolvesTo.length === 1 ? (
              <div className="mt-4 w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            ) : (
              <div className="mt-4 w-full h-px bg-gray-300 dark:bg-gray-600"></div>
            )}
          </>
        )}

        <div
          className={`flex ${
            evo.evolvesTo.length > 1 ? "gap-4" : "flex-col"
          } mt-2`}
        >
          {evo.evolvesTo.map((nextEvo: any) =>
            renderEvolution(nextEvo, level + 1)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Scroll buttons - only shown when needed */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={scrollLeft}
        >
          <ChevronLeft size={16} />
        </Button>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={scrollRight}
        >
          <ChevronRight size={16} />
        </Button>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollability}
        className="overflow-x-auto scrollbar-thin pb-2"
      >
        <div className="flex justify-center min-w-min">
          {renderEvolution(evolution)}
        </div>
      </div>
    </div>
  );
}
