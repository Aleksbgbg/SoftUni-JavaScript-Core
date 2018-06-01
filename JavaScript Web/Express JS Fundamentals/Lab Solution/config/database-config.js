const mongoose = require("mongoose");
mongoose.Promise = Promise;

module.exports = function(config) {
    mongoose.connect(config.connectionString);

    mongoose.connection.once("open", function(error) {
       if (error) {
           console.log(error);
           return;
       }

        console.log("Connected!");
    });

    require("../models/product");
    require("../models/category");
};