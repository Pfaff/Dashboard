/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.DashboardView = function DashboardView() {
        var dashView;
        dashView = this;

        /**
         * Builds the view of the dashboard.
         */
        this.main = function () {
            dashView.createDashboardContainers();
            dashView.createLeftContainerSections();
            dashView.createMiddleContainerSections();
        };

        /**
         * Creates the containers for the dashboard.
         */
        this.createDashboardContainers = function () {
            var container, att;
            container = document.getElementById("container");

            att = [];
            att.name = "container";

            db.createElement("section", container, { id: att.name + "Left", className: att.name });
            db.createElement("section", container, { id: att.name + "Middle", className: att.name });
            db.createElement("section", container, { id: att.name + "Right", className: att.name });
        };

        /**
         * Creates the sections in the left container.
         */
        this.createLeftContainerSections = function () {
            var containerLeft = document.getElementById("containerLeft");

            db.createElement("section", containerLeft, { id: "containerLeftSectionTop", className: "containerSection" });
            db.createElement("section", containerLeft, { id: "containerLeftSectionBottom", className: "containerSection" });
        };

        /**
         * Creates the sections in the middle container.
         */
        this.createMiddleContainerSections = function () {
            var containerMiddle = document.getElementById("containerMiddle");

            db.createElement("section", containerMiddle, { id: "containerMiddleSectionTop", className: "containerSection" });
            db.createElement("section", containerMiddle, { id: "containerMiddleSectionMiddle", className: "containerSection" });
            db.createElement("section", containerMiddle, { id: "containerMiddleSectionBottom", className: "containerSection" });
        };
    };
}(Dashboard));