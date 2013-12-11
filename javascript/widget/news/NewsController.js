/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.NewsController = function NewsController() {
        var nCon, nView, nMod, newsTop, newsMiddle, newsBottom;
        nCon = this;
        nView = new db.NewsView();
        nMod = new db.NewsModel();

        /**
         * Defines which news item to use from their array with news items.
         * @type {number}
         */
        newsTop = 0;
        newsMiddle = 0;
        newsBottom = 0;

        /**
         * Calls the functions to make the news widget work.
         */
        this.main = function () {
            nMod.main(nCon.startNews);
            nView.main();
//            setTimeout(nCon.updateAllNews, 4000);
//            setTimeout(nCon.startUpdateInterval, 8000);
            nCon.startGetNewNewsInterval();
        };

        /**
         * Starts the update interval for updating the news in the widget.
         */
        this.startUpdateInterval = function () {
            setInterval(function () {
                nCon.updateAllNews();
            }, db.updateNewsArticlesInterval);
        };

        /**
         * Starts the functions to build the widget after the news is collected.
         */
        this.startNews = function () {
            nCon.startUpdateInterval();
            nCon.updateAllNews();
        };

        /**
         * Update all news articles.
         */
        this.updateAllNews = function () {
            newsTop = nCon.updateNewsArticle(nMod.getNewsFromGivenCategory("algemeen"), newsTop, 0);
            newsMiddle = nCon.updateNewsArticle(nMod.getNewsFromGivenSitePlusHideGivenCategory("Nu", "algemeen"), newsMiddle, 1);
            newsMiddle = nCon.updateNewsArticle(nMod.getNewsFromGivenSitePlusHideGivenCategory("Nu", "algemeen"), newsMiddle, 2);
            newsBottom = nCon.updateNewsArticle(nMod.getNewsFromGivenSite("Tweakers"), newsBottom, 3);
            nView.setTextSizeForEachNewsItem();
        };

        /**
         * Updates a news article.
         * @param filteredNews
         * @param newsVar
         * @param index
         * @returns {number}
         */
        this.updateNewsArticle = function (filteredNews, newsVar, index) {
            var news, item;

            news = filteredNews;
            item = news[newsVar];
            nView.updateNewsItem(index, item.title, item.category, item.photo, item.link);

            return nCon.updateNewsVar(newsVar, news.length);
        };

        /**
         * Updates the value of the given news variable.
         * @param newsVar
         * @param amountOfNewsItems
         * @returns {number}
         */
        this.updateNewsVar = function (newsVar, amountOfNewsItems) {
            if (newsVar < amountOfNewsItems - 1) {
                return newsVar + 1;
            }
            return 0;
        };

        /**
         * Starts the interval to get new news.
         */
        this.startGetNewNewsInterval = function () {
            setInterval(function () {
                nMod.main();
            }, db.getNewNewsInterval);
        };
    };
}(Dashboard));