/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.NewsController = function NewsController() {
        var nCon, nView, nMod;
        nCon = this;
        nView = new db.NewsView();
        nMod = new db.NewsModel();

        this.main = function () {
            nMod.main();
            nView.main();
        };
    };
}(Dashboard));