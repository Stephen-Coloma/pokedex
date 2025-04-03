'use client'

import { useFetchPokemonProfile } from "@/hooks/useFetchPokemonProfile";
import { Button } from "./ui/button";
import { getTypeColor } from "@/lib/colors";
import { Badge, BookOpen, ChevronUp, ChevronDown, BarChart2, Zap, Info, Flame, GitBranch, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image"
import { Progress } from "./ui/progress";
import { PokemonProfile } from "@/types/PokemonProfile";

export function PokemonProfileComponent({id}: {id: number}) {
  const {status, data, loading} = useFetchPokemonProfile(id)
  const [pokemon, setPokemon] = useState<PokemonProfile>();
  const [showAllDescriptions, setShowAllDescriptions] = useState(false);
  const [displayDescriptions , setDisplayDescriptions] = useState<string[]>([]);

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
        setDisplayDescriptions(pokemon!.descriptions.slice(0,4))
      }
    }else{
    }
  }, [showAllDescriptions])

  
  if(!pokemon) return <h1>loading</h1>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Header Card - Name, ID, Photo */}
      <Card className={`col-span-1 md:col-span-3 overflow-hidden shadow-md border-2`}
        style={{
          borderColor: getTypeColor(pokemon.types[0])
        }}
      >
        <div
          className={` bg-opacity-20 dark:bg-opacity-10 p-6 flex flex-col md:flex-row items-center gap-6`}
        >
          <div className="relative w-64 h-64 flex-shrink-0">
            <Image
              src={pokemon.photo || "/placeholder.svg"}
              alt={pokemon.name}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <div className="text-sm text-gray-500 dark:text-gray-400">#{pokemon.id.toString().padStart(3, "0")}</div>
            <h1 className="text-4xl font-bold mb-4 capitalize"
              style={{
                color: getTypeColor(pokemon.types[0])
              }}
            >{pokemon.name}</h1>
            <div className="flex gap-2">
              {pokemon.types.map((type) => (
                <Badge key={type} className={`${getTypeColor(type).split(" ")[0]} text-white px-3 py-1`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Left Column */}
      <div className="col-span-1 md:col-span-2 space-y-6">
        {/* Description Card */}
        <Card className={`overflow-hidden shadow-md border-2`}
        style={{
          borderColor: getTypeColor(pokemon.types[0])
        }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-gray-500 dark:text-gray-400" size={20} />
              <h2 className="text-xl font-semibold">Description</h2>
            </div>
            <div className="space-y-3">
              {displayDescriptions.map((desc, index) => (
                <div key={index} className="flex text-gray-700 dark:text-gray-300">
                  <span className="inline-block w-8 flex-shrink-0 font-medium">[{index + 1}]</span>
                  <p>{desc}</p>
                </div>
              ))}
              {pokemon.descriptions.length > 5 && (
                <Button
                  variant="ghost"
                  onClick={() => setShowAllDescriptions(!showAllDescriptions)}
                  className="flex items-center gap-1 mt-2"
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
        </Card>

        {/* Stats Card */}
        <Card className={`overflow-hidden shadow-md border-2`}
        style={{
          borderColor: getTypeColor(pokemon.types[0])
        }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="text-gray-500 dark:text-gray-400" size={20} />
              <h2 className="text-xl font-semibold">Stats</h2>
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">HP</div>
                <div className="col-span-2 flex items-center gap-2">
                  <Progress value={(pokemon.stats.hp / 255) * 100} className="h-3.5 bg-gray-100 dark:bg-gray-700" />
                  <span className="text-sm font-medium">{pokemon.stats.hp}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Attack</div>
                <div className="col-span-2 flex items-center gap-2">
                  <Progress value={(pokemon.stats.attack / 255) * 100} className="h-3.5 bg-gray-100 dark:bg-gray-700" />
                  <span className="text-sm font-medium">{pokemon.stats.attack}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Defense</div>
                <div className="col-span-2 flex items-center gap-2">
                  <Progress
                    value={(pokemon.stats.defense / 255) * 100}
                    className="h-3.5 bg-gray-100 dark:bg-gray-700"
                  />
                  <span className="text-sm font-medium">{pokemon.stats.defense}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Special Attack</div>
                <div className="col-span-2 flex items-center gap-2">
                  <Progress
                    value={(pokemon.stats.specialAttack / 255) * 100}
                    className="h-3.5 bg-gray-100 dark:bg-gray-700"
                  />
                  <span className="text-sm font-medium">{pokemon.stats.specialAttack}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Special Defense</div>
                <div className="col-span-2 flex items-center gap-2">
                  <Progress
                    value={(pokemon.stats.specialDefense / 255) * 100}
                    className="h-3.5 bg-gray-100 dark:bg-gray-700"
                  />
                  <span className="text-sm font-medium">{pokemon.stats.specialDefense}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Speed</div>
                <div className="col-span-2 flex items-center gap-2">
                  <Progress value={(pokemon.stats.speed / 255) * 100} className="h-3.5 bg-gray-100 dark:bg-gray-700" />
                  <span className="text-sm font-medium">{pokemon.stats.speed}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Abilities Card */}
        <Card className={`overflow-hidden shadow-md border-2`}
      style={{
          borderColor: getTypeColor(pokemon.types[0])
        }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-gray-500 dark:text-gray-400" size={20} />
              <h2 className="text-xl font-semibold">Abilities</h2>
            </div>
            <div className="grid gap-4">
              {pokemon.abilities.map((ability, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="font-medium text-lg mb-2 flex items-center">
                    <div className={`w-2 h-2 rounded-full  mr-2`}></div>
                    {ability.name}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 max-h-24 overflow-y-auto pr-2 scrollbar-thin">
                    {ability.effect}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="col-span-1 space-y-6">
        {/* Basic Info Card */}
        <Card className={`overflow-hidden shadow-md border-2`}
        style={{
          borderColor: getTypeColor(pokemon.types[0])
        }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-gray-500 dark:text-gray-400" size={20} />
              <h2 className="text-xl font-semibold">Basic Info</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Height</span>
                <span>{pokemon.height / 10} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Weight</span>
                <span>{pokemon.weight / 10} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Base Experience</span>
                <span>{pokemon.baseExperience}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weaknesses Card */}
        <Card className={`overflow-hidden shadow-md border-2`}
        style={{
          borderColor: getTypeColor(pokemon.types[0])
        }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="text-gray-500 dark:text-gray-400" size={20} />
              <h2 className="text-xl font-semibold">Weaknesses</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {pokemon.weaknesses.map((type) => (
                <Badge key={type} className={`${getTypeColor(type).split(" ")[0]} text-white px-3 py-1`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Evolution Chain Card */}
        <Card className={`overflow-hidden shadow-md border-2`}
        style={{
          borderColor: getTypeColor(pokemon.types[0])
        }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <GitBranch className="text-gray-500 dark:text-gray-400" size={20} />
              <h2 className="text-xl font-semibold">Evolution Chain</h2>
            </div>
            <EvolutionChain evolution={pokemon.evolutionChain} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EvolutionChain({ evolution }: { evolution: any }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  if (!evolution) return null

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
      setTimeout(checkScrollability, 300)
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
      setTimeout(checkScrollability, 300)
    }
  }

  const renderEvolution = (evo: any, level = 0) => {
    return (
      <div key={evo.name} className="flex flex-col items-center min-w-[100px]">
        <div className="relative w-20 h-20 mb-2">
          <Image src={evo.photo || "/placeholder.svg"} alt={evo.name} fill className="object-contain" />
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

        <div className={`flex ${evo.evolvesTo.length > 1 ? "gap-4" : "flex-col"} mt-2`}>
          {evo.evolvesTo.map((nextEvo: any) => renderEvolution(nextEvo, level + 1))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Scroll buttons - only shown when needed */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={scrollLeft}
        >
          <ChevronLeft size={16} />
        </Button>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={scrollRight}
        >
          <ChevronRight size={16} />
        </Button>
      </div>

      {/* Scrollable container */}
      <div ref={scrollContainerRef} onScroll={checkScrollability} className="overflow-x-auto scrollbar-thin pb-2" >
        <div  className="flex justify-center min-w-min">{renderEvolution(evolution)}</div>
      </div>
    </div>
  )
}