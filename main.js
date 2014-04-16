/*

Development notes:
 - We're going to have to finangle the MVC pattern a bit, mostly making sure
   that we keep things updated as necessary.
 - THIS IS THE WORST JQUERY EVER
 - Actually it might not be, use jQuery to keep static content updated.
 - IT REALLY IS THAT BAD HOLY SHIT.

 To-Do:
  - Pictures next to names for autocomplete.
  - Modular pop-over for Bullet Seed/Multi-Hit calculations (user supplies what parameters they want for that
    because lol that's a lot of math to just ~do~)

Edge cases to keep in mind:
  - Shedinja - Always has HP of one.

  Next step - accomplish by 6/4/13
    - Implement correct stat calculations including...
      - Nature bonuses
      - -6/+6 modifiers
*/

// The attacking/defending Pokemon
var attacker = {}, defender = {};

// calculates non-HP stat based off of passed parameters
// formula: (([IV + (2 x base) + (EV/4)] x level / 100 ) + 5 ) x nature
function calculateStat(iv, ev, base, level, nature) {
	var total = iv + (2 * base) + (ev / 4);
	total = total * level;
	total = total / 100;
  total = Math.floor(total + 5);

	return Math.floor(total * nature);
}

// calculates HP stat based off of passed parameters
// formula: (IV + (2 * Base) + (EV/4) + 100) * Level / 100 + 10
function calculateStatHP(iv, ev, base, level) {
  var total = iv + (2 * base) + (ev / 4) + 100;
  total = total * level;
  total = total / 100;
  return Math.floor(total + 10);
}

// When the document loads, we only attach listeners to things that are enabled
// right away (just attacker/defender at the moment.)
$(document).ready(function() {

  // hide stuff
  $("#attacker #infobox").hide();
  $("#defender #infobox").hide();
  $("#move1_infobox").hide(); 

  // Enable Tooltips.
  $("#move1_infobox #name").tooltip();  

  // attach listeners
  attachListeners();
});

