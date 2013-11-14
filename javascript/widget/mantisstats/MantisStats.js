/**
 * The Mantis Stats object.
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStats = function MantisStats(version, issuesOpen, issuesClosed, releaseDate) {
        this.version = version;
        this.issuesOpen = issuesOpen;
        this.issuesClosed = issuesClosed;
        this.releaseDate = releaseDate;
    };
}(Dashboard));