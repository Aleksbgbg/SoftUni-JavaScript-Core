const homeHandler = require("./home");
const fileHandler = require("./static-files");
const productHandler = require("./product");
const categoryHandler = require("./category");

module.exports = [homeHandler, categoryHandler, fileHandler, productHandler];