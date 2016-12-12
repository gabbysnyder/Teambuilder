/**
 * Pokemon data structure
 * Stores stuff related to the Pokemon we're dealing with.
 */

// Constructor. Takes in data.
 function Pokemon(data) {
 	this.data = data;

 	// init other values to nil to be safe.
 	this.ability = undefined;
 	this.moves = new Array(4);

 	// autocomplete
 	this.generateAutocompleteList();
 }

// set this pokemon's current ability based off of what was selected (default = undefined)
Pokemon.prototype.setAbility = function(ability) {
	this.ability = ability;
}
Pokemon.prototype.getAbility = function() {
	return this.ability;
};

Pokemon.prototype.setMoves = function(move, idx) {
	this.moves[idx] = pokedex.moves[move];
	console.log(this.moves);
};
Pokemon.prototype.getMoves = function() {
	return this.moves;
}
Pokemon.prototype.moveIsSTAB = function(move) {
	return this.data["types"].indexOf(move["type"]) >= 0;
}

Pokemon.prototype.urlNumber = function () {
	var urlNumber;

	var number = this.data["num"];
	if (number != undefined) {
		urlNumber = number;
	} else {
		return ""; // if the number isn't defined, this isn't a pokemon.
	}

	var formeLetter = this.data["formeLetter"];
	if (formeLetter) {
		urlNumber += formeLetter;
	}

	return urlNumber;
}

Pokemon.prototype.getIconImageURL = function() {
	var imageURL = "media/pokemon/icons/";

	var number = this.data["num"];
	if (number != undefined) {
		imageURL += number;
	} else {
		return ""; // if the number isn't defined, this isn't a pokemon.
	}

	var formeLetter = this.data["formeLetter"];
	if (formeLetter && (number != "493") && (number != "649") && (number != "710") && (number != "711")) { // arceus, genesect don't work right now. Pumpkaboo/Gourgeist shouldn't work ever.
		imageURL += formeLetter;
	}

	return imageURL + ".png";
}

// creates summary string for display
Pokemon.prototype.summary = function() {
	var finalString = "";
	if (this.ability != undefined) {
		finalString += "<small>Ability:</small> " + this.ability + " ";
	}

	var movesString = "";
	for (var i = 0; i < this.moves.length; ++i) {
		if (this.moves[i] == undefined) {
			break;
		}

		if (i > 0) {
			movesString += " / ";
		}

		movesString += this.moves[i]['name'];
	}
	if (movesString != "") {
		finalString += "<small>Moves:</small> " + movesString;
	}
	return finalString;
}

Pokemon.prototype.getAutocompleteArray = function() {
	return this.autocomplete;
};
// create moveset autocomplete list
Pokemon.prototype.generateAutocompleteList = function() {
	if (this.autocompleteArray) {
		return; // only do this once per pokemon
	}

	// THIS WILL FAIL WITH ROTOM/PUNCTUATION FIGURE OUT A BETTER WAY TO DO THIS.
	var pokemon = pokedex.learnsets[this.data["species"].toLowerCase().replace(/\.|\-|\s/g, '')];

	if (!pokemon) {
		pokemon = pokedex.learnsets[this.data["baseSpecies"].toLowerCase().replace(/\.|\-|\s/g, '')]
	}

	var learnset = pokemon["learnset"];
	this.autocomplete = [];
	for (move in learnset) {
		this.autocomplete.push(pokedex.moves[move]["name"]);
	}
}