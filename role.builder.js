var roleIdler = require('role.idler');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length>0) {
            	var target = creep.pos.findClosestByRange(targets);
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {roleIdler.run(creep);}
	    } else {
			// var targets = creep.room.find(FIND_DROPPED_RESOURCES);
			// var target = targets[0];
			// if(target) {
			//     if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
			//         creep.moveTo(target);
			//     }
			// }
			var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER && 
                   i.store[RESOURCE_ENERGY] > 500
            });
            if (containers.length > 0) {
            	var target = creep.pos.findClosestByRange(containers);
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }    
            }
		}
	}
};

module.exports = roleBuilder;