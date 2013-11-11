/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.DateTimeController = function DateTimeController() {
        var dtCon, dtView, dtMod;
        dtCon = this;
        dtView = new db.DateTimeView();
        dtMod = new db.DateTimeModel();

        /**
         * Starts the functions required to make the date time widget function.
         */
        this.main = function () {
            dtView.main();
            dtCon.updateCurrentDateTimeInWidget();
            dtCon.startTimeUpdateInterval();
        };

        /**
         * Function which updates the date time widget with the current date and time.
         */
        this.updateCurrentDateTimeInWidget = function () {
            dtView.updateDate(dtMod.returnCurrentDay(), dtMod.returnCurrentDayNumber(), dtMod.returnCurrentMonth());
            dtView.updateTime(dtMod.returnCurrentTime());
        };

        /**
         * Starts the interval for the date time widget which updates the time.
         */
        this.startTimeUpdateInterval = function () {
            setInterval(function () {
                dtCon.updateCurrentDateTimeInWidget();
            }, 5000);
        };
    };
}(Dashboard));