function attachListeners() {
  // these listeners are independant of what Pokemon we're dealing with
  
  // BIDOOFATTACKER:
  // autocomplete:
  $("#attacker #pokemon").autocomplete({
    source: pokemon_autocomplete,
    select: function (e, ui) {
        loadAttacker(ui.item.value);
    }
  });

  // natures
  $("#attacker #nature").autocomplete({
    source: function(request, response) {
        var results = $.ui.autocomplete.filter(nature_autocomplete, request.term);

        response(results.slice(0, 5));
      },
    select: function (e, ui) {
      // recalculate all stats I guess.
      console.log("nature selected.");
      attacker.nature = ui.item.value;
      console.log(attacker.nature);

      var newStat = calculateStat(attacker.attack.ivs, attacker.attack.evs, attacker.dex["baseStats"]["atk"], 
        attacker.level, Calculator.nature[attacker.nature][0]);
      attacker.attack.total = newStat;
      $("#attacker #attack #total").val(newStat);
    }
  });

  // items
  $("#attacker #item").autocomplete({
    source: items_autocomplete,
    select: function (e, ui) {
      // try to pull item from items.js
      var itemIdx = ui.item.value.toLowerCase().replace(/\s+/g, '');
      console.log(itemIdx);

      console.log(pokedex.items[itemIdx]);

    }
  });

  // level
  $("#attacker #level").keyup(function () {
    if ($("#attacker #level").val() == "" || isNaN($("#attacker #level").val())) {
      $("#attacker #level").val("");
      // keep this a number so our stat calculations don't break...
      attacker.level = 1;
    } else {
      attacker.level = parseInt($("#attacker #level").val(), 10);
      console.log(attacker.level);
      if (attacker.level > 100) {
        attacker.level = 100;
        $("#attacker #level").val("100");
      } else if (attacker.level < 1) {
        attacker.level = 1;
        $("#attacker #level").val("1");
      }

      // recalculate all stats
      var newStat = calculateStat(attacker.attack.ivs, attacker.attack.evs, attacker.dex["baseStats"]["atk"], 
        attacker.level, Calculator.nature[attacker.nature][0]);
      attacker.attack.total = newStat;
      $("#attacker #attack #total").val(newStat);
    }
  });

  // attacker stat listeners:
  $("#attacker #attack #ivs").keyup(function () {
    if ( isNaN($("#attacker #attack #ivs").val()) || ($("#attacker #attack #ivs").val() == "") ) {
      attacker.attack.ivs = undefined;
      $("#attacker #attack #ivs").val("");
      $("#attacker #attack #total").val("");
    } else {
      attacker.attack.ivs = parseInt($("#attacker #attack #ivs").val(), 10);
      if (attacker.attack.ivs > 31) {
        attacker.attack.ivs = 31;
        $("#attacker #attack #ivs").val("31");
      } else if (attacker.attack.ivs < 0) {
        attacker.attack.ivs = 0;
        $("#attacker #attack #ivs").val("0");
      }

      var newStat = calculateStat(attacker.attack.ivs, attacker.attack.evs, attacker.dex["baseStats"]["atk"], 
        attacker.level, Calculator.nature[attacker.nature][0]);
      attacker.attack.total = newStat;
      $("#attacker #attack #total").val(newStat);
    }
  });

  // attacker stat listeners:
  $("#attacker #attack #evs").keyup(function () {
    if ( isNaN($("#attacker #attack #evs").val()) || ($("#attacker #attack #evs").val() == "") ) {
      attacker.attack.evs = undefined;
      $("#attacker #attack #evs").val("");
      $("#attacker #attack #total").val("");
    } else {
      attacker.attack.evs = parseInt($("#attacker #attack #evs").val(), 10);
      if (attacker.attack.evs > 255) {
        attacker.attack.evs = 255;
        $("#attacker #attack #evs").val("255");
      } else if (attacker.attack.evs < 0) {
        attacker.attack.evs = 0;
        $("#attacker #attack #evs").val("0");
      }

      var newStat = calculateStat(attacker.attack.ivs, attacker.attack.evs, attacker.dex["baseStats"]["atk"], 
        attacker.level, Calculator.nature[attacker.nature][0]);
      attacker.attack.total = newStat;
      $("#attacker #attack #total").val(newStat);
    }
  });

  // attacker stat listeners, boosts:
  $("#attacker #attack #modifier").change(function() {
    console.log("Modifier changed. " + $("#attacker #attack #modifier").val());
  });

  // BIDOOFDEFENDER
  $("#defender #pokemon").autocomplete({
    source: pokemon_autocomplete,
    select: function (e, ui) {
        console.log("Load defender");
        loadDefender(ui.item.value);
    }
  });

  // natures
  $("#defender #nature").autocomplete({
    source: function(request, response) {
        var results = $.ui.autocomplete.filter(nature_autocomplete, request.term);

        response(results.slice(0, 5));
      },
    select: function (e, ui) {
      // recalculate all stats I guess.
      console.log("nature selected.");
      defender.nature = ui.item.value;
      console.log(defender.nature);

      var newStat = calculateStat(defender.defense.ivs, defender.defense.evs, defender.dex["baseStats"]["def"], 
        defender.level, Calculator.nature[defender.nature][1]);
      console.log(newStat);
      defender.defense.total = newStat;
      $("#defender #defense #total").val(newStat);
    }
  });

  // item
  $("#defender #item").autocomplete({
    source: items_autocomplete,
    select: function (e, ui) {
      // try to pull item from items.js
      var itemIdx = ui.item.value.toLowerCase().replace(/\s+/g, '');
      console.log(itemIdx);

      console.log(pokedex.items[itemIdx]);

    }
  });

  // level
  $("#defender #level").keyup(function () {
    if ($("#defender #level").val() == "" || isNaN($("#defender #level").val())) {
      $("#defender #level").val("");
      // keep this a number so our stat calculations don't break...
      defender.level = 1;
    } else {
      defender.level = parseInt($("#defender #level").val(), 10);
      console.log(defender.level);
      if (defender.level > 100) {
        defender.level = 100;
        $("#defender #level").val("100");
      } else if (defender.level < 1) {
        defender.level = 1;
        $("#defender #level").val("1");
      }

      // recalculate all stats
      var newStat = calculateStat(defender.defense.ivs, defender.defense.evs, defender.dex["baseStats"]["def"], 
        defender.level, Calculator.nature[defender.nature][1]);
      defender.defense.total = newStat;
      $("#defender #defense #total").val(newStat);
    }
  });

  // defender stat listeners:
  // hp
  $("#defender #hp #ivs").keyup(function () {
    if ( isNaN($("#defender #hp #ivs").val()) || ($("#defender #hp #ivs").val() == "") ) {
      defender.hp.ivs = undefined;
      $("#defender #hp #ivs").val("");
      $("#defender #hp #total").val("");
    } else {
      defender.hp.ivs = parseInt($("#defender #hp #ivs").val(), 10);
      if (defender.hp.ivs > 31) {
        defender.hp.ivs = 31;
        $("#defender #hp #ivs").val("31");
      } else if (defender.hp.ivs < 0) {
        defender.hp.ivs = 0;
        $("#defender #hp #ivs").val("0");
      }

      var newStat = calculateStatHP(defender.hp.ivs, defender.hp.evs, defender.dex["baseStats"]["hp"], defender.level);
      defender.hp.total = newStat;
      $("#defender #hp #total").val(newStat);
    }
  });

  $("#defender #hp #evs").keyup(function () {
    if ( isNaN($("#defender #hp #evs").val()) || ($("#defender #hp #evs").val() == "") ) {
      defender.hp.evs = undefined;
      $("#defender #hp #evs").val("");
      $("#defender #hp #total").val("");
    } else {
      defender.hp.evs = parseInt($("#defender #hp #evs").val(), 10);
      if (defender.hp.evs > 255) {
        defender.hp.evs = 255;
        $("#defender #hp #evs").val("255");
      } else if (defender.hp.evs < 0) {
        defender.hp.evs = 0;
        $("#defender #hp #evs").val("0");
      }

      var newStat = calculateStatHP(defender.hp.ivs, defender.hp.evs, defender.dex["baseStats"]["hp"], defender.level);
      defender.hp.total = newStat;
      $("#defender #hp #total").val(newStat);
    }
  });

  // defense
  $("#defender #defense #ivs").keyup(function () {
    if ( isNaN($("#defender #defense #ivs").val()) || ($("#defender #defense #ivs").val() == "") ) {
      defender.defense.ivs = undefined;
      $("#defender #defense #ivs").val("");
      $("#defender #defense #total").val("");
    } else {
      defender.defense.ivs = parseInt($("#defender #defense #ivs").val(), 10);
      if (defender.defense.ivs > 31) {
        defender.defense.ivs = 31;
        $("#defender #defense #ivs").val("31");
      } else if (defender.defense.ivs < 0) {
        defender.defense.ivs = 0;
        $("#defender #defense #ivs").val("0");
      }

      var newStat = calculateStat(defender.defense.ivs, defender.defense.evs, defender.dex["baseStats"]["def"], 
        defender.level, Calculator.nature[defender.nature][1]);
      defender.defense.total = newStat;
      $("#defender #defense #total").val(newStat);
    }
  });

  $("#defender #defense #evs").keyup(function () {
    if ( isNaN($("#defender #defense #evs").val()) || ($("#defender #defense #evs").val() == "") ) {
      defender.defense.evs = undefined;
      $("#defender #defense #evs").val("");
      $("#defender #defense #total").val("");
    } else {
      defender.defense.evs = parseInt($("#defender #defense #evs").val(), 10);
      if (defender.defense.evs > 255) {
        defender.defense.evs = 255;
        $("#defender #defense #evs").val("255");
      } else if (defender.defense.evs < 0) {
        defender.defense.evs = 0;
        $("#defender #defense #evs").val("0");
      }

      var newStat = calculateStat(defender.defense.ivs, defender.defense.evs, defender.dex["baseStats"]["def"], 
        defender.level, Calculator.nature[defender.nature][1]);
      defender.defense.total = newStat;
      $("#defender #defense #total").val(newStat);
    }
  });
}

