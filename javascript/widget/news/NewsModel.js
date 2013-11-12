/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.NewsModel = function NewsModel() {
        var nMod;
        nMod = this;

        this.main = function () {
            nMod.getNews();
        };

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

        this.handleNewsItems = function (data) {
            console.log(data);
        };
    };
}(Dashboard));