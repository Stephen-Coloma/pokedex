/**
 * This function returns the photo url of a pokemon id.
 * It formates the id by these conditions:
 * 1. 1 digit - add two zeros as start padding.
 * 2. 2 digit - add one zero as start padding.
 * 3. 3 digit or more - retains the id.
 * 
 * @param id pokemon id
 * @returns formatted photo url for displaying.
 */
export default function getPhotoURL(id: number): string {
	let formattedId = '';
  if (id < 10) {
		formattedId = id.toString().padStart(3, '0');
  } else if (id < 100) {
    formattedId = id.toString().padStart(3, '0');
  } else {
    formattedId = id.toString();
  }
	return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`
}