/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MessageModel = function MessageModel() {
        var mesMod;
        mesMod = this;

        this.main = function () {
            mesMod.getEmployeeInfo();
        };

        this.getEmployeeInfo = function () {
            $.ajax({
                url: "",
                data: { method: "main" },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                }
            });
        };
    };
}(Dashboard));