/* *
 * CTRL+F: BIDOOFATTACKER
 */

// Loads the attacking Pokemon into "memory".
// TODO: This function should probably be rearranged a bit so it makes more sense.
function loadAttacker(name) {
	console.log(name.toLowerCase());
	attacker.dex = pokedex.pokemon[name.toLowerCase()];
	console.log(attacker.dex);

	if (attacker.dex != undefined) {
    // load infobox
    // $("#attacker #infobox #number").text(attacker.dex['num']);
    $("#attacker #infobox #number").html("<img id='attackerImg' src='media/pokemon/icons/" + attacker.dex['num'] + ".png'/>");
    $("#attacker #infobox #name").text(attacker.dex['species']);
    $("#attacker #infobox #close").click(function() {
      console.log("Handler for .click() called.");

      clearAttacker();
      $("#attacker #pokemon").show();
      $("#attacker #infobox").hide();
    });

    $("#attacker #pokemon").hide();
    $("#attacker #infobox").show();

		// load abilities
		$.each(attacker.dex['abilities'], function(index, value) {
  			$('#attacker #abilities')
   				.append ( $('<option/>')
      			.attr('value', 'valueOfOption')
      			.html(value)
   			);
		});
		$("#attacker #abilities").removeAttr("disabled");

		// load types
		$("#attacker #type1").val(attacker.dex['types'][0]);
		$("#attacker #type2").val(attacker.dex['types'][1]);

    // enable the other disabled things
    $("#attacker #item").removeAttr("disabled");
    $("#attacker #level").removeAttr("disabled");
    $("#attacker #nature").removeAttr("disabled");
    $("#attacker #attack").children().removeAttr("disabled");
    $("#attacker #spattack").children().removeAttr("disabled");
    $("#attacker #speed").children().removeAttr("disabled");

    // init nature to something neutral, in this case, Hardy
    attacker.nature = "Hardy";

    // initialize stats
    attacker.level = 50;
    $("#attacker #level").val("50");
    attacker.attack = {};
    attacker.attack.ivs = 31;
    $("#attacker #attack #ivs").val("31");
    attacker.attack.evs = 0;
    $("#attacker #attack #evs").val("0");
    var newStat = calculateStat(attacker.attack.ivs, attacker.attack.evs, attacker.dex["baseStats"]["atk"], 
        attacker.level, Calculator.nature[attacker.nature][0]);
    attacker.attack.total = newStat;
    $("#attacker #attack #total").val(newStat);

    attacker.spattack = {};
    attacker.speed = {};

    // load moves into a temp holding spot so we can pull data from pokedex.moves.
    var moveKeys = []
    for(var k in pokedex.learnsets[name.toLowerCase()]["learnset"]) moveKeys.push(k);

    // attempt data lookup
    attacker.moves = {};
    attacker.knownMoves = [];
    attacker.movesAutocomplete = [];

    for ( var i = 0; i < moveKeys.length; ++i ) {
      attacker.moves[ moveKeys[i] ] = pokedex.moves[ moveKeys[i] ];

      // autocomplete
      attacker.movesAutocomplete.push(pokedex.moves[ moveKeys[i] ]['name']);
    }

    // init autocomplete
    $("#attacker #move1 input, #attacker #move2, #attacker #move3, #attacker #move4").autocomplete({
      source: function(request, response) {
        var results = $.ui.autocomplete.filter(attacker.movesAutocomplete, request.term);

        response(results.slice(0, 5));
      },
      select: function (e, ui) {
          // add moves to our moves array. THIS WILL NEED TO BE BETTER.
          var move = ui.item.value.toLowerCase().replace(/\s+/g, '');
          attacker.knownMoves.push(pokedex.moves[move]);

          // load info in the infobox.
          var infobox = $(this).parent();
          console.log(infobox.attr('id') + "span#type");

          $(infobox.attr('id') + "span#type").append('<img src="media/types/1.png" />');

          //infobox.children('#type').attr("src", "media/types/".concat(Calculator.typelookup[0],".png"));

          loadDamage();
      }
    });
    $("#attacker #move1 input, #attacker #move2, #attacker #move3, #attacker #move4").removeAttr("disabled");

	}
}

