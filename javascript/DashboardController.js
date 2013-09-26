/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function DashboardController() {
    var dashCon = this;

    /**
     * Starts the dashboard.
     */
    this.main = function() {
        dashCon.buildView();
        dashCon.activateOnClickListeners();
    };

    /**
     * Builds the view of the dashboard.
     */
    this.buildView = function() {
        var dashView = new DashboardView();
        dashView.main();
    };

    /**
     * Activates the onclicklisteners by calling the desired functions.
     */
    this.activateOnClickListeners = function() {
        dashCon.activatePIArticleClickListeners();
    };

    /**
     * Activates the click listeners.
     */
    this.activatePIArticleClickListeners = function() {
        $(".piArticle").click(function() {
            alert("Hoi");
        });
    };
}