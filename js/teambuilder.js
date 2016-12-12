jQuery(function($) {

var MAX_POKEMON = 6;
var pokemon = new Array();
var weakResist = new Array();
var weakResistColor = new Array();
var weakResistMaxLength = 6;
var moveTable = new Array();
var moveTableColor = new Array();
var moveTableMaxLength = 5;
var fidgetModeEnabled = false;
var shouldValidateForMetagame = 0;

// These are defined globally for simplicity's sake of replacing the forme regex whenever
// new formes/updates are released.
var validPokemonRegex = new RegExp(/(\d{3}|\d{2}|\d{1})([MACRBPDLSGHWFOEIZTU]?)/);
var validFormeRegex = new RegExp(/[MACRBPDLSGHWFOEIZTU]/);

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
	regexFromUrl = regexFromUrl.split( new RegExp(/\||\%7C/));
	if (regexFromUrl == undefined || regexFromUrl.length > 6) {
		return;
	}

	for (var i = 0; i < regexFromUrl.length; ++i) {
	 	if (!regexFromUrl[i].match(validPokemonRegex)) {
	 		return;
	 	}

	 	var pkmn = parseInt(regexFromUrl[i]);
	 	if (pkmn > 801) { // searches through Magearna
	 		return;
	 	}

	 	var forme = regexFromUrl[i].match(validFormeRegex);
	 	var name = pokemon_url[pkmn - 1];
	 	if (forme) {
	 		var pkmnFormeArray = pokedex.pokemon[fetchPokemon(name)]["otherFormes"];

	 		var pkmn;
	 		for (var formeIdx in pkmnFormeArray) {
	 			var possiblePokemon = pokedex.pokemon[pkmnFormeArray[formeIdx]];
	 			if (possiblePokemon != undefined && possiblePokemon["formeLetter"] == forme) {
	 				pkmn = possiblePokemon;
	 				break;
	 			}
	 		}

	 		if (pkmn) {
	 			pokemon[i] = new Pokemon(pkmn);
	 		}
	 	}
	 	if (!pokemon[i]) {
	 		pokemon[i] = new Pokemon(pokedex.pokemon[fetchPokemon(name)]);
	 	}

	 	loadPokemonIntoUISlot(i);

		// update image/textbox accordingly
		$("#pkmn" + (i + 1) + " img").attr("src", pokemon[i].getIconImageURL());
		$("#pkmn" + (i + 1) + " input").val(pokemon[i].data["species"]);
  		$('#pkmn' + (i + 1) + 'collapsesummary > h6').html("Click to Expand");
  		$('#pkmn' + (i + 1) + 'collapsesummary').css('display', 'table');
  		$('#pkmn' + (i + 1)).attr("moreInfo", "summary");
	}
}

// returns the URL based off of the pokemon we have loaded
function updateLinkForTeam() {
	var baseURL = document.URL.split("?")[0] + "?";
	for (var i = 0; i < pokemon.length; ++i) {
		if (pokemon[i]) {
			baseURL += pokemon[i].urlNumber();
			if (i < pokemon.length - 1) {
				baseURL += "|";
			}
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

function updateMovesTable() {
	for (var i = 0; i < TypeChart.typelookup.length; ++i) {
		moveTable[i] = new Array();
		moveTableColor[i] = new Array();

		for (var j = 0; j < moveTableMaxLength; ++j) {
			moveTable[i][j] = 0;
			moveTableColor[i][j] = "";
		}
	}

	// DOESN'T WORK WITH FLYING PRESS YET
	for (var i = 0; i < pokemon.length; ++i) {
		if (pokemon[i] != undefined) {
			var moveArray = pokemon[i].getMoves();
			for (move in moveArray) {
				if (moveArray[move]['category'] == "Status") {
					break;
				}

				var typeIdx = TypeChart.typelookup.indexOf(moveArray[move]['type']);
				if (pokemon[i].moveIsSTAB(moveArray[move])) {
					var stabIdx = (moveArray[move]['category'] == "Physical") ? 1 : 3;
					moveTable[typeIdx][stabIdx]++;
					moveTableColor[typeIdx][stabIdx] = 'green';
				} else {
					var stabIdx = (moveArray[move]['category'] == "Physical") ? 0 : 2;
					moveTable[typeIdx][stabIdx]++;
					moveTableColor[typeIdx][stabIdx] = 'green';
				}
			}
		}
	}

	var htmlString = "<table class='table table-condensed table-hover'>\
		<thead>\
			<tr>\
				<th></th>\
				<th colspan='2'>Physical</th>\
				<th colspan='2'>Special</th>\
			</tr>\
			<tr>\
				<th></th>\
				<th>Non-STAB</th>\
				<th>STAB</th>\
				<th>Non-STAB</th>\
				<th>STAB</th>\
			</tr>\
		</thead>\
		<tbody>";

	for (var i = 0; i < TypeChart.typelookup.length; ++i) {
		htmlString += "<tr>\
				<th>" + TypeChart.typelookup[i] + "</th>";
		for (var j = 0; j < moveTableMaxLength - 1; ++j) {
			htmlString += "<td class='" + moveTableColor[i][j] + "'>" + moveTable[i][j] + "</td>";
		}
		htmlString += "</tr>";
	}
	htmlString += "</tbody></table>";

	$("#moveChartResults").html(htmlString);
}

function updateTable() {
	initializeWeakResist();
	for (var i = 0; i < pokemon.length; ++i) {
		if (pokemon[i] != undefined) {
			var finalIndexArray = new Array();
			for (var j = 0; j < TypeChart.typelookup.length; ++j) {
				finalIndexArray[j] = 3;
			}

			var typeArray = pokemon[i].data['types'];
			for (var j = 0; j < typeArray.length; ++j) {
				var finalIndexArrayIndex = 0;
				for (type in TypeChart.typechart[typeArray[j]]) {
					if (finalIndexArray[finalIndexArrayIndex] > 0) {
						if (TypeChart.typechart[typeArray[j]][type] == -3) {
							finalIndexArray[finalIndexArrayIndex] = 0;
						} else {
							finalIndexArray[finalIndexArrayIndex] += TypeChart.typechart[typeArray[j]][type];
						}
					}
					finalIndexArrayIndex++;
				}
			}

			var abilityArray;
			if (pokemon[i].getAbility() != undefined) {
				abilityArray = new Array(pokemon[i].getAbility());
			} else {
				abilityArray = pokemon[i].data['abilities'];
			}

			for (var ability in abilityArray) {
				switch(abilityArray[ability]) {
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

	// drawing/shared logic probably starts here...?
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

function updateAbilitiesForPokemon(pokemon, selector) {
	var abilitiesArray = pokemon.abilities;
	var keyArray = Object.keys(abilitiesArray);
	for (var i = 0; i < keyArray.length; ++i) {
		$(selector + "collapse select").append($("<option></option>").text(abilitiesArray[keyArray[i]])); 
	}

}

function applyMetagameFiltering() {
	var legalityFunction;
	switch(shouldValidateForMetagame) {
		case 1: // vgc 14
			legalityFunction = pokedex.isVGC2014;
			break;
		default: // no filtering applied
			for (var i = 0; i < pokemon.length; ++i) {
				$("#pkmn" + (i + 1) + "valid").html("");
			}
			return;
	}

	for (var i = 0; i < pokemon.length; ++i) {
		if (pokemon[i] != undefined) {
			var isLegal = legalityFunction(pokemon[i].data);
  			if (isLegal) {
  				$("#pkmn" + (i + 1) + " > .validationCell").html("<i class='fa fa-check' style='color: green'></i>");
  			} else {
  				$("#pkmn" + (i + 1) + " > .validationCell").html("<i class='fa fa-times' style='color: red;'></i>");
  			}
  		} else {
  			$("#pkmn" + (i + 1) + " > .validationCell").html();
  		}
  	}
}

function loadPokemonIntoUISlot(uiSlot) {
	if (pokemon[uiSlot].data["num"] != undefined) {
		$( "#pkmn" + (uiSlot + 1) + " img" ).attr("src", pokemon[uiSlot].getIconImageURL());
	}
	updateAbilitiesForPokemon(pokemon[uiSlot].data, "#pkmn" + (uiSlot + 1));

	// attach autocomplete to all moves.
	$('#pkmn' + (uiSlot + 1) + 'collapse #moveContainer input').autocomplete({
		source: pokemon[uiSlot].getAutocompleteArray(),
		select: function (e, ui) {
			var j = parseInt(this.parentNode.parentNode.getAttribute("pokemon"), 10);
			moveIdx = parseInt(this.getAttribute("move"), 10);
			pokemon[j].setMoves(ui.item.value.toLowerCase().replace(/\.|\-|\s/g, ''), moveIdx);
			updateMovesTable();
		}
	});
}

function pokemonUpdated() {
	updateTable();
	updateLinkForTeam();
	applyMetagameFiltering();
	updateMovesTable();
}

$(document).ready(function() {
	parseCurrentURL();
	pokemonUpdated();

	$("#teamUrl").tooltip({'container' : 'body', 'placement' : 'bottom'});
	$("#teamUrl").on("click", function () {
   		$(this).select();
	});

	for (var i = 0; i < MAX_POKEMON; ++i) {
		$( "#pkmn" + (i + 1) +" input" ).on('input', function() {
			i = parseInt(this.getAttribute("pokemon"), 10);
    		if (pokedex.pokemon[this.value.toLowerCase().replace(/\.|\-|\s/g, '')] == undefined && pokemon[i] != undefined) {
    			pokemon[i] = undefined;

    			// update UI
    			$('#pkmn' + (i + 1) + 'collapsesummary').css('display', 'none');
				$('#pkmn' + (i + 1) + ' img').attr("src","media/pokemon/icons/0.png");
				$('#pkmn' + (i + 1) + 'collapse').collapse('hide');
				$('#pkmn' + (i + 1)).attr("moreInfo", "hidden");
				$('#pkmn' + (i + 1) + ' > .input-group-addon').attr("moreInfo", "hidden");
				$('#pkmn' + (i + 1) + ' input').attr("moreInfo", "hidden");
				$("#pkmn" + (i + 1) + "collapse select").empty().append('<option selected="selected">Select Ability</option>');
				$('#pkmn' + (i + 1) + 'collapse #moveContainer input').autocomplete("destroy");
				$('#pkmn' + (i + 1) + 'collapse #moveContainer input').val("");

				pokemonUpdated();
    		}
		});
		$( "#pkmn" + (i + 1) + " input" ).autocomplete({
    		source: pokemon_autocomplete,
    		select: function (e, ui) {
    			i = parseInt(this.getAttribute("pokemon"), 10);
				pokemon[i] = new Pokemon(pokedex.pokemon[ui.item.value.toLowerCase().replace(/\.|\-|\s/g, '')]);
				$( "#pkmn" + (i + 1) + " input" ).val(pokemon[i].data["species"]);

				loadPokemonIntoUISlot(i);
				$('#pkmn' + (i + 1) + 'collapse').collapse('show');
				$('#pkmn' + (i + 1)).attr("moreInfo", "shown");
				$('#pkmn' + (i + 1) + ' > .input-group-addon').attr("moreInfo", "shown");
				$('#pkmn' + (i + 1) + ' input').attr("moreInfo", "shown");
				pokemonUpdated();
    		}
  		});
		$( "#pkmn" + (i + 1) + "collapse select" ).on('change', function() {
			var j = parseInt(this.parentNode.getAttribute("pokemon"), 10);
			if (this.value == "Select Ability") {
				pokemon[j].setAbility(undefined);
			} else {
				pokemon[j].setAbility(this.value);
			}
			pokemonUpdated();
		});
		$( "#pkmn" + (i + 1) + "collapse span" ).on('click', function() {
  			// generate new summary
  			var j = parseInt(this.parentNode.getAttribute("pokemon"), 10);
  			var summaryString = pokemon[j].summary();
  			$('#pkmn' + (j + 1) + 'collapsesummary > h6').html( (summaryString != "") ? summaryString : "Click to Expand");
  			$('#pkmn' + (j + 1) + 'collapsesummary').css('display', 'table');

  			$('#pkmn' + (j + 1) + 'collapse').collapse('hide');
  			$('#pkmn' + (j + 1)).attr("moreInfo", "summary");
			$('#pkmn' + (j + 1) + ' > .input-group-addon').attr("moreInfo", "hidden");
			$('#pkmn' + (j + 1) + ' input').attr("moreInfo", "hidden");
  		});
  		$( "#pkmn" + (i + 1) + "collapsesummary" ).on('click', function() {
  			var j = parseInt(this.getAttribute("pokemon"), 10);
  			$('#pkmn' + (j + 1) + 'collapsesummary').css('display', 'none');
			$('#pkmn' + (j + 1) + 'collapse').collapse('show');
			$('#pkmn' + (j + 1)).attr("moreInfo", "shown");
			$('#pkmn' + (j + 1) + ' > .input-group-addon').attr("moreInfo", "shown");
			$('#pkmn' + (j + 1) + ' input').attr("moreInfo", "shown");
  		});
	}

  	$("#vgc14").click(function() {
  		$("#metagameButtonText").text("VGC 2014");
  		shouldValidateForMetagame = 1;
  		applyMetagameFiltering();
  	});
  	$("#nofilter").click(function() {
		$("#metagameButtonText").text("Select Metagame");
  		shouldValidateForMetagame = 0;
  		applyMetagameFiltering();
  	});
});
});
