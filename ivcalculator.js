// IV calculator...

// The pokemon we're interested in doing calcs for
var pokemon = {};

// init page
$(document).ready(function() {

  // autocomplete:
  $("#eggCalc_child #pokemon").autocomplete({
    source: pokemon_autocomplete,
    select: function (e, ui) {
        loadPokemon(ui.item.value);
    }
  });
});

// Loads Pokemon into "memory".
// TODO: This function should probably be rearranged a bit so it makes more sense.
function loadPokemon(name) {
	console.log(name.toLowerCase());
	pokemon.dex = pokedex.pokemon[name.toLowerCase()];
	console.log(pokemon.dex);

	if (pokemon.dex != undefined) {
		// We found a pokemon.

		// load image
		$("#eggCalc_child #img").html("<img src='media/pokemon/dw/" + pokemon.dex.num + ".png' />");

		// enable all the things
		$("#eggCalc_child #stats #statRow #level").removeAttr("disabled");
		$("#eggCalc_child #stats #statRow div > input").removeAttr("disabled");
		$("#eggCalc_child #stats #statRow div > input").removeAttr("disabled");
	}
}

// calculates non-HP stat based off of passed parameters
// formula: (([IV + (2 x base) + (EV/4)] x level / 100 ) + 5 ) x nature

// (((stat / nature) - 5) * (100 / level)) - (2 x base) - (ev/4) = IV

function calculateIV(stat, ev, base, level, nature) {
	var total = (stat / nature) - 5;
	total = total * (100 / level);
	total = total - (2 * base) - (ev/4);

	return Math.floor(total);
}

// calculates HP stat based off of passed parameters
// formula: (IV + (2 * Base) + (EV/4) + 100) * Level / 100 + 10
function calculateIVHP(stat, ev, base, level) {
	var total = stat - 10;
	total = total * (100 / level);
	total = total - (2 * base) - (ev/4) - 100;

	return Math.floor(total);
}