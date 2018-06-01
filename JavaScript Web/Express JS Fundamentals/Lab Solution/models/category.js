const mongoose = require("mongoose");

module.exports = mongoose.model("Category", mongoose.Schema({
    name: {
        type: "string",
        required: true,
        unique: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
}));