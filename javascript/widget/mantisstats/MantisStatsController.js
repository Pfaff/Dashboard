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

        /**
         * Starts the model and the view. Building the chart and starting it's update interval.
         */
        this.main = function () {
            msMod.main();
            msView.main();
            setTimeout(msCon.buildMantisStatsChart, 1500);
            msCon.startBuildMantisStatsChartInterval();
        };

        /**
         * Builds the chart with the data from the model.
         */
        this.buildMantisStatsChart = function () {
            msView.buildMantisStatsChart(msMod.msCategories, msMod.msIssuesOpen, msMod.msIssuesClosed, msMod.msIssuesResolved, msMod.msDaysLeft);
        };

        /**
         * Interval which calls the function to build the graph.
         */
        this.startBuildMantisStatsChartInterval = function () {
            setInterval(function () {
                msMod.main();
                msCon.buildMantisStatsChart();
            }, db.updateMantisStatsChartInterval);
        };
    };
}(Dashboard));