const mongoose = require("mongoose");

module.exports = mongoose.model("Product", mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    description: {
        type: "string"
    },
    price: {
        type: "number",
        min: 0,
        max: Number.MAX_VALUE,
        default: 0
    },
    image: {
        type: "string"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    isBought: {
        type: "boolean",
        default: false
    }
}));