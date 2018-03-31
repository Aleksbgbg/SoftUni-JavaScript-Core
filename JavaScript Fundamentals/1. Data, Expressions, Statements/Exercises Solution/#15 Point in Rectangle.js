function pointInRectangle(x, y, xMin, xMax, yMin, yMax) {
    return xMin <= x && x <= xMax && yMin <= y && y <= yMax ? "inside" : "outside";
}

console.log(pointInRectangle(8, -1, 2, 12, -3, 3));
console.log(pointInRectangle(12.5, -1, 2, 12, -3, 3));