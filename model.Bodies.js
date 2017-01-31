/** Store some basic models for creeps to work with
/* Yes, this is really ugly, since the cost function is repeated thrice.
/* Should a class-pattern be used? Or can we store a reference to a function in the objects?
/* Costs are:
/*	MOVE: 50
/*	CARRY: 50
/*	WORK: 100
/*
/*/

/*
cost : function() {
				var cost = 0;
				this.blueprint.forEach(function (part) {
					if (part === WORK) {
						cost += 100;
					} else {
						cost += 50;
					}
				});
				return cost;
			}
*/

var bodies = {
	'harvester': {
		blueprint: [CARRY,CARRY,MOVE,MOVE]
	},
	'builder': {
		blueprint: [WORK,WORK,CARRY,CARRY,MOVE,MOVE,CARRY,MOVE]
	},
	'upgrader': {
		blueprint: [WORK,WORK,CARRY,CARRY,MOVE,MOVE,CARRY,MOVE]
	},
	'miner': {
		blueprint: [WORK,WORK,MOVE]
	},
	'basic': {
		blueprint: [WORK,CARRY,MOVE]
	}
};

module.exports = bodies;
