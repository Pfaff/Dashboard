/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.TrainController = function TrainController() {
        var tCon, tView, tMod;
        tCon = this;
        tView = new db.TrainView();
        tMod = new db.TrainModel();

        this.main = function () {
            tMod.main();
            tView.main();
        };
    };
}(Dashboard));