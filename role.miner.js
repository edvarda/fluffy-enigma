
var roleUpgrader = require('role.upgrader');



var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //Find a place to mine, then do it!
        var sources = creep.room.find(FIND_SOURCES);
        creep.memory.sites = sources;
        // creep.memory.targetSite = creep.memory.sites[1];
        if (creep.memory.targetSite == undefined) {
            creep.say('no target');
        }
        if (creep.carry.energy == creep.carryCapacity) {
            creep.drop(RESOURCE_ENERGY)
        }
        if(creep.harvest(sources[creep.memory.targetSite]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[creep.memory.targetSite]);
        } 
	}
};

module.exports = roleMiner;


        
