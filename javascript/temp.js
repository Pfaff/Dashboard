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
            var dashView = new DashboardView();
            dashView.main();
        };

        /**
         * Starts the project info controller.
         */
        this.startProjectInfoController = function () {
            var piController = new ProjectInfoController();
            piController.main();
        };
    };
}(Dashboard));
