/**
 * The News object.
 * @author - Jeffrey Pfaff
 */
(function (db) {
    "use strict";
    db.News = function News(site, category, title, link, photo) {
        this.site = site;
        this.category = category;
        this.title = title;
        this.link = link;
        this.photo = photo;
    };
}(Dashboard));