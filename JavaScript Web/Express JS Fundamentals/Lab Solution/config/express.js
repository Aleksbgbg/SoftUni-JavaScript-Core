const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

module.exports = function(app, config) {
    app.set("view engine", "pug");
    app.set("views", path.join(config.rootPath, "views"));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app
        .use(function(request, response, next) {
                if (request.url.startsWith("/content")) {
                    request.url = request.url.replace("/content", "");
                }

                next();
            },
            express.static(path.normalize(path.join(config.rootPath, "content")))
        );
};