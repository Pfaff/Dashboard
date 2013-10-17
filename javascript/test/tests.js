
test("Testing a function in UserAmount.", function () {
    "use strict";
    var value, userAmount;
    userAmount = new UserAmount("SOM", "17-10-2013 03:04", 500);
    value = userAmount.testFunction(1);
    equal(value, true, "Expecting true.");
});