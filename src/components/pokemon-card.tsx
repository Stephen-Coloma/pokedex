'use client'

import { Pokemon } from "@/types/Pokemon";
import { getTypeGradient } from "@/lib/getTypeGradient";
import { PokemonTypeIcon } from "./pokemon-type-icon";
import { Badge } from "./ui/badge";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export type PokemonCardProps = Pokemon;

export function PokemonCard({ id, name, photo, types }: PokemonCardProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    // main container
    <div className={`relative w-full h-[fit] max-w-xs mx-auto rounded-xl ${getTypeGradient(types)}`}>

      {/* Custom shaped card  */}
      <div
        className={`relative ${getTypeGradient(types)} rounded-xl shadow-lg`}
        style={{
          aspectRatio: "1/1.3",
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

          {/* Black corner accent */}
          <div className="absolute top-0 left-0 w-8 h-8 bg-primary rounded-tl-xl rounded-br-xl z-10"></div>

          {/* Card header */}
          <div className="pt-4 pb-4 px-6 relative">
            <div className="flex justify-between items-center ml-6">
              <h3 className="text-2xl font-bold text-white uppercase tracking-wide">{name}</h3>
              <Badge className="bg-black/20 text-white rounded-full py-1 px-3 text-base font-bold">
                # {id.toString().padStart(3, "0")}
              </Badge>
            </div>
            <span className="text-sm text-white/80 uppercase tracking-wider ml-6">Pokémon</span>
          </div>

          {/* Card image area */}
          <div
            className={`mx-4 flex justify-center items-center`}
            style={{
              height: "calc(100% - 140px)",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-full h-full flex justify-center items-center p-4">
              {/* Circular glow behind image */}
              <div
                className={`absolute rounded-full bg-white/30 blur-md transition-all duration-300 ${isHovering ? "scale-105 opacity-70" : "scale-90 opacity-30"}`}
                style={{
                  width: "80%",
                  height: "80%",
                  boxShadow: isHovering ? `0 0 50px 10px rgba(255, 255, 255, 1)` : "none",
                }}
              />

              {/* Pokemon image with pop-up effect */}
              <div className="relative z-10">
                <img
                  src={photo}
                  alt={name}
                  className={`object-contain mx-auto max-h-[85%] max-w-[85%] transition-all duration-300 ${isHovering ? "scale-110 drop-shadow-2xl" : "scale-100"}`}
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
          <div className="flex p-4 px-6 flex justify-center items-center gap-2">
              {types.map((type, index) => (
                <PokemonTypeIcon key={index} type={type}></PokemonTypeIcon>
              ))}
          </div>

        </div>
      </div>
    </div>
  );
}