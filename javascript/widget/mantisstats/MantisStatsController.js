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
            setTimeout(msCon.buildMantisStatsGraph, 2000);
        };

        this.buildMantisStatsGraph = function () {
//            console.log(msMod.valuesMantisStats);
//            console.log(msMod.momentsMantisStats);

            msView.buildMantisStatsGraph(msMod.momentsMantisStats, msMod.valuesMantisStats, msMod.keys);
        };
    };
}(Dashboard));