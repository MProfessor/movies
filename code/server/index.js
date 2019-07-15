var server = require("./server/server");
var route = require("./route/route");
var requestHandlers = require("./requestHandlers/requestHandler");

var handle = {};

handle["/auth/token"] = requestHandlers.token;
handle["/auth/info"] = requestHandlers.info;

server.open(route.route, handle);