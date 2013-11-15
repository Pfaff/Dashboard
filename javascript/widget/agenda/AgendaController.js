/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.AgendaController = function AgendaController() {
        var aCon, aView, aMod;
        aCon = this;
        aView = new db.AgendaView();
        aMod = new db.AgendaModel();

        this.main = function () {
            aMod.main();
            aView.main();
        };
    };
}(Dashboard));