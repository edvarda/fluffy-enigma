var cpuCapacity = {
	getCpuCap: function() {
	    
		if (!Memory.cpuCap) {
			Memory.cpuCap = (Game.cpu.limit - Game.cpu.getUsed());			
		} else {
			var cap = Memory.cpuCap * 0.9 + (Game.cpu.limit - Game.cpu.getUsed())*0.1;
			Memory.cpuCap = cap;
		}
		return Memory.cpuCap;
	}
};

module.exports = cpuCapacity;