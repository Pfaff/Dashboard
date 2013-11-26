/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.AgendaModel = function AgendaModel() {
        var aMod, agendaItems;
        aMod = this;

        aMod.agendaItems = [];

        this.main = function (functionToCall) {
            aMod.getAgendaItems(functionToCall);
        };

        this.getAgendaItems = function (functionToCall) {
            $.ajax({
                url: db.url_Agenda,
                data: { method: db.method_Agenda },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    aMod.handleAgendaItems(data);
                    functionToCall();
                }
            });
        };

        this.handleAgendaItems = function (data) {
            var i;

            for (i = 0; i < data.length; i++) {
                aMod.agendaItems.push(new db.Agenda(data[i].agenda, data[i].date, data[i].title));
            }

            console.log(aMod.agendaItems);
        };
    };
}(Dashboard));