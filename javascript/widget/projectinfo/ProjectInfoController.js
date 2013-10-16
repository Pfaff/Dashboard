/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectInfoController() {
    var piController = this;
    var piView = new ProjectInfoView();
    var piModel = new ProjectInfoModel();

    /**
     * The variables for the intervals.
     * 5.000 = 5 seconds.
     * 3.600.000 = 1 hour.
     * 20.000 = 20 seconds.
     * @type {number}
     */
    var updateContentInterval = 5000;
    var updateGraphInterval = 3600000;
    var blockSwitchInterval = 20000;

    /**
     * Defines what block the dashboard should be using.
     * @type {number}
     */
    var blockToUse = 1;

    /**
     * The different blocks, the first value is the name on the bottom left corner.
     * The second value is the name of the attribute in the project info object.
     * @type {Array}
     */
    piController.block = [];
    piController.block[1] = ['version', 'version', 'request time', 'requestTime', 'requests / min', 'requestMin', 'uptime', 'uptime'];
    piController.block[2] = ['capacity max', 'capacityMax', 'capacity in use', 'capacityInUse', 'load average', 'loadAverage', "cpu's", 'cpu'];
    piController.block[3] = ['scheme', 'scheme', 'open connections', 'connectionsOpen', 'busy connections', 'connectionsBusy', 'idle connections', 'connectionsIdle'];

    /**
     * Calls the functions to activate the project info widget.
     */
    this.main = function() {
        piController.startProjectInfoView();
        piController.startProjectInfoModel();
        piController.startTimeOutsForContentAndGraph();
        piController.startUpdateContent();
        piController.startUpdateGraph();
        piController.setTimerForBlockSwitch();
        piController.activatePIArticleClickListeners();
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


    /**
     * Activates the click listeners.
     */
    this.activatePIArticleClickListeners = function() {
        $(".piArticle").click(function() {
            piController.startOverlayAndProjectHistoryController();
        });
    };

    /**
     * Calls the function which creates both of the controllers.
     * Did this so I could give this function to the project view.
     */
    this.startOverlayAndProjectHistoryController = function() {
        piController.startOverlayController(true);
        piController.startProjectHistoryController();
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
     * Starts the time outs.
     * It's being used for the build after loading the page, so it doesn't have to wait on the first interval.
     */
    this.startTimeOutsForContentAndGraph = function() {
        setTimeout(function() {
            piController.updateBlock(piController.block[blockToUse]);
            piModel.getProjectInformation();
        }, 2000 );

        setTimeout(function() {
            piView.buildUserAmountsGraph(piModel.userAmountsGraphHours, piModel.userAmountsGraphAmounts, piController.startOverlayAndProjectHistoryController);
        }, 1500 );
    };

    /**
     * Starts the timer which updates the content of the project info widget.
     * The reason it starts with a time-out is made so the user doesn't have to wait on the interval to see the information at the start.
     */
    this.startUpdateContent = function() {
        setInterval(function() {
            piController.updateBlock(piController.block[blockToUse]);
            piModel.getProjectInformation();
        }, updateContentInterval );
    };

    this.startUpdateGraph = function() {
        setInterval(function() {
            piModel.getUserAmounts();
            piView.removeUserAmountsGraph();
            piView.buildUserAmountsGraph(piModel.userAmountsGraphHours, piModel.userAmountsGraphAmounts, piController.startOverlayAndProjectHistoryController);
        }, updateGraphInterval );
    };

    /**
     * Updates the project info with the given block array.
     * @param array
     */
    this.updateBlock = function(array) {
        piView.clearParagraphs();
        piView.updateContent(1, array[0], piModel.pi.getValue(array[1]));
        piView.updateContent(2, array[2], piModel.pi.getValue(array[3]));
        piView.updateContent(3, array[4], piModel.pi.getValue(array[5]));
        piView.updateContent(4, array[6], piModel.pi.getValue(array[7]));

        for(var i = 1; i < 8; i += 2) {
            var p = piController.getPiContentElement(i);
            var value = piModel.pi.getValue(array[i]);
            if(value.indexOf(' ') >= 0) {
                piView.addSpanToParagraph(p, value);
            } else {
                piView.setNormalMarginToParagraph(p);
            }
        }
    };

    /**
     * Returns the desired piContent element.
     * @param index
     * @returns {*}
     */
    this.getPiContentElement = function(index) {
        if(index === 1) { return document.getElementById('piContent1'); }
        else if(index === 3) { return document.getElementById('piContent2'); }
        else if(index === 5) { return document.getElementById('piContent3'); }
        else if(index === 7) { return document.getElementById('piContent4'); }
        else { return null; }
    };

    /**
     * Sets the timer for switching the block.
     */
    this.setTimerForBlockSwitch = function() {
        setInterval(function() {
            if(blockToUse > 2) {
                blockToUse = 1;
            } else {
                blockToUse++;
            }
        }, blockSwitchInterval );
    };
}