import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { getPokemonProfile } from "@/actions/getPokemonProfile";
import { PokemonProfileComponent } from "@/components/pokemon-profile-component";

export async function generateStaticParams() {
  const pokemonIds = Array.from({length: 1009}, (_, index) => index + 1)
 
  return pokemonIds.map((id) => ({
    id: id.toString(),
  }))
}

export default async function Pokemon({params}: {params: Promise<{id: number}>}) {
  const{ id } = await params;

  const pokemon = await getPokemonProfile(id);

  return(
    <div className="container mx-auto w-full px-5">
      <Header></Header>
      <Separator></Separator>
      <div className="container mx-auto py-8 max-w-5xl">
        <PokemonProfileComponent pokemon={pokemon}/>
      </div>
    </div>
  );
}