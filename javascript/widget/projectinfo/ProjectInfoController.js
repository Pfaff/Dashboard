/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectInfoController() {
    var piController = this;
    var piView = new ProjectInfoView();
    var piModel = new ProjectInfoModel();

    var blockToUse = 1;
    piController.block = [];
    piController.block[1] = ['version', 'version', 'request time', 'requestTime', 'request / min', 'requestMin', 'uptime', 'uptime'];
    piController.block[2] = ['capacity max', 'capacityMax', 'capacity in use', 'capacityInUse', 'load average', 'loadAverage', "cpu's", 'cpu'];
    piController.block[3] = ['scheme', 'scheme', 'open connections', 'connectionsOpen', 'busy connections', 'connectionsBusy', 'idle connections', 'connectionsIdle'];

    this.main = function() {
        piController.startProjectInfoView();
        piController.startProjectInfoModel();
        piController.startUpdateContent();
        piController.setTimerForBlockSwitch();
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

    this.startUpdateContent = function() {
        setTimeout(function() {
            piController.updateBlock(piController.block[blockToUse]);
            piModel.getProjectInformation();
        }, 500 );

        setInterval(function() {
            piController.updateBlock(piController.block[blockToUse]);
            piModel.getProjectInformation();

        }, 7500 );
    };

    this.updateBlock = function(array) {
        for(var i = 1; i < 5; i++) {
            piView.updateBackgroundColor(i, "#2d92a5");
        }

        piView.updateContent(1, array[0], piModel.pi.getValue(array[1]));
        piView.updateContent(2, array[2], piModel.pi.getValue(array[3]));
        piView.updateContent(3, array[4], piModel.pi.getValue(array[5]));
        piView.updateContent(4, array[6], piModel.pi.getValue(array[7]));
    };

    this.setTimerForBlockSwitch = function() {
        setInterval(function() {
            for(var i = 1; i < 5; i++) {
                piView.updateBackgroundColor(i, "#554d59");
            }

            if(blockToUse > 2) {
                blockToUse = 1;
            } else {
                blockToUse++;
            }
        }, 20000 );
    };
}