const http = require("http");
const handlers = require("./handlers");

const port = 3000;

http
    .createServer(function(request, response) {
        for (const handler of handlers) {
            if (!handler(request, response)) {
                break;
            }
        }
    })
    .listen(port);