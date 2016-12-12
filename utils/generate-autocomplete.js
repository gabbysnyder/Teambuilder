// Utils files, you run these things to get update data.

function generatePokemonNameAutocompleteArray() {
	var pokemonNames = [];
	for (var key in pokedex.pokemon) {
  		if (pokedex.pokemon.hasOwnProperty(key)) {
    		pokemonNames.push(pokedex.pokemon[key].species);
  		}
	}


	var finalNameString = "[\"";
	for (var name in pokemonNames) {
		finalNameString += pokemonNames[name] + "\", \"";
	}
	console.log(finalNameString);
}

function generatePokemonURLAutocompleteArray() {
	var pokemonNames = [];

	var noFormesRegex = new RegExp("/-/");
	for (var key in pokedex.pokemon) {
  		if ((pokedex.pokemon[key].formeLetter == undefined) && pokedex.pokemon.hasOwnProperty(key)) {
    		pokemonNames.push(pokedex.pokemon[key].species);
  		}
	}

	var finalNameString = "[\"";
	for (var name in pokemonNames) {
		finalNameString += pokemonNames[name] + "\", \"";
	}
	console.log(finalNameString);
}

/**
 * Used to make making regexes easier, because screw that.
 */
function generateFormeLetterSuffixString() {
	var formeLetters = [];
	for (var key in pokedex.pokemon) {
		if (pokedex.pokemon[key].formeLetter != undefined) {
			formeLetters.push(pokedex.pokemon[key].formeLetter);
		}
	}

	var finalFormeString = "";
	for (var forme in formeLetters) {
		if (!finalFormeString.includes(formeLetters[forme])) {
			finalFormeString += formeLetters[forme];
		}
	}
	console.log(finalFormeString);
}