jQuery(function($) {

var MAX_POKEMON = 6;
var pokemon = new Array();
var weakResist = new Array();
var weakResistColor = new Array();
var weakResistMaxLength = 6;
var fidgetModeEnabled = false;

function fetchPokemon(name) {
	name = name.toLowerCase();
	name = name.replace(/[\.\s'-]/g,"");
	return name;
}

function parseCurrentURL() {
	var currLocation = document.URL;
	var regexFromUrl = currLocation.split("?")[1];
	if (regexFromUrl == undefined) {
		return;
	}
	regexFromUrl = regexFromUrl.split("|");
	if (regexFromUrl == undefined || regexFromUrl.length > 6) {
		return;
	}

	var validPokemonRegex = new RegExp(/(\d{3}|\d{2}|\d{1})([hwfscradtozwbp]?)/);
	var validFormeRegex = new RegExp(/[hwfscradtozwbp]/);
	for (var i = 0; i < regexFromUrl.length; ++i) {
	 	if (!regexFromUrl[i].match(validPokemonRegex)) {
	 		return;
	 	}

	 	var pkmn = parseInt(regexFromUrl[i]);
	 	if (pkmn > 719) {
	 		return;
	 	}

	 	if (pkmn == 351) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "castform"
	 		if (forme == "s") {
	 			name += "sunny";
	 		} else if (forme == "r") {
	 			name += "rainy";
	 		} else if (forme == "f") {
	 			name += "snowy";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 386) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "deoxys";
	 		if (forme == "a") {
	 			name += "attack";
	 		} else if (forme == "d") {
	 			name += "defense";
	 		} else if (forme == "s") {
	 			name += "speed"
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 413) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "wormadam";
	 		if (forme == "s") {
	 			name += "sandy";
	 		} else if (forme == "t") {
	 			name += "trash";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 421) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "cherrim";
	 		if (forme == "s") {
	 			name += "sunshine";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 487) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "giratina";
	 		if (forme == "o") {
	 			name += "origin";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 492) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "shaymin";
	 		if (forme == "s") {
	 			name += "sky";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 555) {
	 		console.log("ugh. darmanitan. seriously???");
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "darmanitan";
	 		if (forme == "z") {
	 			name += "zen";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 641) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "tornadus";
	 		if (forme == "t") {
	 			name += "therian";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 642) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "thundurus";
	 		if (forme == "t") {
	 			name += "therian";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 643) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "landorus";
	 		if (forme == "t") {
	 			name += "therian";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 646) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "kyurem";
	 		if (forme == "w") {
	 			name += "white";
	 		} else if (forme == "b") {
	 			name += "black";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 647) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "keldeo";
	 		if (forme == "r") {
	 			name += "resolute";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else if (pkmn == 648) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "meloetta";
	 		if (forme == "p") {
	 			name += "pirouette";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	}
	 	else if (pkmn == 479) {
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		var name = "rotom";
	 		if (forme == "h") {
	 			name += "heat";
	 		} else if (forme == "w") {
	 			name += "wash"
	 		} else if (forme == "f") {
	 			name += "frost";
	 		} else if (forme == "s") {
	 			name += "fan";
	 		} else if (forme == "c") {
	 			name += "mow";
	 		}
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(name)];
	 	} else {
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(pokemon_url[pkmn - 1])];
	 	}

		// update image/textbox accordingly
		if (pokemon[i]["num"] != undefined) {
			$("#pkmn" + (i + 1) + "img").attr("src","media/pokemon/icons/" + pokemon[i]["num"] + ".png");
		}
		$("#pkmn" + (i + 1) + "input").val(pokemon[i]["species"]);
	}
}

// returns the URL based off of the pokemon we have loaded
function updateLinkForTeam() {
	var baseURL = document.URL.split("?")[0] + "?";
	for (var i = 0; i < pokemon.length; ++i) {
		baseURL += pokemon[i]["num"];

		if (i != pokemon.length -1) {
			baseURL += "|";
		}
	}
	$("#teamUrl").val(baseURL);
}

function initializeWeakResist() {
	for (var i = 0; i < TypeChart.typelookup.length; ++i) {
		weakResist[i] = new Array();
		weakResistColor[i] = new Array();

		for (var j = 0; j < weakResistMaxLength; ++j) {
			weakResist[i][j] = 0;
			weakResistColor[i][j] = "";
		}
	}
}

function updateTable() {
	initializeWeakResist();
	for (var i = 0; i < pokemon.length; ++i) {
		if (pokemon[i] != undefined) {
			var finalIndexArray = new Array();
			for (var j = 0; j < TypeChart.typelookup.length; ++j) {
				finalIndexArray[j] = 3;
			}

			for (var j = 0; j < pokemon[i]['types'].length; ++j) {
				var finalIndexArrayIndex = 0;
				for (type in TypeChart.typechart[pokemon[i]['types'][j]]) {
					if (finalIndexArray[finalIndexArrayIndex] > 0) {
						if (TypeChart.typechart[pokemon[i]['types'][j]][type] == -3) {
							finalIndexArray[finalIndexArrayIndex] = 0;
						} else {
							finalIndexArray[finalIndexArrayIndex] += TypeChart.typechart[pokemon[i]['types'][j]][type];
						}
					}
					finalIndexArrayIndex++;
				}
			}

			for (var ability in pokemon[i]['abilities']) {
				switch(pokemon[i]['abilities'][ability]) {
					case "Dry Skin":
						finalIndexArray[TypeChart.typelookup.indexOf("Water")] = 0;
						finalIndexArray[TypeChart.typelookup.indexOf("Fire")] = 5;
						break;
					case "Solid Rock":
					case "Filter":
						break;
					case "Flash Fire":
						finalIndexArray[TypeChart.typelookup.indexOf("Fire")] = 0;
						break;
					case "Heatproof":
						finalIndexArray[TypeChart.typelookup.indexOf("Fire")] = 3;
						break;
					case "Levitate":
						finalIndexArray[TypeChart.typelookup.indexOf("Ground")] = 0;
						break;
					case "Lightningrod":
					case "Motor Drive":
					case "Volt Absorb":
						finalIndexArray[TypeChart.typelookup.indexOf("Electric")] = 0;
						break;
					case "Sap Sipper":
						finalIndexArray[TypeChart.typelookup.indexOf("Grass")] = 0;
						break;
					case "Storm Drain":
					case "Water Absorb":
						finalIndexArray[TypeChart.typelookup.indexOf("Water")] = 0;
						break;
					case "Thick Fat":
						if (finalIndexArray[TypeChart.typelookup.indexOf("Fire")] > 1) {
							finalIndexArray[TypeChart.typelookup.indexOf("Fire")] -= 1;
						}
						if (finalIndexArray[TypeChart.typelookup.indexOf("Ice")] > 1) {
							finalIndexArray[TypeChart.typelookup.indexOf("Ice")] -= 1;
						}
						break;
			}
		}

			for (var j = 0; j < finalIndexArray.length; ++j) {
				weakResist[j][finalIndexArray[j]]++;
			}
		}
	}
	for (var i = 0; i < weakResist.length; ++i) {
		var totalFourXResists = weakResist[i][0] + weakResist[i][1];
		var totalTwoXResists = weakResist[i][2];

		var totalTwoXWeaks = weakResist[i][4];
		var totalFourXWeaks = weakResist[i][5];

		var totalResist = (totalFourXResists * 2) + totalTwoXResists;
		var totalWeak = (totalFourXWeaks * 2) + totalTwoXWeaks;

		if (((totalResist == 0) && (totalWeak == 0)) || fidgetModeEnabled) { }
		else if (totalResist == totalWeak) {
			for (var j = 0; j < weakResist[i].length; ++j) {
				if ((j < 3) && (weakResist[i][j] > 0)) {
					weakResistColor[i][j] = "green";
				} else if ((j > 3) && (weakResist[i][j] > 0)) {
					weakResistColor[i][j] = "red";
				}
			}
		}
		else if (totalResist > totalWeak) {
			for (var j = 0; j < weakResist[i].length; ++j) {
				if ((j < 3) && (weakResist[i][j] > 0)) {
					weakResistColor[i][j] = "strong-green";
				} else if ((j > 3) && (weakResist[i][j] > 0)) {
					weakResistColor[i][j] = "red";
				}
			}
		} else {
			for (var j = 0; j < weakResist[i].length; ++j) {
				if ((j < 3) && (weakResist[i][j] > 0)) {
					weakResistColor[i][j] = "green";
				} else if ((j > 3) && (weakResist[i][j] > 0)) {
					weakResistColor[i][j] = "strong-red";
				}
			}
		}
	}

	var htmlString = "<table class='table table-condensed table-hover'>\
			<thead>\
				<tr>\
					<th>Type</th>\
					<th>0</th>\
					<th>1/4x</th>\
					<th>1/2x</th>\
					<th>Neutral</th>\
					<th>2x</th>\
					<th>4x</th>\
				</tr>\
			</thead>\
			<tbody>";

	for (var i = 0; i < weakResist.length; ++i) {
		htmlString += "<tr>\
				<th>" + TypeChart.typelookup[i] + "</th>";
		for (var j = 0; j < weakResistMaxLength; ++j) {
			htmlString += "<td class='" + weakResistColor[i][j] + "'>" + weakResist[i][j] + "</td>";
		}
		htmlString += "</tr>";
	}
	htmlString += "</tbody></table>";

	$("#typeChartResults").html(htmlString);
}

$(document).ready(function() {
	parseCurrentURL();
	updateTable();
	updateLinkForTeam();

	$("#teamUrl").tooltip({'container' : 'body', 'placement' : 'bottom'});
	$("#teamUrl").on("click", function () {
   		$(this).select();
	});
	$( "#pkmn1input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[0] != undefined) {
    		pokemon[0] = undefined;
			$( "#pkmn1img" ).attr("src","media/pokemon/icons/0.png");
			updateTable();
			updateLinkForTeam();
    	}
	});
	$( "#pkmn1input" ).autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[0] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];
			// update image/textbox accordingly
			if (pokemon[0]["num"] != undefined) {
				$( "#pkmn1img" ).attr("src","media/pokemon/icons/" + pokemon[0]["num"] + ".png");
			}
			$( "#pkmn1input" ).val(pokemon[0]["species"]);
			updateTable();
			updateLinkForTeam();
    	}
  	});
  	$( "#pkmn2input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[1] != undefined) {
    		pokemon[1] = undefined;
			$( "#pkmn2img" ).attr("src","media/pokemon/icons/0.png");
			updateTable();
			updateLinkForTeam();
    	}
	});
	$( "#pkmn2input" ).autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[1] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];

			// update image/textbox accordingly
			if (pokemon[1]["num"] != undefined) {
				$( "#pkmn2img" ).attr("src","media/pokemon/icons/" + pokemon[1]["num"] + ".png");
			}
			$( "#pkmn2input" ).val(pokemon[1]["species"]);
			updateTable();
			updateLinkForTeam();
    	}
  	});
  	$( "#pkmn3input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[2] != undefined) {
    		pokemon[2] = undefined;
			$( "#pkmn3img" ).attr("src","media/pokemon/icons/0.png");
			updateTable();
			updateLinkForTeam();
    	}
	});
	$( "#pkmn3input" ).autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[2] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];

			// update image/textbox accordingly
			if (pokemon[2]["num"] != undefined) {
				$( "#pkmn3img" ).attr("src","media/pokemon/icons/" + pokemon[2]["num"] + ".png");
			}
			$( "#pkmn3input" ).val(pokemon[2]["species"]);
			updateTable();
			updateLinkForTeam();
    	}
  	});
  	$( "#pkmn4input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[3] != undefined) {
    		pokemon[3] = undefined;
			$( "#pkmn4img" ).attr("src","media/pokemon/icons/0.png");
			updateTable();
			updateLinkForTeam();
    	}
	});
	$( "#pkmn4input" ).autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[3] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];

			// update image/textbox accordingly
			if (pokemon[3]["num"] != undefined) {
				$( "#pkmn4img" ).attr("src","media/pokemon/icons/" + pokemon[3]["num"] + ".png");
			}
			$( "#pkmn4input" ).val(pokemon[3]["species"]);
			updateTable();
			updateLinkForTeam();
    	}
  	});
  	$( "#pkmn5input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[4] != undefined) {
    		pokemon[4] = undefined;
			$( "#pkmn5img" ).attr("src","media/pokemon/icons/0.png");
			updateTable();
			updateLinkForTeam();
    	}
	});
	$( "#pkmn5input" ).autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[4] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];

			// update image/textbox accordingly
			if (pokemon[4]["num"] != undefined) {
				$( "#pkmn5img" ).attr("src","media/pokemon/icons/" + pokemon[4]["num"] + ".png");
			}
			$( "#pkmn5input" ).val(pokemon[4]["species"]);
			updateTable();
			updateLinkForTeam();
    	}
  	});
  	$( "#pkmn6input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[5] != undefined) {
    		pokemon[5] = undefined;
			$( "#pkmn6img" ).attr("src","media/pokemon/icons/0.png");
			updateTable();
			updateLinkForTeam();
    	}
	});
	$( "#pkmn6input" ).autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[5] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];

			// update image/textbox accordingly
			if (pokemon[5]["num"] != undefined) {
				$( "#pkmn6img" ).attr("src","media/pokemon/icons/" + pokemon[5]["num"] + ".png");
			}
			$( "#pkmn6input" ).val(pokemon[5]["species"]);
			updateTable();
			updateLinkForTeam();
    	}
  	});

	$( "#fidget" ).on('click', function() {
		fidgetModeEnabled = !fidgetModeEnabled;
		updateTable();
	});
});
});
