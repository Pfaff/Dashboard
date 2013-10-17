/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function DashboardView() {
    "use strict";
    var dashView;
    dashView = this;

    /**
     * Builds the view of the dashboard.
     */
    this.main = function () {
        dashView.createDashboardContainers();
        dashView.createLeftContainerSections();
    };

    /**
     * Creates the containers for the dashboard.
     */
    this.createDashboardContainers = function () {
        var container, att;
        container = document.getElementById("container");

        att = [];
        att.name = "container";

        createElement("section", container, { id: att.name + "Left", className: att.name });
        createElement("section", container, { id: att.name + "Middle", className: att.name });
        createElement("section", container, { id: att.name + "Right", className: att.name });
    };

    /**
     * Creates the sections in the left container.
     */
    this.createLeftContainerSections = function () {
        var containerLeft = document.getElementById("containerLeft");

        createElement("section", containerLeft, { id: "containerLeftSectionTop", className: "containerLeftSection" });
        createElement("section", containerLeft, { id: "containerLeftSectionBottom", className: "containerLeftSection" });
    };
}