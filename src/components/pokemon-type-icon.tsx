import { PokemonType } from "@/types/Pokemon";
import { Badge } from "./ui/badge";
import { getTypeColor } from "@/lib/colors";

export type PokemonTypeIconProps = {
  type: PokemonType;
};

export function PokemonTypeIcon({ type }: PokemonTypeIconProps) {
  return (
    <Badge 
      className={`flex align-center justify-center rounded-full text-white text-xs font-medium px-2 py-1 gap-2`}
      style={{backgroundColor: getTypeColor(type)}}
    >
      <img src={`../icons/${type}.svg`} alt={type} className="h-3 w-3" />
      {type}
    </Badge>
  );
}