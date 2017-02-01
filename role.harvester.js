
var roleUpgrader = require('role.upgrader');



var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var targets = creep.room.find(FIND_DROPPED_RESOURCES);
            var target = targets[0];
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }

            // var containers = creep.room.find(FIND_STRUCTURES, {
            //     filter: (i) => i.structureType == STRUCTURE_CONTAINER && 
            //        i.store[RESOURCE_ENERGY] > 0
            // });
            // if (containers.length > 0) {
            //     var target = creep.pos.findClosestByRange(containers);
            //     if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(target);
            //     } else if (creep.withdraw(target, RESOURCE_ENERGY) == 0) {
            //         creep.memory.pickup = target.id;
            //     } 
            // }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.moveTo(13,24);
            }

        }
	}
};

module.exports = roleHarvester;


        
