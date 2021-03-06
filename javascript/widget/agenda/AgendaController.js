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

        /**
         * Contains the current agenda dot item.
         * @type {number}
         */
        currentAgendaDotItem = 0;

        /**
         * Agenda dot index array contains the difference in days of the agenda events.
         * The number of days difference is equal to the 'index' of the dot, in example; 'article id = agendaDot2'.
         * @type {Array}
         */
        agendaDotIndex = [];
        /**
         * Current agenda dot index contains the value of which current days difference is being used from the agendaDotIndex array.
         * @type {number}
         */
        currentAgendaDotIndex = -1;

        /**
         * Calls the main functions of the agenda controller.
         */
        this.main = function () {
            aMod.main(function () { aCon.completeAgenda(); });
            aView.main();
            aCon.startGetNewAgendaItemsInterval();
        };

        /**
         * Completes the agenda by adding items to the agenda dots, adding the text of the first agenda item and starting the interval.
         */
        this.completeAgenda = function () {
            currentAgendaDotItem = aMod.agendaItems.length - 1;
            aCon.updateAgendaViewWithItems();
            aCon.updateAgendaDotAndItemText(agendaDotIndex[aMod.agendaItems.length - 1], currentAgendaDotItem);
            aCon.switchAgendaItemInterval();
        };

        /**
         * Updates all dots which should have an item on them; background color white.
         */
        this.updateAgendaViewWithItems = function () {
            var i, daysLeft;

            agendaDotIndex = [];

            for (i = 0; i < aMod.agendaItems.length; i++) {
                daysLeft = aMod.agendaItems[i].daysLeft;
                aView.addItemOnAgendaDot(daysLeft);
                agendaDotIndex.push(daysLeft);
            }

            agendaDotIndex.sort(function (a, b) { return a - b; });
        };

        /**
         * Updates the agenda focus.
         * Updates the highlighted agenda dot, agenda item and date.
         * @param agendaDotIndex
         * @param agendaItemIndex
         */
        this.updateAgendaDotAndItemText = function (agendaDotIndex, agendaItemIndex) {
            aView.highlightAgendaDot(agendaDotIndex);
            aView.updateAgendaFocusDate(agendaDotIndex);
            aView.updateAgendaFocusText(aMod.agendaItems[agendaItemIndex].agenda, aMod.agendaItems[agendaItemIndex].title);
        };

        /**
         * The interval which makes the widget switch between the several agenda items.
         */
        this.switchAgendaItemInterval = function () {
            setInterval(function () {
                aCon.updateAgendaDotIndex();
                aCon.updateCurrentAgendaDotItem();
                aCon.updateAgendaViewWithItems();
                aCon.updateAgendaDotAndItemText(agendaDotIndex[currentAgendaDotIndex], currentAgendaDotItem);
            }, db.switchAgendaItemInterval);
        };

        /**
         * Updates the value of the currentAgendaDotItem.
         */
        this.updateCurrentAgendaDotItem = function () {
            if (currentAgendaDotItem < aMod.agendaItems.length - 1) {
                currentAgendaDotItem++;
            } else {
                currentAgendaDotItem = 0;
            }
        };

        /**
         * Updates the value of the currentAgendaDotIndex.
         */
        this.updateAgendaDotIndex = function () {
            if (currentAgendaDotIndex < aMod.agendaItems.length - 1) {
                currentAgendaDotIndex++;
            } else {
                currentAgendaDotIndex = 0;
            }
        };

        this.startGetNewAgendaItemsInterval = function () {
            setInterval(function () {
                aMod.getAgendaItems();
            }, db.getNewAgendaItemsInterval);
        };
    };
}(Dashboard));