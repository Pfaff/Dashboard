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
            mesView.createPicture();
            mesView.createEmployeeText();
            mesView.createQuoteImages();
            mesView.createTrashBin();
            mesView.activateHoverEffectForTrashBinListener();
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
            db.createElement("article", mA1, { id: "messageArticlePhoto", className: "messageArticleSplitted" });
            db.createElement("article", mA1, { id: "messageArticleEmployee", className: "messageArticleSplitted" });

            mA4 = document.getElementById("messageArticleRight");
            db.createElement("article", mA4, { id: "messageArticleTrash", className: "messageArticleSplitted" });
            db.createElement("article", mA4, { id: "messageArticleRightQuote", className: "messageArticleSplitted" });
        };

        this.createPicture = function () {
            var article = document.getElementById("messageArticlePhoto");

            db.createElement("img", article, { id: "messageArticleEmployeePhoto", src: "images/employee/Jeffrey_Pfaff.png", alt: "Employee Photo" });
        };

        this.createEmployeeText = function () {
            var article, p;

            article = document.getElementById("messageArticleEmployee");
            p = db.createElement("p", article, { id: "messageEmployee" });

            p.appendChild(document.createTextNode("Jeffrey Pfaff"));
        };

        this.createQuoteImages = function () {
            var quoteArticle;

            quoteArticle = document.getElementById("messageArticleLeftQuote");
            db.createElement("img", quoteArticle, { id: "messageQuoteLeft", className: 'messageQuote', src: "images/icon/quoteLeft.png", alt: "Quote left" });

            quoteArticle = document.getElementById("messageArticleRightQuote");
            db.createElement("img", quoteArticle, { id: "messageQuoteRight", className: 'messageQuote', src: "images/icon/quoteRight.png", alt: "Quote right" });
        };

        this.createTrashBin = function () {
            var article = document.getElementById("messageArticleTrash");
            db.createElement("img", article, { id: "messageTrashBin", src: "images/icon/trash.png", alt: "Message trash bin" });

        };

        this.activateHoverEffectForTrashBinListener = function () {
            var section, bin;
            section = document.getElementById("messageSection");
            bin = document.getElementById("messageTrashBin");

            section.onmouseover = function () { bin.style.visibility = 'visible'; };
            section.onmouseout = function () { bin.style.visibility = 'hidden'; };
            bin.onmouseover = function () { bin.src = "images/icon/trashHover.png"; };
            bin.onmouseout = function () { bin.src = "images/icon/trash.png"; };
        };


    };
}(Dashboard));