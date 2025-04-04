import { PokemonProfile } from "@/components/pokemon-profile";

type PokemonDetailsPageProps = {
  id: number
}

export default async function Pokemon({params}: {params: Promise<PokemonDetailsPageProps>}) {
  const{ id } = await params;

  return(
    <PokemonProfile id={id}/>
  );
}