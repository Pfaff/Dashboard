/**
 * The Comic object.
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.Comic = function Comic(title, src, alt) {
        this.title = title;
        this.src = src;
        this.alt = alt;
    };
}(Dashboard));