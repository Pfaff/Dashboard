/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.AgendaView = function AgendaView() {
        var aView, days, months, prevHlDot;
        aView = this;

        /**
         * Days of the week.
         * @type {Array}
         */
        days = ["zo", "ma", "di", "wo", "do", "vr", "za"];

        /**
         * Months of the year.
         * @type {Array}
         */
        months = ["jan", "febi", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

        /**
         * The index of the previous highlighted dot.
         * @type {null}
         */
        prevHlDot = null;

        /**
         * Calls the functions required to build the view of the Agenda widget.
         */
        this.main = function () {
            aView.createAgendaSection();
            aView.createAgendaArticles();
            aView.createAgendaArticleBottomArticles();
            aView.createTimeLine();
            aView.createAgendaDots();
            aView.createTextBelowAgendaDots();
//            setTimeout(function () { aView.highlightAgendaDot(3); }, 2000);
//            setTimeout(function () { aView.highlightAgendaDot(13); }, 6000);
        };

        /**
         * Creates a Agenda section in the desired container on the page.
         */
        this.createAgendaSection = function () {
            var section = document.getElementById("containerMiddleSectionTop");

            db.createElement("section", section, { id: "agendaSection" });
        };

        /**
         * Creates the agenda articles, top and bottom.
         */
        this.createAgendaArticles = function () {
            var section = document.getElementById("agendaSection");

            db.createElement("article", section, { id: "agendaArticleTop" });
            db.createElement("article", section, { id: "agendaArticleBottom" });
        };

        /**
         * Creates the articles in the agenda article at the bottom of the section.
         */
        this.createAgendaArticleBottomArticles = function () {
            var article = document.getElementById("agendaArticleBottom");

            db.createElement("article", article, { id: "agendaDateArticle", className: "agendaArticleBottom" });
            db.createElement("article", article, { id: "agendaItemArticle", className: "agendaArticleBottom" });
        };

        /**
         * Creates the horizontal ruler / time-line.
         */
        this.createTimeLine = function () {
            var article = document.getElementById("agendaArticleTop");

            db.createElement("hr", article, { id: "timeLineHr"});
        };

        /**
         * Creates the agenda dots.
         */
        this.createAgendaDots = function () {
            var article, i;
            article = document.getElementById("agendaArticleTop");

            for (i = 0; i < 15; i++) {
                db.createElement("article", article, { id: "agendaDot" + i, className: "agendaDot agendaDotEmpty" });
            }
        };

        /**
         * Adds an event on the agenda dot by the given index.
         * @param index
         */
        this.addEventOnAgendaDot = function (index) {
            var dot = document.getElementById("agendaDot" + index);
            dot.className = "agendaDot agendaDotEmpty";
        };

        /**
         * Highlights the agenda dot by the given index.
         * Removes the highlight of the previous highlighted dot.
         * @param index
         */
        this.highlightAgendaDot = function (index) {
            var dot, p;

            if (prevHlDot !== null) {
                dot = document.getElementById("agendaDot" + prevHlDot);
                dot.className = "agendaDot agendaDotEvent";
                p = document.getElementById("agendaDotText" + prevHlDot);
                p.style.visibility = "visible";
            }

            prevHlDot = index;
            dot = document.getElementById("agendaDot" + index);
            dot.className = "agendaDot agendaDotFocus agendaDotEvent";
            p = document.getElementById("agendaDotText" + index);
            p.style.visibility = "hidden";
        };

        /**
         * Function to create the text below the agenda dots.
         * 86400 UTC seconds is one day.
         */
        this.createTextBelowAgendaDots = function () {
            var article, date, i, p, prevDate;
            article = document.getElementById("agendaArticleTop");
            date = new Date();
            prevDate = 32;

            for (i = 0; i < 15; i++) {
                p = db.createElement("p", article, { id: "agendaDotText" + i, className: "agendaDotText" });
                p.appendChild(document.createTextNode(days[date.getDay()] + " " + date.getDate()));

                if (prevDate < date.getDate()) {
                    aView.createMonthText();
                }

                prevDate = date.getDate();
                date.setUTCSeconds(date.getUTCSeconds() + 86400);
            }
        };

        this.createMonthText = function () {
            var article, date, p;
            article = document.getElementById("agendaArticleTop");
            date = new Date();

            p = db.createElement("p", article, { id: "agendaDotMonth" });
            p.appendChild(document.createTextNode(months[date.getMonth()]));
        };
    };
}(Dashboard));