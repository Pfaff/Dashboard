/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.AgendaModel = function AgendaModel() {
        var aMod, agendaItems;
        aMod = this;

        /**
         * Contains the agenda items.
         * @type {Array}
         */
        aMod.agendaItems = [];

        /**
         * Main function of the model.
         * @param functionToCall
         */
        this.main = function (functionToCall) {
            aMod.getAgendaItems(functionToCall);
        };

        /**
         * Gets the agenda items.
         * Sorts the agenda items on date.
         *
         * @param functionToCall
         */
        this.getAgendaItems = function (functionToCall) {
            $.ajax({
                url: db.url_Agenda,
                data: { method: db.method_Agenda },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    data.sort(function (a, b) {
                        a = new Date(a.date);
                        b = new Date(b.date);
                        return a < b ? -1 : a > b ? 1 : 0;
                    });

                    aMod.handleAgendaItems(data);

                    if (functionToCall) {
                        functionToCall();
                    }
                }
            });
        };

        /**
         * Turns the received date into agenda objects.
         * @param data
         */
        this.handleAgendaItems = function (data) {
            var i;

            aMod.agendaItems = [];

            for (i = 0; i < data.length; i++) {
                aMod.agendaItems.push(new db.Agenda(data[i].agenda, data[i].date, data[i].title));
            }

            aMod.calculateDaysLeft();
        };

        /**
         * Calculate the amount of days left. Used later on the define the 'dot-index' (view) of an agenda item.
         */
        this.calculateDaysLeft = function () {
            var i, currentDate, agendaItemDate, diffDays;
            currentDate = new Date();

            for (i = 0; i < aMod.agendaItems.length; i++) {
                agendaItemDate = new Date(aMod.agendaItems[i].date);
                diffDays = Math.floor(Math.abs((currentDate.getTime() - agendaItemDate.getTime()) / (24 * 60 * 60 * 1000)));
                aMod.agendaItems[i].daysLeft = diffDays;
            }
        };
    };
}(Dashboard));