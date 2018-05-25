const Figure = require("./Figure.js").Figure;

class Circle extends Figure {
    constructor(radius) {
        super();

        this.radius = radius;
    }

    get area() {
        return Math.PI * this.radius ** 2;
    }

    toString() {
        return `Circle - radius: ${this.radius}`;
    }
}

module.exports = {
    Circle
};