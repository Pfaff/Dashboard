var db = Dashboard;

test("db.createElement tests. ", function () {
    "use strict";
    var element, properties, result;

    properties = { id: "testSectionId" };
    element = db.createElement("section", document.body, properties);
    equal(element.id, "testSectionId", "Expecting an element with id 'testSectionId'.");

    properties = { className: "testSectionClass" };
    element = db.createElement("section", document.body, properties);
    equal(element.className, "testSectionClass", "Expecting an element with class 'testSectionClass'.");

    properties = { id: "testSectionId", className: "testSectionClass" };
    element = db.createElement("section", document.body, properties);
    result = (element.id === "testSectionId" && element.className === "testSectionClass");
    equal(result, true, "Expecting an element with id 'testSectionId and class 'testSectionClass'.");

    properties = { width: "100px", height: "100px" };
    element = db.createElement("rect", document.body, properties);
    result = (element.width === "100px" && element.height === "100px");
    equal(result, true, "Expecting an element with a height and width of 100px.");
});

test("calculateSum tests. ", function () {
    "use strict";
    var piModel, numbers, result;
    piModel = new db.ProjectInfoModel();

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
    overlayView = new db.OverlayView();

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

    db.createElement("section", document.body, { id: "container" });

    dashboardView = new db.DashboardView();
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

test("ProjectInfoView tests. ", function () {
    "use strict";
    var piView, element, i;

    db.createElement("section", document.body, { id: "containerLeftSectionTop" });

    piView = new db.ProjectInfoView();

    piView.createProjectInfoArticles();
    for (i = 0; i < 5; i++) {
        element = document.getElementById("piArticle" + i);
        equal(element.id, "piArticle" + i, "Expecting an element with id 'piArticle" + i + "'.");
    }

    piView.createProjectInfoContentArticles();
    for (i = 0; i < 5; i++) {
        element = document.getElementById("piContentArticle" + i);
        equal(element.id, "piContentArticle" + i, "Expecting an element with id 'piContentArticle" + i + "'.");
    }

    piView.createProjectInfoContent();
    for (i = 1; i < 5; i++) {
        element = document.getElementById("piContent" + i);
        equal(element.id, "piContent" + i, "Expecting an element with id 'piContent" + i + "'.");
    }

    piView.createProjectInfoTitlesArticles();
    for (i = 0; i < 5; i++) {
        element = document.getElementById("piTitleArticle" + i);
        equal(element.id, "piTitleArticle" + i, "Expecting an element with id 'piTitleArticle" + i + "'.");
    }

    piView.clearParagraphs();
    for (i = 1; i < 5; i++) {
        element = document.getElementById("piContent" + i);
        equal(element.firstChild.data, " ", "Expecting element 'piContent" + i + "' to have an empty value.");
    }
});