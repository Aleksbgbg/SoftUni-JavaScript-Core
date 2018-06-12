const productModel = require("../models/product");

module.exports.index = function(request, response) {
    productModel.find().populate("category").then(function(products) {
        if (request.query.query) {
            products = products.filter(product => product.name.toLowerCase().includes(request.query.query));
        }

        const data = {
            products
        };

        if (request.query.error) {
            data.error = request.query.error;
        } else if (request.query.success) {
            data.success = request.query.success;
        }

        response.render("home/index", data);
    });
};