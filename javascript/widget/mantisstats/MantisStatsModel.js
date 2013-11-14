/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStatsModel = function MantisStatsModel() {
        var msMod, mantisStats, valuesMantisStats, momentsMantisStats, dummyJsonData;
        msMod = this;

        mantisStats = [];
        msMod.keys = [];
        msMod.valuesMantisStats = [];
        msMod.momentsMantisStats = [];

        dummyJsonData = [   {"version" : "4.2", "issuesOpen" : 6, "issuesClosed" : 34, "releaseDate" : "2013-11-14" },
            {"version" : "4.3", "issuesOpen" : 35, "issuesClosed" : 10, "releaseDate" : "2013-11-29" },
            {"version" : "4.4", "issuesOpen" : 30, "issuesClosed" : 3, "releaseDate" : "2013-12-14" },
            {"version" : "4.5", "issuesOpen" : 6, "issuesClosed" : 0, "releaseDate" : "2013-12-29" },
            {"version" : "4.6", "issuesOpen" : 0, "issuesClosed" : 0, "releaseDate" : "2014-01-14" }];

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
                    msMod.keys = [];

                    for (key in data) {
                        if (data.hasOwnProperty(key)) {
                            msMod.keys.push(key);
                            msMod.handleMantisStatsData(key, data[key]);
                        }
                    }

                    for (key in data) {
                        if (data.hasOwnProperty(key)) {
                            msMod.fillArrayMantisStatsValues(key);
                        }
                    }

                    msMod.fillArrayMantisStatsMoments();
                    msMod.filterOnDesiredMantisStats();
                }
            });
        };

        this.handleMantisStatsData = function (key, objectLiteral) {
            var i, date;

            for (i = 0; i < objectLiteral.length; i++) {
                date = new Date(0);
                date.setUTCSeconds(objectLiteral[i].clock / 1000);
                mantisStats.push(new db.MantisStats(key, date, objectLiteral[i].value));
            }
        };

        this.fillArrayMantisStatsValues = function (key) {
            var i, values;

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

                moment = day + "/" + month;

                msMod.momentsMantisStats.push(moment);
            }
        };

        this.filterOnDesiredMantisStats = function () {
            msMod.filterDesiredMantisStatsValues();
            msMod.filterDesiredMantisStatsMoments();
        };

        this.filterDesiredMantisStatsValues = function () {
            var x, i, tempValuesMantisStats, tempArray, count;

            tempValuesMantisStats = msMod.valuesMantisStats;
            msMod.valuesMantisStats = [];

            for (x = 0; x < tempValuesMantisStats.length; x++) {
                tempArray = [];
                count = 0;

                for (i = tempValuesMantisStats[x].length - 1; i > 0; i -= 3) {
                    tempArray.push(tempValuesMantisStats[x][i]);
                    count++;

                    if (count > 7) {
                        msMod.valuesMantisStats.push(tempArray.reverse());
                        break;
                    }
                }
            }
        };

        this.filterDesiredMantisStatsMoments = function () {
            var i, tempArray, count;

            tempArray = [];
            count = 0;

            for (i = msMod.momentsMantisStats.length - 1; i > 0; i -= 3) {
                if (count < 8) {
                    tempArray.push(msMod.momentsMantisStats[i]);
                    count++;
                } else {
                    msMod.momentsMantisStats = tempArray.reverse();
                }
            }
        };
    };
}(Dashboard));