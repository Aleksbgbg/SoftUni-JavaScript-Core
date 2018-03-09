const Figure = require("./Figure.js").Figure;

class Rectangle extends Figure {
    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;
    }

    get area() {
        return this.width * this.height;
    }

    toString() {
        return `Rectangle - width: ${this.width}, height: ${this.height}`;
    }
}

module.exports = {
    Rectangle
};