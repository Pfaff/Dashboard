/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.DashboardController = function DashboardController() {
        var dashCon;
        dashCon = this;

        /**
         * Starts the dashboard.
         */
        this.main = function () {
            dashCon.buildView();
            dashCon.startProjectInfoController();
            dashCon.startMessageController();
            dashCon.startDateTimeController();
            dashCon.startNewsController();
            dashCon.startMantisStatsController();
        };

        /**
         * Builds the view of the dashboard.
         */
        this.buildView = function () {
            var dashView = new db.DashboardView();
            dashView.main();
        };

        /**
         * Starts the project info controller.
         */
        this.startProjectInfoController = function () {
            var piController = new db.ProjectInfoController();
            piController.main();
        };

        /**
         * Starts the message controller.
         */
        this.startMessageController = function () {
            var mesCon = new db.MessageController();
            mesCon.main();
        };

        /**
         * Starts the datetime controller.
         */
        this.startDateTimeController = function () {
            var dtCon = new db.DateTimeController();
            dtCon.main();
        };

        /**
         * Starts the news controller.
         */
        this.startNewsController = function () {
            var nCon = new db.NewsController();
            nCon.main();
        };

        /**
         * Starts the mantis stats controller.
         */
        this.startMantisStatsController = function () {
            var msCon = new db.MantisStatsController();
            msCon.main();
        };
    };
}(Dashboard));