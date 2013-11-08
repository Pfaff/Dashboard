/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStatsModel = function MantisStatsModel() {
        var msMod;
        msMod = this;

        this.main = function () {
            //msMod.getMantisStats();
        };

        this.getMantisStats = function () {
            $.ajax({
                url: 'TODO:URL',
                data: { method: 'TODO:METHOD' },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                }
            });
        };
    };
}(Dashboard));