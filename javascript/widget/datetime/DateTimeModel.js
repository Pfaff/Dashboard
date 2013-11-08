/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.DateTimeModel = function DateTimeModel() {
        var dtMod, days, months;
        dtMod = this;

        /**
         * Arrays with the months and the days. (Dutch)
         * @type {Array}
         */
        days = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
        months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

        /**
         * Returns the current day.
         * @returns {*}
         */
        this.returnCurrentDay = function () {
            var date;
            date = new Date();

            return days[date.getDay()];
        };

        /**
         * Returns the current number of the day in the month.
         * @returns {number}
         */
        this.returnCurrentDayNumber = function () {
            var date;
            date = new Date();

            return date.getDate();
        };

        /**
         * Returns the current month.
         * @returns {*}
         */
        this.returnCurrentMonth = function () {
            var date;
            date = new Date();

            return months[date.getMonth()];
        };

        /**
         * Returns the current time.
         * @returns {string}
         */
        this.returnCurrentTime = function () {
            var date, hours, minutes;
            date = new Date();

            hours = dtMod.addZeroIfBelowTen(date.getHours());
            minutes = dtMod.addZeroIfBelowTen(date.getMinutes());

            return hours + ":" + minutes;
        };

        /**
         * Adds a zero in front of given numbers which are below 10.
         * @param value
         * @returns {*}
         */
        this.addZeroIfBelowTen = function (value) {
            if (value < 10) {
                value = "0" + value;
            }

            return value;
        };
    };
}(Dashboard));