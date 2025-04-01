import { PokemonCard } from "@/components/pokemon-card";
import getPhotoURL from "@/lib/getPhotoURL";
import { Pokemon } from "@/types/Pokemon";

export default function Home() {
  const pokemon1: Pokemon ={
    id: 405,
    name: 'luxray',
    photo: getPhotoURL(405),
    types: ['electric']
  }
  const pokemon2: Pokemon ={
    id: 134,
    name: 'vaporeon',
    photo: getPhotoURL(134),
    types: ['water']
  }
  const pokemon3: Pokemon ={
    id: 484,
    name: 'palkia',
    photo: getPhotoURL(484),
    types: ['psychic', 'dragon',]
  }
  const pokemon4: Pokemon ={
    id: 491,
    name: 'darkrai',
    photo: getPhotoURL(491),
    types: ['dark']
  }
  const pokemon5: Pokemon ={
    id: 383,
    name: 'groudon',
    photo: getPhotoURL(383),
    types: ['ground']
  }
  const pokemon6: Pokemon ={
    id: 17,
    name: 'pidgeot',
    photo: getPhotoURL(17),
    types: ['flying']
  }
  const pokemon7: Pokemon ={
    id: 670,
    name: 'floette',
    photo: getPhotoURL(670),
    types: ['fairy']
  }
  const pokemon8: Pokemon ={
    id: 68,
    name: 'machamp',
    photo: getPhotoURL(68),
    types: ['fighting']
  }
  const pokemon9: Pokemon ={
    id: 1,
    name: 'bulbasaur',
    photo: getPhotoURL(1),
    types: ['grass']
  }
  const pokemon10: Pokemon ={
    id: 25,
    name: 'pikachu',
    photo: getPhotoURL(25),
    types: ['electric']
  }
  return(
    <div className="mx-auto border-4 w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
      <PokemonCard {...pokemon1} />
      <PokemonCard {...pokemon2} />
      <PokemonCard {...pokemon3} />
      <PokemonCard {...pokemon4} />
      <PokemonCard {...pokemon5} />
      <PokemonCard {...pokemon6} />
      <PokemonCard {...pokemon7} />
      <PokemonCard {...pokemon8} />
      <PokemonCard {...pokemon9} />
      <PokemonCard {...pokemon10} />
    </div>
  )
}
