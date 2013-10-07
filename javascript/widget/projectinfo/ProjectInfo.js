function ProjectInfo(version, requestTime, requestMin, uptime, capacityMax, capacityInUse, loadAverage, cpu, scheme, connectionsOpen, connectionsBusy, connectionsIdle) {
    this.attribute = [];
    this.attribute['version'] = version;
    this.attribute['requestTime'] = requestTime;
    this.attribute['requestMin'] = requestMin;
    this.attribute['uptime'] = uptime;
    this.attribute['capacityMax'] = capacityMax;
    this.attribute['capacityInUse'] = capacityInUse;
    this.attribute['loadAverage'] = loadAverage;
    this.attribute['cpu'] = cpu;
    this.attribute['scheme'] = scheme;
    this.attribute['connectionsOpen'] = connectionsOpen;
    this.attribute['connectionsBusy'] = connectionsBusy;
    this.attribute['connectionsIdle'] = connectionsIdle;
    this.attribute['userAmount'] = [];

    this.getValue = function(value) { return this.attribute[value]; };
    this.setValue = function(attribute, newValue) { this.attribute[attribute] = newValue; };

    /**
     * Use to push a new user amount in the array.
     * @param userAmount
     */
    this.pushNewUserAmount = function(userAmount) {
        this.attribute['userAmount'].push(userAmount);
    }
}