/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectHistoryController() {
    "use strict";

    /**
     * Main function of the project history controller.
     */
    this.main = function () {
        var phView = new ProjectHistoryView();
        phView.main();
    };
}