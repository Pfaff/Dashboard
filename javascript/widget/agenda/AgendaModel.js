/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.AgendaModel = function AgendaModel() {
        var aMod;
        aMod = this;

        this.main = function () {
            aMod.getAgendaItems();
        };

        this.getAgendaItems = function () {
            $.ajax({
                url: db.url_Agenda,
                data: { method: db.method_Agenda },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    //console.log(data);
                    var date = new Date(data[0].date);
                    //console.log(date);
                }
            });
        };
    };
}(Dashboard));