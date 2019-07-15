var http = require("http");
var url = require("url");
var hostName = "127.0.0.1";
var port = 8080;

function open(route, handle) {
    function onRequest(request, response) {
        let pathName = url.parse(request.url).pathname;
        route(pathName, response, handle);
    }
    var server = http.createServer(onRequest);
    server.listen(port, hostName);
};
exports.open = open;