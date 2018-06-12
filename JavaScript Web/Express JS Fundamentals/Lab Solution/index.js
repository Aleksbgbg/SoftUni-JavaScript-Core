const config = require("./config/config");
const database = require("./config/database-config");
const express = require("express");

const environment = process.env.NODE_ENV || "development";

database(config[environment]);

const port = 3000;
const app = express();

require("./config/express")(app, config[environment]);
require("./config/routes")(app);

app.listen(port);

// http
//     .createServer(function(request, response) {
//         for (const handler of handlers) {
//             if (!handler(request, response)) {
//                 break;
//             }
//         }
//     })
//     .listen(port);