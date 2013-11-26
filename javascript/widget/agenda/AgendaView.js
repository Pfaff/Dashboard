/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.AgendaView = function AgendaView() {
        var aView, date, days, months, prevHlDot;
        aView = this;

        /**
         * Date object.
         * @type {Array}
         */
        date = new Date();

        /**
         * Days of the week.
         * @type {Array}
         */
        days = ["zo", "ma", "di", "wo", "do", "vr", "za"];

        /**
         * Months of the year.
         * @type {Array}
         */
        months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

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
            aView.createTextInAgendaDateArticle();
            aView.createTextInAgendaItemArticle();
            aView.createTimeLine();
            aView.createAgendaDots();
            aView.createTextBelowAgendaDots();
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

        this.createTextInAgendaDateArticle = function () {
            var article, p;

            article = document.getElementById("agendaDateArticle");
            p = db.createElement("p", article, { id: "agendaDateArticleDate" });
            p.appendChild(document.createTextNode(date.getDate()));

            p = db.createElement("p", article, { id: "agendaDateArticleMonth" });
            p.appendChild(document.createTextNode(months[date.getMonth()]));
        };

        this.createTextInAgendaItemArticle = function () {
            var article, p;

            article = document.getElementById("agendaItemArticle");
            p = db.createElement("p", article, { id: "agendaItemArticleTitle" });
            p.appendChild(document.createTextNode("SOM"));

            p = db.createElement("p", article, { id: "agendaItemArticleContent" });
            p.appendChild(document.createTextNode("Versie 4.2 naar productie"));
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
        this.addItemOnAgendaDot = function (index) {
            var dot = document.getElementById("agendaDot" + index);
            dot.className = "agendaDot agendaDotEvent";
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

        this.updateAgendaFocusDate = function (index) {
            var dateTextEl, monthTextEl, date;
            dateTextEl = document.getElementById("agendaDateArticleDate");
            monthTextEl = document.getElementById("agendaDateArticleMonth");
            date = new Date();
            date.setDate(date.getDate() + index);

            dateTextEl.firstChild.data = date.getDate();
            monthTextEl.firstChild.data = months[date.getMonth()];
        };

        this.updateAgendaFocusText = function (title, content) {
            var titleEl, contentEl;
            titleEl = document.getElementById("agendaItemArticleTitle");
            contentEl = document.getElementById("agendaItemArticleContent");

            titleEl.firstChild.data = title;
            contentEl.firstChild.data = content;
        };

        /**
         * Function to create the text below the agenda dots.
         * 86400 UTC seconds is one day.
         */
        this.createTextBelowAgendaDots = function () {
            var article, i, p, prevDate;
            article = document.getElementById("agendaArticleTop");
            prevDate = 0;

            for (i = 0; i < 15; i++) {
                p = db.createElement("p", article, { id: "agendaDotText" + i, className: "agendaDotText" });
                p.appendChild(document.createTextNode(days[date.getDay()] + " " + date.getDate()));

                if (prevDate > date.getDate()) {
                    aView.createMonthText();
                    aView.createMonthVerticalRuler();
                    aView.moveMonthTextInDesiredPosition(i);
                    aView.moveMonthVerticalRulerInDesiredPosition(i);
                }

                prevDate = date.getDate();
                date.setUTCSeconds(date.getUTCSeconds() + 86400);
            }
        };

        /**
         * Creates the text of the month.
         */
        this.createMonthText = function () {
            var article, p, month;
            article = document.getElementById("agendaArticleTop");

            p = db.createElement("p", article, { id: "agendaDotMonth" });
            month = months[date.getMonth()].substring(0, 3);
            p.appendChild(document.createTextNode(month));
        };

        /**
         * Creates the vertical ruler for below the month.
         */
        this.createMonthVerticalRuler = function () {
            var article = document.getElementById("agendaArticleTop");

            db.createElement("hr", article, { id: "monthVr"});
        };

        /**
         * Updates the text of the month in the right position.
         * @param index
         */
        this.moveMonthTextInDesiredPosition = function (index) {
            var p, margin;
            p = document.getElementById("agendaDotMonth");
            margin = 35 + ((index - 1) * 37);
            p.style.marginLeft = margin + "px";
        };

        /**
         * Updates the vertical ruler for the month in the right position.
         * @param index
         */
        this.moveMonthVerticalRulerInDesiredPosition = function (index) {
            var vr, margin;
            vr = document.getElementById("monthVr");
            margin = 35 + ((index - 1) * 37) + 10;
            vr.style.marginLeft = margin + "px";
        };


    };
}(Dashboard));