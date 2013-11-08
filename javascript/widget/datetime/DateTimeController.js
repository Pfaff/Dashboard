/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.DateTimeController = function DateTimeController() {
        var dtCon, dtView, dtMod;
        dtCon = this;
        dtView = new db.DateTimeView();
        dtMod = new db.DateTimeModel();

        this.main = function () {
            dtMod.main();
            dtView.main();
        };
    };
}(Dashboard));