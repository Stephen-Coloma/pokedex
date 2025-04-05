'use client'

import { useFetchPokemonProfile } from "@/hooks/useFetchPokemonProfile";
import { Button } from "./ui/button";
import { getTypeColor, hexToRgba} from "@/lib/colors";
import { BookOpen, ChevronUp, ChevronDown, Zap, Info, Flame, GitBranch, MousePointerClick, Sparkles, Volume2,} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CardContent } from "./ui/card";
import Image from "next/image"
import { PokemonProfile } from "@/types/PokemonProfile";
import { PokemonTypeIcon } from "./pokemon-type-icon";
import { EvolutionChainCard } from "./evolution-chain-card";
import { StatsChart } from "./stats-chart";
import ProfileSettingsIsland from "./profile-settings-island";
import type { MouseEvent } from "react"
import { PokemonProfileSkeleton } from "./pokemon-profile-skeleton";
import {motion} from 'framer-motion'
import { cardVariants } from "./pokemon-card";
import { textRevealVariant1, textRevealVariant2 } from "@/lib/motion";

export function PokemonProfileComponent({id}: {id: number}) {
  const {status, data, loading} = useFetchPokemonProfile(id)
  const [pokemon, setPokemon] = useState<PokemonProfile>();
  const [showAllDescriptions, setShowAllDescriptions] = useState(false);
  const [displayDescriptions , setDisplayDescriptions] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    if(status === 200 && data){
      setPokemon(data);
    }
  }, [loading])

  useEffect(()=>{
    if(status === 200){
      if(showAllDescriptions){
        setDisplayDescriptions(pokemon!.descriptions)
      }else{
        setDisplayDescriptions(data!.descriptions.slice(0,3))
      }
    }
  }, [showAllDescriptions, loading])

  if(!pokemon) return <PokemonProfileSkeleton></PokemonProfileSkeleton>;
  
  // Prepare stats data for radar chart
  const statsData = [
    { subject: "Special Attack", value: pokemon.stats.specialAttack, fullMark: 150 },
    { subject: "Attack", value: pokemon.stats.attack, fullMark: 150 },
    { subject: "Defense", value: pokemon.stats.defense, fullMark: 150 },
    { subject: "Special Defense", value: pokemon.stats.specialDefense, fullMark: 150 },
    { subject: "Speed", value: pokemon.stats.speed, fullMark: 150 },
    { subject: "HP", value: pokemon.stats.hp, fullMark: 150 },
  ]
  
  const playPokemonCry = () => {    
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play(); // Play again
    }
  };
  
  // Handle mouse move for 3D effect
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!isHovering || !cardRef.current) return
  
      const card = cardRef.current
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
  
      const centerX = rect.width / 2
      const centerY = rect.height / 2
  
      const rotateX = (y - centerY) / 75
      const rotateY = (centerX - x) / 75
  
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      if (cardRef.current) {
        cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
      }
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Header Card - Name, ID, Photo */}
      <motion.div
        className={`col-span-1 md:col-span-3 overflow-hidden shadow-md border-4 bg-card text-card-foreground rounded-xl py-6`}
        style={{
          borderColor: getTypeColor(pokemon.types[0]),
          backgroundColor:  hexToRgba(getTypeColor(pokemon.types[0]), 0.3),
        }}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovering(true)}
        variants={cardVariants}
        initial="initial"
        animate="animate"
      >
        <div className={`relative bg-opacity-20 dark:bg-opacity-10 p-6 flex flex-col md:flex-row items-center gap-6`}>
          {/* Left section: Image and details - 50% width on desktop */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">

              {/* Circular glow behind image */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                  rounded-full blur-lg transition-all duration-300 
                  ${isHovering ? "scale-105 opacity-70 shadow-[0_0_20px_30px_rgba(255,255,255,0.3)]" : "scale-90 opacity-30"}`}
                style={{
                  backgroundColor: isHovering ? getTypeColor(pokemon.types[0]) : "",
                  width: "70%",
                  height: "70%",
                }}
              />

              {/* Pokemon image with pop-up effect */}
                <Image
                  src={pokemon.photo || "/placeholder.svg"}
                  alt={pokemon.name}
                  priority
                  fill
                  className={`object-contain transition-all duration-300 z-10 ${isHovering ? "scale-110 drop-shadow-2xl" : "scale-100"}`}
                  onClick={playPokemonCry}
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
              <audio ref={audioRef} src={`${pokemon.cry}`} style={{ display: "none" }}></audio>
            </div>
            <div className="flex flex-col items-center mt-4">
              {/* id */}
              <motion.div className="text-lg tracking-wider text-gray-500 dark:text-gray-400"
                variants={textRevealVariant2} 
                initial="initial" 
                animate="animate"
                transition={{duration: 1, delay: 0 * .4}}
              >
                #{pokemon.id.toString().padStart(3, "0")}
              </motion.div>
              {/* name */}
              <motion.p
                variants={textRevealVariant2} 
                initial="initial" 
                animate="animate"
                transition={{duration: 1, delay: 1 * .4}}
                className="text-4xl font-bold mb-4 capitalize text-center"
                style={{
                  color: getTypeColor(pokemon.types[0]),
                }}
              >
                {pokemon.name}
              </motion.p>
              {/* types */}
              <div className="flex gap-2">
                {pokemon.types.map((type, index) => (
                  <motion.div
                    variants={textRevealVariant2} 
                    initial="initial" 
                    animate="animate"
                    transition={{duration: 1, delay: 2 * .4}}
                    key={index}
                  >
                    <PokemonTypeIcon type={type} pageCaller="profile"></PokemonTypeIcon>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right section: Radar chart - 50% width on desktop */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 flex items-center justify-center">
            <div className="w-full max-w-md">
              <StatsChart data={statsData} primaryColor={getTypeColor(pokemon.types[0])} />
            </div>
          </div>

          {/* Click pokemon */}
          <h1 className="absolute bottom-0 text-sm block flex items-center justify-center gap-2 w-full ">
            <MousePointerClick></MousePointerClick>
            click pokemon!
          </h1>

          {/* volume icon */}
          <Volume2 className="absolute top-0 right-7" size={25}></Volume2>
          
        </div>
      </motion.div>

      {/* Left Column */}
      <div className="col-span-1 md:col-span-2 space-y-6">
        {/* Description Card */}
        <motion.div className={`overflow-hidden shadow-md border-2 bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6`}
          style={{
            borderColor: getTypeColor(pokemon.types[0])
          }}
          variants={cardVariants}
          initial="initial"
          animate="animate"
        >
          <CardContent className="py-2">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen color={`${getTypeColor(pokemon.types[0])}`}/>
              <h2 className="text-xl font-semibold">Description</h2>
            </div>
            <div className="space-y-3">
              {displayDescriptions.map((desc, index) => (
                <div key={index} className="flex text-gray-700 dark:text-gray-300">
                  <span className=" text-xs sm:text-sm md:text-base inline-block w-15 flex-shrink-0 font-medium"
                    style={{
                      color: getTypeColor(pokemon.types[0])
                    }}
                  >[{index + 1}]</span>
                  <motion.p 
                    className="text-xs sm:text-sm md:text-base"
                    variants={textRevealVariant1}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 1, delay: ((index < 3) ?  ((1+index) * 0.2) : ((index-3) * 0.2))  }}
                  >
                    {desc}
                  </motion.p>
                </div>
              ))}
              {pokemon.descriptions.length > 4 && (
                <Button
                  onClick={() => setShowAllDescriptions(!showAllDescriptions)}
                  className="flex items-center gap-1 mt-2 text-xs sm:text-sm md:text-base"
                  style={{
                    backgroundColor: getTypeColor(pokemon.types[0])
                  }}
                >
                  {showAllDescriptions ? (
                    <>
                      Show Less <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      Show More <ChevronDown size={16} />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </motion.div>

        {/* Abilities Card */}
        <motion.div className={`overflow-hidden shadow-md border-2 bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6`}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          style={{
            borderColor: getTypeColor(pokemon.types[0])
          }}
        >
          <CardContent className="py-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap color={`${getTypeColor(pokemon.types[0])}`} />
              <h2 className="text-xl font-semibold">Abilities</h2>
            </div>
            <div className="grid gap-4">
              {pokemon.abilities.map((ability, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="font-medium text-lg mb-2 flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2`}
                    style={{
                      backgroundColor: getTypeColor(pokemon.types[0])
                    }}></div>
                    <p className="text-base">{ability.name.replaceAll('-', ' ')}</p>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 max-h-24 overflow-y-auto pr-2 scrollbar-thin">
                    <motion.p 
                      className="text-xs sm:text-sm md:text-sm"
                      variants={textRevealVariant1}
                      initial="initial"
                      animate="animate"
                      transition={{ duration: 1, delay: index * 0.5 }}
                    >
                      {ability.effect}
                    </motion.p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </motion.div>
      </div>

      {/* Right Column */}
      <div className="col-span-1 space-y-6">
        {/* Basic Info Card */}
        <motion.div className={`overflow-hidden shadow-md border-2 bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6`}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          style={{
            borderColor: getTypeColor(pokemon.types[0])
          }}
        >
          <CardContent className="py-2">
            <div className="flex items-center gap-2 mb-4">
              <Info color={`${getTypeColor(pokemon.types[0])}`}/>
              <h2 className="text-xl font-semibold">Basic Info</h2>
            </div>
            <div className="space-y-3">
              <motion.div className="flex justify-between" 
                variants={textRevealVariant2} 
                initial="initial" 
                animate="animate"
                transition={{duration: 1, delay: 0 * .4}}
              >
                <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Height</span>
                <span className="text-sm sm:text-base">{pokemon.height / 10} m</span>
              </motion.div>
              <motion.div className="flex justify-between" 
                variants={textRevealVariant2} 
                initial="initial" 
                animate="animate"
                transition={{duration: 1, delay: 1 * .4}}
              >
                <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Weight</span>
                <span className="text-sm sm:text-base">{pokemon.weight / 10} kg</span>
              </motion.div>
              <motion.div className="flex justify-between" 
                variants={textRevealVariant2} 
                initial="initial" 
                animate="animate"
                transition={{duration: 1, delay: 2 * .4}}
              >
                <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Base Experience</span>
                <span className="text-sm sm:text-base">{pokemon.baseExperience}</span>
              </motion.div>
            </div>
          </CardContent>
        </motion.div>

        {/* Weaknesses Card */}
        <motion.div
          className={`overflow-hidden shadow-md border-2 bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6`}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          style={{
            borderColor: getTypeColor(pokemon.types[0]),
          }}
        > 

          <CardContent className="py-2">
            <div className="flex items-center gap-2 mb-4">
              <Flame color={`${getTypeColor(pokemon.types[0])}`} />
              <h2 className="text-xl font-semibold">Weaknesses</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2"> {/* Added flex-wrap and justify-center */}
              {pokemon.weaknesses.map((type, index) => (
                <motion.div
                  variants={textRevealVariant2} 
                  initial="initial" 
                  animate="animate"
                  transition={{duration: 1, delay: index * .4}}
                  key={index}
                >
                  <PokemonTypeIcon type={type} pageCaller="profile" />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </motion.div>

        {/* Evolution Chain Card */}
        <motion.div className={`overflow-hidden shadow-md border-2 bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6`}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          style={{
            borderColor: getTypeColor(pokemon.types[0])
          }}
        >
          <CardContent className="py-2">
            <div className="flex items-center gap-2 mb-4">
              <GitBranch color={`${getTypeColor(pokemon.types[0])}`} />
              <h2 className="text-xl font-semibold">Evolution Chain</h2>
            </div>
            <EvolutionChainCard evolution={pokemon.evolutionChain} />
          </CardContent>
        </motion.div>
      </div>

      {/* Floating settings island */}
      <div className="py-10">
        <ProfileSettingsIsland id={pokemon.id}/>
      </div>
    </div>
  )
}