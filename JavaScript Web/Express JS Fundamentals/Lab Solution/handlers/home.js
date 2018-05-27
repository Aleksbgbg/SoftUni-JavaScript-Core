const database = require("../config/database");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const url = require("url");

module.exports = function(request, response) {
    if (!request.pathname) {
        request.pathname = url.parse(request.url).pathname;
    }

    if (request.pathname === "/" && request.method === "GET") {
        const filepath = path.normalize(path.join(__dirname, "../views/home/index.html"));

        fs.readFile(filepath, function(error, data) {
            if (error) {
                console.log(`Error: ${error}`);

                response.writeHead(404, {
                    "content-type": "text/plain"
                });

                response.write("404 not found!");
                response.end();
                return;
            }

            response.writeHead(200, {
                "content-type": "text/html"
            });

            const queryData = querystring.parse(url.parse(request.url).query);

            let products = database.products.getAll();

            if (queryData.query) {
                products = products.filter(product => product.name.localeCompare(queryData.query) === 0);
            }

            response.write(data.toString().replace("{content}",
                products
                    .map(product => `
                <div class="product-card">
                    <img class="product-img" src="${product.image}"/>
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                </div>`)
                    .join()));

            response.end();
        });

        return false;
    }

    return true;
};