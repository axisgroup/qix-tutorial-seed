// Dependencies
var enigma = require("enigma.js");
var qixSchema = require("enigma.js/schemas/12.20.0.json");
var c3 = require("c3");
var format = require("d3-format").format;

// Definitions
var regionListDef = require("./defs/region-listobject.json");
var stateListDef = require("./defs/state-listobject.json");
var chartDef = require("./defs/chart-cube.json");

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
})

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

// Create the chart hypercube with the App instance
appPr.then(function(app) {
    return app.createSessionObject(chartDef);
})
.then(function(chartObj) {

    chartObj.getLayout().then(function(layout) {
        renderChart(layout);
    });

    chartObj.on("changed", function() {
        chartObj.getLayout().then(function(layout) {
            renderChart(layout);
        });
    });

});

function renderChart(layout) {
    var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
    var dimValues = qMatrix.map(function(r) {
        return r[0].qText;
    });
    var measureValues = qMatrix.map(function(r) {
        return r[1].qNum;
    });

    c3.generate({
        bindTo: "#chart",
        data: {
            x: "x",
            columns: [
                ['x'].concat(dimValues),
                ['Avg Price'].concat(measureValues)
            ]
        },
        axis: {
            x: {
                type: 'category'
            },
            y: {
                tick: {
                    format: format('$,')
                }
            }
        }
    });
}