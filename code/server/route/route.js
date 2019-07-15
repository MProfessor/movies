var status = require("../server/statusCode").statusCode;

function route(pathName, response, handle) {
    if (handle[pathName] && typeof (handle[pathName]) === "function") {
        response.writeHead(status.success_code, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:9527",
            'Access-Control-Allow-Headers': 'token'
        });
        handle[pathName](response);
    } else {
        response.writeHead(status.not_found, {
            "Content-Type": "text/plain"
        });
        response.write("404 Not found");
        response.end();
    }
};
exports.route = route;