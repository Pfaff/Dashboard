/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.ProjectInfoModel = function ProjectInfoModel() {
        var piModel;
        piModel = this;

        /**
         * Array which contains the most recent user amounts.
         * @type {Array}
         */
        piModel.recentUserAmounts = [];

        /**
         * Array which contains the hours for the horizontal axis.
         * @type {Array}
         */
        piModel.userAmountsGraphHours = [];

        /**
         * Array which contains the actual amounts.
         * @type {Array}
         */
        piModel.userAmountsGraphAmounts = [];

        piModel.cpuLoadHours = [];
        piModel.cpuLoadHours[1] = [];
        piModel.cpuLoadHours[2] = [];
        piModel.cpuLoadHours[3] = [];
        piModel.cpuLoadHours[4] = [];

        piModel.cpuLoadValues = [];
        piModel.cpuLoadValues[1] = [];
        piModel.cpuLoadValues[2] = [];
        piModel.cpuLoadValues[3] = [];
        piModel.cpuLoadValues[4] = [];

        /**
         * Creates the object that saves all the information of the project info.
         * @type {ProjectInfo}
         */
        this.pi = new db.ProjectInfo(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ");

        /**
         * Gathers the information for the project info widget.
         */
        this.main = function () {
            piModel.getCpuLoadHistory();
            piModel.getUserAmountHistory();
            piModel.getProjectInformation();
        };

        /**
         * The AJAX call which gathers the information.
         */
        this.getProjectInformation = function () {
            $.ajax({
                url: '../dashboard/php/projectinfo/ProjectInfo.php',
                data: { method: 'getProjectInfo' },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    piModel.fillProjectInfoObject(data);
                }
            });
        };

        /**
         * Handles the response data of the AJAX call, storing the data in the project info object.
         * @param data
         */
        this.fillProjectInfoObject = function (data) {
            var i;
            piModel.pi.att.version = data.Versie1;
            piModel.pi.att.scheme = data.Schema1;
            piModel.fixSchemeVersion();

            piModel.pi.clearAllArraysExceptForUserAmount();

            for (i = 1; i <= db.amountOfSOMServers; i++) {
                piModel.pi.pushNewValueInGivenArray('requestTimeAll', data['Gem. request duur' + i]);
                piModel.pi.pushNewValueInGivenArray('requestMinAll', data['Requests per minuut' + i]);
                piModel.pi.pushNewValueInGivenArray('uptimeAll', data['Starttijd' + i]);
                piModel.pi.pushNewValueInGivenArray('capacityMaxAll', data['Maximum geheugen' + i]);
                piModel.pi.pushNewValueInGivenArray('capacityInUseAll', data['Gebruikt geheugen' + i]);
                piModel.pi.pushNewValueInGivenArray('loadAverageAll', data['Load average' + i]);
                piModel.pi.pushNewValueInGivenArray('cpuAll', data["CPU's" + i]);
                piModel.pi.pushNewValueInGivenArray('connectionsOpenAll', data['Open connections' + i]);
                piModel.pi.pushNewValueInGivenArray('connectionsBusyAll', data['Busy connections' + i]);
                piModel.pi.pushNewValueInGivenArray('connectionsIdleAll', data['Idle connections' + i]);
            }

            piModel.startCalculationOfValues();
        };

        /**
         * Starts the functions which calculate their own value of the array with values.
         */
        this.startCalculationOfValues = function () {
            piModel.calculateRequestTime();
            piModel.calculateRequestMin();
            piModel.calculateUptime();
            piModel.calculateCapacityMax();
            piModel.calculateCapacityInUse();
            piModel.calculateLoadAverage();
            piModel.calculateCpu();
            piModel.calculateConnections();
        };

        /**
         * Calculates the request time. Removing the dot after 'ms'.
         */
        this.calculateRequestTime = function () {
            var result, requestTimes, unit, i;
            result = 0;
            requestTimes = piModel.pi.att.requestTimeAll;

            unit = " " + requestTimes[0].split(' ')[1];

            for (i = 0; i < requestTimes.length; i++) {
                result = result + parseInt(requestTimes[i].split(' ')[0], 10);
            }

            Math.floor(result);
            piModel.pi.att.requestTime = (result + unit).split('.').join("");
        };

        /**
         * Calculates the requests per minute.
         */
        this.calculateRequestMin = function () {
            var requestMinAll = piModel.pi.att.requestMinAll;
            piModel.pi.att.requestMin = Math.floor(piModel.calculateSum(requestMinAll) / requestMinAll.length);
        };

        /**
         * Calculates the maximum capacity.
         */
        this.calculateCapacityMax = function () {
            var capacityMaxAll, capacityMax;
            capacityMaxAll = piModel.pi.att.capacityMaxAll;
            capacityMax = piModel.calculateSum(capacityMaxAll);
            piModel.pi.att.capacityMax = capacityMax + " GB";
        };

        /**
         * Calculates the capacity in use.
         */
        this.calculateCapacityInUse = function () {
            var capacityInUseAll, capacityInUse;
            capacityInUseAll = piModel.pi.att.capacityInUseAll;
            capacityInUse = piModel.calculateSum(capacityInUseAll);
            piModel.pi.att.capacityInUse = capacityInUse + " GB";
        };

        /**
         * Calculates the uptime of the server.
         * I get the following date format: dd/mm/yyyy hh:mm, but I want mm/dd/yyyy hh:mm.
         * So I used the replace function at the start of the function to manage it.
         * Removing the dashes out of the date string otherwise it won't be recognized as Date object.
         */
        this.calculateUptime = function () {
            var tempUptimeArray, i, dateString, serverStart, uptimeAll;
            tempUptimeArray = piModel.pi.att.uptimeAll;
            piModel.pi.att.uptimeAll = [];

            for (i = 0; i < db.amountOfSOMServers; i++) {
                dateString = tempUptimeArray[i].replace(/(\d\d)-(\d\d)/, "$2-$1");
                dateString = dateString.replace(/-/g, '/');
                serverStart = new Date(dateString);
                piModel.pi.pushNewValueInGivenArray('uptimeAll', String(new Date().getHours() - serverStart.getHours()));
            }

            uptimeAll = piModel.pi.att.uptimeAll;
            piModel.pi.att.uptime = (piModel.calculateSum(uptimeAll) / uptimeAll.length) + " hours";
        };

        /**
         * Calculates the load average.
         * Replacing the , with the . for the sake of counting.
         */
        this.calculateLoadAverage = function () {
            var loadAverageAll, averageLoadAverage, i;
            loadAverageAll = piModel.pi.att.loadAverageAll;
            for (i = 0; i < loadAverageAll.length; i++) {
                loadAverageAll[i] = loadAverageAll[i].replace(/,/g, '.');
            }
            averageLoadAverage = piModel.calculateSum(loadAverageAll) / loadAverageAll.length;
            piModel.pi.att.loadAverage = parseFloat(averageLoadAverage.toFixed(2));
        };

        /**
         * Calculates the amount of Cpu's.
         */
        this.calculateCpu = function () {
            var cpuAll, i;
            cpuAll = piModel.pi.att.cpuAll;
            for (i = 0; i < db.sameServer.length; i++) {
                cpuAll[db.sameServer[i]] = 0;
            }
            piModel.pi.att.cpu = piModel.calculateSum(cpuAll);
        };

        /**
         * Calculates the open, idle and busy connections.
         */
        this.calculateConnections = function () {
            var connectionsOpenAll, connectionsBusyAll, connectionsIdleAll;
            connectionsOpenAll = piModel.pi.att.connectionsOpenAll;
            connectionsBusyAll = piModel.pi.att.connectionsBusyAll;
            connectionsIdleAll = piModel.pi.att.connectionsIdleAll;

            piModel.pi.att.connectionsOpen = piModel.calculateSum(connectionsOpenAll);
            piModel.pi.att.connectionsBusy = piModel.calculateSum(connectionsBusyAll);
            piModel.pi.att.connectionsIdle = piModel.calculateSum(connectionsIdleAll);
        };

        /**
         * Removes the text part after the version number of the scheme.
         */
        this.fixSchemeVersion = function () {
            var scheme = piModel.pi.att.scheme;
            piModel.pi.att.scheme = scheme.substr(0, scheme.indexOf(' '));
        };

        /**
         * Collects the user amount history information from the given REST service.
         */
        this.getUserAmountHistory = function () {
            $.ajax({
                url: '../dashboard/php/projectinfo/UserAmountHistory.php',
                data: { method: 'main',
                        value: db.graphEpochDifference },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    piModel.fillUserAmountArray(data);
                }
            });
        };

        /**
         * Fills the user amount array for in the project info object.
         * @param data
         */
        this.fillUserAmountArray = function (data) {
            var i, user, date;
            piModel.pi.att.userAmount.length = 0;
            for (i = data.length - 1; i >= 0; i--) {
                date = new Date(0);
                date.setUTCSeconds(data[i].clock);
                user = new db.UserAmount('SOM', date, parseInt(data[i].value, 10));
                piModel.pi.pushNewValueInGivenArray('userAmount', user);
            }

            piModel.createArrayWithRecentUserAmounts();
        };

        /**
         * Pushes the most recent user amounts into the array.
         * Counting from the latest to the first one to get the most recent values.
         * Clearing the array to avoid double data in the array.
         */
        this.createArrayWithRecentUserAmounts = function () {
            var counter, userAmounts, i;
            piModel.recentUserAmounts.length = 0;
            counter = 0;
            userAmounts = piModel.pi.getValue('userAmount');

            for (i = userAmounts.length - 1; i >= 0; i--) {
                if (counter <= db.maxAmountOfUserAmountsToShow) {
                    piModel.recentUserAmounts.unshift(userAmounts[i]);
                    counter++;
                }
            }

            piModel.fillArrayWithHours();
            piModel.fillArrayWithAmounts();
        };

        /**
         * Fills an array with hours for the graph.
         */
        this.fillArrayWithHours = function () {
            var i, hours;
            piModel.userAmountsGraphHours.length = 0;

            for (i = 0; i < piModel.recentUserAmounts.length; i++) {
                hours = piModel.recentUserAmounts[i].att.datetime.getHours();

                if (hours < 10) {
                    hours = "0" + hours + ":00";
                } else {
                    hours = hours + ":00";
                }

                piModel.userAmountsGraphHours.push(hours);
            }
        };

        /**
         * Fills an array with the amounts for the graph.
         */
        this.fillArrayWithAmounts = function () {
            var i;
            piModel.userAmountsGraphAmounts.length = 0;

            for (i = 0; i < piModel.recentUserAmounts.length; i++) {
                piModel.userAmountsGraphAmounts.push(piModel.recentUserAmounts[i].att.amount);
            }
        };

        /**
         * Calculates the sum of the given array.
         * @param array
         * @returns {number}
         */
        this.calculateSum = function (array) {
            var result, i;
            result = 0;

            for (i = 0; i < array.length; i++) {
                result = result + parseFloat(array[i]);
            }

            return result;
        };

        this.getCpuLoadHistory = function () {
            $.ajax({
                url: '../dashboard/php/projectinfo/CpuLoadHistory.php',
                data: { method: 'main' },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    piModel.handleCpuLoadData(data);
                }
            });
        };

        this.handleCpuLoadData = function (data) {
            piModel.fillCpuLoadArray(data);
            piModel.fillCpuLoadHours();
            piModel.fillCpuLoadValues();
        };

        this.fillCpuLoadArray = function (data) {
            var i, x, cpuLoad, date, dataLength;
            piModel.pi.att.cpuLoad.lenght = 0;
            dataLength = $.map(data, function (n, i) { return i; }).length;

            for (i = dataLength; i > 0; i--) {
                for (x = 0; x < data[i].length; x++) {
                    date = new Date(0);
                    date.setUTCSeconds(data[i][x].clock);
                    cpuLoad = new db.CpuLoad('SOM', i, date, parseFloat(data[i][x].value));
                    piModel.pi.pushNewValueInGivenArray('cpuLoad', cpuLoad);
                }
            }
        };

        this.fillCpuLoadHours = function () {
            var i, x, y, time, minutes, hours, cpuLoads;

            for (i = 1; i > 4; i++) { piModel.cpuLoadHours[i] = []; }
            cpuLoads = piModel.pi.att.cpuLoad;

            for (x = 4; x > 0; x--) {
                for (y = cpuLoads.length - 1; y >= 0; y--) {
                    if (cpuLoads[y].att.server === x) {
                        hours = cpuLoads[y].att.datetime.getHours();
                        if (hours < 10) { hours = "0" + hours; }

                        minutes = cpuLoads[y].att.datetime.getMinutes();
                        time = hours + ":" + minutes;
                        piModel.cpuLoadHours[x].push(time);
                    }
                }
            }
        };

        this.fillCpuLoadValues = function () {
            var i, x, y, value, cpuLoads;

            for (i = 1; i > 4; i++) { piModel.cpuLoadValues[i] = []; }
            cpuLoads = piModel.pi.att.cpuLoad;

            for (x = 4; x > 0; x--) {
                for (y = cpuLoads.length - 1; y >= 0; y--) {
                    if (cpuLoads[y].att.server === x) {
                        value = cpuLoads[y].att.value;
                        piModel.cpuLoadValues[x].push(value);
                    }
                }
            }
        };
    };
}(Dashboard));