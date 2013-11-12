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
        this.main = function () {
            nMod.getNews();
        };

        /**
         * Gets the news from the back-end.
         */
        this.getNews = function () {
            $.ajax({
                url: db.url_News,
                data: { method: db.method_News },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    nMod.handleNewsItems(data);
                }
            });
        };

        /**
         * Handles the news data; making objects from it and pushing it in the desired array.
         * @param data
         */
        this.handleNewsItems = function (data) {
            var i;

            for (i = 0; i < data.length; i++) {
                nMod.news.push(new db.News(data[i].site,
                                           data[i].category,
                                           data[i].title,
                                           data[i].link,
                                           data[i].photo));
            }
        };
    };
}(Dashboard));