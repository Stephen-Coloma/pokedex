"use client";

import type { Pokemon } from "@/types/Pokemon";
import { getTypeColor, hexToRgba } from "@/lib/colors";
import { PokemonTypeIcon } from "./pokemon-type-icon";
import { Badge } from "./ui/badge";
import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cardVariants } from "@/lib/motion";

export type PokemonCardProps = Pokemon & {
  onViewProfile: (id: number) => void
}

export function PokemonCard({ id, name, photo, types, onViewProfile }: PokemonCardProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const cardRef = useRef<HTMLDivElement | null>(null)

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovering || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  const handleViewProfile = (e: MouseEvent) => {
    e.stopPropagation();
    onViewProfile(id);
  };

  const primaryType = types[0];
  const typeColor = getTypeColor(primaryType);

  return (
    // main container
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-xs mx-auto cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovering(true)}
      onClick={handleViewProfile}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      style={{
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Outer golden border - like real Pokemon cards */}
      <div
        className="p-0.5 md:p-1.5 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, #f4c430 0%, #d4af37 50%, #f4c430 100%)",
          boxShadow:
            "0 8px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        {/* Inner card container */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl overflow-hidden shadow-lg">
          {/* Header section with colored background */}
          <div
            className="pt-4 px-4 pb-2"
            style={{
              background: `linear-gradient(to bottom, ${hexToRgba(typeColor, 0.15)}, transparent)`,
            }}
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-foreground capitalize tracking-wide">
                {name}
              </h3>
              <Badge
                variant="secondary"
                className="font-mono text-xs py-0.5"
                style={{
                  backgroundColor: hexToRgba(typeColor, 0.2),
                  borderColor: typeColor,
                  borderWidth: "1px",
                }}
              >
                #{id.toString().padStart(3, "0")}
              </Badge>
            </div>
          </div>

          {/* Pokemon Image Section */}
          <div className="relative px-6 py-4 flex justify-center items-center">
            {/* Subtle circular background */}
            <div
              className="absolute w-32 h-32 rounded-full opacity-10"
              style={{
                backgroundColor: typeColor,
              }}
            />

            {/* Pokemon image */}
            <div className="relative z-10">
              <Image
                src={photo || "/placeholder.svg"}
                alt={name}
                width={180}
                height={180}
                priority
                className="drop-shadow-lg transition-transform duration-300"
                style={{
                  transform: isHovering ? "scale(1.05)" : "scale(1)",
                }}
              />
            </div>
          </div>

          {/* Type badges section */}
          <div
            className="px-4 pt-2 pb-3 border-t-2"
            style={{
              borderColor: hexToRgba(typeColor, 0.3),
            }}
          >
            <div className="flex justify-center items-center gap-2 py-1">
              {types.map((type, index) => (
                <PokemonTypeIcon
                  key={index}
                  type={type}
                  pageCaller="homepage"
                />
              ))}
            </div>
          </div>

          {/* Bottom decorative strip */}
          <div
            className="h-2"
            style={{
              background: `linear-gradient(90deg, transparent, ${hexToRgba(typeColor, 0.4)}, transparent)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export { cardVariants };
