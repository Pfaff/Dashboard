/**
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.AgendaView = function AgendaView() {
        var aView;
        aView = this;

        this.main = function () {
            aView.createAgendaSection();
        };

        /**
         * Creates a Agenda section in the desired container on the page.
         */
        this.createAgendaSection = function () {
            var section = document.getElementById("containerMiddleSectionTop");

            db.createElement("section", section, { id: "agendaSection" });
        };
    };
}(Dashboard));