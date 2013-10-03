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
        dashCon.startProjectInfoController();
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
            dashCon.startOverlayController(true);
            dashCon.startProjectHistoryController();
        });
    };

    /**
     * Starts the overlay controller.
     * @param trueForBuildFalseForRemove
     */
    this.startOverlayController = function(trueForBuildFalseForRemove) {
        var overlayController = new OverlayController();
        overlayController.main(trueForBuildFalseForRemove);
    };

    /**
     * Starts the project history controller.
     */
    this.startProjectHistoryController = function() {
        var phController = new ProjectHistoryController();
        phController.main();
    };

    /**
     * Starts the project info controller.
     */
    this.startProjectInfoController = function() {
        var piController = new ProjectInfoController();
        piController.main();
    };
}