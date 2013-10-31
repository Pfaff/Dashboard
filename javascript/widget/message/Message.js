/**
 * The Message object.
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.Message = function Message(id, message, employee, startDate, endDate) {
        this.id = id;
        this.message = message;
        this.employee = employee;
        this.startDate = startDate;
        this.endDate = endDate;
    };
}(Dashboard));