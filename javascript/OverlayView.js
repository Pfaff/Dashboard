/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function OverlayView() {
    "use strict";
    var overlayView;
    overlayView = this;

    /**
     * Builds the overlay view.
     */
    this.buildOverlay = function () {
        var overlay = createElement("section", document.body, { id: "overlay" });
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
        createElement("section", document.getElementById("overlay"), { id: "containerOverlay" });
    };
}