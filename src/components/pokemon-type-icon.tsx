import { PokemonType } from "@/types/Pokemon";

export type PokomonTypeIconProps = {
  type: PokemonType;
};

export function PokomonTypeIcon({ type }: PokomonTypeIconProps) {
  return (
    <div className="flex justify-center items-center rounded-full p-1 h-4 w-4 lg:w-fit lg:h-fit lg:px-2 m-auto bg-[var(--type-water-icon)]">
      <img src={`../icons/${type}.svg`} alt={type} className="h-8 w-8" />
      <h1 className="hidden lg:block ml-2 text-sm">{type}</h1>
    </div>
  );
}
