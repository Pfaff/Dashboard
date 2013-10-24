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
    };
}(Dashboard));