var enigma = require("enigma.js");
var qixSchema = require("enigma.js/schemas/12.20.0.json");

var appId = "43235e8d-415e-4931-9718-e5e3994dfe28";

var config = {
  schema: qixSchema,
  url: "wss://sense.axisgroup.com/app/" + appId,
  createSocket: url => new WebSocket(url)
};

var session = enigma.create(config);

session
  .open()
  .then(function(global) {
    return global.openDoc(appId);
  })
  .then(function(app) {
    console.log("Got an App instance", app);
  });
