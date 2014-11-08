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

		movesString += this.moves[i]['name'];
		if (i < this.moves.length - 1) {
			movesString += " / ";
		}
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
	var learnset = pokedex.learnsets[this.data["species"].toLowerCase().replace(/\.|\-|\s/g, '')]["learnset"];
	this.autocomplete = [];
	for (move in learnset) {
		this.autocomplete.push(pokedex.moves[move]["name"]);
	}
}