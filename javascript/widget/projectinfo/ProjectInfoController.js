/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectInfoController() {
    "use strict";
    var piController, piView, piModel, updateContentInterval, updateGraphInterval, blockSwitchInterval, blockToUse, blockContent, blockTitle;
    piController = this;
    piView = new ProjectInfoView();
    piModel = new ProjectInfoModel();

    /**
     * The variables for the intervals.
     * 5.000 = 5 seconds.
     * 3.600.000 = 1 hour.
     * 20.000 = 20 seconds.
     * @type {number}
     */
    updateContentInterval = 3000;
    updateGraphInterval = 3600000;
    blockSwitchInterval = 15000;

    /**
     * Defines what block the dashboard should be using.
     * @type {number}
     */
    blockToUse = 1;

    /**
     * The blocks for the dashboard project information
     * @type {Array}
     */
    blockContent = [];
    blockTitle = [];

    blockContent[1] = [' ',   'version',          'requestTime',          'requestMin',           'uptime'            ];
    blockTitle[1] = [' ',     'version',          'request time',         'requests / min',       'uptime'            ];

    blockContent[2] = [' ',   'capacityMax',      'capacityInUse',        'loadAverage',          'cpu'               ];
    blockTitle[2] = [' ',     'capacity max',     'capacity in use',      'load average',         "cpu's"             ];

    blockContent[3] = [' ',   'scheme',           'connectionsOpen',      'connectionsBusy',      'connectionsIdle'   ];
    blockTitle[3] = [' ',     'scheme',           'open connections',     'busy connections',     'idle connections'  ];

    /**
     * Calls the functions to activate the project info widget.
     */
    this.main = function () {
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
    this.startProjectInfoView = function () {
        piView.main();
    };

    /**
     * Starts the project info model.
     */
    this.startProjectInfoModel = function () {
        piModel.main();
    };


    /**
     * Activates the click listeners.
     */
    this.activatePIArticleClickListeners = function () {
        $(".piArticle").click(function () {
            piController.startOverlayAndProjectHistoryController();
        });
    };

    /**
     * Calls the function which creates both of the controllers.
     * Did this so I could give this function to the project view.
     */
    this.startOverlayAndProjectHistoryController = function () {
        piController.startOverlayController(true);
        piController.startProjectHistoryController();
    };

    /**
     * Starts the overlay controller.
     * @param trueForBuildFalseForRemove
     */
    this.startOverlayController = function (trueForBuildFalseForRemove) {
        var overlayController = new OverlayController();
        overlayController.main(trueForBuildFalseForRemove);
    };

    /**
     * Starts the project history controller.
     */
    this.startProjectHistoryController = function () {
        var phController = new ProjectHistoryController();
        phController.main();
    };

    /**
     * Starts the time outs.
     * It's being used for the build after loading the page, so it doesn't have to wait on the first interval.
     */
    this.startTimeOutsForContentAndGraph = function () {
        setTimeout(function () {
            piController.updateBlock(blockContent[blockToUse], blockTitle[blockToUse]);
            piModel.getProjectInformation();
        }, 2000);

        setTimeout(function () {
            piView.buildUserAmountsGraph(piModel.userAmountsGraphHours, piModel.userAmountsGraphAmounts, piController.startOverlayAndProjectHistoryController);
        }, 7500);
    };

    /**
     * Starts the timer which updates the content of the project info widget.
     * The reason it starts with a time-out is made so the user doesn't have to wait on the interval to see the information at the start.
     */
    this.startUpdateContent = function () {
        setInterval(function () {
            piController.updateBlock(blockContent[blockToUse], blockTitle[blockToUse]);
            piModel.getProjectInformation();
        }, updateContentInterval);
    };

    /**
     * Starts the updater of the graph.
     */
    this.startUpdateGraph = function () {
        setInterval(function () {
            piModel.getUserAmountHistory();
            piView.removeUserAmountsGraph();
            piView.buildUserAmountsGraph(piModel.userAmountsGraphHours, piModel.userAmountsGraphAmounts, piController.startOverlayAndProjectHistoryController);
        }, updateGraphInterval);
    };

    /**
     * Updates the project info with the given block array.
     * @param arrayContent
     * @param arrayTitle
     */
    this.updateBlock = function (arrayContent, arrayTitle) {
        var x, i, p, value;
        piView.clearParagraphs();
        for (x = 1; x < 5; x++) {
            piView.updateContent(x, arrayTitle[x], piModel.pi.att[arrayContent[x]]);
        }

        for (i = 1; i < blockContent[1].length; i++) {
            p = document.getElementById('piContent' + i);
            value = piModel.pi.getValue(blockContent[blockToUse][i]);
            if (String(value).indexOf(' ') >= 0) {
                piView.addSpanToParagraph(p, value);
            } else {
                piView.setNormalMarginToParagraph(p);
            }
        }
    };

    /**
     * Sets the timer for switching the block.
     */
    this.setTimerForBlockSwitch = function () {
        setInterval(function () {
            if (blockToUse > 2) {
                blockToUse = 1;
            } else {
                blockToUse++;
            }
        }, blockSwitchInterval);
    };
}