/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MessageModel = function MessageModel() {
        var mesMod;
        mesMod = this;

        mesMod.employees = [];

        /**
         * Main function of the message model, calls the desired functions.
         */
        this.main = function () {
            mesMod.getEmployeeInfo();
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
        this.getGravatarByEmail = function (email) {
            $.ajax({
                url: db.url_Gravatar,
                data: { method: db.method_Gravatar,
                        email: email },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    mesMod.handleEmployeeData(data);
                }
            });
        };
    };
}(Dashboard));