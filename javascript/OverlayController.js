/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function OverlayController() {

    /**
     * Builds the overlay.
     */
    this.main = function(trueForBuildFalseForRemove) {
        var overlayView = new OverlayView();

        if(trueForBuildFalseForRemove) {
            overlayView.buildOverlay();
        } else {
            overlayView.removeOverlay();
        }
    };
}