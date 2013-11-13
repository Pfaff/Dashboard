/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStatsView = function MantisStatsView() {
        var msView, chart;
        msView = this;

        /**
         * The chart on the mantis stats widget.
         * @type {null}
         */
        chart = null;

        this.main = function () {
            msView.createMantisStatsSection();
            msView.createContentMantisStatsArticle();
            msView.createTitleMantisStatsArticle();
            msView.createTitleMantisStatsText();
            msView.createMantisStatsGraphArticle();
        };

        this.createMantisStatsSection = function () {
            var section = document.getElementById("containerMiddleSectionMiddle");

            db.createElement("section", section, { id: "mantisStatsSection" });
        };

        this.createContentMantisStatsArticle = function () {
            var section = document.getElementById("mantisStatsSection");

            db.createElement("article", section, { id: "contentMantisStatsArticle" });
        };

        this.createTitleMantisStatsArticle = function () {
            var section = document.getElementById("mantisStatsSection");

            db.createElement("article", section, { id: "titleMantisStatsArticle" });
        };

        this.createTitleMantisStatsText = function () {
            var article, p;

            article = document.getElementById("titleMantisStatsArticle");
            p = db.createElement("p", article, { id: "titleMantisStats", className: "title" });
            p.appendChild(document.createTextNode("openstaande mantis meldingen"));
        };

        this.createMantisStatsGraphArticle = function () {
            var article = document.getElementById("contentMantisStatsArticle");

            db.createElement("article", article, { id: "mantisStatsGraph" });
        };

        this.buildMantisStatsGraph = function (times, amounts, keys) {
            chart = $("#mantisStatsGraph").highcharts({
                legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom",
                    borderWidth: 0
                },
                title: {
                    text: " ",
                    x: -20
                },
                xAxis: {
                    categories: times
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: " "
                    }
                },
                series: msView.createSeriesForMantisStatsGraph(amounts, keys)
            });
        };

        this.createSeriesForMantisStatsGraph = function (amounts, keys) {
            var i, series, name, data;
            series = [];

            for (i = 0; i < amounts.length; i++) {
                name = "V" + keys[i] + " ";
                data = amounts[i];
                series.push({"name" : name, "data" : data});
            }

            return series;
        };
    };
}(Dashboard));