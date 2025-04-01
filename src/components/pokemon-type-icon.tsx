import { PokemonType } from "@/types/Pokemon";
import { Badge } from "./ui/badge";

export type PokemonTypeIconProps = {
  type: PokemonType;
};

export function PokemonTypeIcon({ type }: PokemonTypeIconProps) {
  return (
    <Badge variant={'outline'} key={type} className="flex align-center justify-center text-primary-foreground text-base font-medium px-3 py-1 gap-2">
      <img src={`../icons/${type}.svg`} alt={type} className="h-4 w-4" />
      {type}
    </Badge>
  );
}