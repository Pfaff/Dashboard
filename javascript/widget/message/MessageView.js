/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MessageView = function MessageView() {
        var mesView;
        mesView = this;

        this.main = function () {
            mesView.createMessageSection();
            mesView.createSectionArticles();
            mesView.createArticlesArticles();
        };

        this.createMessageSection = function () {
            var section = document.getElementById("containerMiddleSectionBottom");

            db.createElement("section", section, { id: "messageSection" });
        };

        this.createSectionArticles = function () {
            var section = document.getElementById("messageSection");

            db.createElement("article", section, { id: "messageArticleLeft", className: "messageArticle" });
            db.createElement("article", section, { id: "messageArticleLeftQuote", className: "messageArticle" });
            db.createElement("article", section, { id: "messageArticle", className: "messageArticle" });
            db.createElement("article", section, { id: "messageArticleRight", className: "messageArticle" });
        };

        this.createArticlesArticles = function () {
            var mA1, mA4;

            mA1 = document.getElementById("messageArticleLeft");
            db.createElement("article", mA1, { id: "messagePhoto", className: "messageArticleSplitted" });
            db.createElement("article", mA1, { id: "messageEmployee", className: "messageArticleSplitted" });

            mA4 = document.getElementById("messageArticleRight");
            db.createElement("article", mA4, { id: "messageTrash", className: "messageArticleSplitted" });
            db.createElement("article", mA4, { id: "messageRightQuote", className: "messageArticleSplitted" });
        };
    };
}(Dashboard));