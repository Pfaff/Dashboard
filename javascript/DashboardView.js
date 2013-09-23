/**
 * @author - Jeffrey Pfaff
 * @constructor
 */
function DashboardView() {
    var dashView = this;

    this.main = function() {
        dashView.createContainers();
    };

    this.createContainers = function() {
        var container = document.getElementById("container");

        var att = [];
        att.name = "container";

        createElement("article", container, { id: att.name + "Left", className: att.name });
        createElement("article", container, { id: att.name + "Middle", className: att.name });
        createElement("article", container, { id: att.name + "Right", className: att.name });
    };
}