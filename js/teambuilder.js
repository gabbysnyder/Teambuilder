jQuery(function($) {
// Dear Marrilland,
// Sorry I stole your shit and made it more awesome.
// - JTK
//

var MAX_POKEMON = 6;
var pokemon = new Array();
var weakResist = new Array();
var weakResistColor = new Array();
var weakResistMaxLength = 6;

function fetchPokemon(name) {
	name = name.toLowerCase();
	name = name.replace(/[\.\s]/g,"");
	console.log("name: " + name);
	return name;
}

// function to parse URL, trying to get different pokemon for linking capabilities
// regex for numbers: (\d{3}|\d{2}|\d{1})[hwfsmradtozwbp]?
// what we need to validate for
//   - if castform (351), no letter = normal; s(unny), r(ainy), f(rost)
//   - if deoxys (386), no letter = normal; a(ttack), d(efense), s(peed)
//   - if wormadam (413),  no letter = grass; s(andy), t(rash)
//   - if cherrim (421), no letter = overcast, s(unshine)
//   - if giratina (487), no letter = altered, o(rigin)
//   - if shaymin (492), no letter = land, s(ky)
//   - if darmanitan (555), no letter = standard, z(en)
//   - if tornadus/thundurus/landorus (641/642/645), t(herian)
//   - if kyurem (646), w(hite) / b(lack)
//   - if keldeo (647), r(esolute)
//   - meloetta (648), p(irouette)
//   - spiky eared pichu (just do it srsly)
// 	 ONLY ROTOM WORKS RIGHT NOW
function parseCurrentURL() {
	var currLocation = document.URL;
	var regexFromUrl = currLocation.split("?")[1].split("|");
	console.log(regexFromUrl);

	// quit if more than six.
	if (regexFromUrl.length > 6) {
		console.log("too long");
		return;
	}

	// quit if we find non number, invalid number
	var validPokemonRegex = new RegExp(/(\d{3}|\d{2}|\d{1})([hwfscradtozwbp]?)/);
	var validFormeRegex = new RegExp(/[hwfscradtozwbp]/);
	for (var i = 0; i < regexFromUrl.length; ++i) {
	 	if (!regexFromUrl[i].match(validPokemonRegex)) {
	 		return;
	 	}

	 	var pkmn = parseInt(regexFromUrl[i]);
	 	console.log(pkmn);
	 	if (pkmn > 719) {
	 		return; // THERE AREN'T THAT MANY POKEMON YET
	 	}

	 	if (pkmn == 479) { // Rotom
	 		var forme = regexFromUrl[i].match(validFormeRegex);
	 		console.log("Forme: " + forme);

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
	 		console.log(pokemon[i]);

	 	} else {
	 		console.log(pokemon_autocomplete[pkmn]);
	 		pokemon[i] = pokedex.pokemon[fetchPokemon(pokemon_autocomplete[pkmn])];
	 		console.log(pokemon[i]);
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

	console.log(baseURL);
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

		if ((totalResist == 0) && (totalWeak == 0)) {
		}
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

	for (var i = 1; i <= MAX_POKEMON; ++i) {
		$( "#pkmn" + i +"input" ).on('input', function() {
    		if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[i - 1] != undefined) {
    			pokemon[i - 1] = undefined;
				$( "#pkmn" + i +"img" ).attr("src","media/pokemon/icons/0.png");
				updateTable();
				updateLinkForTeam();
    		}
		});
		$( "#pkmn" + i +"input" ).autocomplete({
    		source: pokemon_autocomplete,
    		select: function (e, ui) {
				pokemon[i - 1] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];

				// update image/textbox accordingly
				if (pokemon[i - 1]["num"] != undefined) {
					$( "#pkmn" + i +"img" ).attr("src","media/pokemon/icons/" + pokemon[i - 1]["num"] + ".png");
				}
				$( "#pkmn" + i +"input" ).val(pokemon[i - 1]["species"]);
				updateTable();
				updateLinkForTeam();
    		}
  		});
	}
});
});
