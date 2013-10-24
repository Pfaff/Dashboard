/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.OverlayView = function OverlayView() {
        var overlayView;
        overlayView = this;

        /**
         * Builds the overlay view.
         */
        this.buildOverlay = function () {
            var overlay;
            overlay = db.createElement("section", document.body, { id: "overlay" });
            overlay.onclick = function () { overlayView.removeOverlay(); };

            overlayView.createOverlayContainer();
        };

        /**
         * Removes the overlay.
         */
        this.removeOverlay = function () {
            document.body.removeChild(document.getElementById("overlay"));
        };

        this.createOverlayContainer = function () {
            db.createElement("section", document.getElementById("overlay"), { id: "containerOverlay" });
        };
    };
}(Dashboard));