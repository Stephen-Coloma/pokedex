import { Header } from "@/components/header";
import { PokemonProfileComponent } from "@/components/pokemon-profile-component";
import { Separator } from "@/components/ui/separator";

type PokemonDetailsPageProps = {
  id: number
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