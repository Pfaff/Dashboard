/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.ComicModel = function ComicModel() {
        var comMod;
        comMod = this;

        /**
         * Contains the comics.
         * @type {Array}
         */
        comMod.comics = [];

        /**
         * Calls the function to gather the comics.
         */
        this.main = function (functionToCall) {
            comMod.getComics(functionToCall);
        };

        /**
         * Gets the comics from the back-end.
         */
        this.getComics = function (functionToCall) {
            $.ajax({
                url: db.url_Comic,
                data: { method: db.method_Comic },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);

                    if (functionToCall) {
                        functionToCall();
                    }
                }
            });
        };
    };
}(Dashboard));