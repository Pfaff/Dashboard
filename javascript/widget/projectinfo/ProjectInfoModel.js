/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectInfoModel() {
    var piModel = this;

    /**
     * Defines the maximum difference in hours to show in the graph.
     * @type {number}
     */
    var maxHoursDiff = 12;

    /**
     * Defines the maximum amount of different amounts to show in the graph.
     * @type {number}
     */
    var maxAmountOfUserAmountsToShow = 8;

    /**
     * Array which contains the most recent user amounts.
     * @type {Array}
     */
    this.recentUserAmounts = [];

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
     */
    this.calculateUptime = function() {
        var serverStart = new Date(piModel.pi.getValue('uptime'));
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
     * @param data
     */
    this.handleUserAmountArray = function(data) {
        for(var i = 0; i < data.length; i++) {
            var user = new UserAmount(data[i].amount, new Date(data[i].datetime));
            piModel.pi.pushNewUserAmount(user);
        }

        piModel.createArrayWithRecentUserAmounts();
    };

    /**
     * Pushes the most recent user amounts into the array.
     * Counting from the latest to the first one to get the most recent values.
     */
    this.createArrayWithRecentUserAmounts = function() {
        var counter = 0;
        var currentDateTime = new Date();
        var userAmounts = piModel.pi.getValue('userAmount');

        for(var i = userAmounts.length - 1; i > 0; i--) {
            var userAmountDateTime = userAmounts[i].getValue('datetime');
            var hoursDiff = Math.abs((currentDateTime - userAmountDateTime)) / 36e5;
            if(hoursDiff < maxHoursDiff && counter < maxAmountOfUserAmountsToShow) {
                piModel.recentUserAmounts.push(userAmounts[i]);
                counter++;
            }
        }
    };
}