/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectInfoView() {
    "use strict";
    var piView;
    piView = this;

    /**
     * The chart with the user amounts and time.
     * @type {null}
     */
    piView.chart = null;

    /**
     * Calls the functions to build the project info view.
     */
    this.main = function () {
        piView.createProjectInfoArticles();
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
            createElement("article", sectionTop, { id: "piArticle" + i, className: "piArticle" });
        }
    };

    /**
     * Creates the articles for the project info content.
     */
    this.createProjectInfoContentArticles = function () {
        var i, piArticle;
        for (i = 0; i < 5; i++) {
            piArticle = document.getElementById("piArticle" + i);
            createElement("article", piArticle, { id: "piContentArticle" + i, className: "piContentArticle" });
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
            piTitle = createElement("p", piContentArticle, { id: "piContent" + (i + 1), className: "piContent" });
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
            createElement("article", piArticle, { id: "piTitleArticle" + i, className: "titleArticle" });
        }
    };

    /**
     * Creates the actual text for in the title articles.
     */
    this.createProjectInfoTitles = function () {
        var names, i, piTitleArticle, piTitle;
        names = ["current users", "version", "request time", "requests / min", "uptime"];
        for (i = 0; i < 5; i++) {
            piTitleArticle = document.getElementById("piTitleArticle" + i);
            piTitle = createElement("p", piTitleArticle, { id: "piTitle" + i, className: "title" });
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
                events: {
                    click: function () { functionToExecute(); }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
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
            series: [{
                name: ' ',
                data: amounts
            }]
        });
    };

    /**
     * Removes the user amounts graph.
     */
    this.removeUserAmountsGraph = function () {
        piView.chart.empty();
    };
}