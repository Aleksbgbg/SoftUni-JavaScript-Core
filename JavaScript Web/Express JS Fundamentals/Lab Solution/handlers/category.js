const categoryModel = require("../models/category");

module.exports.getAddCategory = function(request, response) {
    response.render("category/add");
};

module.exports.postAddCategory = function(request, response) {
    categoryModel.create(request.body).then(() => response.redirect("/"));
};

module.exports.productByCategory = function(request, response) {
    categoryModel
        .findOne({
            name: request.params.category
        })
        .populate("products")
        .then(function(category) {
            if (!category) {
                response.sendStatus(404);
                return;
            }

            response.render("category/products", {
                category
            });
        });
};