/**
 * Type that represents the evolution chain of the pokemon
 */
export type EvolutionChain = {
  name: string;
  photo: string;
  evolvesTo: EvolutionChain[];
};
