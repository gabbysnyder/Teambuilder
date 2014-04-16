jQuery(function($) {
// Dear Marrilland,
// Sorry I stole your shit and made it more awesome.
// - JTK
//

var pokemon = new Array();
var weakResist = new Array();
var weakResistColor = new Array();
var weakResistMaxLength = 6;

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
	updateTable();

	$( "#pkmn1input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[0] != undefined) {
    		pokemon[0] = undefined;
			$("#pkmn1img").attr("src","/wp-content/themes/destro/images/pokemon/icons/0.png");
			updateTable();
    	}
	});
	$("#pkmn1input").autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[0] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];

			// update image/textbox accordingly
			if (pokemon[0]["num"] != undefined) {
				$("#pkmn1img").attr("src","/wp-content/themes/destro/images/pokemon/icons/" + pokemon[0]["num"] + ".png");
			}
			$("#pkmn1input").val(pokemon[0]["species"]);
			updateTable();
    	}
  	});

  	$( "#pkmn2input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[1] != undefined) {
    		pokemon[1] = undefined;
			$("#pkmn2img").attr("src","/wp-content/themes/destro/images/pokemon/icons/0.png");
			updateTable();
    	}
	});
	$("#pkmn2input").autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[1] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];
			
			// update image/textbox accordingly
			if (pokemon[1]["num"] != undefined) {
				$("#pkmn2img").attr("src","/wp-content/themes/destro/images/pokemon/icons/" + pokemon[1]["num"] + ".png");
			}
			$("#pkmn2input").val(pokemon[1]["species"]);
			updateTable();
    	}
  	});

  	$( "#pkmn3input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[2] != undefined) {
    		pokemon[2] = undefined;
			$("#pkmn3img").attr("src","/wp-content/themes/destro/images/pokemon/icons/0.png");
			updateTable();
    	}
	});
	$("#pkmn3input").autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[2] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];
			
			// update image/textbox accordingly
			if (pokemon[2]["num"] != undefined) {
				$("#pkmn3img").attr("src","/wp-content/themes/destro/images/pokemon/icons/" + pokemon[2]["num"] + ".png");
			}
			$("#pkmn3input").val(pokemon[2]["species"]);
			updateTable();
    	}
  	});

  	$( "#pkmn4input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[3] != undefined) {
    		pokemon[3] = undefined;
			$("#pkmn4img").attr("src","/wp-content/themes/destro/images/pokemon/icons/0.png");
			updateTable();
    	}
	});
	$("#pkmn4input").autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[3] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];
			
			// update image/textbox accordingly
			if (pokemon[3]["num"] != undefined) {
				$("#pkmn4img").attr("src","/wp-content/themes/destro/images/pokemon/icons/" + pokemon[3]["num"] + ".png");
			}
			$("#pkmn4input").val(pokemon[3]["species"]);
			updateTable();
    	}
  	});

  	$( "#pkmn5input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[4] != undefined) {
    		pokemon[4] = undefined;
			$("#pkmn5img").attr("src","/wp-content/themes/destro/images/pokemon/icons/0.png");
			updateTable();
    	}
	});
	$("#pkmn5input").autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[4] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];
			
			// update image/textbox accordingly
			if (pokemon[4]["num"] != undefined) {
				$("#pkmn5img").attr("src","/wp-content/themes/destro/images/pokemon/icons/" + pokemon[4]["num"] + ".png");
			}
			$("#pkmn5input").val(pokemon[4]["species"]);
			updateTable();
    	}
  	});

  	$( "#pkmn6input" ).on('input', function() {
    	if (pokedex.pokemon[this.value.toLowerCase().replace(/\-/g, '')] == undefined && pokemon[5] != undefined) {
    		pokemon[5] = undefined;
			$("#pkmn6img").attr("src","/wp-content/themes/destro/images/pokemon/icons/0.png");
			updateTable();
    	}
	});
	$("#pkmn6input").autocomplete({
    	source: pokemon_autocomplete,
    	select: function (e, ui) {
			pokemon[5] = pokedex.pokemon[ui.item.value.toLowerCase().replace(/\-/g, '')];
			
			// update image/textbox accordingly
			if (pokemon[5]["num"] != undefined) {
				$("#pkmn6img").attr("src","/wp-content/themes/destro/images/pokemon/icons/" + pokemon[5]["num"] + ".png");
			}
			$("#pkmn6input").val(pokemon[5]["species"]);
			updateTable();
    	}
  	});
});
});
