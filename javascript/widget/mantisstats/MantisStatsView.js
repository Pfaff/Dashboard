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
            p.appendChild(document.createTextNode("mantis meldingen"));
        };

        /**
         * Creates the article for the chart.
         */
        this.createMantisStatsChartArticle = function () {
            var article = document.getElementById("contentMantisStatsArticle");

            db.createElement("article", article, { id: "mantisStatsChart" });
        };

        /**
         * Builds the bar chart.
         * @param categories
         * @param issuesOpen
         * @param issuesClosed
         * @param daysLeft
         */
        this.buildMantisStatsChart = function (categories, issuesOpen, issuesClosed, daysLeft) {
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
                        categories: categories,
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
                        x: -4,
                        y: 32,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: '#FFFFFF',
                        itemStyle: {
                            color: '#000000',
                            fontSize: '10px'
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
                        data: issuesOpen,
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
                        data: issuesClosed,
                        stacking: 'normal',
                        color: '#112843',
                        borderWidth: 0
                    }, {
                        name: 'Dagen voor release',
                        data: daysLeft,
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
    };
}(Dashboard));