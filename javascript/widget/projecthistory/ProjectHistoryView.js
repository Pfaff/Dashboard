/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectHistoryView() {
    var phView = this;

    /**
     * Calls the fuctions to build the project history view.
     */
    this.main = function() {
        phView.createProjectHistoryArticles();
        phView.createProjectHistoryContentArticles();
        phView.createProjectHistoryContent();
        phView.createProjectHistoryTitlesArticles();
        phView.createProjectHistoryTitles();
    };

    /**
     * Creates the project history articles.
     */
    this.createProjectHistoryArticles = function() {
        var containerOverlay = document.getElementById("containerOverlay");
        for(var i = 0; i < 4; i++) {
            createElement("article", containerOverlay, { id: "phArticle" + i, className: "phArticle" });
        }
    };

    /**
     * Creates the project history content articles.
     */
    this.createProjectHistoryContentArticles = function() {
        for(var i = 0; i < 4; i++) {
            var phArticle = document.getElementById("phArticle" + i);
            createElement("article", phArticle, { id: "phContentArticle" + i, className: "phContentArticle" });
        }
    };

    /**
     * Creates the actual content for the project history content articles.
     */
    this.createProjectHistoryContent = function() {
        var imgSources = ["users", "time", "chart"];
        for(var i = 0; i < 3; i++) {
            var phContentArticle = document.getElementById("phContentArticle" + (i + 1));
            createElement("img", phContentArticle, { id: "phContent" + (i + 1), className: "phContent", src: "images/icon/" + imgSources[i] + ".png" });
        }
    };

    /**
     * Creates the articles for the project history titles.
     */
    this.createProjectHistoryTitlesArticles = function() {
        for(var i = 0; i < 4; i++) {
            var phArticle = document.getElementById("phArticle" + i);
            createElement("article", phArticle, { id: "phTitleArticle" + i, className: "titleArticle" });
        }
    };

    /**
     * Creates the actual titles for the project history title articles.
     */
    this.createProjectHistoryTitles = function() {
        var names = ["users", "users", "request time", "server load"];
        for(var i = 0; i < 4; i++) {
            var phTitleArticle = document.getElementById("phTitleArticle" + i);
            var phTitle = createElement("p", phTitleArticle, { id: "phTitle" + i, className: "title" });
            phTitle.appendChild(document.createTextNode(names[i]));
        }
    };
}