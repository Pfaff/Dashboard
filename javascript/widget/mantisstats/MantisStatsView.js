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
            msView.buildMantisStatsGraph();
            document.getElementById("highcharts-0").style.height = 'auto';
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
            p.appendChild(document.createTextNode("mantis meldingen"));
        };

        this.createMantisStatsGraphArticle = function () {
            var article = document.getElementById("contentMantisStatsArticle");

            db.createElement("article", article, { id: "mantisStatsGraph" });
        };

        this.buildMantisStatsGraph = function (times, amounts) {
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
                    categories: ["08:00", "09:00", "10:00", "11:00", "12:00"]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: " "
                    }
                },
                series: [{
                    name: "Bladiabla" + "    ",
                    data: [100, 200, 300, 400, 500]
                }, {
                    name: "Bladiabla" + "    ",
                    data: [500, 400, 300, 200, 100]
                }, {
                    name: "Bladiabla" + "    ",
                    data: [0, 150, 0, 150, 0]
                }, {
                    name: "Bladiabla",
                    data: [600, 200, 300, 0, 50]
                }]
            });
        };
    };
}(Dashboard));