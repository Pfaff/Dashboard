/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.DateTimeView = function DateTimeView() {
        var dtView;
        dtView = this;

        /**
         * Calls the functions which build the clock.
         */
        this.main = function () {
            dtView.createDateTimeSection();
            dtView.createDateAndTimeArticle();
            dtView.createDateText();
            dtView.createTimeText();
        };

        /**
         * Creates the section for the date time widget.
         */
        this.createDateTimeSection = function () {
            var section = document.getElementById("containerRightSectionTop");

            db.createElement("section", section, { id: "datetimeSection" });
        };

        /**
         * Creates the article for the date and an article for the time.
         */
        this.createDateAndTimeArticle = function () {
            var section = document.getElementById("datetimeSection");

            db.createElement("article", section, { id: "dateArticle", className: "datetimeArticle" });
            db.createElement("article", section, { id: "timeArticle", className: "datetimeArticle" });
        };

        /**
         * Creates the text for the date.
         */
        this.createDateText = function () {
            var article, p;

            article = document.getElementById("dateArticle");
            p = db.createElement("p", article, { id: "dateDayText", className: "dateText" });
            p.appendChild(document.createTextNode("vrijdag"));
            p = db.createElement("span", article, { id: "dateDayNumberText", className: "dateText" });
            p.appendChild(document.createTextNode("8"));
            p = db.createElement("p", article, { id: "dateMonthText", className: "dateText" });
            p.appendChild(document.createTextNode("november"));
        };

        /**
         * Creates the text for the time.
         */
        this.createTimeText = function () {
            var article, p;

            article = document.getElementById("timeArticle");
            p = db.createElement("p", article, { id: "timeText" });
            p.appendChild(document.createTextNode("09:53"));
        };

        /**
         * Function can be used to update the time.
         * @param time
         */
        this.updateTime = function (time) {
            var p = document.getElementById("timeText");
            p.firstChild.data = time;
        };

        /**
         * Function can be used to update the date.
         * @param day
         * @param number
         * @param month
         */
        this.updateDate = function (day, number, month) {
            document.getElementById("dateDayText").firstChild.data = day;
            document.getElementById("dateDayNumberText").firstChild.data = number;
            document.getElementById("dateMonthText").firstChild.data = month;
        };
    };
}(Dashboard));