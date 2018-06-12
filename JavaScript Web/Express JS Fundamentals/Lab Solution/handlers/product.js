const fs = require("fs");
const path = require("path");

const categoryModel = require("../models/category");
const productModel = require("../models/product");

module.exports.getAddProduct = function(request, response) {
    categoryModel.find().then(function(categories) {
        response.render("product/add", {
            categories
        });
    });
};

module.exports.postAddProduct = function(request, response) {
    const product = request.body;

    product.image = `\\${request.file.path}`;

    productModel.create(product).then(function(product) {
        categoryModel.findById(product.category).then(function(category) {
            category.products.push(product._id);
            category.save();
        });

        response.redirect("/");
    });
};

module.exports.getEdit = function(request, response) {
    productModel.findById(request.params.id).then(function(product) {
        if (!product) {
            response.sendStatus(404);
            return;
        }

        categoryModel.find().then(function(categories) {
            response.render("product/edit", {
                product,
                categories
            });
        });
    });
};

module.exports.postEdit = function(request, response) {
    productModel.findById(request.params.id).then(function(product) {
        if (!product) {
            response.redirect(`/?error=${encodeURIComponent("error=Product was not found!")}`);
            return;
        }

        product.name = request.body.name;
        product.description = request.body.description;
        product.price = request.body.price;

        if (request.file) {
            product.image = `\\${request.file.path}`;
        }

        if (product.category.toString() !== request.body.category) {
            categoryModel.findById(product.category).then(function(currentCategory) {
                categoryModel.findById(request.body.category).then(function(nextCategory) {
                    const index = currentCategory.products.indexOf(product._id);

                    if (index !== -1) {
                        currentCategory.products.splice(index, 1);
                    }

                    currentCategory.save();

                    nextCategory.products.push(product._id);
                    nextCategory.save();

                    product.category = request.body.category;

                    product.save().then(() => response.redirect(`/?success=${encodeURIComponent("Product was edited successfully!")}`));
                });
            });

            return;
        }

        product.save().then(() => response.redirect(`/?success=${encodeURIComponent("Product was edited successfully!")}`));
    });
};

module.exports.getDelete = function(request, response) {
    productModel.findById(request.params.id).then(function(product) {
        if (!product) {
            response.sendStatus(404);
            return;
        }

        response.render("product/delete", {
            product
        });
    });
};

module.exports.postDelete = function(request, response) {
    productModel.findById(request.params.id).then(function(product) {
        if (!product) {
            response.sendStatus(404);
            return;
        }

        product.remove().then(function() {
            fs.unlink(`./${product.image}`, function(error) {
                if (error) {
                    console.log(error);
                }
            });

            categoryModel.findById(product.category).then(function(category) {
                category.products = category.products.filter(categoryProduct => categoryProduct._id.toString() !== product._id.toString());
                category.save().then(function() {
                    response.redirect(`/?success=${encodeURIComponent("Product was deleted successfully!")}`)
                });
            });
        });
    });
};

module.exports.getBuy = function(request, response) {
    productModel.findById(request.params.id).then(function(product) {
        if (!product) {
            response.sendStatus(404);
            return;
        }

        response.render("product/buy", {
            product
        });
    });
};