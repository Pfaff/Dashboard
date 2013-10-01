function ProjectInfo(version, users, uptime, requestMin, serversOnline) {
    this.version = version;
    this.users = users;
    this.uptime = uptime;
    this.requestMin = requestMin;
    this.serversOnline = serversOnline;

    this.getVersion = function() {
        return this.version;
    };

    this.getUsers = function() {
        return this.users;
    };

    this.getUptime = function() {
        return this.uptime;
    };

    this.getRequestMin = function() {
        return this.requestMin;
    };

    this.getServersOnline = function() {
        return this.serversOnline;
    };

    this.setVersion = function(version) {
        this.version = version;
    };

    this.setUsers = function(users) {
        this.users = users;
    };

    this.setUptime = function(uptime) {
        this.uptime = uptime;
    };

    this.setRequestMin = function(requestMin) {
        this.requestMin = requestMin;
    };

    this.setServersOnline = function(serversOnline) {
        this.serversOnline = serversOnline;
    };
}