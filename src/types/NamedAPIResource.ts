/**
 * A type that is matched to the request result of the endpoint:
 * https://pokeapi.co/api/v2/{endpoint}/
 * to better manage types.
 */
export type NamedAPIResourceList = {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
};

/**
 * A type that is matched to the type of "results" in NamedAPIResourceList that is based on
 * the same api endpoint.
 */
export type NamedAPIResource = {
  name: string;
  url: string;
};