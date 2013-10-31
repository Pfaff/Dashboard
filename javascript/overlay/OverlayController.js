/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.OverlayController = function OverlayController() {
        var overlayView;
        overlayView = new db.OverlayView();

        this.buildOverlay = function () {
            overlayView.buildOverlay();
        };
    };
}(Dashboard));