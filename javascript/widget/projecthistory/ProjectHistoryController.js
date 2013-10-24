/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.ProjectHistoryController = function ProjectHistoryController() {

        /**
         * Main function of the project history controller.
         */
        this.main = function () {
            var phView = new db.ProjectHistoryView();
            phView.main();
        };
    };
}(Dashboard));