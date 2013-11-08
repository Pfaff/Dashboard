/**
 * The Mantis Stats object.
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStats = function MantisStats(version, clock, value) {
        this.version = version;
        this.clock = clock;
        this.value = value;
    };
}(Dashboard));