"use client"

import type { Pokemon } from "@/types/Pokemon"
import { getTypeColor, hexToRgba } from "@/lib/colors"
import { PokemonTypeIcon } from "./pokemon-type-icon"
import { Badge } from "./ui/badge"
import { Sparkles } from "lucide-react"
import { useRef, useState } from "react"
import type { MouseEvent } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cardVariants } from "@/lib/motion"

export type PokemonCardProps = Pokemon & {
  onViewProfile: (id: number) => void
}

export function PokemonCard({ id, name, photo, types, onViewProfile }: PokemonCardProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const cardRef = useRef<HTMLDivElement | null>(null)

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovering || !cardRef.current) return

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

  const handleViewProfile = (e: MouseEvent) => {
    e.stopPropagation()
    onViewProfile(id)
  }

  return (
    // main container
    <motion.div
      className={`border-2 p-0 relative w-full h-[fit] max-w-xs mx-auto rounded-xl bg-muted overflow-hidden`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderColor: getTypeColor(types[0]),
        backgroundColor:  hexToRgba(getTypeColor(types[0]), 0.2),
      }}
      variants={cardVariants}
      initial="initial"
      animate="animate"
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
        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Card header */}
          <div className="pt-4 px-2 sm:px-4 relative">
            <div className="flex justify-between items-center">
            <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <h3 className="text-sm sm:text-base md:text-sm font-medium text-primary capitalize tracking-wide">
                {name}
              </h3>
            </div>
              <Badge className="text-white bg-primary/30 rounded-full px-1 sm:px-2 sm:py-1 text-xs font-light tracking-wider">
                # {id.toString().padStart(3, "0")}
              </Badge>
            </div>
          </div>

          {/* Card image area */}
          <div className={`mx-4 flex justify-center items-center relative`}>
            <div className="relative w-full h-full flex justify-center items-center p-4">
              {/* Circular glow behind image */}
              <div
                className={`absolute rounded-full blur-md transition-all duration-300 ${isHovering ? `scale-105 opacity-70` : "scale-90 opacity-30"}`}
                style={{
                  backgroundColor: isHovering ? getTypeColor(types[0]) : "",
                  width: "50%",
                  height: "50%",
                  boxShadow: isHovering ? `0 0 10px 20px rgba(255, 255, 255, .3)` : "none",
                }}
              />

              {/* Pokemon image with pop-up effect */}
              <div className="relative z-10">
              <Image
                src={photo || "/placeholder.svg"}
                alt={name}
                width={200}
                height={200}
                priority
                className={`h-full transition-all duration-300 ${isHovering ? "scale-110 drop-shadow-2xl" : "scale-100"}`}
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
              <PokemonTypeIcon key={index} type={type} pageCaller="homepage"></PokemonTypeIcon>
            ))}
          </div>

          {/* Glowing border effect on hover */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-10 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
            style={{
              boxShadow: `inset 0 0 20px 5px ${getTypeColor(types[0])}`,
              borderRadius: "inherit",
            }}
          />

          {/* Clickable area */}
          <div
            className={`absolute inset-0 cursor-pointer z-20 ${isHovering ? "block" : "hidden"}`}
            onClick={handleViewProfile}
            aria-label={`View ${name}'s profile`}
          />
        </div>
      </div>
    </motion.div>
  )
}

export { cardVariants }
