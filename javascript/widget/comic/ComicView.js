/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.ComicView = function ComicView() {
        var comView;
        comView = this;

        this.main = function () {
            comView.createSection();
            comView.createContentArticle();
            comView.createComicArticle();
            comView.createTitleArticle();
            comView.createTitle();
        };

        /**
         * Creates a Agenda section in the desired container on the page.
         */
        this.createSection = function () {
            var section = document.getElementById("containerLeftSectionBottom");
            db.createElement("section", section, { id: "comicSection" });
        };

        this.createContentArticle = function () {
            var article = document.getElementById("comicSection");
            db.createElement("article", article, { id: "comicContentArticle" });
        };

        this.createComicArticle = function () {
            var article = document.getElementById("comicContentArticle");
            db.createElement("article", article, { id: "comicArticle" });
        };

        this.createTitleArticle = function () {
            var article = document.getElementById("comicSection");
            db.createElement("article", article, { id: "comicTitleArticle" });
        };

        this.createTitle = function () {
            var article, p;
            article = document.getElementById("comicTitleArticle");
            p = db.createElement("p", article, { id: "comicTitle", className: "title" });
            p.appendChild(document.createTextNode("comic title"));
        };
    };
}(Dashboard));