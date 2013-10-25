(function (db) {
    "use strict";
    db.CpuLoad = function CpuLoad(project, server, datetime, value) {
        this.att = [];
        this.att.project = project;
        this.att.server = server;
        this.att.datetime = datetime;
        this.att.value = value;

        this.getValue = function (value) { return this.att[value]; };
    };
}(Dashboard));