test("createElement tests. ", function () {
    "use strict";
    var element, properties, result;

    properties = { id: "testSectionId" };
    element = createElement("section", document.body, properties);
    equal(element.id, "testSectionId", "Expecting an element with id 'testSectionId'.");

    properties = { className: "testSectionClass" };
    element = createElement("section", document.body, properties);
    equal(element.className, "testSectionClass", "Expecting an element with class 'testSectionClass'.");

    properties = { id: "testSectionId", className: "testSectionClass" };
    element = createElement("section", document.body, properties);
    result = (element.id === "testSectionId" && element.className === "testSectionClass");
    equal(result, true, "Expecting an element with id 'testSectionId and class 'testSectionClass'.");

    properties = { width: "100px", height: "100px" };
    element = createElement("rect", document.body, properties);
    result = (element.width === "100px" && element.height === "100px");
    equal(result, true, "Expecting an element with a height and width of 100px.");
});

test("calculateSum tests. ", function () {
    "use strict";
    var piModel, numbers, result;
    piModel = new ProjectInfoModel();

    numbers = [1, 1, 1, 1, 1];
    result = piModel.calculateSum(numbers);
    equal(result, 5, "Expecting result to equal 5.");

    numbers = [-10, -25, -5, -35, -65];
    result = piModel.calculateSum(numbers);
    equal(result, -140, "Expecting result to equal -140.");

    numbers = [-5, 5, -100, 50, 50];
    result = piModel.calculateSum(numbers);
    equal(result, 0, "Expecting result to equal 0.");
});

test("OverlayView tests. ", function () {
    "use strict";
    var overlayView, overlay;
    overlayView = new OverlayView();

    overlayView.buildOverlay();
    overlay = document.getElementById("overlay");
    equal(overlay.id, "overlay", "Expecting an element with id 'overlay'.");

    overlayView.removeOverlay();
    overlay = document.getElementById("overlay");
    equal(overlay, undefined, "Expecting no element with id 'overlay'.");
});

test("DashboardView tests. ", function () {
    "use strict";
    var dashboardView, container;

    createElement("section", document.body, { id: "container" });

    dashboardView = new DashboardView();
    dashboardView.main();

    container = document.getElementById("containerLeft");
    equal(container.id, "containerLeft", "Expecting an element with id 'containerLeft'.");

    container = document.getElementById("containerMiddle");
    equal(container.id, "containerMiddle", "Expecting an element with id 'containerMiddle'.");

    container = document.getElementById("containerRight");
    equal(container.id, "containerRight", "Expecting an element with id 'containerRight'.");

    container = document.getElementById("containerLeftSectionTop");
    equal(container.id, "containerLeftSectionTop", "Expecting an element with id 'containerLeftSectionTop'.");

    container = document.getElementById("containerLeftSectionBottom");
    equal(container.id, "containerLeftSectionBottom", "Expecting an element with id 'containerLeftSectionBottom'.");
});