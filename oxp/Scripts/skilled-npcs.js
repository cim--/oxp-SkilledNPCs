this.name = "Skilled NPCs";
this.description = "OXP to enable high-skill combat routines on most standard NPCs";

this.$baseline = 0;
this.$boostPirate = true;
this.$boostHunter = true;
this.$boostTrader = true;
this.$boostAliens = true;
this.$boostOthers = false;

this.oxpcSettings = { 
		Info: {Name: this.name, Display: "Skilled NPCs", InfoS:"0=some good pilots, rarer very good. 3=common good pilots, many very good. 5=all pilots have some skill, many have max skill. 10=all pilots have max skill.", InfoB:"Select the groups of roles to apply changes to."},
		SInt0: {Name:"$baseline", Def:0, Max:10, Desc:"Difficulty level."},
		Bool0: {Name:"$boostPirate", Def: true, Desc: "Improve pirates and assassins"},
		Bool1: {Name:"$boostHunter", Def: true, Desc: "Improve hunters and police"},
		Bool2: {Name:"$boostTrader", Def: true, Desc: "Improve traders, miners and escorts"},
		Bool3: {Name:"$boostAliens", Def: true, Desc: "Improve thargoids"},
		Bool4: {Name:"$boostOthers", Def: false, Desc: "Improve others"}
};

this.shipSpawned = function(ship) {
	if (ship.accuracy >= 5) { 
		return; // already been custom-set, so don't adjust it
	}
	if (!ship.autoWeapons) {
		return; // ship does not agree to 3rd-party adjustments
	}

	var role = ship.primaryRole;
	if (ship.scriptInfo.skilled_npc_role) {
		role = ship.scriptInfo.skilled_npc_role;
	}
	
	var gov = System.infoForSystem(galaxyNumber,ship.homeSystem).government;

	switch (role) {
	case "off":
		break; // never boosted, ever, even if has auto_weapons for other purposes
	case "pirate":
	case "pirate-light-fighter":
	case "pirate-medium-fighter":
	case "pirate-heavy-fighter":
	case "pirate-light-freighter":
	case "pirate-medium-freighter":
	case "pirate-heavy-freighter":
	case "pirate-interceptor":
	case "pirate-aegis-raider":
	case "assassin-light":
	case "assassin-medium":
	case "assassin-heavy":
		if (!this.$boostPirate) break;
		if (ship.accuracy < 0) { 
			ship.accuracy = -ship.accuracy;
		}
		ship.accuracy += this.$baseline;
		ship.accuracy += Math.random()*(7-gov);
		if (ship.accuracy < (7-gov)) {
			ship.accuracy += (7-gov)*0.75;
		}
		break;
	case "hunter":
	case "hunter-medium":
	case "hunter-heavy":
		if (!this.$boostHunter) break;
		if (ship.accuracy < 0) { 
			ship.accuracy = -ship.accuracy;
		}
		ship.accuracy += this.$baseline;
		ship.accuracy += Math.random()*(7-gov);
		if (ship.accuracy < (7-gov)) {
			ship.accuracy += (7-gov)*0.75;
		}
		break;
	case "escort":
	case "escort-medium":
	case "escort-heavy":
	case "defense_ship":
		if (!this.$boostTrader) break;
		if (ship.accuracy < 0) { 
			ship.accuracy = -ship.accuracy;
		}
		ship.accuracy += this.$baseline;
		if (ship.scanClass == "CLASS_POLICE") {
			ship.accuracy *= 2;
		}				
		ship.accuracy += Math.random()*5;
		if (ship.escortGroup.leader && ship.accuracy < ship.escortGroup.leader.accuracy) {
			ship.accuracy += Math.random()*ship.escortGroup.leader.accuracy;
		} 
		break;
	case "miner":
	case "scavenger":
	case "trader":
	case "trader-courier":
	case "trader-smuggler":
		if (!this.$boostTrader) break;
		if (ship.accuracy < 0) { 
			ship.accuracy = -ship.accuracy;
		}
		ship.accuracy += this.$baseline;
		ship.accuracy += Math.random()*(7-gov)*0.5;
		break;
	case "police":
	case "interceptor":
	case "wingman":
		if (!this.$boostHunter) break;
		if (ship.accuracy < 0) { 
			ship.accuracy = -ship.accuracy;
		}
		ship.accuracy += this.$baseline;
		ship.accuracy *= 2;
		ship.accuracy += Math.random()*gov;
		break;
	case "thargoid":
	case "thargon":
	case "griff_robot_thargon":
	case "griff_organic_thargon":
		if (!this.$boostAliens) break;
		if (ship.accuracy < 0) { 
			ship.accuracy = -ship.accuracy;
		}
		ship.accuracy += this.$baseline;
		ship.accuracy *= 2;
		break;
	default:
		if (!this.$boostOthers) break;
		if (ship.accuracy < 0) { 
			ship.accuracy = -ship.accuracy;
		}
		ship.accuracy += this.$baseline;
		ship.accuracy += Math.random()*this.$baseline;
	}

}