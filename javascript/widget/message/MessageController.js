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
            mesCon.startGetMessagesInterval();
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

        /**
         * Interval for retrieving the messages from the database.
         */
        this.startGetMessagesInterval = function () {
            setInterval(function () {
                mesMod.getMessages();
            }, db.getMessagesInterval);
        };

        /**
         * Starts the interval for updating / switchin between the messages.
         * The timeout has been made so the user doesn't have to wait 10 seconds to see the first message.
         */
        this.startUpdateMessageInterval = function () {
            setTimeout(function () {
                mesCon.defineMessageToShow();
                mesView.addMessageToWidget(mesMod.messages[messageToShow]);
            }, 2500);
            setInterval(function () {
                mesCon.defineMessageToShow();
                mesView.addMessageToWidget(mesMod.messages[messageToShow]);
            }, db.switchMessageInterval);
        };

        /**
         * Defines the message id which needs to be shown.
         */
        this.defineMessageToShow = function () {
            var amountOfMessages = mesMod.messages.length;

            if (amountOfMessages > 1) {
                if (messageToShow < (amountOfMessages - 1)) {
                    messageToShow++;
                } else {
                    messageToShow = 1;
                }
            } else {
                messageToShow = 0;
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
            mesMod.removeMessage(messageToShow);
            mesCon.defineMessageToShow();
            mesView.addMessageToWidget(mesMod.messages[messageToShow]);
            event.preventDefault();
            event.stopPropagation();
        };

        this.postMessage = function () {
            if (!mesCon.checkIfMessageFieldGotAValue()) {
                mesMod.postMessage();
            }
        };

        /**
         * Checks if there is a message added.
         * @returns {boolean}
         */
        this.checkIfMessageFieldGotAValue = function() {
            var messageField, value;
            messageField = document.getElementById("createMessage");
            value = $.trim(messageField.value);
            return (value.length === 0);
        };
    };
}(Dashboard));