// temp location
// loads damage information into the layout.
// params: damage, the array that holds damage info.
function loadDamage() {

  // check to see if both attacker/defender are defined.
  // why the fuck did i do this?
  // for (var key in attacker) {
  //   if (hasOwnProperty.call(attacker, key)) {
  //     console.log("Attacker fail " + key);
  //     return;
  //   }
  // }
  // for (var key in defender) {
  //   if (hasOwnProperty.call(defender, key)) {
  //     console.log("Defender fail " + key);
  //     return;
  //   }
  // }

  var damage = Calculator.calculate(attacker, defender);
  console.log(damage);

  // construct the string to display - labels
  // also figure out what move does the most damage? i just can't even.
  // var mostDamageOutput = 0;
  // var bestMoveIdx;
  // for (var i = 0; i < damage.length; ++i) {
  //   var label = pokedex.moves[attacker.knownMoves[i]].name.concat(": ", damage[i][0][1], " - ", damage[i][15][1], "%");
  //   $('#moveTotals #move' + (i + 1)).text(label);

  //   // TODO: Figure out the move with the most damage.
  //   if (damage[15][1] > mostDamageOutput) {
  //     mostDamageOutput = damage[15][1];
  //     bestMoveIdx = i;
  //   }
  // }

  //   // construct the strong to display - header
  //   var header = attacker.attack.evs.toString().concat(" Atk ", attacker.dex['species'], " ", attacker.knownMoves[bestMoveIdx], " vs. ",
  //                 defender.hp.evs, " HP / ", defender.defense.evs, " ", defender.dex['species'], ":");
  //   $('#damageInfo #pokemonInfo').text(header);

  //   // display detailed damage information.
  //   console.log(damage[bestMoveIdx]);
  //   var damageDetail = "(".concat(damage[bestMoveIdx][0], ", ");
  //   for (var i = 1; i < 15; ++i) {
  //     damageDetail = damageDetail.concat(damage[bestMoveIdx][i], ", ");
  //   }
  //   damageDetail = damageDetail.concat(damage[bestMoveIdx][15][0], ")");
  //   console.log(damageDetail);
  //   $('#damageInfo p#damageDetails').text(damageDetail);
}

