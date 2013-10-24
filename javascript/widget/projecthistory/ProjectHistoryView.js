/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.ProjectHistoryView = function ProjectHistoryView() {
        var phView;
        phView = this;

        /**
         * Calls the functions to build the project history view.
         */
        this.main = function () {
            phView.createProjectHistoryArticles();
            phView.createProjectHistoryContentArticles();
            phView.createProjectHistoryContent();
            phView.createProjectHistoryTitlesArticles();
            phView.createProjectHistoryTitles();
        };

        /**
         * Creates the project history articles.
         */
        this.createProjectHistoryArticles = function () {
            var containerOverlay, i;
            containerOverlay = document.getElementById("containerOverlay");
            for (i = 0; i < 4; i++) {
                db.createElement("article", containerOverlay, { id: "phArticle" + i, className: "phArticle" });
            }
        };

        /**
         * Creates the project history content articles.
         */
        this.createProjectHistoryContentArticles = function () {
            var i, phArticle;
            for (i = 0; i < 4; i++) {
                phArticle = document.getElementById("phArticle" + i);
                db.createElement("article", phArticle, { id: "phContentArticle" + i, className: "phContentArticle" });
            }
        };

        /**
         * Creates the actual content for the project history content articles.
         */
        this.createProjectHistoryContent = function () {
            var imgSources, i, phContentArticle;
            imgSources = ["users", "time", "chart"];
            for (i = 0; i < 3; i++) {
                phContentArticle = document.getElementById("phContentArticle" + (i + 1));
                db.createElement("img", phContentArticle, { id: "phContent" + (i + 1), className: "phContent", src: "images/icon/" + imgSources[i] + ".png" });
            }
        };

        /**
         * Creates the articles for the project history titles.
         */
        this.createProjectHistoryTitlesArticles = function () {
            var i, phArticle;
            for (i = 0; i < 4; i++) {
                phArticle = document.getElementById("phArticle" + i);
                db.createElement("article", phArticle, { id: "phTitleArticle" + i, className: "titleArticle" });
            }
        };

        /**
         * Creates the actual titles for the project history title articles.
         */
        this.createProjectHistoryTitles = function () {
            var names, i, phTitleArticle, phTitle;
            names = ["users", "users", "request time", "server load"];
            for (i = 0; i < 4; i++) {
                phTitleArticle = document.getElementById("phTitleArticle" + i);
                phTitle = db.createElement("p", phTitleArticle, { id: "phTitle" + i, className: "title" });
                phTitle.appendChild(document.createTextNode(names[i]));
            }
        };
    };
}(Dashboard));