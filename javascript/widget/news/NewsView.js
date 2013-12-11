/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.NewsView = function NewsView() {
        var nView;
        nView = this;

        /**
         * Calls the functions to build the view of the news widget.
         */
        this.main = function () {
            nView.createNewsSection();
            nView.createNewsArticles();
            nView.createContentAndPhotoArticlesInEachNewsArticle();
            nView.createNewsContentAndTitleArticles();
            nView.createNewsArticlesTitles();
            nView.createNewsArticlesContent();
            nView.createNewsPhotoArticlePhoto();
        };

        /**
         * Creates the news widget section in the container.
         */
        this.createNewsSection = function () {
            var section = document.getElementById("containerRightSectionMiddle");

            db.createElement("section", section, { id: "newsSection" });
        };

        /**
         * Creates the news articles in the news section.
         */
        this.createNewsArticles = function () {
            var i, section;

            section = document.getElementById("newsSection");

            for (i = 0; i < db.newsArticles; i++) {
                db.createElement("article", section, { id: "newsArticle" + i, className: "newsArticle" });
            }
        };

        /**
         * Splits every news article in two articles; content and photo.
         */
        this.createContentAndPhotoArticlesInEachNewsArticle = function () {
            var i, article;

            for (i = 0; i < db.newsArticles; i++) {
                article = document.getElementById("newsArticle" + i);
                db.createElement("article", article, { id: "newsContentArticle" + i, className: "articleInNewsArticle newsContentArticle" });
                db.createElement("article", article, { id: "newsPhotoArticle" + i, className: "articleInNewsArticle newsPhotoArticle" });
            }
        };

        /**
         * Creates content and title articles in the news content articles.
         */
        this.createNewsContentAndTitleArticles = function () {
            var i, article;

            for (i = 0; i < db.newsArticles; i++) {
                article = document.getElementById("newsContentArticle" + i);
                db.createElement("article", article, { id: "newsContentArticleContent" + i, className: "newsContentArticleContent" });
                db.createElement("article", article, { id: "newsContentArticleTitle" + i, className: "newsContentArticleTitle" });
            }
        };

        /**
         * Creates the actual titles for in the news title articles.
         */
        this.createNewsArticlesTitles = function () {
            var i, article, p;

            for (i = 0; i < db.newsArticles; i++) {
                article = document.getElementById("newsContentArticleTitle" + i);
                p = db.createElement("p", article, { id: "newsContentArticleTitleText" + i, className: "title" });
                p.appendChild(document.createTextNode(" "));
            }
        };

        /**
         * Creates the actual content in the news content articles.
         */
        this.createNewsArticlesContent = function () {
            var i, article, p;

            for (i = 0; i < db.newsArticles; i++) {
                article = document.getElementById("newsContentArticleContent" + i);
                p = db.createElement("p", article, { id: "newsContentArticleContentText" + i, className: "newsContent" });
                p.appendChild(document.createTextNode(" "));
            }
        };

        /**
         * Creates the actual photo's in the news photo articles.
         */
        this.createNewsPhotoArticlePhoto = function () {
            var i, article;

            for (i = 0; i < db.newsArticles; i++) {
                article = document.getElementById("newsPhotoArticle" + i);
                db.createElement("img", article, { id: "newsPhotoArticlePhoto" + i, className: "newsPhoto", src: "images/news/empty.png", alt: "News photo" });
            }
        };

        /**
         * Updates a news article with the given information.
         * @param index
         * @param title
         * @param category
         * @param photo
         * @param link
         */
        this.updateNewsItem = function (index, title, category, photo, link) {
            document.getElementById("newsContentArticleContentText" + index).firstChild.data = title;
            document.getElementById("newsContentArticleTitleText" + index).firstChild.data = category;
            document.getElementById("newsPhotoArticlePhoto" + index).src = photo;
            document.getElementById("newsArticle" + index).onclick = function () { window.open(link); };
        };

        /**
         * Sets the fontsize of a news headline depending on the length of the content.
         */
        this.setTextSizeForEachNewsItem = function () {
            var i, item, length;

            for (i = 0; i < db.newsArticles; i++) {
                item = document.getElementById("newsContentArticleContentText" + i);
                length = item.firstChild.data.length;

                if (length > 65) {
                    item.style.fontSize = "12px";
                } else {
                    item.style.fontSize = "14px";
                }
            }
        };
    };
}(Dashboard));