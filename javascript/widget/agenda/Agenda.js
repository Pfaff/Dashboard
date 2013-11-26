/**
 * The Agenda object.
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.Agenda = function Agenda(agenda, date, title) {
        this.agenda = agenda;
        this.date = date;
        this.title = title;
    };
}(Dashboard));