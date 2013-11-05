/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MessageModel = function MessageModel() {
        var mesMod;
        mesMod = this;

        mesMod.messages = [];
        mesMod.employees = [];

        /**
         * Main function of the message model, calls the desired functions.
         */
        this.main = function () {
            mesMod.getEmployeeInfo();
            mesMod.getMessages();
        };

        /**
         * Gets the messages from the REST service.
         */
        this.getMessages = function () {
            $.ajax({
                url: db.url_Message,
                data: { method: db.method_Message },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    mesMod.handleMessageData(data);
                }
            });
        };

        /**
         * Handles the message data; filling the messages array with message objects.
         * @param data
         */
        this.handleMessageData = function (data) {
            var i;

            for (i = 0; i < data.length; i++) {
                mesMod.messages.push(new db.Message(data[i].message_id, data[i].message, data[i].employee, 0, data[i].start_date, data[i].end_date));
            }

            mesMod.addPhotoToMessageObject();
        };

        /**
         * Adds the photo's to the message objects.
         *
         * Message 0 is the default message; ('Click here to post a new message, bla bla'.)
         */
        this.addPhotoToMessageObject = function () {
            var x, i, photoCode;

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

            for (i = 0; i < data.count; i++) {
                mesMod.employees.push(new db.Employee(data[i].displayname[0], data[i].mail[0]));
            }
        };

        // http://www.gravatar.com/avatar/
        this.getGravatarByEmail = function (email, index) {
            $.ajax({
                url: db.url_Gravatar,
                data: { method: db.method_Gravatar,
                        email: email },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    mesMod.messages[index].photo = "http://www.gravatar.com/avatar/" + data;
                    console.log(mesMod.messages);
                }
            });
        };
    };
}(Dashboard));