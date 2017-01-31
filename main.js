var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleIdler = require('role.idler');
var roleMiner = require('role.miner');
var roleFixer = require('role.fixer');

var utilCpu = require('util.cpu');
var modelBodies = require('model.Bodies');

module.exports.loop = function () {

    // Random debug
    
    // Handy temp
    var spawn = Game.spawns['Spawn1'];
    
    //console.log(test);
    
    // Warns if getting close to CPU capacity.
    if (utilCpu.getCpuCap() < 5 ) { console.log("Warning, not much CPU capacity left: " + utilCpu.getCpuCap())}
    
    // Clears the memory from dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
    
    if (harvesters.length < 1 && spawn.canCreateCreep(modelBodies.harvester.blueprint) == 0) {
        var newName = spawn.createCreep(modelBodies.harvester.blueprint, undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);    
    } else if (builders.length < 3 && spawn.canCreateCreep(modelBodies.builder.blueprint) == 0) {
        var newName = spawn.createCreep(modelBodies.builder.blueprint, undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }else if (upgraders.length < 2 && spawn.canCreateCreep(modelBodies.upgrader.blueprint) == 0) {
        var newName = spawn.createCreep(modelBodies.upgrader.blueprint, undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }else if (miners.length < 1 && spawn.canCreateCreep(modelBodies.miner.blueprint) == 0) {
        var newName = spawn.createCreep(modelBodies.miner.blueprint, undefined, {role: 'miner', targetSite: Memory.miningSite }); // Stationary builder for now
        Memory.miningSite = (Memory.miningSite + 1) % 2;
        console.log('Spawning new statBuilder: ' + newName + " on site " + Memory.miningSite);
    } else if (fixers.length < 1 && spawn.canCreateCreep(modelBodies.builder.blueprint) == 0) {
        var newName = spawn.createCreep(modelBodies.builder.blueprint, undefined, {role: 'fixer'});
        console.log('Spawning new fixer: ' + newName);
    }

    if (Game.time % 10 == 0) {
        console.log('Builders: ' + builders.length    + '   Upgraders: ' + 
                upgraders.length + '   Harvesters: ' + harvesters.length + 
                '   Miners: ' + miners.length + '   Fixers: ' + fixers.length);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'fixer') {
            roleFixer.run(creep);
        }
    }
}