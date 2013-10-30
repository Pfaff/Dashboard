/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MessageController = function MessageController() {
        var mesCon, mesView, mesMod;
        mesCon = this;
        mesView = new db.MessageView();
        mesMod = new db.MessageModel();

        this.main = function () {
            mesView.main();
            mesMod.main();
        };


    };
}(Dashboard));