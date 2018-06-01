const categoryModel = require("../models/category");
const fs = require("fs");
const multiparty = require("multiparty");
const path = require("path");
const productModel = require("../models/product");
const querystring = require("querystring");
const shortid = require("shortid");
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

            categoryModel.find().then(function(categories) {
               let replacement = "<select class='input-field' name='category'>";

               for (const category of categories) {
                   replacement += `<option value="${category._id}">${category.name}</option>`;
               }
               replacement += "</select>";

               response.writeHead(200, {
                   "content-type": "text/html"
               });
               response.write(data.toString().replace("{categories}", replacement));
               response.end();
            });
        });

        return true;
    } else if (request.pathname === "/product/add" && request.method === "POST") {
        const form = new multiparty.Form();

        const product = { };

        form.on("part", function(part) {
            if (part.filename) {
                part.setEncoding("binary");

                let dataStream = "";

                part.on("data", data => dataStream += data);
                part.on("end", function() {
                    const filepath = `../content/images/${shortid.generate()}.png`;

                    product.image = filepath;

                    fs.writeFile(path.normalize(path.join(__dirname, filepath)), dataStream, {
                        encoding: "ascii"
                    }, function(error) {
                        if (error) {
                            console.log(error);
                        }
                    });
                });
            } else {
                part.setEncoding("utf-8");

                let dataStream = "";

                part.on("data", data => dataStream += data);
                part.on("end", () => product[part.name] = dataStream);
            }
        });

        form.on("close", function() {
            productModel.create(product).then(function(newProduct) {
                categoryModel.findById(product.category).then(function(category) {
                    category.products.push(newProduct._id);
                    category.save();
                });

                response.writeHead(302, {
                    location: "/"
                });
                response.end();
            });
        });

        form.parse(request);

        return true;
    }

    return false;
};