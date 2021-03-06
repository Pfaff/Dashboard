/**
 * The UserAmount object.
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.UserAmount = function UserAmount(project, datetime, amount) {
        this.att = [];
        this.att.project = project;
        this.att.datetime = datetime;
        this.att.amount = amount;

        this.getValue = function (value) { return this.att[value]; };
    };
}(Dashboard));