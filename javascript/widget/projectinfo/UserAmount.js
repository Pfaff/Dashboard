function UserAmount(project, datetime, amount) {
    "use strict";
    this.attribute = [];
    this.attribute["project"] = project;
    this.attribute["datetime"] = datetime;
    this.attribute["amount"] = amount;

    this.getValue = function (value) { return this.attribute[value]; };
}