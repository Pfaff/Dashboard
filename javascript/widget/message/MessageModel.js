/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MessageModel = function MessageModel() {
        var mesMod;
        mesMod = this;

        /**
         * The messages and employees array.
         * @type {Array}
         */
        mesMod.messages = [];
        mesMod.employees = [];

        /**
         * Main function of the message model, calls the desired functions.
         */
        this.main = function (functionToCall) {
            mesMod.getEmployeeInfo();
            setTimeout(function () { mesMod.getMessages(functionToCall); }, 2000);
        };

        /**
         * Gets the messages from the REST service.
         */
        this.getMessages = function (functionToCall) {
            $.ajax({
                url: db.url_Message,
                data: { method: db.method_MessageGet },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    mesMod.handleMessageData(data);

                    if (functionToCall) {
                        functionToCall();
                    }
                }
            });
        };

        /**
         * Handles the message data; filling the messages array with message objects.
         * @param data
         */
        this.handleMessageData = function (data) {
            var i;
            mesMod.messages = [];

            for (i = 0; i < data.length; i++) {
                mesMod.messages.push(new db.Message(data[i].message_id, data[i].message, data[i].employee, "images/employee/employee.png", data[i].start_date, data[i].end_date));
            }

            mesMod.addPhotoToMessageObject();
        };

        /**
         * Adds the photo's to the message objects.
         *
         * Message 0 is the default message; ('Click here to post a new message, bla bla'.)
         */
        this.addPhotoToMessageObject = function () {
            var x, i;

            mesMod.messages[0].photo = "images/employee/employee.png";

            for (x = 0; x < mesMod.messages.length; x++) {
                for (i = 0; i < mesMod.employees.length; i++) {
                    if (mesMod.messages[x].employee === mesMod.employees[i].displayname) {
                        mesMod.getGravatarByEmail(mesMod.employees[i].mail, x);
                    }
                }
            }
        };

        /**
         * Gets the employee information from the desired rest service.
         */
        this.getEmployeeInfo = function () {
            $.ajax({
                url: db.url_EmployeeInfo,
                data: { method: db.method_EmployeeInfo },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    mesMod.handleEmployeeData(data);
                }
            });
        };

        /**
         * Creates Employee objects from the given data, pushing it into the employees array.
         * @param data
         */
        this.handleEmployeeData = function (data) {
            var i;
            mesMod.employees = [];

            for (i = 0; i < data.count; i++) {
                mesMod.employees.push(new db.Employee(data[i].displayname[0], data[i].mail[0]));
            }
        };

        /**
         * Photo is being retrieved from gravatar by the given e-mail and added into the message object.
         * @param email
         * @param index
         */
        this.getGravatarByEmail = function (email, index) {
            $.ajax({
                url: db.url_Gravatar,
                data: { method: db.method_Gravatar,
                        email: email },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    mesMod.messages[index].photo = "http://www.gravatar.com/avatar/" + data;
                }
            });
        };

        /**
         * Removes the selected message, using the given id to get the id of the message in the database.
         * @param id
         */
        this.removeMessage = function (id) {
            $.ajax({
                url: db.url_Message,
                data: { method: db.method_MessageRemove,
                        id: mesMod.messages[id].id },
                type: "GET",
                dataType: "json",
                success: function () {
                    mesMod.removeRemovedMessageFromMessagesArray(document.getElementById("messageText").firstChild.data);
                }
            });
        };

        /**
         * Removes the removed message from the messages array to prevent it being shown again on the dashboard.
         * @param message
         */
        this.removeRemovedMessageFromMessagesArray = function (message) {
            var i;

            for (i = 1; i < mesMod.messages.length; i++) {
                if (mesMod.messages[i].message === message) {
                    mesMod.messages.splice(i, 1);
                }
            }
        };

        /**
         * Function to post the message, first collecting the required data for the insert statement, then sending it.
         */
        this.postMessage = function (functionToCallOnComplete) {
            var name, dateFrom, dateTill, message, functionToCall;

            name = mesMod.getSelectedValue(document.getElementById("messagePostSelectName"));
            dateFrom = mesMod.orderDataToSendToBackEnd("selectDateFrom");
            dateTill = mesMod.orderDataToSendToBackEnd("selectDateTill");
            message = document.getElementById("createMessage").value;

            $.ajax({
                url: db.url_Message,
                data: { method: db.method_MessagePost,
                        name: name,
                        dateFrom : dateFrom,
                        dateTill : dateTill,
                        message : message },
                type: "GET",
                dataType: "json"
            });

            document.getElementById("overlay").onclick();
        };

        /**
         * Returns the option value of the given select box.
         * @param select
         * @returns {*}
         */
        this.getSelectedValue = function (select) {
            return select.options[select.selectedIndex].text;
        };

        /**
         * Makes a string from the added date in the several select boxes for the back-end.
         * @param id
         * @returns {string}
         */
        this.orderDataToSendToBackEnd = function (id) {
            var year, month, day;
            year = mesMod.getSelectedValue(document.getElementById(id + "2"));
            month = mesMod.getMonthNumber(mesMod.getSelectedValue(document.getElementById(id + "1")));
            day = mesMod.getSelectedValue(document.getElementById(id + "0"));

            return year + "-" + month + "-" + day;
        };

        /**
         * Returns the number of the given month.
         * @param month
         * @returns {number}
         */
        this.getMonthNumber = function (month) {
            var i, months;
            months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];

            for (i = 0; i < months.length; i++) {
                if (months[i] === month) {
                    return (i + 1);
                }
            }

            return 1;
        };
    };
}(Dashboard));