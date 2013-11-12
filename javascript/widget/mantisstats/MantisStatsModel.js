/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStatsModel = function MantisStatsModel() {
        var msMod, mantisStats, valuesMantisStats, momentsMantisStats;
        msMod = this;

        mantisStats = [];
        msMod.valuesMantisStats = [];
        msMod.momentsMantisStats = [];

        this.main = function () {
            msMod.getMantisStats();
        };

        this.getMantisStats = function () {
            $.ajax({
                url: "http://192.168.55.174:8082/service/open_issues/",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    var key;

                    for (key in data) {
                        if (data.hasOwnProperty(key)) {
                            msMod.handleMantisStatsData(key, data[key]);
                        }
                    }

                    for (key in data) {
                        if (data.hasOwnProperty(key)) {
                            msMod.fillArrayMantisStatsValues(key);
                        }
                    }

                    //msMod.fillArrayMantisStatsMoments();
                }
            });
        };

        this.handleMantisStatsData = function (key, objectLiteral) {
            var i, date;

            for (i = 0; i < objectLiteral.length; i++) {
                date = new Date(0);
                date.setUTCSeconds(objectLiteral[i].clock);
                console.log(objectLiteral[i].clock + " - Epoch  :   Date - " + date);
                mantisStats.push(new db.MantisStats(key, date, objectLiteral[i].value));
            }
        };

        this.fillArrayMantisStatsValues = function (key) {
            var i, values;

            msMod.valuesMantisStats = [];
            values = [];

            for (i = 0; i < mantisStats.length; i++) {
                if (mantisStats[i].version === key) {
                    values.push(mantisStats[i].value);
                }
            }
            msMod.valuesMantisStats.push(values);
        };

        this.fillArrayMantisStatsMoments = function () {
            var i, day, month, moment;

            msMod.momentsMantisStats = [];

            for (i = 0; i < mantisStats.length / 2; i++) {
                day = mantisStats[i].dateTime.getDate() + 1;
                month = mantisStats[i].dateTime.getMonth() + 1;

                moment = day + "/" + month + "/" + mantisStats[i].dateTime.getYear();

                msMod.momentsMantisStats.push(moment);
            }

            console.log(msMod.momentsMantisStats);
        };
    };
}(Dashboard));