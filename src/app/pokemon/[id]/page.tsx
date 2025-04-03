import { PokemonProfileComponent } from "@/components/pokemon-profile";

type PokemonDetailsPageProps = {
  id: number
}

export default async function Pokemon({params}: {params: Promise<PokemonDetailsPageProps>}) {
  const{ id } = await params;
  return(
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <PokemonProfileComponent id={id}/>
    </div>
  );
}