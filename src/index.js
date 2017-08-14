// Dependencies
var enigma = require("enigma.js");
var qixSchema = require("enigma.js/schemas/12.20.0.json");

// Definitions
var regionListDef = require("./defs/region-listobject.json");
var stateListDef = require("./defs/state-listobject.json");

// Functions
var renderFilter = require("./render-filter.js");

var config = {
    schema: qixSchema,
    url: "wss://playground.qlik.com/app/"
};

var session = enigma.create(config);

// A promise for an App instance
var appPr = session.open().then(function(global) {
    return global.openDoc("952656cf-a3f5-42bc-bdad-9d2478031747");
});

// Create the Region listbox with the App instance
appPr.then(function(app) {
    return app.createSessionObject(regionListDef);
})
.then(function(regionLB) {

    var regionList = document.querySelector("#region");

    regionLB.getLayout().then(function(layout) {
        renderFilter(regionList,layout, regionLB);
    });

    regionLB.on("changed", function() {
        regionLB.getLayout().then(function(layout) {
            renderFilter(regionList, layout, regionLB);
        });
    });
});

// Create the State listbox with the App instance
appPr.then(function(app) {
    return app.createSessionObject(stateListDef);
})
.then(function(stateLB) {

    var stateList = document.querySelector("#state");

    stateLB.getLayout().then(function(layout) {
        renderFilter(stateList,layout, stateLB);
    });

    stateLB.on("changed", function() {
        stateLB.getLayout().then(function(layout) {
            renderFilter(stateList, layout, stateLB);
        });
    });
});