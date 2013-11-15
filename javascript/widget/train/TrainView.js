/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.TrainView = function TrainView() {
        var tView;
        tView = this;

        this.main = function () {
            tView.createTrainSection();
        };

        /**
         * Creates a Train section in the desired container on the page.
         */
        this.createTrainSection = function () {
            var section = document.getElementById("containerRightSectionBottom");

            db.createElement("section", section, { id: "trainSection" });
        };
    };
}(Dashboard));