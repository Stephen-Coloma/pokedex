'use client'

import { useFetchPokemonProfile } from "@/hooks/useFetchPokemonProfile";
import { Button } from "./ui/button";
import { getTypeColor} from "@/lib/colors";
import { BookOpen, ChevronUp, ChevronDown, Zap, Info, Flame, GitBranch,} from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image"
import { PokemonProfile } from "@/types/PokemonProfile";
import { PokemonTypeIcon } from "./pokemon-type-icon";
import { EvolutionChainCard } from "./evolution-chain-card";
import { RadarChart } from "./radar-chart";

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
        setDisplayDescriptions(data!.descriptions.slice(0,3))
      }
    }else{
    }
  }, [showAllDescriptions, loading])

  
  if(!pokemon) return <h1>loading</h1>;

   // Prepare stats data for radar chart
  const statsData = [
    { subject: "Special Attack", value: pokemon.stats.specialAttack, fullMark: 150 },
    { subject: "Attack", value: pokemon.stats.attack, fullMark: 150 },
    { subject: "Defense", value: pokemon.stats.defense, fullMark: 150 },
    { subject: "Special Defense", value: pokemon.stats.specialDefense, fullMark: 150 },
    { subject: "HP", value: pokemon.stats.hp, fullMark: 150 },
    { subject: "Speed", value: pokemon.stats.speed, fullMark: 150 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Header Card - Name, ID, Photo */}
      <Card
        className={`col-span-1 md:col-span-3 overflow-hidden shadow-md border-2`}
        style={{
          borderColor: getTypeColor(pokemon.types[0]),
        }}
      >
        <div className={`bg-opacity-20 dark:bg-opacity-10 p-6 flex flex-col md:flex-row items-center gap-6`}>
          {/* Left section: Image and details - 50% width on desktop */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
              <Image
                src={pokemon.photo || "/placeholder.svg"}
                alt={pokemon.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">#{pokemon.id.toString().padStart(3, "0")}</div>
              <h1
                className="text-4xl font-bold mb-4 capitalize"
                style={{
                  color: getTypeColor(pokemon.types[0]),
                }}
              >
                {pokemon.name}
              </h1>
              <div className="flex gap-2">
                {pokemon.types.map((type, index) => (
                  <PokemonTypeIcon key={index} type={type} pageCaller="profile"></PokemonTypeIcon>
                ))}
              </div>
            </div>
          </div>

          {/* Right section: Radar chart - 50% width on desktop */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 flex items-center justify-center">
            <div className="w-full max-w-md">
              <RadarChart data={statsData} primaryColor={getTypeColor(pokemon.types[0])} />
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
                  <span className="inline-block w-15 flex-shrink-0 font-medium"
                    style={{
                      color: getTypeColor(pokemon.types[0])
                    }}
                  >[{index + 1}]</span>
                  <p>{desc}</p>
                </div>
              ))}
              {pokemon.descriptions.length > 4 && (
                <Button
                  onClick={() => setShowAllDescriptions(!showAllDescriptions)}
                  className="flex items-center gap-1 mt-2"
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
                    <div className={`w-2 h-2 rounded-full mr-2`}
                    style={{
                      backgroundColor: getTypeColor(pokemon.types[0])
                    }}></div>
                    {ability.name.replaceAll('-', ' ')}
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
        <Card
          className={`overflow-hidden shadow-md border-2`}
          style={{
            borderColor: getTypeColor(pokemon.types[0]),
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="text-gray-500 dark:text-gray-400" size={20} />
              <h2 className="text-xl font-semibold">Weaknesses</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2"> {/* Added flex-wrap and justify-center */}
              {pokemon.weaknesses.map((type, index) => (
                <PokemonTypeIcon key={index} type={type} pageCaller="profile" />
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
            <EvolutionChainCard evolution={pokemon.evolutionChain} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}