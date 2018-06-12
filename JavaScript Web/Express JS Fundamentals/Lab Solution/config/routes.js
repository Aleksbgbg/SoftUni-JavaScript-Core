const handlers = require("../handlers");
const multer = require("multer");

const upload = multer({
    dest: "./content/images"
});

module.exports = function(app) {
    app.get("/", handlers.home.index);

    app.get("/product/buy/:id", handlers.product.getBuy);

    app.get("/product/add", handlers.product.getAddProduct);
    app.post("/product/add", upload.single("image"), handlers.product.postAddProduct);

    app.get("/product/edit/:id", handlers.product.getEdit);
    app.post("/product/edit/:id", upload.single("image"), handlers.product.postEdit);

    app.get("/product/delete/:id", handlers.product.getDelete);
    app.post("/product/delete/:id", handlers.product.postDelete);

    app.get("/category/add", handlers.category.getAddCategory);
    app.post("/category/add", handlers.category.postAddCategory);

    app.get("/category/:category/products", handlers.category.productByCategory);
};