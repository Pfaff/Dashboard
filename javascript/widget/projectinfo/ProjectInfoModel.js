/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectInfoModel() {
    var piModel = this;

    /**
     * Defines the maximum amount of different amounts to show in the graph.
     * @type {number}
     */
    var maxAmountOfUserAmountsToShow = 10;

    /**
     * Array which contains the most recent user amounts.
     * @type {Array}
     */
    this.recentUserAmounts = [];

    /**
     * Array which contains the hours for the horizontal axis.
     * @type {Array}
     */
    this.userAmountsGraphHours = [];

    /**
     * Array which contains the actual amounts.
     * @type {Array}
     */
    this.userAmountsGraphAmounts = [];

    /**
     * Creates the object that saves all the information of the project info.
     * @type {ProjectInfo}
     */
    this.pi = new ProjectInfo(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ");

    /**
     * Gathers the information for the project info widget.
     */
    this.main = function() {
        piModel.getProjectInformation();
        piModel.getUserAmounts();
    };

    /**
     * The AJAX call which gathers the information.
     */
    this.getProjectInformation = function() {
        $.ajax({
            url: '../dashboard/php/proxy.php',
            type: 'POST',
            dataType: 'json',
            data: {
                externalUrl: 'https://start1.mijnsom.nl/app/status',
                value: JSON.stringify(piModel.createValuesToGetArray())
            },
            success: function(data){
                piModel.fillProjectInfoObject(data);
            }
        });
    };

    /**
     * Handles the response data of the AJAX call, storing the data in the project info object.
     * @param data
     */
    this.fillProjectInfoObject = function(data) {
        piModel.pi.setValue('version', data['Versie']);
        piModel.pi.setValue('requestTime', data['Gem. request duur']);
        piModel.pi.setValue('requestMin', data['Requests per minuut']);
        piModel.pi.setValue('uptime', data['Starttijd']);
        piModel.pi.setValue('capacityMax', data['Maximum geheugen']);
        piModel.pi.setValue('capacityInUse', data['Gebruikt geheugen']);
        piModel.pi.setValue('loadAverage', data['Load average']);
        piModel.pi.setValue('cpu', data["CPU's"]);
        piModel.pi.setValue('scheme', data['Schema']);
        piModel.pi.setValue('connectionsOpen', data['Open connections']);
        piModel.pi.setValue('connectionsBusy', data['Busy connections']);
        piModel.pi.setValue('connectionsIdle', data['Idle connections']);

        this.calculateUptime();
        this.fixSchemeVersion();
        this.fixRequestTime();
    };

    /**
     * Calculates the uptime of the server.
     * I get the following date format: dd/mm/yyyy hh:mm, but I want mm/dd/yyyy hh:mm.
     * So I used the replace function at the start of the function to manage it.
     * Removing the dashes out of the date string otherwise it won't be recognized as Date object.
     */
    this.calculateUptime = function() {
        var dateString = piModel.pi.getValue('uptime').replace(/(\d\d)-(\d\d)/,"$2-$1");
        dateString = dateString.replace(/-/g, '/');
        var serverStart = new Date(dateString);
        piModel.pi.setValue('uptime', new Date().getHours() - serverStart.getHours() + " hours");
    };

    /**
     * Removes the text part after the version number of the scheme.
     */
    this.fixSchemeVersion = function() {
        var scheme = piModel.pi.getValue('scheme');
        var newScheme = scheme.substr(0, scheme.indexOf(' '));

        piModel.pi.setValue('scheme', newScheme);
    };

    /**
     * Removes the . after ms.
     */
    this.fixRequestTime = function() {
        var requestTime = piModel.pi.getValue('requestTime');
        var newRequestTime = requestTime.split('.').join("");

        piModel.pi.setValue('requestTime', newRequestTime);
    };

    /**
     * A list of the values the project info widget wants to get.
     * @returns {Array}
     */
    this.createValuesToGetArray = function() {
        return [
            'Versie',
            'Gem. request duur',
            'Requests per minuut',
            'Starttijd',
            'Gebruikt geheugen',
            'Maximum geheugen',
            'Load average',
            "CPU's",
            'Schema',
            'Open connections',
            'Busy connections',
            'Idle connections'
        ];
    };

    /**
     * Gathers the user amounts from the database.
     */
    this.getUserAmounts = function() {
        $.ajax({
            url: '../dashboard/php/projectinfo/getUserAmounts.php',
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
    this.handleUserAmountArray = function(data) {
        piModel.pi.setValue('userAmount', []);

        for(var i = 0; i < data.length; i++) {
            var user = new UserAmount(data[i].project, new Date(data[i].datetime.replace(/-/g, '/')), data[i].amount);
            piModel.pi.pushNewUserAmount(user);
        }

        piModel.createArrayWithRecentUserAmounts();
    };

    /**
     * Pushes the most recent user amounts into the array.
     * Counting from the latest to the first one to get the most recent values.
     * Clearing the array to avoid double data in the array.
     */
    this.createArrayWithRecentUserAmounts = function() {
        piModel.recentUserAmounts.length = 0;
        var counter = 0;
        //var currentDateTime = new Date();
        var userAmounts = piModel.pi.getValue('userAmount');

        for(var i = userAmounts.length - 1; i > 0; i--) {
            //var userAmountDateTime = userAmounts[i].getValue('datetime');
            //var hoursDiff = Math.abs((currentDateTime - userAmountDateTime)) / 36e5;
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
    this.fillArrayWithHours = function() {
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
    this.fillArrayWithAmounts = function() {
        piModel.userAmountsGraphAmounts.length = 0;

        for(var i = 0; i < piModel.recentUserAmounts.length; i++) {
            piModel.userAmountsGraphAmounts.push(piModel.recentUserAmounts[i].getValue('amount'));
        }
    };
}