const http = require("http");
const url = require("url");

const port = 3000;

const handlers = require("./handlers");

http
    .createServer(function(request, response) {
        const pathname = url.parse(request.url).pathname;

        const handler = (function() {
            for (const handler of handlers.handlers) {
                if (handler.canHandle(pathname, request)) {
                    return handler;
                }
            }
        })();

        if (handler) {
            handler.handle(request, response);
            return;
        }

        handlers.functions.handle404(request, response);
    })
    .listen(port);