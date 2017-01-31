var roleBuilder = require('role.builder');
var roleFixer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.fixing && creep.carry.energy == 0) {
            creep.memory.fixing = false;
            creep.say('getting resources');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.fixing = true;
	        creep.say('fixing');
	    }

	    if(creep.memory.fixing) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                (i.hits < i.hitsMax)
            });

            if(containers.length>0) {
                if(creep.repair(containers[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            }
            else {creep.moveTo(8,23);}
	    } else {
			var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == (STRUCTURE_CONTAINER || STRUCTURE_ROAD) && 
                   i.store[RESOURCE_ENERGY] > 200
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

module.exports = roleFixer;