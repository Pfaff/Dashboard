/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectInfoController() {
    var piController = this;
    var piView = new ProjectInfoView();
    var piModel = new ProjectInfoModel();

    var pi;

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
            for(var i = 1; i < 5; i++) {
                piView.updateBackgroundColor(i, "#554d59");
            }

            setTimeout(function() {
                piController.updateFirstBlock();
            }, 1000 );
        }, 2000 );
    };

    this.updateFirstBlock = function() {
        for(var i = 1; i < 5; i++) {
            piView.updateBackgroundColor(i, "#2d92a5");
        }

        piView.updateContent(1, "version", piModel.pi.getValue('version'));
        piView.updateContent(2, "request time", piModel.pi.getRequestTime());
        piView.updateContent(3, "request / min", piModel.pi.getRequestMin());
        piView.updateContent(4, "uptime", piModel.pi.getUptime());
    };
}