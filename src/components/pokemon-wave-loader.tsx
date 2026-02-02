"use client";

import Image from "next/image";

export function PokemonWaveLoader() {
  return (
    <div className="flex justify-center items-center gap-2 py-10">
      {/* Bulbasaur */}
      <div className="animate-wave" style={{ animationDelay: "0s" }}>
        <Image
          src="/icons/bulbasaur.png"
          alt="Loading"
          width={48}
          height={48}
          className="w-10 h-10 sm:w-12 sm:h-12"
        />
      </div>

      {/* Charmander */}
      <div className="animate-wave" style={{ animationDelay: "0.1s" }}>
        <Image
          src="/icons/charmander.png"
          alt="Loading"
          width={48}
          height={48}
          className="w-10 h-10 sm:w-12 sm:h-12"
        />
      </div>

      {/* Pokeball (center) */}
      <div className="animate-wave" style={{ animationDelay: "0.2s" }}>
        <Image
          src="/icons/pokeball.png"
          alt="Loading"
          width={48}
          height={48}
          className="w-10 h-10 sm:w-12 sm:h-12 animate-spin-slow"
        />
      </div>

      {/* Squirtle */}
      <div className="animate-wave" style={{ animationDelay: "0.3s" }}>
        <Image
          src="/icons/squirtle.png"
          alt="Loading"
          width={48}
          height={48}
          className="w-10 h-10 sm:w-12 sm:h-12"
        />
      </div>

      {/* Pikachu */}
      <div className="animate-wave" style={{ animationDelay: "0.4s" }}>
        <Image
          src="/icons/pikachu.png"
          alt="Loading"
          width={48}
          height={48}
          className="w-10 h-10 sm:w-12 sm:h-12"
        />
      </div>
    </div>
  );
}
