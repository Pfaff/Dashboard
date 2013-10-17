function ProjectInfo(version, requestTime, requestMin, uptime, capacityMax, capacityInUse, loadAverage, cpu, scheme, connectionsOpen, connectionsBusy, connectionsIdle) {
    "use strict";
    this.att = [];
    this.att.version = version;

    this.att.requestTimeAll = [];
    this.att.requestTime = requestTime;

    this.att.requestMinAll = [];
    this.att.requestMin = requestMin;

    this.att.uptimeAll = [];
    this.att.uptime = uptime;

    this.att.capacityMaxAll = [];
    this.att.capacityMax = capacityMax;

    this.att.capacityInUseAll = [];
    this.att.capacityInUse = capacityInUse;

    this.att.loadAverageAll = [];
    this.att.loadAverage = loadAverage;

    this.att.cpuAll = [];
    this.att.cpu = cpu;

    this.att.scheme = scheme;

    this.att.connectionsOpenAll = [];
    this.att.connectionsOpen = connectionsOpen;

    this.att.connectionsBusyAll = [];
    this.att.connectionsBusy = connectionsBusy;

    this.att.connectionsIdleAll = [];
    this.att.connectionsIdle = connectionsIdle;

    this.att.userAmount = [];

    this.getValue = function (value) { return this.att[value]; };

    this.pushNewValueInGivenArray = function (array, value) {
        this.att[array].push(value);
    };

    this.clearAllArraysExceptForUserAmount = function () {
        this.att.requestTimeAll = [];
        this.att.requestMinAll = [];
        this.att.uptimeAll = [];
        this.att.capacityMaxAll = [];
        this.att.capacityInUseAll = [];
        this.att.loadAverageAll = [];
        this.att.cpuAll = [];
        this.att.connectionsOpenAll = [];
        this.att.connectionsBusyAll = [];
        this.att.connectionsIdleAll = [];
    };
}