/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MessageView = function MessageView() {
        var mesView, months;
        mesView = this;

        months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];

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

            db.createElement("img", article, { id: "messageArticleEmployeePhoto", src: "images/employee/employee.png", alt: "Employee Photo" });
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

        /**
         * Creates the overlay in order to post the message.
         */
        this.createMessagePostFunctionality = function (employeeNames, functionToCall) {
            var container, overlay;
            container = document.getElementById("containerOverlay");

            overlay = db.createElement("article", container, { id: "messageOverlay" });
            overlay.onclick = function () { event.preventDefault(); event.stopPropagation(); };

            mesView.createMessagePostView(employeeNames, functionToCall);
        };


        /**
         * Calls the functions which builds the message post overlay.
         * @param employeeNames
         * @param functionToCall
         */
        this.createMessagePostView = function (employeeNames, functionToCall) {
            mesView.createMessagePostArticles();
            mesView.createTitleText();
            mesView.createSelectNameTitle();
            mesView.createSelectNameBox(employeeNames);
            mesView.createSelectDateArticles();
            mesView.createSelectDateText();
            mesView.createSelectDateFields();
            mesView.createCreateMessageText();
            mesView.createCreateMessageField();
            mesView.createPostMessageButton(functionToCall);
            mesView.fillDateSelectWithOptions();
        };

        /**
         * Creates the articles on the message post overlay.
         */
        this.createMessagePostArticles = function () {
            var overlay, articleIds, i;
            overlay = document.getElementById("messageOverlay");
            articleIds = ["messagePostTitleArticle", "messagePostSelectNameArticle", "messagePostSelectDateArticle", "messagePostCreateMessageArticle", "messagePostButtonArticle"];

            for (i = 0; i < articleIds.length; i++) {
                db.createElement("article", overlay, { id: articleIds[i], className: "messagePostArticle" });
            }
        };

        /**
         * Creates the title text of the overlay.
         */
        this.createTitleText = function () {
            var article, p;

            article = document.getElementById("messagePostTitleArticle");
            p = db.createElement("p", article);

            p.appendChild(document.createTextNode("NIEUWE MEDEDELING"));
        };

        /**
         * Creates the title for the select name field.
         */
        this.createSelectNameTitle = function () {
            var article, p;

            article = document.getElementById("messagePostSelectNameArticle");
            p = db.createElement("p", article, { className: "messagePostFieldTitle" });

            p.appendChild(document.createTextNode("NAAM"));
        };

        /**
         * Creates the select name box.
         * @param employeeNames
         */
        this.createSelectNameBox = function (employeeNames) {
            var article, select, option, options, i;

            options = employeeNames;
            article = document.getElementById("messagePostSelectNameArticle");
            select = db.createElement("select", article, { id: "messagePostSelectName" });

            for (i = 0; i < options.length; i++) {
                option = db.createElement("option", select);
                option.value = options[i];
                option.text = options[i];
            }
        };

        /**
         * Creates the select date articles.
         */
        this.createSelectDateArticles = function () {
            var article;
            article = document.getElementById("messagePostSelectDateArticle");

            db.createElement("article", article, { id: "selectDateFromArticle", className: "selectDateClass" });
            db.createElement("article", article, { id: "selectDateTillArticle", className: "selectDateClass" });
        };

        /**
         * Creates the select date text.
         */
        this.createSelectDateText = function () {
            var article, p;

            article = document.getElementById("selectDateFromArticle");
            p = db.createElement("p", article, { className: "messagePostFieldTitle" });
            p.appendChild(document.createTextNode("LAAT DE MEDEDELING ZIEN VANAF"));

            article = document.getElementById("selectDateTillArticle");
            p = db.createElement("p", article, { className: "messagePostFieldTitle" });
            p.appendChild(document.createTextNode("LAAT DE MEDEDELING ZIEN TOT EN MET"));
        };

        /**
         * Creates the select date fields.
         */
        this.createSelectDateFields = function () {
            var article, i;

            article = document.getElementById("selectDateFromArticle");
            for (i = 0; i < 3; i++) {
                db.createElement("select", article, { id: "selectDateFrom" + i });
            }

            article = document.getElementById("selectDateTillArticle");
            for (i = 0; i < 3; i++) {
                db.createElement("select", article, { id: "selectDateTill" + i });
            }
        };

        /**
         * Creates the title for the create message field.
         */
        this.createCreateMessageText = function () {
            var article, p;

            article = document.getElementById("messagePostCreateMessageArticle");
            p = db.createElement("p", article, { className: "messagePostFieldTitle" });
            p.appendChild(document.createTextNode("MEDEDELING"));
        };

        /**
         * Creates the create message field.
         */
        this.createCreateMessageField = function () {
            var article, textarea;

            article = document.getElementById("messagePostCreateMessageArticle");
            textarea = db.createElement("textarea", article, { id: "createMessage" });
            textarea.maxLength = 250;
        };

        /**
         * Creates the button which can be used to post the message.
         * @param functionToCall
         */
        this.createPostMessageButton = function (functionToCall) {
            var article, button;

            article = document.getElementById("messagePostButtonArticle");
            button = db.createElement("button", article, { id: "postMessage" });
            button.appendChild(document.createTextNode("TOEVOEGEN"));
            button.onclick = function () { functionToCall(); };
        };

        /**
         * Fills the date select boxes with options.
         */
        this.fillDateSelectWithOptions = function () {
            mesView.createDayOptions();
            mesView.createMonthOptions();
            mesView.createYearOptions();
            mesView.updateFocus();
            mesView.adjustWidthOfOptions();
        };

        /**
         * Creates the day options.
         */
        this.createDayOptions = function () {
            var select, option, i, x;
            select = [document.getElementById("selectDateFrom0"), document.getElementById("selectDateTill0")];

            for (x = 0; x < select.length; x++) {
                for (i = 1; i <= 31; i++) {
                    option = db.createElement("option", select[x]);
                    option.value = i;
                    option.text = i;
                }
            }
        };

        /**
         * Creates the month options.
         */
        this.createMonthOptions = function () {
            var select, option, i, x;
            select = [document.getElementById("selectDateFrom1"), document.getElementById("selectDateTill1")];

            for (x = 0; x < select.length; x++) {
                for (i = 0; i < months.length; i++) {
                    option = db.createElement("option", select[x]);
                    option.value = months[i];
                    option.text = months[i];
                }
            }
        };

        /**
         * Creates the year options.
         */
        this.createYearOptions = function () {
            var date, select, option, i, x;
            select = [document.getElementById("selectDateFrom2"), document.getElementById("selectDateTill2")];
            date = new Date();
            for (x = 0; x < select.length; x++) {
                for (i = date.getFullYear(); i <= date.getFullYear() + 1; i++) {
                    option = db.createElement("option", select[x]);
                    option.value = i;
                    option.text = i;
                }
            }
        };

        /**
         * Focuses the current select boxes on the current date.
         */
        this.updateFocus = function () {
            var date, options, i, x;

            date = new Date();
            options = ["selectDateFrom", "selectDateTill"];

            for (x = 0; x < 3; x++) {
                for (i = 0; i < options.length; i++) {
                    if (x === 0) {
                        document.getElementById(options[i] + x).value = date.getDate();
                    } else if (x === 1) {
                        document.getElementById(options[i] + x).value = months[date.getMonth()];
                    } else {
                        document.getElementById(options[i] + x).value = date.getFullYear();
                    }
                }
            }
        };

        /**
         * Adjusts the width of the options by enlarging it by 20% of their current width.
         */
        this.adjustWidthOfOptions = function () {
            var options, option, x, i, compWidth;
            options = ["selectDateFrom", "selectDateTill"];

            for (x = 0; x < 3; x++) {
                for (i = 0; i < options.length; i++) {
                    option = document.getElementById(options[i] + x);
                    compWidth = window.getComputedStyle(option, null).width.replace(/[A-Za-z$\-]/g, "");
                    option.style.width = compWidth * 1.2 + "px";
                }
            }
        };
    };
}(Dashboard));