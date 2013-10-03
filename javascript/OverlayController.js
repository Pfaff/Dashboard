/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function OverlayController() {

    /**
     * Builds or removes the overlay on the page.
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