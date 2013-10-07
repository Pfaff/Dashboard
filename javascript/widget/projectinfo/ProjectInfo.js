/**
 * The project info object.
 * @param version
 * @param requestTime
 * @param requestMin
 * @param uptime
 * @param capacityMax
 * @param capacityInUse
 * @param loadAverage
 * @param cpu
 * @param scheme
 * @param connectionsOpen
 * @param connectionsBusy
 * @param connectionsIdle
 * @param users
 * @constructor
 */
function ProjectInfo(version, requestTime, requestMin, uptime, capacityMax, capacityInUse, loadAverage, cpu, scheme, connectionsOpen, connectionsBusy, connectionsIdle, users) {
    this.attribute = [];
    this.attribute["version"] = version;
    this.attribute["requestTime"] = requestTime;
    this.attribute["requestMin"] = requestMin;
    this.attribute["uptime"] = uptime;
    this.attribute["capacityMax"] = capacityMax;
    this.attribute["capacityInUse"] = capacityInUse;
    this.attribute["loadAverage"] = loadAverage;
    this.attribute["cpu"] = cpu;
    this.attribute["scheme"] = scheme;
    this.attribute["connectionsOpen"] = connectionsOpen;
    this.attribute["connectionsBusy"] = connectionsBusy;
    this.attribute["connectionsIdle"] = connectionsIdle;
    this.attribute["users"] = users;

    this.getValue = function(value) { return this.attribute[value]; };
    this.setValue = function(attribute, newValue) { this.attribute[attribute] = newValue; };
}