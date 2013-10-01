/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectInfoController() {
    var piController = this;
    var piView = new ProjectInfoView();
    var piModel = new ProjectInfoModel();
    var pi = new ProjectInfo("4.0.2", "4.051", "6.6 Hours", "53", "7");

    this.main = function() {
        piController.startProjectInfoView();
        piController.startProjectInfoModel();
        piController.updateContent();
    };

    /**
     * Starts the project info view.
     */
    this.startProjectInfoView = function() {
        piView.main();
    };

    /**
     * Starts the project info model.
     */
    this.startProjectInfoModel = function() {
        piModel.main();
    };

    this.updateContent = function() {
        setInterval(function() {
            piView.updateBackgroundColor(1, "#554d59");

            setTimeout(function() {
                piView.updateBackgroundColor(1, "#2d92a5");
                piView.updateContent(1, "users", pi.getUsers());
            }, 1000 );
        }, 2000 );
    };
}