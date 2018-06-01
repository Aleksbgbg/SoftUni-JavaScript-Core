const categoryModel = require("../models/category");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");

module.exports = function(request, response) {
    if (!request.pathname) {
        request.pathname = url.parse(request.parse).pathname;
    }

    if (request.pathname === "/category/add" && request.method === "GET") {
        fs.readFile("./views/category/category.html", function(error, data) {
            if (error) {
                console.log(error);
                return;
            }

            response.writeHead(200, {
                "content-type": "text/html"
            });
            response.write(data);
            response.end();
        });

        return false;
    }

    if (request.pathname === "/category/add" && request.method === "POST") {
        let queryData = "";

        request.on("data", data => queryData += data);
        request.on("end", function() {
            categoryModel.create(querystring.parse(queryData)).then(function() {
                response.writeHead(302, {
                    location: "/"
                });
                response.end();
            });
        });

        return false;
    }

    return true;
};