/**
 * Runs once the document is loaded.
 */
$(document).ready(function() {
    var dashCon = new DashboardController();
    dashCon.main();
});

/**
 * Dynamic function to create an element.
 * @param elementName
 * @param parent
 * @param properties
 * @returns {HTMLElement}
 */
function createElement (elementName, parent, properties) {
    var element = document.createElement(elementName);
    parent.appendChild(element);

    if (properties) {
        for (var property in properties) {
            if (properties.hasOwnProperty(property)) {
                if(property === "id" || property === "className" || property === "alt" || property === "src") {
                    element[property] = properties[property];
                } else {
                    element.style[property] = properties[property];
                }
            }
        }
    }
    return element;
}