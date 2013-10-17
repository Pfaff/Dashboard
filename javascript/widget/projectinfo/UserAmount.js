function UserAmount(project, datetime, amount) {
    "use strict";
    this.att = [];
    this.att.project = project;
    this.att.datetime = datetime;
    this.att.amount = amount;

    this.getValue = function (value) { return this.att[value]; };

    this.testFunction = function (value) {
        return value === 1;
    };
}