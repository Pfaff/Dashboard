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
        piModel.pi.setRequestTime(data['Gem. request duur']);
        piModel.pi.setRequestMin(data['Requests per minuut']);
        piModel.pi.setUptime(data['Starttijd']);
        piModel.pi.setCapacityMax(data['Gebruikt geheugen']);
        piModel.pi.setCapacityInUse(data['Maximum geheugen']);
        piModel.pi.setLoadAverage(data['Load average']);
        piModel.pi.setCpu(data["CPU's"]);
        piModel.pi.setScheme(data['Schema']);
        piModel.pi.setConnectionsOpen(data['Open connections']);
        piModel.pi.setConnectionsBusy(data['Busy connections']);
        piModel.pi.setConnectionsIdle(data['Idle connections']);

        this.calculateUptime();
    };

    this.calculateUptime = function() {
        var serverStart = new Date(piModel.pi.getUptime());
        piModel.pi.setUptime(new Date().getHours() - serverStart.getHours() + " Hours");
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