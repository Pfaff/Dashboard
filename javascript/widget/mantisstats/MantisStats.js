/**
 * The Mantis Stats object.
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStats = function MantisStats(version, status, clock, value) {
        this.version = version;
        this.status = status;
        this.clock = clock;
        this.value = value;
    };
}(Dashboard));