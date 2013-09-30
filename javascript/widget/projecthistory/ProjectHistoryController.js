/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectHistoryController() {

    this.main = function() {
        var phView = new ProjectHistoryView();
        phView.main();
    };
}