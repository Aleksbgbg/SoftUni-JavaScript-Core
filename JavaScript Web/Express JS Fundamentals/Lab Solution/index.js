const config = require("./config/config");
const database = require("./config/database-config");
const http = require("http");
const handlers = require("./handlers");

const environment = process.env.NODE_ENV || "development";

database(config[environment]);

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