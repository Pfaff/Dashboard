function ProjectInfo(version, requestTime, requestMin, uptime, capacityMax, capacityInUse, loadAverage, cpu, scheme, connectionsOpen, connectionsBusy, connectionsIdle) {
    //this.version = version;
    this.requestTime = requestTime;
    this.requestMin = requestMin;
    this.uptime = uptime;
    this.capacityMax = capacityMax;
    this.capacityInUse = capacityInUse;
    this.loadAverage = loadAverage;
    this.cpu = cpu;
    this.scheme = scheme;
    this.connectionsOpen = connectionsOpen;
    this.connectionsBusy = connectionsBusy;
    this.connectionsIdle = connectionsIdle;
    this.attribute = [];
    this.attribute["version"] = version;


    this.getValue = function(value) { return this.attribute[value]; };
    this.setValue = function(attribute, value) { this.attribute[attribute] = value; };

    this.getVersion = function() { return this.version; };
    this.getRequestTime = function() { return this.requestTime; };
    this.getRequestMin = function() { return this.requestMin; };
    this.getUptime = function() { return this.uptime; };
    this.getCapacityMax = function() { return this.capacityMax; };
    this.getCapacityInUse = function() { return this.capacityInUse; };
    this.getLoadAverage = function() { return this.loadAverage; };
    this.getCpu = function() { return this.cpu; };
    this.getScheme = function() { return this.scheme; };
    this.getConnectionsOpen = function() { return this.connectionsOpen; };
    this.getConnectionsBusy = function() { return this.connectionsBusy; };
    this.getConnectionsIdle = function() { return this.connectionsIdle; };

    this.setVersion = function(version) { this.version = version;};
    this.setRequestTime = function(requestTime) { this.requestTime = requestTime; };
    this.setRequestMin = function(requestMin) { this.requestMin = requestMin; };
    this.setUptime = function(uptime) { this.uptime = uptime; };
    this.setCapacityMax = function(capacityMax) { this.capacityMax = capacityMax; };
    this.setCapacityInUse = function(capacityInUse) { this.capacityInUse = capacityInUse; };
    this.setLoadAverage = function(loadAverage) { this.loadAverage = loadAverage; };
    this.setCpu = function(cpu) { this.cpu = cpu; };
    this.setScheme = function(scheme) { this.scheme = scheme; };
    this.setConnectionsOpen = function(connectionsOpen) { this.connectionsOpen = connectionsOpen; };
    this.setConnectionsBusy = function(connectionsBusy) { this.connectionsBusy = connectionsBusy; };
    this.setConnectionsIdle = function(connectionsIdle) { this.connectionsIdle = connectionsIdle; };
}