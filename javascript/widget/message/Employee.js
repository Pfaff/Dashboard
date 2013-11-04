/**
 * The Employee object.
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.Employee = function Employee(displayname, mail) {
        this.displayname = displayname;
        this.mail = mail;
    };
}(Dashboard));