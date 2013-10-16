function ProjectInfo(version, requestTime, requestMin, uptime, capacityMax, capacityInUse, loadAverage, cpu, scheme, connectionsOpen, connectionsBusy, connectionsIdle) {
    this.attribute = [];
    this.attribute['version'] = version;

    this.attribute['requestTimeAll'] = [];
    this.attribute['requestTime'] = requestTime;

    this.attribute['requestMinAll'] = [];
    this.attribute['requestMin'] = requestMin;

    this.attribute['uptimeAll'] = [];
    this.attribute['uptime'] = uptime;

    this.attribute['capacityMaxAll'] = [];
    this.attribute['capacityMax'] = capacityMax;

    this.attribute['capacityInUseAll'] = [];
    this.attribute['capacityInUse'] = capacityInUse;

    this.attribute['loadAverageAll'] = [];
    this.attribute['loadAverage'] = loadAverage;

    this.attribute['cpuAll'] = [];
    this.attribute['cpu'] = cpu;

    this.attribute['scheme'] = scheme;

    this.attribute['connectionsOpenAll'] = [];
    this.attribute['connectionsOpen'] = connectionsOpen;

    this.attribute['connectionsBusyAll'] = [];
    this.attribute['connectionsBusy'] = connectionsBusy;

    this.attribute['connectionsIdleAll'] = [];
    this.attribute['connectionsIdle'] = connectionsIdle;

    this.attribute['userAmount'] = [];

    this.getValue = function(value) { return this.attribute[value]; };

    this.pushNewValueInGivenArray = function(array, value) {
        this.attribute[array].push(value);
    };

    this.clearAllArraysExceptForUserAmount = function() {
        this.attribute['requestTimeAll'] = [];
        this.attribute['requestMinAll'] = [];
        this.attribute['uptimeAll'] = [];
        this.attribute['capacityMaxAll'] = [];
        this.attribute['capacityInUseAll'] = [];
        this.attribute['loadAverageAll'] = [];
        this.attribute['cpuAll'] = [];
        this.attribute['connectionsOpenAll'] = [];
        this.attribute['connectionsBusyAll'] = [];
        this.attribute['connectionsIdleAll'] = [];
    };
}