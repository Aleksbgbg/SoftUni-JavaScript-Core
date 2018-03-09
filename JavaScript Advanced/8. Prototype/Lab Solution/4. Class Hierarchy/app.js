function getClasses() {
    const Figure = require("./Figure.js").Figure;
    const Circle = require("./Circle.js").Circle;
    const Rectangle = require("./Rectangle.js").Rectangle;

    return {
        Figure,
        Circle,
        Rectangle
    };
}

const {
    Figure,
    Circle,
    Rectangle
} = getClasses();

console.log();

try {
    const figure = new Figure(); // Error
} catch (error) {
    console.log(error);
}

const circle = new Circle(5);
console.log(circle.area); // 78.53981633974483
console.log(circle.toString()); // Circle - radius: 5

const rectangle = new Rectangle(3,4);
console.log(rectangle.area); // 12
console.log(rectangle.toString()); // Rectangle - width: 3, height: 4