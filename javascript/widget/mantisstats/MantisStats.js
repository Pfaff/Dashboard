/**
 * The Mantis Stats object.
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.MantisStats = function MantisStats(version, issuesOpen, issuesClosed, issuesResolved, releaseDate) {
        this.version = version;
        this.issuesOpen = issuesOpen;
        this.issuesClosed = issuesClosed;
        this.issuesResolved = issuesResolved;
        this.releaseDate = releaseDate;
    };
}(Dashboard));