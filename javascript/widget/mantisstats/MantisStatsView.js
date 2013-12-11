/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStatsView = function MantisStatsView() {
        var msView;
        msView = this;

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
        this.buildMantisStatsChart = function (categories, issuesOpen, issuesClosed, issuesResolved, daysLeft) {
            $(function () {
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
                        },
                        labels: {
                            style: {
                                color: '#FFFFFF'
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: null,
                            align: 'high'
                        },
                        labels: {
                            overflow: 'visible',
                            style: {
                                color: '#FFFFFF'
                            }
                        }
                    },
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        borderWidth: 0,
                        backgroundColor: null,
                        itemStyle: {
                            color: '#FFFFFF',
                            fontSize: '11px'
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
                        name: 'Gesloten         ',
                        data: issuesClosed,
                        stacking: 'normal',
                        color: '#042133',
                        borderWidth: 0
                    },  {
                        name: 'Opgelost         ',
                        data: issuesResolved,
                        stacking: 'normal',
                        color: '#154a85',
                        borderWidth: 0
                    },  {
                        name: 'Open         ',
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
                        name: 'Dagen voor release',
                        data: daysLeft,
                        color: '#22b644',
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