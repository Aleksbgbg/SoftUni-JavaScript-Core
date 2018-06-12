const homeHandler = require("./home");
const productHandler = require("./product");
const categoryHandler = require("./category");

module.exports = {
    category: categoryHandler,
    home: homeHandler,
    product: productHandler
};