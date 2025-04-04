import { PokemonType } from "@/types/Pokemon";

// Type color mapping for gradients
const typeGradients: Record<PokemonType, string> = {
  normal: "from-gray-300 to-gray-400",
  fire: "from-orange-400 to-red-500",
  water: "from-blue-400 to-blue-700",
  electric: "from-yellow-300 to-amber-500",
  grass: "from-green-400 to-emerald-600",
  ice: "from-blue-200 to-cyan-400",
  fighting: "from-red-400 to-red-900",
  poison: "from-purple-400 to-purple-700",
  ground: "from-amber-500 to-amber-700",
  flying: "from-indigo-200 to-indigo-400",
  psychic: "from-pink-400 to-pink-600",
  bug: "from-lime-400 to-lime-600",
  rock: "from-yellow-600 to-yellow-800",
  ghost: "from-purple-600 to-purple-800",
  dragon: "from-indigo-500 to-indigo-700",
  dark: "from-gray-500 to-gray-800",
  steel: "from-gray-400 to-gray-600",
  fairy: "from-pink-300 to-pink-500",
}

//Type mapping for pokemon type
const typeColors: Record<PokemonType, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

export function getTypeGradient(types: PokemonType[]){
  if (types.length === 0) return "bg-gradient-to-br from-gray-300 to-gray-400"

    if (types.length === 1) {
      return `bg-gradient-to-br ${typeGradients[types[0]]}`
    }

    // dual type pokemon
    const firstTypeFrom = typeGradients[types[0]]?.split(" ")[0];
    const secondTypeTo = typeGradients[types[1]]?.split(" ")[1];

    return `bg-gradient-to-br ${firstTypeFrom} ${secondTypeTo}`
}


export function getTypeColor(type: PokemonType): string{
  return typeColors[type];
}

export function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};