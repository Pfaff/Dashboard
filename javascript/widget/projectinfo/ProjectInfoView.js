/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function ProjectInfoView() {
    var piView = this;

    /**
     * Calls the functions to build the project info view.
     */
    this.main = function() {
        piView.createProjectInfoArticles();
        piView.createProjectInfoContentArticles();
        piView.createProjectInfoContent();
        piView.createProjectInfoTitlesArticles();
        piView.createProjectInfoTitles();
    };

    /**
     * Creates the articles for the project info in the sections.
     */
    this.createProjectInfoArticles = function() {
        var sectionTop = document.getElementById("containerLeftSectionTop");
        for(var i = 0; i < 5; i++) {
            createElement("article", sectionTop, { id: "piArticle" + i, className: "piArticle" });
        }
    };

    /**
     * Creates the articles for the project info content.
     */
    this.createProjectInfoContentArticles = function() {
        for(var i = 0; i < 5; i++) {
            var piArticle = document.getElementById("piArticle" + i);
            createElement("article", piArticle, { id: "piContentArticle" + i, className: "piContentArticle" });
        }
    };

    /**
     * Creates the actual 'content' for the project info content articles.
     */
    this.createProjectInfoContent = function() {
        var info = [" ", " ", " ", " "];
        for(var i = 0; i < 4; i++) {
            var piContentArticle = document.getElementById("piContentArticle" + (i + 1));
            var piTitle = createElement("p", piContentArticle, { id: "piContent" + (i + 1), className: "piContent" });
            piTitle.appendChild(document.createTextNode(info[i]));
        }
    };

    /**
     * Creates the title articles for in the project info articles.
     */
    this.createProjectInfoTitlesArticles = function() {
        for(var i = 0; i < 5; i++) {
            var piArticle = document.getElementById("piArticle" + i);
            createElement("article", piArticle, { id: "piTitleArticle" + i, className: "titleArticle" });
        }
    };

    /**
     * Creates the actual text for in the title articles.
     */
    this.createProjectInfoTitles = function() {
        var names = ["current users", "version", "request time", "requests / min", "uptime"];
        for(var i = 0; i < 5; i++) {
            var piTitleArticle = document.getElementById("piTitleArticle" + i);
            var piTitle = createElement("p", piTitleArticle, { id: "piTitle" + i, className: "title" });
            piTitle.appendChild(document.createTextNode(names[i]));
        }
    };

    /**
     * Updates the content of the given pi element. Adds a new title and new content.
     * @param number
     * @param title
     * @param content
     */
    this.updateContent = function(number, title, content) {
        document.getElementById("piTitle" + number).firstChild.data = title;
        document.getElementById("piContent" + number).firstChild.data = content;
    };

    this.addSpanToParagraph = function(pid, value) {
        var splitText = value.split(' ');
        var p = document.getElementById(pid);
        p.innerHTML = splitText[0]+ " <span>" + splitText[1] + "</span>";
    };
}