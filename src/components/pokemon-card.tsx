import { Pokemon } from "@/types/Pokemon";
import { Card, CardContent } from "./ui/card";
import { getTypeGradient } from "@/lib/getTypeGradient";
import { PokemonTypeIcon } from "./pokemon-type-icon";
import { Badge } from "./ui/badge";

export type PokemonCardProps = Pokemon;

export function PokemonCard({ id, name, photo, types }: PokemonCardProps) {
  return (
    <Card className={`p-2 w-full max-w-xs overflow-hidden ${getTypeGradient(types)} border-0 shadow-lg`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center items-start mb-2">
          <h2 className="text-2xl font-bold text-primary-foreground drop-shadow-md first-letter:capitalize">{name}</h2>
          <Badge variant={'default'} className="bg-primary/30 rounded-full py-1 px-3 text-base">
            {id.toString().padStart(3, "0")}
          </Badge>
        </div>

        <div className="flex justify-center my-4">
          <div className="relative w-60 h-auto flex justify-center align-center"
          style={{
            backgroundImage: `url('/pokeball-bg.svg')`,
            backgroundSize: 'contain', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          >
            <img
              src={photo}
              alt={name}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center mt-4">
          {types.map((type, index) => (
            <PokemonTypeIcon key={index} type={type}></PokemonTypeIcon>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}