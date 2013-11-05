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

        /**
         * Calls the main functions in order to make the message widget function on the dashboard.
         */
        this.main = function () {
            mesView.main();
            mesMod.main();
            mesCon.activateMessageWidgetClickListeners();
        };

        /**
         * Activates the click listeners.
         */
        this.activateMessageWidgetClickListeners = function () {
            $(".messageArticle").click(function () {
                mesCon.buildOverlay();
                mesView.createMessagePostFunctionality(["Jeffrey Pfaff", "Tom Kirchjunger", "Ties van de Ven"], mesCon.postMessage);
            });

            $("#messageTrashBin").click(function () {
                mesCon.removeMessage();
            });
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
            event.preventDefault();
            event.stopPropagation();
        };

        this.postMessage = function () {
            alert("Work in progress, kallum.");
        };
    };
}(Dashboard));