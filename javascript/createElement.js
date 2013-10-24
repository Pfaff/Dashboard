/**
 * Dynamic function to create an element.
 * @param elementName
 * @param parent
 * @param properties
 * @returns {HTMLElement}
 */
(function (db) {
    "use strict";
    db.createElement = function createElement(elementName, parent, properties) {
        var element, property;
        element = document.createElement(elementName);
        parent.appendChild(element);

        if (properties) {
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    element[property] = properties[property];
                }
            }
        }
        return element;
    };
}(Dashboard));