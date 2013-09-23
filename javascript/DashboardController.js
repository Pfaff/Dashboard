/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function DashboardController() {
    var dashCon = this;

    this.main = function() {
        dashCon.buildView();
    };

    this.buildView = function() {
        var dashView = new DashboardView();
        dashView.main();
    };
}