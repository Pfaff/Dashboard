/**
 * The Mantis Stats object.
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStats = function MantisStats(version, dateTime, value) {
        this.version = version;
        this.dateTime = dateTime;
        this.value = value;
    };
}(Dashboard));