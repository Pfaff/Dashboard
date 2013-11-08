/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStatsController = function MantisStatsController() {
        var msCon, msView, msMod;
        msCon = this;
        msView = new db.MantisStatsView();
        msMod = new db.MantisStatsModel();

        this.main = function () {
            msMod.main();
            msView.main();
        };
    };
}(Dashboard));