/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.DateTimeModel = function DateTimeModel() {
        var dtMod, days, months;
        dtMod = this;

        days = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
        months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

        this.returnCurrentDay = function () {
            var date;
            date = new Date();

            return days[date.getDay()];
        };

        this.returnCurrentDayNumber = function () {
            var date;
            date = new Date();

            return date.getDate();
        };

        this.returnCurrentMonth = function () {
            var date;
            date = new Date();

            return months[date.getMonth()];
        };

        this.returnCurrentTime = function () {
            var date, hours, minutes;
            date = new Date();

            hours = dtMod.addZeroIfBelowTen(date.getHours());
            minutes = dtMod.addZeroIfBelowTen(date.getMinutes());

            return hours + ":" + minutes;
        };

        this.addZeroIfBelowTen = function (value) {
            if (value < 10) {
                value = "0" + value;
            }

            return value;
        };
    };
}(Dashboard));