const database = require("../config/database");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const url = require("url");

module.exports = function(request, response) {
    if (!request.pathname) {
        request.pathname = url.parse(request.url).pathname;
    }

    if (request.pathname === "/product/add" && request.method === "GET") {
        const filepath = path.normalize(path.join(__dirname, "../views/products/add.html"));

        fs.readFile(filepath, function(error, data) {
            if (error) {
                response.writeHead(404, {
                    "content-type": "text/plain"
                });
                response.write("Resource not found.");
                response.end();

                return;
            }

            response.writeHead(200, {
                "content-type": "text/html"
            });
            response.write(data);
            response.end();
        });

        return true;
    } else if (request.pathname === "/product/add" && request.method === "POST") {
        let dataStream = "";

        request.on("data", data => dataStream += data);

        request.on("end", function() {
            const product = querystring.parse(dataStream);

            database.products.add(product);

            response.writeHead(302, {
                location: "/"
            });
            response.end();
        });
    }

    return false;
};