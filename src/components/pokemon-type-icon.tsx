import { PokemonType } from "@/types/PokemonType";
import { Badge } from "./ui/badge";
import { getTypeColor } from "@/lib/colors";

export type PokemonTypeIconProps = {
  type: PokemonType;
  pageCaller: string;
};

export function PokemonTypeIcon({ type, pageCaller }: PokemonTypeIconProps) {
  return (
    <Badge
      className={`flex align-center justify-center rounded-full text-white text-xs font-medium px-1 py-1 sm:px-2 sm:py-1 gap-2`}
      style={{
        backgroundColor: getTypeColor(type),
      }}
    >
      <img src={`../icons/${type}.svg`} alt={type} className="h-3 w-3" />
      <span
        className={`sm:inline-block ${pageCaller === "profile" ? "inline-block" : "hidden"}`}
      >
        {type}
      </span>
    </Badge>
  );
}
