/* *
 * The damage calculator itself. The most daunting part of the task, really.
 */

// Object
 var Calculator = {};

// Alright, this is gonna get messy.
// BaseDamage = ((((2 × Level) ÷ 5 + 2) * BasePower * [Sp]Atk) ÷ [Sp]Def) ÷ 50 + 2

// Atk, Def, SpAtk, SpDef, Spd
var nature_autocomplete = ["Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Bold", "Docile", "Relaxed", "Impish", "Lax", "Timid", "Hasty", "Serious", "Jolly",
						  "Naive", "Modest", "Mild", "Quiet", "Bashful", "Rash", "Calm", "Gentle", "Sassy", "Careful", "Quirky"];
Calculator.nature = {
	Hardy:   [1, 1, 1, 1, 1],
	Lonely:  [1.1, 0.9, 1, 1, 1],
	Brave:   [1.1, 1, 1, 1, 0.9],
	Adamant: [1.1, 1, 0.9, 1, 1],
	Naughty: [1.1, 1, 1, 0.9, 1],
	Bold:    [0.9, 1.1, 1, 1, 1],
	Docile:  [1, 1, 1, 1, 1],
	Relaxed: [1, 1.1, 1, 1, 0.9],
	Impish:  [1, 1.1, 0.9, 1, 1],
	Lax:     [1, 1.1, 1, 0.9, 1],
	Timid:   [0.9, 1, 1, 1, 1.1],
	Hasty:   [1, 0.9, 1, 1, 1.1],
	Serious: [1, 1, 1, 1, 1],
	Jolly:   [1, 1, 0.9, 1, 1.1],
	Naive:   [1, 1, 1, 0.9, 1.1],
	Modest:  [0.9, 1, 1.1, 1, 1],
	Mild:    [1, 0.9, 1.1, 1, 1],
	Quiet:   [1, 1, 1.1, 1, 0.9],
	Bashful: [1, 1, 1, 1, 1],
	Rash:    [1, 1, 1.1, 0.9, 1],
	Calm:    [0.9, 1, 1, 1.1, 1],
	Gentle:  [1, 0.9, 1, 1.1, 1],
	Sassy:   [1, 1, 1, 1.1, 0.9],
	Careful: [1, 1, 0.9, 1.1, 1],
	Quirky:  [1, 1, 1, 1, 1]
};

Calculator.typelookup = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic",
						 "Ice", "Dragon", "Dark"];

Calculator.typechart = {
	Normal: {Normal:1, Fighting:1, Flying:1, Poison:1, Ground:1, Rock:0.5, Bug:1, Ghost:0, Steel:0.5, Fire:1, Water:1, Grass:1, Electric:1, Psychic:1, Ice:1, Dragon:1, Dark:1},
	Fighting: {Normal:2, Fighting:1, Flying:0.5, Poison:0.5, Ground:1, Rock:2, Bug:0.5, Ghost:0, Steel:2, Fire:1, Water:1, Grass:1, Electric:1, Psychic:0.5, Ice:2, Dragon:1, Dark:2},
	Flying: {},
	Poison: {Normal:1, Fighting:1, Flying:1, Poison:0.5, Ground:0.5, Rock:0.5, Bug:1, Ghost:0.5, Steel:0, Fire:1, Water:1, Grass:2, Electric:1, Psychic:1, Ice:1, Dragon:1, Dark:1},
	Ground: {},
	Rock: {},
	Bug: {},
	Ghost: {},
	Steel: {},
	Fire: {},
	Water: {},
	Grass: {Normal:1, Fighting:1, Flying:0.5, Poison:0.5, Ground:2, Rock:2, Bug:0.5, Ghost:1, Steel:0.5, Fire:0.5, Water:2, Grass:0.5, Electric:1, Psychic:1, Ice:1, Dragon:0.5, Dark:1},
	Electric: {},
	Psychic: {},
	Ice: {},
	Dragon: {},
	Dark: {}
};

