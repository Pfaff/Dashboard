function User(amount, datetime) {
    this.attribute = [];
    this.attribute["amount"] = amount;
    this.attribute["datetime"] = datetime;

    this.getValue = function(value) { return this.attribute[value]; };
    this.setValue = function(attribute, newValue) { this.attribute[attribute] = newValue; };
}