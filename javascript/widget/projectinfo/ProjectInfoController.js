/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.ProjectInfoController = function ProjectInfoController() {
        var piController, piView, piModel, blockToUse, blockContent, blockTitle, graphToUse;
        piController = this;
        piView = new db.ProjectInfoView();
        piModel = new db.ProjectInfoModel();

        /**
         * Defines what graph the dashboard should be showing.
         * @type {number}
         */
        graphToUse = 2;

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
            //piController.startUpdateContent();
            piController.startUpdateGraph();
            piController.setTimerForBlockSwitch();
            piController.setTimerForGraphSwitch();
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
            piController.startOverlayController();
            piController.startProjectHistoryController();
        };

        /**
         * Starts the overlay controller.
         */
        this.startOverlayController = function () {
            var overlayController = new db.OverlayController();
            overlayController.buildOverlay();
        };

        /**
         * Starts the project history controller.
         */
        this.startProjectHistoryController = function () {
            var phController = new db.ProjectHistoryController();
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
                piController.startUpdateContent();
                piController.getNewProjectInformationInterval();
            }, 40000);

            setTimeout(function () {
                piView.buildUserAmountsGraph(piModel.userAmountsGraphHours, piModel.userAmountsGraphAmounts, piController.startOverlayAndProjectHistoryController);
            }, 10000);
        };

        /**
         * Starts the timer which updates the content of the project info widget.
         * The reason it starts with a time-out is made so the user doesn't have to wait on the interval to see the information at the start.
         */
        this.startUpdateContent = function () {
            setInterval(function () {
                piController.updateBlock(blockContent[blockToUse], blockTitle[blockToUse]);
            }, db.projectInfoUpdateContentInterval);
        };

        this.getNewProjectInformationInterval = function () {
            setInterval(function () {
                piModel.getProjectInformation();
            }, db.getNewProjectInfo);
        };

        /**
         * Starts the updater of the graph.
         */
        this.startUpdateGraph = function () {
            setInterval(function () {
                if (graphToUse === 1) {
                    piController.startBuildUserAmountGraph();
                } else {
                    piController.startBuildCpuLoadAverageGraph();
                }
            }, db.projectInfoUpdateGraphInterval);
        };

        /**
         * Gets the new user history, removes the current graph and builds the new graph.
         */
        this.startBuildUserAmountGraph = function () {
            piModel.getUserAmountHistory();
            piView.removeGraph();
            piView.buildUserAmountsGraph(piModel.userAmountsGraphHours, piModel.userAmountsGraphAmounts, piController.startOverlayAndProjectHistoryController);
            piView.setGraphTitle('number of users');
            //$('#piContentArticle0 .highcharts-legend').toggle();
        };

        /**
         * Gets the new CPU load history, removes the current graph and builds the new graph.
         */
        this.startBuildCpuLoadAverageGraph = function () {
            piModel.getCpuLoadHistory();
            piView.removeGraph();
            piView.buildCpuLoadAverageGraph(piModel.cpuLoadTimes, piModel.cpuLoadValues, piController.startOverlayAndProjectHistoryController);
            piView.setGraphTitle('average cpu load');
            //$('#piContentArticle0 .highcharts-legend').toggle();
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
            }, db.projectInfoBlockSwitchInterval);
        };

        /**
         * Sets the timer for switching the graph.
         */
        this.setTimerForGraphSwitch = function () {
            setInterval(function () {
                if (graphToUse > 1) {
                    graphToUse = 1;
                } else {
                    graphToUse++;
                }
            }, db.projectInfoGraphSwitchInterval);
        };
    };
}(Dashboard));