// stuff that's commented out we don't need.
function Field() {
    // var format = $("input:radio[name='format']:checked").val();
    var weather = $("input:radio[name='weather']:checked").val();
    var isGravity = $("#gravity").prop("checked");
    // var isSR = [$("#srL").prop("checked"), $("#srR").prop("checked")];
    // var spikes = [~~$("input:radio[name='spikesL']:checked").val(), ~~$("input:radio[name='spikesR']:checked").val()];
    var isReflect = [$("#reflectL").prop("checked"), $("#reflectR").prop("checked")];
    var isLightScreen = [$("#lightScreenL").prop("checked"), $("#lightScreenR").prop("checked")];
    var isForesight = [$("#foresightL").prop("checked"), $("#foresightR").prop("checked")];
    var isHelpingHand = [$("#helpingHandR").prop("checked"), $("#helpingHandL").prop("checked")]; // affects attacks against opposite side
    
    this.getWeather = function() {
        return weather;
    };
    this.clearWeather = function() {
        weather = "";
    };
    this.getSide = function(i) {
        return new Side(format, weather, isGravity, isSR[i], spikes[i], isReflect[i], isLightScreen[i], isForesight[i], isHelpingHand[i]);
    };
}

 Calculator.calculate = function(attacker, defender) {
 	// blatantly stealing other damage calc go go go

 	var field = new Field();

 	return getDamageResults(attacker, defender, field);



 // 	// determine whether or not this is physical, special, or N/A
 // 	for (var i = 0; i < attacker.knownMoves.length; ++i) {
 // 		console.log("move: " + i);

 // 		var move = attacker.moves[attacker.knownMoves[0]];
 // 		var baseDamage;

 // 		if (move.category == "Physical") {
 // 			// physical
 // 			baseDamage = Math.floor(2 * attacker.level);
 // 			baseDamage = Math.floor(baseDamage / 5);
 // 			baseDamage = Math.floor(baseDamage + 2);

 // 			baseDamage = baseDamage * move.basePower * attacker.attack.total;
 // 			baseDamage = baseDamage / defender.defense.total;
 // 			baseDamage = baseDamage / 50;
 // 			baseDamage = baseDamage + 2;
 // 		} else if (move.category == "Special") {
 // 			// special
 // 		} else {
 // 			// Other
 // 			console.log("Other move, we can't calculate damage...");
 // 			return;
 // 		}

 // 		// Let's deal with modifiers here:
 // 		var damage = baseDamage;

 // 		// 1. Apply the multi-target modifier.
 // 		if (move.target === "allAdjacentFoes") {
 //   			damage = Math.floor(damage * 0xC00 / 0x1000);
 //   			console.log("multi-hit");
 // 		}
		
 // 		// 2. Apply the weather modifier
 // 	var wMod;
 // 	if ($("#weather #rain").hasClass("active")) {
 // 		console.log("Active Rain");
 // 		wMod = (move.type === 'Water' ? 0x1800 : move.type === 'Fire' ? 0x800 : 0x1000);
 // 	} else if ($("#weather #sun").hasClass("active")) {
 // 		console.log("Active Sun");
 // 		wMod = (move.type === 'Fire' ? 0x1800 : move.type === 'Water' ? 0x800 : 0x1000);
 // 	} else {
 // 		wMod = 0x1000;
 // 	}
 // 	damage = Math.floor(damage * wMod / 0x1000);

 // 	// 3. In case of a critical hit, double the value
 // 	if ($("#crit").is(':checked')) {
 // 		console.log("Crit.");
 // 		damage = Math.floor(damage * 2);
 // 	}

 // 	// 4. Apply STAB modifier
 // 	var STAB = 0x1000;
 // 	if (move.type == attacker.dex['types'][0] || move.type == attacker.dex['types'][1]) {
 // 		// if (attacker.ability == 'Adaptability') {
 //   //          STAB = 0x2000;
 //   //          descAtAbil = true;
 //   //      } else {
 //            STAB = 0x1800;
 //        // }
 // 	}

 // 	// 5. Alter with type effectiveness
 // 	damage = damage * Calculator.typechart[move.type][defender.dex['types'][0]] * Calculator.typechart[move.type][defender.dex['types'][1]];

 // 	// 6. Alter with user's burn

 // 		/* *
 // 		 * Apply the multi-target modifier
	// 	 * Apply the weather modifier
	// 	 * In case of a critical hit, double the value
	// 	 * Alter with a random factor
	// 	 * Apply STAB modifier
	// 	 * Alter with type effectiveness
	// 	 * Alter with user's burn
	// 	 * Make sure damage is at least 1
	// 	 * Apply the final modifier
 // 		 */

 // 		// this is where we try and get the 16 damage roll thingies.
 // 		var damage = new Array();
 // 		var damageRange = new Array();

	// 	for (var j = 0; j < 16; j++) {
	// 		damage[j] = Math.max(1, Math.floor(baseDamage * (85 + j) / 100));

	// 		// we only want percentages for the first/last value - gives us a min/max.
	// 		if (j == 0 || j == 15) {
	// 			// calculate percent damage.
	// 			damageRange.push((damage[j] / defender.hp.total * 100).toFixed(2));
	// 		}
	// 	}

	// 	// save everything for later.
	// 	var tempMove = new Object();
	// 	tempMove.move = move;
	// 	tempMove.damage = damage;
	// 	tempMove.damageRange = damageRange;

	// 	// compare to see if this move is the best move we've encountered so far.
	// 	if (!jQuery.isEmptyObject(results.bestMove)) {
	// 		console.log("Previous move exists. " + results.bestMove.damageRange[1] + " " + tempMove.damageRange[1]);
	// 		if (results.bestMove.damageRange[1] < tempMove.damageRange[1]) {
	// 			console.log("Updating bestMove.");
	// 			results.bestMove = tempMove;
	// 		}
	// 	} else {
	// 		results.bestMove = tempMove;
	// 	}

	// 	results.moves.push(tempMove);
	// }
	// return results;
 }