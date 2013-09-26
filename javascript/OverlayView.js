/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function OverlayView() {
    var overlayView = this;

    /**
     * Builds the overlay view.
     */
    this.buildOverlay = function() {
        var overlay = createElement("section", document.body, { id: "overlay" });
        overlay.onclick = function() { overlayView.removeOverlay(); };
    };

    /**
     * Removes the overlay.
     */
    this.removeOverlay = function() {
        document.body.removeChild(document.getElementById("overlay"));
    };
}