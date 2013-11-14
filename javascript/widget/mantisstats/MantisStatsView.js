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

        /**
         * Calls the functions which build the view of the widget together.
         */
        this.main = function () {
            msView.createMantisStatsSection();
            msView.createWidgetTitleArticle();
            msView.createWidgetTitle();
            msView.createContentMantisStatsArticle();
            msView.createTitleMantisStatsArticle();
            msView.createTitleMantisStatsText();
            msView.createMantisStatsChartArticle();
            msView.buildMantisStatsChart();
        };

        /**
         * Creates the title article for the widget.
         */
        this.createWidgetTitleArticle = function () {
            var article = document.getElementById("mantisStatsSection");
            db.createElement("article", article, { id: "mantisStatsWidgetTitleArticle" });
        };

        /**
         * Creates the actual title for the widget in the widget title article.
         */
        this.createWidgetTitle = function () {
            var article, p;
            article = document.getElementById("mantisStatsWidgetTitleArticle");
            p = db.createElement("p", article, { id: "mantisStatsWidgetTitle", className: "widgetTitle" });
            p.appendChild(document.createTextNode("SOM"));
        };

        /**
         * Creates a Mantis section in the desired container on the page.
         */
        this.createMantisStatsSection = function () {
            var section = document.getElementById("containerMiddleSectionMiddle");

            db.createElement("section", section, { id: "mantisStatsSection" });
        };

        /**
         * Creates a mantis stats article in the section.
         */
        this.createContentMantisStatsArticle = function () {
            var section = document.getElementById("mantisStatsSection");

            db.createElement("article", section, { id: "contentMantisStatsArticle" });
        };

        /**
         * Creates the title for the mantis stats article.
         */
        this.createTitleMantisStatsArticle = function () {
            var section = document.getElementById("mantisStatsSection");

            db.createElement("article", section, { id: "titleMantisStatsArticle" });
        };

        /**
         * Creates the actual title for the mantis stats.
         */
        this.createTitleMantisStatsText = function () {
            var article, p;

            article = document.getElementById("titleMantisStatsArticle");
            p = db.createElement("p", article, { id: "titleMantisStats", className: "title" });
            p.appendChild(document.createTextNode("openstaande mantis meldingen"));
        };

        /**
         * Creates the article for the chart.
         */
        this.createMantisStatsChartArticle = function () {
            var article = document.getElementById("contentMantisStatsArticle");

            db.createElement("article", article, { id: "mantisStatsChart" });
        };

        this.buildMantisStatsGraph = function (times, amounts, keys) {
            chart = $("#mantisStatsChart").highcharts({
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
                series: msView.createSeriesForMantisStatsChart(amounts, keys)
            });
        };

        this.buildMantisStatsChart = function () {
            chart = $(function () {
                $('#mantisStatsChart').highcharts({
                    chart: {
                        type: 'bar',
                        backgroundColor: null
                    },
                    title: {
                        text: null
                    },
                    xAxis: {
                        categories: ['V4.6', 'V4.5', 'V4.4', 'V4.3', 'V4.2'],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: null,
                            align: 'high'
                        },
                        labels: {
                            overflow: 'visible'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -12,
                        y: 160,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: '#FFFFFF',
                        shadow: true,
                        itemStyle: {
                            color: '#000000'
                        },
                        itemHoverStyle: {
                            color: '#a64c40'
                        },
                        itemHiddenStyle: {
                            color: '#a69688'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Open meldingen',
                        data: [0, 6, 30, 35, 6],
                        stacking: 'normal',
                        color: '#3b90f0',
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            style: {
                                fontSize: '11px'
                            }
                        }
                    }, {
                        name: 'Gesloten meldingen',
                        data: [0, 0, 3, 10, 34],
                        stacking: 'normal',
                        color: '#112843',
                        borderWidth: 0
                    }, {
                        name: 'Aantal dagen over',
                        data: [128, 98, 68, 38, 8],
                        color: '#2ca949',
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            style: {
                                fontSize: '11px'
                            }
                        }
                    }]
                });
            });
        };

        this.createSeriesForMantisStatsChart = function (amounts, keys) {
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