/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStatsModel = function MantisStatsModel() {
        var msMod, mantisStats, valuesMantisStats, clocksMantisStats;
        msMod = this;

        mantisStats = [];
        valuesMantisStats = [];
        clocksMantisStats = [];

        this.main = function () {
            //msMod.getMantisStats();
        };

        this.getMantisStats = function () {
            $.ajax({
                url: 'http://192.168.55.174:8080/open_issues',
                type: "GET",
                dataType: "json",
                crossDomain: true,
                success: function (data) {
                    var key;

                    for (key in data) {
                        if (data.hasOwnProperty(key)) {
                            msMod.handleMantisStatsData(key, data[key]);
                        }
                    }

                    msMod.fillArrayMantisStatsValues();
                    msMod.fillArrayMantisStatsClocks();
                }
            });
        };

        this.handleMantisStatsData = function (key, objectLiteral) {
            var i;

            for (i = 0; i < objectLiteral.length; i++) {
                mantisStats.push(new db.MantisStats(key, objectLiteral[i].clock, objectLiteral[i].value));
            }
        };

        this.fillArrayMantisStatsValues = function () {
//            var i;
//
//            for (i = 0; mantisStats.length; i++) {
//                if (mantisStats[i])
//            }
        };

        this.fillArrayMantisStatsClocks = function () {

        };
    };
}(Dashboard));