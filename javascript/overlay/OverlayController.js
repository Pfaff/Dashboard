/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.OverlayController = function OverlayController() {

        /**
         * Builds or removes the overlay on the page.
         */
        this.main = function (trueForBuildFalseForRemove) {
            var overlayView;
            overlayView = new db.OverlayView();

            if (trueForBuildFalseForRemove) {
                overlayView.buildOverlay();
            } else {
                overlayView.removeOverlay();
            }
        };
    };
}(Dashboard));