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

        this.main = function () {
            dtView.main();
            dtCon.updateCurrentDateTimeInWidget();
            dtCon.startTimeUpdateInterval();
        };

        this.updateCurrentDateTimeInWidget = function () {
            dtView.updateDate(dtMod.returnCurrentDay(), dtMod.returnCurrentDayNumber(), dtMod.returnCurrentMonth());
            dtView.updateTime(dtMod.returnCurrentTime());
        };

        this.startTimeUpdateInterval = function () {
            setInterval(function () {
                dtCon.updateCurrentDateTimeInWidget();
            }, 60000);
        };
    };
}(Dashboard));