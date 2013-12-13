/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.ComicController = function ComicController() {
        var comCon, comView, comMod;
        comCon = this;
        comView = new db.ComicView();
        comMod = new db.ComicModel();

        this.main = function () {
            comMod.main();
            comView.main();
        };
    };
}(Dashboard));