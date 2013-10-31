/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MessageView = function MessageView() {
        var mesView;
        mesView = this;

        /**
         * Calls the required functions to build the view of the message widget.
         */
        this.main = function () {
            mesView.createMessageSection();
            mesView.createSectionArticles();
            mesView.createArticlesArticles();
            mesView.createPicture();
            mesView.createEmployeeText();
            mesView.createQuoteImages();
            mesView.createMessage();
            mesView.createTrashBin();
            mesView.activateHoverEffectForTrashBinListener();
        };

        /**
         * Creates the message section.
         */
        this.createMessageSection = function () {
            var section = document.getElementById("containerMiddleSectionBottom");

            db.createElement("section", section, { id: "messageSection" });
        };

        /**
         * Creates the articles for in the message section.
         */
        this.createSectionArticles = function () {
            var section = document.getElementById("messageSection");

            db.createElement("article", section, { id: "messageArticleLeft", className: "messageArticle" });
            db.createElement("article", section, { id: "messageArticleLeftQuote", className: "messageArticle" });
            db.createElement("article", section, { id: "messageArticle", className: "messageArticle" });
            db.createElement("article", section, { id: "messageArticleRight", className: "messageArticle" });
        };

        /**
         * Creates the articles for in the created articles.
         */
        this.createArticlesArticles = function () {
            var mA1, mA4;

            mA1 = document.getElementById("messageArticleLeft");
            db.createElement("article", mA1, { id: "messageArticlePhoto", className: "messageArticleSplitted" });
            db.createElement("article", mA1, { id: "messageArticleEmployee", className: "messageArticleSplitted" });

            mA4 = document.getElementById("messageArticleRight");
            db.createElement("article", mA4, { id: "messageArticleTrash", className: "messageArticleSplitted" });
            db.createElement("article", mA4, { id: "messageArticleRightQuote", className: "messageArticleSplitted" });
        };

        /**
         * Creates the picture for the photo of the employee.
         */
        this.createPicture = function () {
            var article = document.getElementById("messageArticlePhoto");

            db.createElement("img", article, { id: "messageArticleEmployeePhoto", src: "images/employee/Jeffrey_Pfaff.png", alt: "Employee Photo" });
        };

        /**
         * Creates the text for the name of the employee.
         */
        this.createEmployeeText = function () {
            var article, p;

            article = document.getElementById("messageArticleEmployee");
            p = db.createElement("p", article, { id: "messageEmployee" });

            p.appendChild(document.createTextNode("Jeffrey Pfaff"));
        };

        /**
         * Creates the quote images for on the message widget.
         */
        this.createQuoteImages = function () {
            var quoteArticle;

            quoteArticle = document.getElementById("messageArticleLeftQuote");
            db.createElement("img", quoteArticle, { id: "messageQuoteLeft", className: 'messageQuote', src: "images/icon/quoteLeft.png", alt: "Quote left" });

            quoteArticle = document.getElementById("messageArticleRightQuote");
            db.createElement("img", quoteArticle, { id: "messageQuoteRight", className: 'messageQuote', src: "images/icon/quoteRight.png", alt: "Quote right" });
        };

        /**
         * Creates the trash bin for on the message widget.
         */
        this.createTrashBin = function () {
            var article = document.getElementById("messageArticleTrash");
            db.createElement("img", article, { id: "messageTrashBin", src: "images/icon/trash.png", alt: "Message trash bin" });

        };

        /**
         * Actives the listener for the hover effect on the trash bin.
         */
        this.activateHoverEffectForTrashBinListener = function () {
            var section, bin;
            section = document.getElementById("messageSection");
            bin = document.getElementById("messageTrashBin");

            section.onmouseover = function () { bin.style.visibility = 'visible'; };
            section.onmouseout = function () { bin.style.visibility = 'hidden'; };
            bin.onmouseover = function () { bin.src = "images/icon/trashHover.png"; };
            bin.onmouseout = function () { bin.src = "images/icon/trash.png"; };
        };

        /**
         * Creates the space for the actual message.
         */
        this.createMessage = function () {
            var message, article, p;

            article = document.getElementById("messageArticle");
            message = db.createElement("article", article, { id: "message" });

            p = db.createElement("p", message, { id: "message" });

            p.appendChild(document.createTextNode("Dit is een voorbeeld mededeling. Dit is een voorbeeld mededeling. Dit is een voorbeeld mededeling. Dit is een voorbeeld mededeling."));
            mesView.calculateMarginForMessage();
        };

        /**
         * Calculates the required margin in order to vertically center the message.
         */
        this.calculateMarginForMessage = function () {
            var el, p, height, compStyle;

            el = document.getElementById("message");
            p = el.firstChild;
            compStyle = window.getComputedStyle(p, null);
            height = compStyle.height.replace(/[A-Za-z$\-]/g, "");

            p.style.marginTop = "-" + (height / 2) + "px";
        };

        this.createMessagePostFunctionality = function () {
            var container;
            container = document.getElementById("containerOverlay");

            db.createElement("article", container, { id: "messageOverlay" });
        };
    };
}(Dashboard));