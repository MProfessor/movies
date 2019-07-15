const auth = require("../api/auth");

function token(response) {
    response.end(auth.token);
};

function info(response) {
    response.end(auth.info);
}
exports.token = token;
exports.info = info;