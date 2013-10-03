/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectInfoModel() {
    var piModel = this;
    this.pi = new ProjectInfo(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ");

    this.main = function() {
        piModel.getProjectInformation();
    };

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
    };

    this.calculateUptime = function() {
        var serverStart = new Date(piModel.pi.getValue('uptime'));
        piModel.pi.setValue('uptime', new Date().getHours() - serverStart.getHours() + " Hours");
    };

    this.fixSchemeVersion = function() {
        var scheme = piModel.pi.getValue('scheme');
        var newScheme = scheme.substr(0, scheme.indexOf(' '));

        piModel.pi.setValue('scheme', newScheme);
    };

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
}