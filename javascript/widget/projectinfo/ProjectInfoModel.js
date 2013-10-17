/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectInfoModel() {
    "use strict";
    var piModel, amountOfSOMServers, maxAmountOfUserAmountsToShow;
    piModel = this;

    /**
     * Defines the amount of SOM servers.
     * @type {number}
     */
    amountOfSOMServers = 7;

    /**
     * Defines the maximum amount of different amounts to show in the graph.
     * @type {number}
     */
    maxAmountOfUserAmountsToShow = 10;

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

    /**
     * Creates the object that saves all the information of the project info.
     * @type {ProjectInfo}
     */
    this.pi = new ProjectInfo(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ");

    /**
     * Gathers the information for the project info widget.
     */
    this.main = function () {
        piModel.getProjectInformation();
        piModel.getUserAmounts();
    };

    /**
     * The AJAX call which gathers the information.
     */
    this.getProjectInformation = function () {
        $.ajax({
            url: '../dashboard/php/projectinfo/ProjectInfo.php',
            data: { method: 'getProjectInfo' },
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                piModel.fillProjectInfoObject(data);
            }
        });
    };

    /**
     * Handles the response data of the AJAX call, storing the data in the project info object.
     * @param data
     */
    this.fillProjectInfoObject = function (data) {
        piModel.pi.attribute['version'] = data['Versie1'];
        piModel.pi.attribute['scheme'] = data['Schema1'];
        piModel.fixSchemeVersion();

        piModel.pi.clearAllArraysExceptForUserAmount();

        for(var i = 1; i <= amountOfSOMServers; i++) {
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
        var result = 0;
        var requestTimes = piModel.pi.attribute['requestTimeAll'];

        var unit = " " + requestTimes[0].split(' ')[1];

        for(var i = 0; i < requestTimes.length; i++) {
            result = result + parseInt(requestTimes[i].split(' ')[0]);
        }

        Math.floor(result);
        piModel.pi.attribute['requestTime'] = (result + unit).split('.').join("");
    };

    /**
     * Calculates the requests per minute.
     */
    this.calculateRequestMin = function () {
        var requestMinAll = piModel.pi.attribute['requestMinAll'];
        var averageRequestMin = Math.floor(piModel.calculateSum(requestMinAll) / requestMinAll.length);
        piModel.pi.attribute['requestMin'] = averageRequestMin;
    };

    /**
     * Calculates the maximum capacity.
     */
    this.calculateCapacityMax = function () {
        var capacityMaxAll = piModel.pi.attribute['capacityMaxAll'];
        var capacityMax = piModel.calculateSum(capacityMaxAll);
        piModel.pi.attribute['capacityMax'] = capacityMax + " GB";
    };

    /**
     * Calculates the capacity in use.
     */
    this.calculateCapacityInUse = function () {
        var capacityInUseAll = piModel.pi.attribute['capacityInUseAll'];
        var capacityInUse = piModel.calculateSum(capacityInUseAll);
        piModel.pi.attribute['capacityInUse'] = capacityInUse + " GB";
    };

    /**
     * Calculates the uptime of the server.
     * I get the following date format: dd/mm/yyyy hh:mm, but I want mm/dd/yyyy hh:mm.
     * So I used the replace function at the start of the function to manage it.
     * Removing the dashes out of the date string otherwise it won't be recognized as Date object.
     */
    this.calculateUptime = function () {
        var tempUptimeArray = piModel.pi.attribute['uptimeAll'];
        piModel.pi.attribute['uptimeAll'] = [];

        for(var i = 0; i < amountOfSOMServers; i++) {
            var dateString = tempUptimeArray[i].replace(/(\d\d)-(\d\d)/,"$2-$1");
            dateString = dateString.replace(/-/g, '/');
            var serverStart = new Date(dateString);
            piModel.pi.pushNewValueInGivenArray('uptimeAll', String(new Date().getHours() - serverStart.getHours()));
        }

        var uptimeAll = piModel.pi.attribute['uptimeAll'];
        piModel.pi.attribute['uptime'] = (piModel.calculateSum(uptimeAll) / uptimeAll.length) + " hours";
    };

    /**
     * Calculates the load average.
     */
    this.calculateLoadAverage = function () {
        var loadAverageAll = piModel.pi.attribute['loadAverageAll'];
        var averageLoadAverage = piModel.calculateSum(loadAverageAll) / loadAverageAll.length;
        var loadAverage = parseFloat(averageLoadAverage.toFixed(2));
        piModel.pi.attribute['loadAverage'] = loadAverage;
    };

    /**
     * Calculates the amount of CPU's.
     */
    this.calculateCpu = function () {
        var cpuAll = piModel.pi.attribute['cpuAll'];
        piModel.pi.attribute['cpu'] = piModel.calculateSum(cpuAll);
    };

    /**
     * Calculates the open, idle and busy connections.
     */
    this.calculateConnections = function () {
        var connectionsOpenAll = piModel.pi.attribute['connectionsOpenAll'];
        var connectionsBusyAll = piModel.pi.attribute['connectionsBusyAll'];
        var connectionsIdleAll = piModel.pi.attribute['connectionsIdleAll'];

        piModel.pi.attribute['connectionsOpen'] = piModel.calculateSum(connectionsOpenAll);
        piModel.pi.attribute['connectionsBusy'] = piModel.calculateSum(connectionsBusyAll);
        piModel.pi.attribute['connectionsIdle'] = piModel.calculateSum(connectionsIdleAll);
    };

    /**
     * Removes the text part after the version number of the scheme.
     */
    this.fixSchemeVersion = function () {
        var scheme = piModel.pi.getValue('scheme');
        var newScheme = scheme.substr(0, scheme.indexOf(' '));

        piModel.pi.attribute['scheme'] = newScheme;
    };

    /**
     * Gathers the user amounts from the database.
     */
    this.getUserAmounts = function () {
        $.ajax({
            url: '../dashboard/php/projectinfo/UserAmount.php',
            data: { method: 'getUserAmounts' },
            type: 'POST',
            dataType: 'json',
            success: function(data){
                piModel.handleUserAmountArray(data);
            }
        });
    };

    /**
     * Creates a user amount object per data row and pushes it into the desired project info array object.
     * Clearing the array to avoid double data in the graph.
     * Replacing the dashes so it can be actually recognized as a Date object by FireFox.
     * @param data
     */
    this.handleUserAmountArray = function (data) {
        piModel.pi.attribute['userAmount'] = [];

        for(var i = 0; i < data.length; i++) {
            var user = new UserAmount(data[i].project, new Date(data[i].datetime.replace(/-/g, '/')), parseInt(data[i].amount));
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
        piModel.recentUserAmounts.length = 0;
        var counter = 0;
        var userAmounts = piModel.pi.getValue('userAmount');

        for(var i = userAmounts.length - 1; i > 0; i--) {
            if(counter < maxAmountOfUserAmountsToShow) {
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
        piModel.userAmountsGraphHours.length = 0;

        for(var i = 0; i < piModel.recentUserAmounts.length; i++) {
            var hours = piModel.recentUserAmounts[i].getValue('datetime').getHours();

            if(hours < 10) {
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
        piModel.userAmountsGraphAmounts.length = 0;

        for(var i = 0; i < piModel.recentUserAmounts.length; i++) {
            piModel.userAmountsGraphAmounts.push(piModel.recentUserAmounts[i].getValue('amount'));
        }
    };

    /**
     * Calculates the sum of the given array.
     * @param array
     * @returns {number}
     */
    this.calculateSum = function (array) {
        var result = 0;

        for(var i = 0; i < array.length; i++) {
            result = result + parseInt(array[i]);
        }

        return result;
    };
}