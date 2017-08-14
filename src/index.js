var enigma = require("enigma.js");
var qixSchema = require("enigma.js/schemas/qix/12.20.0/schema.json");

var config = {
    schema: qixSchema,
    url: "wss://playground.qlik.com/app/"
};

var session = enigma.create(config);

session.open().then(function(global) {
    return global.openDoc("952656cf-a3f5-42bc-bdad-9d2478031747");
}).then(function(app) {
    console.log("Got an App instance", app);
});