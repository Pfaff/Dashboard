
test("calculateSum tests. ", function () {
    "use strict";
    var piModel, numbers, result;
    piModel = new ProjectInfoModel();

    numbers = [1, 1, 1, 1, 1];
    result = piModel.calculateSum(numbers);
    equal(result, 5, "Expecting result to equal 5.");

    numbers = [10, 25, 5, 35, 65];
    result = piModel.calculateSum(numbers);
    equal(result, 140, "Expecting result to equal 140.");

    numbers = [-5, 5, -100, 50, 50];
    result = piModel.calculateSum(numbers);
    equal(result, 0, "Expecting result to equal 0.");
});