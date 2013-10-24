/**
 * Runs once the document is loaded.
 * @author - Jeffrey Pfaff
 */
$(document).ready(function () {
    "use strict";
    var dashCon = new Dashboard.DashboardController();
    dashCon.main();
});
