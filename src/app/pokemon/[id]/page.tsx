import { Header } from "@/components/header";
import { PokemonProfileComponent } from "@/components/pokemon-profile-component";
import { Separator } from "@/components/ui/separator";

type PokemonDetailsPageProps = {
  id: number
}

export async function generateStaticParams() {
  const pokemonIds = Array.from({length: 1009}, (_, index) => index + 1)
 
  return pokemonIds.map((id) => ({
    id: id.toString(),
  }))
}

export default async function Pokemon({params}: {params: Promise<PokemonDetailsPageProps>}) {
  const{ id } = await params;
  return(
    <div className="container mx-auto w-full px-5">
      <Header></Header>
      <Separator></Separator>
      <div className="container mx-auto py-8 max-w-5xl">
        <PokemonProfileComponent id={id}/>
      </div>
    </div>
  );
}