// clears everything possible from the GUI, resets Pokemon.
function clearAttacker() {
  // clear pokemon
  attacker = {};

  // clear GUI
  // input box
  $('#attacker #pokemon').val('');

  // abilities
  $('#attacker #abilities option').remove();
  $('#attacker #abilities').append($('<option>', {
    value: -1,
    text: 'Select ability'
  }));
  $("#attacker #abilities").attr('disabled', 'disabled');

  // types
  $("#attacker #type1").val("");
  $("#attacker #type2").val("");

  // items
  $("#attacker #item").val('');
  $("#attacker #item").attr('disabled', 'disabled');
  
  // level
  $("#attacker #level").val('');
  $("#attacker #level").attr('disabled', 'disabled');

  // nature
  $("#attacker #nature").val('');
  $("#attacker #nature").attr('disabled', 'disabled');
  
  // stats
  $("#attacker #attack").children().val('');
  $("#attacker #attack").children().attr('disabled', 'disabled');
  $("#attacker #spattack").children().val('');
  $("#attacker #spattack").children().attr('disabled', 'disabled');
  $("#attacker #speed").children().val('');
  $("#attacker #speed").children().attr('disabled', 'disabled');

  // moves
  $("#attacker #move1, #attacker #move2, #attacker #move3, #attacker #move4").val('');
  $("#attacker #move1, #attacker #move2, #attacker #move3, #attacker #move4").autocomplete({
    source: [],
    messages: {
        noResults: '',
        results: function() {}
    }
  });
  $("#attacker #move1, #attacker #move2, #attacker #move3, #attacker #move4").attr('disabled', 'disabled');
}

