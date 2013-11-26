/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.AgendaController = function AgendaController() {
        var aCon, aView, aMod, agendaEventsIndexes;
        aCon = this;
        aView = new db.AgendaView();
        aMod = new db.AgendaModel();

        agendaEventsIndexes = [];

        this.main = function () {
            aMod.main(function () { aCon.completeAgenda(); });
            aView.main();
        };

        this.completeAgenda = function () {
            aCon.updateAgendaViewWithEvents();
            aCon.startAgendaDotFocus();
        };

        this.updateAgendaViewWithEvents = function () {
            var i, currentDate, diffDays, agendaItemDate;
            currentDate = new Date();

            for (i = 0; i < aMod.agendaItems.length; i++) {
                agendaItemDate = new Date(aMod.agendaItems[i].date);
                diffDays = Math.round(Math.abs((currentDate.getTime() - agendaItemDate.getTime()) / (24 * 60 * 60 * 1000)));
                aView.addItemOnAgendaDot(diffDays);
                agendaEventsIndexes.push(diffDays);
            }
        };

        this.startAgendaDotFocus = function () {
            var index = agendaEventsIndexes[agendaEventsIndexes.length - 1];
            aView.highlightAgendaDot(index);
            aView.updateAgendaFocusDate(index);
            aView.updateAgendaFocusText(aMod.agendaItems[index].agenda, aMod.agendaItems[index].title);
        };
    };
}(Dashboard));