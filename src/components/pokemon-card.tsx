'use client'

import { Pokemon } from "@/types/Pokemon";
import { getTypeColor } from "@/lib/colors";
import { PokemonTypeIcon } from "./pokemon-type-icon";
import { Badge } from "./ui/badge";
import { Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { Card } from "./ui/card";
import { MouseEvent } from "react";

export type PokemonCardProps = Pokemon;

export function PokemonCard({ id, name, photo, types }: PokemonCardProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null)

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovering || !cardRef.current) return;

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    }
  }

  return (
    // main container
    <Card className={`border-2 p-0 relative w-full h-[fit] max-w-xs mx-auto rounded-xl bg-muted`}
      ref={cardRef}
      onMouseMove={handleMouseMove}  // Add mouse move event listener
      onMouseLeave={handleMouseLeave} // Handle mouse leave
    >

      {/* Custom shaped card  */}
      <div
        className={`relative rounded-xl shadow-lg`}
        style={{
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 20%, 90% 25%, 90% 75%, 100% 80%, 100% 100%, 0% 100%, 0% 80%, 10% 75%, 10% 25%, 0% 20%)",
        }}
      >

        {/* Holder for pokeball bg */}
        <div style={{
          backgroundImage: `url('/pokeball-bg.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }} >

          {/* Card header */}
          <div className="pt-4 px-4 relative">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-md md:text-lg font-medium text-primary capitalize tracking-wide">{name}</h3>
              <Badge 
                className="text-white bg-primary/30 rounded-full py-1 px-3 text-xs font-light tracking-wider">
                # {id.toString().padStart(3, "0")}
              </Badge>
            </div>
          </div>

          {/* Card image area */}
          <div
            className={`mx-4 flex justify-center items-center`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-full h-full flex justify-center items-center p-4">
              {/* Circular glow behind image */}
              <div
                className={`absolute rounded-full blur-md transition-all duration-300 ${isHovering ? `scale-105 opacity-70` : "scale-90 opacity-30"}`}
                style={{
                  backgroundColor: (isHovering ? getTypeColor(types[0]) : ""),
                  width: "50%",
                  height: "50%",
                  boxShadow: isHovering ? `0 0 10px 20px rgba(255, 255, 255, .3)` : "none",
                }}
              />

              {/* Pokemon image with pop-up effect */}
              <div className="relative z-10">
                <img
                  src={photo}
                  alt={name}
                  className={`object-contain mx-auto max-h-full max-w-full transition-all duration-300 ${isHovering ? "scale-110 drop-shadow-2xl" : "scale-100"}`}
                />

                {/* Shiny sparkle effects that appear on hover */}
                {isHovering && (
                  <>
                    <Sparkles
                      className="absolute text-yellow-300 w-7 h-7 animate-pulse z-10"
                      style={{ top: "-10%", left: "20%" }}
                    />
                    <Sparkles
                      className="absolute text-yellow-300 w-10 h-10 animate-pulse z-10"
                      style={{ top: "30%", right: "10%" }}
                    />
                    <Sparkles
                      className="absolute text-yellow-300 w-5 h-5 animate-pulse z-10"
                      style={{ bottom: "0%", left: "10%" }}
                    />

                    {/* Shine overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 animate-shine"></div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Card footer */}
          <div className="flex px-6 pb-4 flex justify-center items-center gap-2">
              {types.map((type, index) => (
                <PokemonTypeIcon key={index} type={type}></PokemonTypeIcon>
              ))}
          </div>

        </div>
      </div>
    </Card>
  );
}