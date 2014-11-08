/* *
 * Contains weaknesses/resistances and a friendly lookup array for string matching.
 * Written on the cover in big friendly letters is, "Don't panic!"
 * JTK
 */

var TypeChart = {};

TypeChart.typelookup = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic",
						 "Ice", "Dragon", "Dark", "Fairy"];

TypeChart.typechart = {
    Normal: {Normal:0, Fighting:1, Flying:0, Poison:0, Ground:0, Rock:0, Bug:0, Ghost:-3, Steel:0, Fire:0, Water:0, Grass:0, Electric:0, Psychic:0, Ice:0, Dragon:0, Dark:0, Fairy:0},
    Fighting: {Normal:0, Fighting:0, Flying:1, Poison:0, Ground:0, Rock:-1, Bug:-1, Ghost:0, Steel:0, Fire:0, Water:0, Grass:0, Electric:0, Psychic:1, Ice:0, Dragon:0, Dark:-1, Fairy:1},
    Flying: {Normal:0, Fighting:-1, Flying:0, Poison:0, Ground:-3, Rock:1, Bug:-1, Ghost:0, Steel:0, Fire:0, Water:0, Grass:-1, Electric:1, Psychic:0, Ice:1, Dragon:0, Dark:0, Fairy:0},
    Poison: {Normal:0, Fighting:-1, Flying:0, Poison:-1, Ground:1, Rock:0, Bug:-1, Ghost:0, Steel:0, Fire:0, Water:0, Grass:-1, Electric:0, Psychic:1, Ice:0, Dragon:0, Dark:0, Fairy:-1},
    Ground: {Normal:0, Fighting:0, Flying:0, Poison:-1, Ground:0, Rock:-1, Bug:0, Ghost:0, Steel:0, Fire:0, Water:1, Grass:1, Electric:-3, Psychic:0, Ice:1, Dragon:0, Dark:0, Fairy:0},
    Rock: {Normal:-1, Fighting:1, Flying:-1, Poison:-1, Ground:1, Rock:0, Bug:0, Ghost:0, Steel:1, Fire:-1, Water:1, Grass:1, Electric:0, Psychic:0, Ice:0, Dragon:0, Dark:0, Fairy:0},
    Bug: {Normal:0, Fighting:-1, Flying:1, Poison:0, Ground:-1, Rock:1, Bug:0, Ghost:0, Steel:0, Fire:1, Water:0, Grass:-1, Electric:0, Psychic:0, Ice:0, Dragon:0, Dark:0, Fairy:0},
    Ghost: {Normal:-3, Fighting:-3, Flying:0, Poison:-1, Ground:0, Rock:0, Bug:-1, Ghost:1, Steel:0, Fire:0, Water:0, Grass:0, Electric:0, Psychic:0, Ice:0, Dragon:0, Dark:1, Fairy:0},
    Steel: {Normal:-1, Fighting:1, Flying:-1, Poison:-3, Ground:1, Rock:-1, Bug:-1, Ghost:0, Steel:-1, Fire:1, Water:0, Grass:-1, Electric:0, Psychic:-1, Ice:-1, Dragon:-1, Dark:0, Fairy:-1},
    Fire: {Normal:0, Fighting:0, Flying:0, Poison:0, Ground:1, Rock:1, Bug:-1, Ghost:0, Steel:-1, Fire:-1, Water:1, Grass:-1, Electric:0, Psychic:0, Ice:-1, Dragon:0, Dark:0, Fairy:-1},
    Water: {Normal:0, Fighting:0, Flying:0, Poison:0, Ground:0, Rock:0, Bug:0, Ghost:0, Steel:-1, Fire:-1, Water:-1, Grass:1, Electric:1, Psychic:0, Ice:-1, Dragon:0, Dark:0, Fairy:0},
    Grass: {Normal:0, Fighting:0, Flying:1, Poison:1, Ground:-1, Rock:0, Bug:1, Ghost:0, Steel:0, Fire:1, Water:-1, Grass:-1, Electric:-1, Psychic:0, Ice:1, Dragon:0, Dark:0, Fairy:0},
    Electric: {Normal:0, Fighting:0, Flying:-1, Poison:0, Ground:1, Rock:0, Bug:0, Ghost:0, Steel:-1, Fire:0, Water:0, Grass:0, Electric:-1, Psychic:0, Ice:0, Dragon:0, Dark:0, Fairy:0},
    Psychic: {Normal:0, Fighting:-1, Flying:0, Poison:0, Ground:0, Rock:0, Bug:1, Ghost:1, Steel:0, Fire:0, Water:0, Grass:0, Electric:0, Psychic:-1, Ice:0, Dragon:0, Dark:1, Fairy:0},
    Ice: {Normal:0, Fighting:1, Flying:0, Poison:0, Ground:0, Rock:1, Bug:0, Ghost:0, Steel:1, Fire:1, Water:0, Grass:0, Electric:0, Psychic:0, Ice:-1, Dragon:0, Dark:0, Fairy:0},
    Dragon: {Normal:0, Fighting:0, Flying:0, Poison:0, Ground:0, Rock:0, Bug:0, Ghost:0, Steel:0, Fire:-1, Water:-1, Grass:-1, Electric:-1, Psychic:0, Ice:1, Dragon:1, Dark:0, Fairy:1},
    Dark: {Normal:0, Fighting:1, Flying:0, Poison:0, Ground:0, Rock:0, Bug:1, Ghost:-1, Steel:0, Fire:0, Water:0, Grass:0, Electric:0, Psychic:-3, Ice:0, Dragon:0, Dark:-1, Fairy:1},
    Fairy: {Normal:0, Fighting:-1, Flying:0, Poison:1, Ground:0, Rock:0, Bug:-1, Ghost:0, Steel:1, Fire:0, Water:0, Grass:0, Electric:0, Psychic:0, Ice:0, Dragon:-3, Dark:-1, Fairy:0}
};