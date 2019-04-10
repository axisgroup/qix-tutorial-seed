// Dependencies
var enigma = require("enigma.js");
var qixSchema = require("enigma.js/schemas/12.20.0.json");

// Definitions
var regionListDef = require("./defs/region-listobject.json");
var stateListDef = require("./defs/state-listobject.json");

// Functions
var renderFilter = require("./render-filter.js");

var appId = "43235e8d-415e-4931-9718-e5e3994dfe28";

var config = {
  schema: qixSchema,
  url: "wss://sense.axisgroup.com/app/" + appId,
  createSocket: url => new WebSocket(url)
};

var session = enigma.create(config);

// A promise for an App instance
var appPr = session.open().then(function(global) {
  return global.openDoc(appId);
});

// Create the Region listbox with the App instance
appPr
  .then(function(app) {
    return app.createSessionObject(regionListDef);
  })
  .then(function(regionLB) {
    var regionList = document.querySelector("#region");

    regionLB.getLayout().then(function(layout) {
      renderFilter(regionList, layout, regionLB);
    });

    regionLB.on("changed", function() {
      regionLB.getLayout().then(function(layout) {
        renderFilter(regionList, layout, regionLB);
      });
    });
  });

// Create the State listbox with the App instance
appPr
  .then(function(app) {
    return app.createSessionObject(stateListDef);
  })
  .then(function(stateLB) {
    var stateList = document.querySelector("#state");

    stateLB.getLayout().then(function(layout) {
      renderFilter(stateList, layout, stateLB);
    });

    stateLB.on("changed", function() {
      stateLB.getLayout().then(function(layout) {
        renderFilter(stateList, layout, stateLB);
      });
    });
  });