/* *
 * YOU KNOW YOUR CODE IS BIG WHEN YOU NEED TO PUT COMMENTS IN TO HELP YOU FUCKING NAVIGATE.
 * CTRL+F: BIDOOFDEFENDER
 *
 * All code related to the defender can be found below this line.
 */
// Loads the defending Pokemon into "memory".
// TODO: This function should probably be rearranged a bit so it makes more sense.
function loadDefender(name) {
  console.log(name.toLowerCase());
  defender.dex = pokedex.pokemon[name.toLowerCase()];
  console.log(defender.dex);

  if (defender.dex != undefined) {
    // load infobox
    $("#defender #infobox #number").text(defender.dex['num']);
    $("#defender #infobox #name").text(defender.dex['species']);
    $("#defender #infobox #close").click(function() {
      console.log("Handler for .click() called.");

      clearDefender();
      $("#defender #pokemon").show();
      $("#defender #infobox").hide();
    });
    $("#defender #pokemon").hide();
    $("#defender #infobox").show();

    // load abilities
    $.each(defender.dex['abilities'], function(index, value) {
        $('#defender #abilities')
          .append ( $('<option/>')
            .attr('value', 'valueOfOption')
            .html(value)
        );
    });
    $("#defender #abilities").removeAttr("disabled");

    // load types
    $("#defender #type1").val(defender.dex['types'][0]);
    $("#defender #type2").val(defender.dex['types'][1]);

    // enable the other disabled things
    $("#defender #item").removeAttr("disabled");
    $("#defender #level").removeAttr("disabled");
    $("#defender #nature").removeAttr("disabled");
    $("#defender #hp").children().removeAttr("disabled");
    $("#defender #defense").children().removeAttr("disabled");
    $("#defender #spdefense").children().removeAttr("disabled");
    $("#defender #speed").children().removeAttr("disabled");

    // init nature
    defender.nature = "Hardy";

    // init level
    defender.level = 50;
    $("#defender #level").val("50");

    // initialize stats
    defender.hp = {};
    defender.hp.ivs = 31;
    $("#defender #hp #ivs").val("31");
    defender.hp.evs = 0;
    $("#defender #hp #evs").val("0");
    var newStat = calculateStatHP(defender.hp.ivs, defender.hp.evs, defender.dex["baseStats"]["hp"], defender.level);
    defender.hp.total = newStat;
    $("#defender #hp #total").val(newStat);

    defender.defense = {};
    defender.defense.ivs = 31;
    $("#defender #defense #ivs").val("31");
    defender.defense.evs = 0;
    $("#defender #defense #evs").val("0");
    var newStat = calculateStat(defender.defense.ivs, defender.defense.evs, defender.dex["baseStats"]["def"], 
        defender.level, Calculator.nature[defender.nature][1]);
    defender.defense.total = newStat;
    $("#defender #defense #total").val(newStat);

    defender.spdefense = {};
    defender.speed = {};
  }
}

// clears everything possible from the GUI, resets Pokemon.
function clearDefender() {
  // clear pokemon
  defender = {};

  // clear GUI
  // input box
  $('#defender #pokemon').val('');

  // abilities
  $('#defender #abilities option').remove();
  $('#defender #abilities').append($('<option>', {
    value: -1,
    text: 'Select ability'
  }));
  $("#defender #abilities").attr('disabled', 'disabled');

  // types
  $("#defender #type1").val("");
  $("#defender #type2").val("");

  // items
  $("#defender #item").val('');
  $("#defender #item").attr('disabled', 'disabled');
  
  // level
  $("#defender #level").val('');
  $("#defender #level").attr('disabled', 'disabled');

  // nature
  $("#defender #nature").val('');
  $("#defender #nature").attr('disabled', 'disabled');
  
  // stats
  $("#defender #hp").children().val('');
  $("#defender #hp").children().attr('disabled', 'disabled');
  $("#defender #defense").children().val('');
  $("#defender #defense").children().attr('disabled', 'disabled');
  $("#defender #spdefense").children().val('');
  $("#defender #spdefense").children().attr('disabled', 'disabled');  
  $("#defender #speed").children().val('');
  $("#defender #speed").children().attr('disabled', 'disabled');
}