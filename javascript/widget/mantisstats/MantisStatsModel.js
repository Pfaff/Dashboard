/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStatsModel = function MantisStatsModel() {
        var msMod, mantisStats, dummyJsonData;
        msMod = this;

        /**
         * Arrays containing the information required for the chart.
         * @type {Array}
         */
        mantisStats = [];
        msMod.msCategories = [];
        msMod.msIssuesOpen = [];
        msMod.msIssuesClosed = [];
        msMod.msDaysLeft = [];

        dummyJsonData = [   {"version" : "4.2", "issuesOpen" : 6, "issuesClosed" : 34, "releaseDate" : "2013-11-18" },
            {"version" : "4.3", "issuesOpen" : 23, "issuesClosed" : 10, "releaseDate" : "2013-11-29" },
            {"version" : "4.4", "issuesOpen" : 25, "issuesClosed" : 3, "releaseDate" : "2013-12-18" },
            {"version" : "4.5", "issuesOpen" : 6, "issuesClosed" : 0, "releaseDate" : "2013-12-29" }];

        /**
         * Calls the function which collects the data from the back-end.
         */
        this.main = function () {
            //msMod.getMantisStats();
            msMod.handleMantisStatsData(dummyJsonData);
            msMod.makeArraysForMantisStatsChart();
            msMod.mutateCategoriesArray();
            msMod.mutateDaysLeftArray();
        };

        /**
         * Function which collects the data from the back-end.
         */
        this.getMantisStats = function () {
            $.ajax({
                url: "http://192.168.55.174:8082/service/open_issues/",
                type: "GET",
                dataType: "json",
                success: function (data) {

                }
            });
        };

        /**
         * Fills the mantis stats array with mantis stats objects made from the received data.
         * @param data
         */
        this.handleMantisStatsData = function (data) {
            var i;

            for (i = 0; i < data.length; i++) {
                mantisStats.push(new db.MantisStats(data[i].version, data[i].issuesOpen, data[i].issuesClosed, data[i].releaseDate));
            }
        };

        /**
         * Calls the functions to fill the arrays which are required for the chart.
         */
        this.makeArraysForMantisStatsChart = function () {
            msMod.msCategories = msMod.fillArrayWithFilteredData("version");
            msMod.msIssuesOpen = msMod.fillArrayWithFilteredData("issuesOpen");
            msMod.msIssuesClosed = msMod.fillArrayWithFilteredData("issuesClosed");
            msMod.msDaysLeft = msMod.fillArrayWithFilteredData("releaseDate");
        };

        /**
         * Returns an array which contains data associated with the given filter.
         * @param filter
         * @returns {Array}
         */
        this.fillArrayWithFilteredData = function (filter) {
            var i, array;

            array = [];

            for (i = 0; i < mantisStats.length; i++) {
                array.push(mantisStats[i][filter]);
            }

            return array.reverse();
        };

        /**
         * Fine-tunes the categories array.
         */
        this.mutateCategoriesArray = function () {
            var i;

            for (i = 0; i < msMod.msCategories.length; i++) {
                msMod.msCategories[i] = "V" + msMod.msCategories[i];
            }
        };

        /**
         * Fine-tunes the days left array.
         */
        this.mutateDaysLeftArray = function () {
            var i, date, releaseDate, daysLeft, oneDay;

            oneDay = 24 * 60 * 60 * 1000;

            for (i = 0; i < msMod.msDaysLeft.length; i++) {
                date = new Date();
                releaseDate = new Date(msMod.msDaysLeft[i]);
                daysLeft = Math.round(Math.abs((date.getTime() - releaseDate.getTime()) / oneDay));
                msMod.msDaysLeft[i] = daysLeft;
            }
        };
    };
}(Dashboard));