/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.AgendaController = function AgendaController() {
        var aCon, aView, aMod, currentAgendaDotItem, agendaDotIndex, currentAgendaDotIndex;
        aCon = this;
        aView = new db.AgendaView();
        aMod = new db.AgendaModel();

        currentAgendaDotItem = 0;
        currentAgendaDotIndex = 0;
        agendaDotIndex = [];

        this.main = function () {
            aMod.main(function () { aCon.completeAgenda(); });
            aView.main();
        };

        this.completeAgenda = function () {
            currentAgendaDotItem = aMod.agendaItems.length - 1;
            aCon.updateAgendaViewWithEvents();
            aCon.updateAgendaDotAndItemText(agendaDotIndex[aMod.agendaItems.length - 1], currentAgendaDotItem);
            aCon.switchAgendaItemInterval();
        };

        this.updateAgendaViewWithEvents = function () {
            var i, currentDate, diffDays, agendaItemDate;
            currentDate = new Date();

            for (i = 0; i < aMod.agendaItems.length; i++) {
                agendaItemDate = new Date(aMod.agendaItems[i].date);
                diffDays = Math.round(Math.abs((currentDate.getTime() - agendaItemDate.getTime()) / (24 * 60 * 60 * 1000)));
                aView.addItemOnAgendaDot(diffDays + 1);
                agendaDotIndex.push(diffDays + 1);
            }
        };

        this.updateAgendaDotAndItemText = function (agendaDotIndex, agendaItemIndex) {
            aView.highlightAgendaDot(agendaDotIndex);
            aView.updateAgendaFocusDate(agendaDotIndex);
            aView.updateAgendaFocusText(aMod.agendaItems[agendaItemIndex].agenda, aMod.agendaItems[agendaItemIndex].title);
        };

        this.switchAgendaItemInterval = function () {
            setInterval(function () {
                aCon.updateAgendaDotIndex();
                aCon.updateAgendaDotAndItemText(agendaDotIndex[aMod.agendaItems.length - 1], currentAgendaDotItem);
            }, 2500);
        };

        this.updateCurrentAgendaDotItem = function () {

        };

        this.updateAgendaDotIndex = function () {

        };
    };
}(Dashboard));