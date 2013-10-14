function UserAmount(project, datetime, amount) {
    this.attribute = [];
    this.attribute["project"] = project;
    this.attribute["datetime"] = datetime;
    this.attribute["amount"] = amount;


    this.getValue = function(value) { return this.attribute[value]; };
    this.setValue = function(attribute, newValue) { this.attribute[attribute] = newValue; };
}