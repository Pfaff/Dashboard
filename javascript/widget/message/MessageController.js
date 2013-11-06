/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MessageController = function MessageController() {
        var mesCon, mesView, mesMod, messageToShow;
        mesCon = this;
        mesView = new db.MessageView();
        mesMod = new db.MessageModel();

        messageToShow = 0;

        /**
         * Calls the main functions in order to make the message widget function on the dashboard.
         */
        this.main = function () {
            mesMod.main();
            mesView.main();
            mesCon.activateMessageWidgetClickListeners();
            mesCon.startUpdateMessageInterval();
        };

        /**
         * Activates the click listeners.
         */
        this.activateMessageWidgetClickListeners = function () {
            var employeeNames, i;

            $(".messageArticle").click(function () {
                employeeNames = [];
                mesCon.buildOverlay();
                for (i = 0; i < mesMod.employees.length; i++) { employeeNames.push(mesMod.employees[i].displayname); }
                mesView.createMessagePostFunctionality(employeeNames.sort(), mesCon.postMessage);
            });

            $("#messageTrashBin").click(function () {
                mesCon.removeMessage();
            });
        };

        this.startUpdateMessageInterval = function () {
            setInterval(function () {
                mesCon.defineMessageToShow();
                mesView.addMessageToWidget(mesMod.messages[messageToShow]);
            }, db.switchMessageInterval);
        };

        this.defineMessageToShow = function () {
            var amountOfMessages = mesMod.messages.length;

            if (amountOfMessages > 0) {
                if (messageToShow < (amountOfMessages - 1)) {
                    messageToShow++;
                } else {
                    messageToShow = 1;
                }
            }
        };

        /**
         * Builds the overlay and desired view.
         */
        this.buildOverlay = function () {
            var overlayController = new db.OverlayController();
            overlayController.buildOverlay();
        };

        /**
         * Calls the function to remove the selected message from widget.
         * Using prevent default and stop propagation to avoid the overlay to pop up.
         */
        this.removeMessage = function () {
            alert("Ik zou nu eigenlijk je melding moeten verwijderen maar zover ben ik helaas nog niet.");
            mesMod.removeMessage();
            event.preventDefault();
            event.stopPropagation();
        };

        this.postMessage = function () {
            alert("Work in progress, kallum.");
        };
    };
}(Dashboard));