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
        var att = [];
        att.name = "container";
        att.width = "400px";
        att.height = "800px";
        att.display = "inline-block";

        att.border = "1px solid black";


        createElement("article", document.body, { id: att.name + "Left", className: att.name, width: att.width, height: att.height, border: att.border, display: att.display });
        createElement("article", document.body, { id: att.name + "Middle", className: att.name, width: att.width, height: att.height, border: att.border, display: att.display });
        createElement("article", document.body, { id: att.name + "Right", className: att.name, width: att.width, height: att.height, border: att.border, display: att.display });
    };
}