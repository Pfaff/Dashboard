/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.NewsModel = function NewsModel() {
        var nMod;
        nMod = this;

        /**
         * Contains the news items.
         * @type {Array}
         */
        nMod.news = [];

        /**
         * Calls the function to gather the news.
         */
        this.main = function (functionToCall) {
            nMod.getNews(functionToCall);
        };

        /**
         * Gets the news from the back-end.
         */
        this.getNews = function (functionToCall) {
            $.ajax({
                url: db.url_News,
                data: { method: db.method_News },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    nMod.handleNewsItems(data);

                    if (functionToCall) {
                        functionToCall();
                    }
                }
            });
        };

        /**
         * Handles the news data; making objects from it and pushing it in the desired array.
         * @param data
         */
        this.handleNewsItems = function (data) {
            var i;

            nMod.news = [];

            for (i = 0; i < data.length; i++) {
                nMod.news.push(new db.News(data[i].site,
                                           data[i].category,
                                           data[i].title,
                                           data[i].link,
                                           data[i].photo));
            }
        };

        /**
         * Returns the news from a given category.
         * @param category
         * @returns {Array}
         */
        this.getNewsFromGivenCategory = function (category) {
            var i, news;

            news = [];

            for (i = 0; i < nMod.news.length; i++) {
                if (nMod.news[i].category === category) {
                    news.push(nMod.news[i]);
                }
            }

            return news;
        };

        /**
         * Returns the news from a given site.
         * @param site
         * @returns {Array}
         */
        this.getNewsFromGivenSite = function (site) {
            var i, news;

            news = [];

            for (i = 0; i < nMod.news.length; i++) {
                if (nMod.news[i].site === site) {
                    news.push(nMod.news[i]);
                }
            }

            return news;
        };

        this.getNewsFromGivenSitePlusHideGivenCategory = function (site, category) {
            var i, news;

            news = [];

            for (i = 0; i < nMod.news.length; i++) {
                if (nMod.news[i].site === site && nMod.news[i].category !== category) {
                    news.push(nMod.news[i]);
                }
            }

            return news;
        };
    };
}(Dashboard));