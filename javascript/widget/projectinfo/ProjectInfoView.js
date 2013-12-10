/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.ProjectInfoView = function ProjectInfoView() {
        var piView;
        piView = this;

        /**
         * The chart on the project info view.
         * @type {null}
         */
        piView.chart = null;

        /**
         * Calls the functions to build the project info view.
         */
        this.main = function () {
            piView.createProjectInfoArticles();
            piView.createWidgetTitleArticle();
            piView.createWidgetTitle();
            piView.createProjectInfoContentArticles();
            piView.createProjectInfoContent();
            piView.createProjectInfoTitlesArticles();
            piView.createProjectInfoTitles();
        };

        /**
         * Creates the articles for the project info in the sections.
         */
        this.createProjectInfoArticles = function () {
            var sectionTop, i;
            sectionTop = document.getElementById("containerLeftSectionTop");
            for (i = 0; i < 5; i++) {
                db.createElement("article", sectionTop, { id: "piArticle" + i, className: "piArticle" });
            }
        };

        this.createWidgetTitleArticle = function () {
            var article = document.getElementById("piArticle0");
            db.createElement("article", article, { id: "piWidgetTitleArticle" });
        };

        this.createWidgetTitle = function () {
            var article, p;
            article = document.getElementById("piWidgetTitleArticle");
            p = db.createElement("p", article, { id: "piWidgetTitle", className: "widgetTitle" });
            p.appendChild(document.createTextNode("SOM"));
        };

        /**
         * Creates the articles for the project info content.
         */
        this.createProjectInfoContentArticles = function () {
            var i, piArticle;
            for (i = 0; i < 5; i++) {
                piArticle = document.getElementById("piArticle" + i);
                db.createElement("article", piArticle, { id: "piContentArticle" + i, className: "piContentArticle" });
            }
        };

        /**
         * Creates the actual 'content' for the project info content articles.
         */
        this.createProjectInfoContent = function () {
            var info, i, piContentArticle, piTitle;
            info = [" ", " ", " ", " "];
            for (i = 0; i < 4; i++) {
                piContentArticle = document.getElementById("piContentArticle" + (i + 1));
                piTitle = db.createElement("p", piContentArticle, { id: "piContent" + (i + 1), className: "piContent" });
                piTitle.appendChild(document.createTextNode(info[i]));
            }
        };

        /**
         * Creates the title articles for in the project info articles.
         */
        this.createProjectInfoTitlesArticles = function () {
            var i, piArticle;
            for (i = 0; i < 5; i++) {
                piArticle = document.getElementById("piArticle" + i);
                db.createElement("article", piArticle, { id: "piTitleArticle" + i, className: "titleArticle" });
            }
        };

        /**
         * Creates the actual text for in the title articles.
         */
        this.createProjectInfoTitles = function () {
            var names, i, piTitleArticle, piTitle;
            names = ["number of users", "version", "request time", "requests / min", "uptime"];
            for (i = 0; i < 5; i++) {
                piTitleArticle = document.getElementById("piTitleArticle" + i);
                piTitle = db.createElement("p", piTitleArticle, { id: "piTitle" + i, className: "title" });
                piTitle.appendChild(document.createTextNode(names[i]));
            }
        };

        /**
         * Updates the content of the given pi element. Adds a new title and new content.
         * @param number
         * @param title
         * @param content
         */
        this.updateContent = function (number, title, content) {
            document.getElementById("piTitle" + number).firstChild.data = title;
            document.getElementById("piContent" + number).firstChild.data = content;
        };

        /**
         * Adds a span to the given piContent element.
         * @param piContentElement
         * @param value
         */
        this.addSpanToParagraph = function (piContentElement, value) {
            var splitText = value.split(' ');
            piContentElement.innerHTML = splitText[0] + " <span>" + splitText[1] + "</span>";
            piContentElement.style.marginTop = "27px";
        };

        /**
         * Sets the margin of the given piContent element to normal again.
         * It's made to keep the balance between the different sizes of the content.
         * @param piContentElement
         */
        this.setNormalMarginToParagraph = function (piContentElement) {
            piContentElement.style.marginTop = "34px";
        };

        /**
         * Clears all paragraphs before adding new data.
         * If this is not called the made <span> elements keep in place.
         */
        this.clearParagraphs = function () {
            var i, piContent;
            for (i = 1; i < 5; i++) {
                piContent = document.getElementById("piContent" + i);
                piContent.innerHTML = ' ';
            }
        };

        /**
         * Builds the user amounts graph on the dashboard.
         */
        this.buildUserAmountsGraph = function (hours, amounts, functionToExecute) {
            piView.chart = $('#piContentArticle0').highcharts({
                chart: {
                    backgroundColor: null,
                    events: {
                        click: function () { functionToExecute(); }
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    borderWidth: 0
                },
                title: {
                    text: ' ',
                    x: -20
                },
                xAxis: {
                    categories: hours
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ' '
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: ' ',
                    data: amounts
                }]
            });
        };

        /**
         * Builds the CPU load average graph.
         * @param times
         * @param amounts
         * @param functionToExecute
         */
        this.buildCpuLoadAverageGraph = function (times, amounts, functionToExecute) {
            piView.chart = $('#piContentArticle0').highcharts({
                chart: {
                    backgroundColor: null,
                    events: {
                        click: function () { functionToExecute(); }
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    borderWidth: 0
                },
                title: {
                    text: ' ',
                    x: -20
                },
                xAxis: {
                    categories: times
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ' '
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Som 1    ',
                    data: amounts[1]
                }, {
                    name: 'Som 2 + 7    ',
                    data: amounts[2]
                }, {
                    name: 'Som 3 + 5    ',
                    data: amounts[3]
                }, {
                    name: 'Som 4 + 6',
                    data: amounts[4]
                }]
            });
        };

        /**
         * Removes the graph.
         */
        this.removeGraph = function () {
            if (piView.chart) {
                piView.chart.empty();
            }
        };

        /**
         * Uses the given newTitle as the new title for the graph.
         * @param newTitle
         */
        this.setGraphTitle = function (newTitle) {
            var title;
            title = document.getElementById('piTitle0');
            title.firstChild.data = newTitle;
        };

//        this.toggleLegendVisibility = function (visibility) {
//            var legends, i;
//            legends = document.getElementsByClassName('highcharts-legend');
//
//            for (i = 0; i < legends.length; i++) {
//                legends[i].style.visibility = visibility;
//            }
//        };
    };
}(Dashboard));