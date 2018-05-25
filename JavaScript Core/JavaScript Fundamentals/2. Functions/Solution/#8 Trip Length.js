function tripLength([x1, y1, x2, y2, x3, y3]) {
    function distanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }

    const points = [[x1, y1], [x2, y2], [x3, y3]];

    const paths = {};

    for (let point = 1; point < 4; ++point) {
        for (let otherPoint = 1; otherPoint < 4; ++otherPoint) {
            if (point === otherPoint) {
                continue;
            }

            const lastPoint = [1, 2, 3].filter(value => value !== point && value !== otherPoint);

            const [x1, y1] = points[point - 1];
            const [x2, y2] = points[otherPoint - 1];
            const [x3, y3] = points[lastPoint - 1];

            paths[[point, otherPoint, lastPoint]] = distanceBetweenPoints(x1, y1, x2, y2) + distanceBetweenPoints(x2, y2, x3, y3);
        }
    }

    const minValue = Math.min(...Object.values(paths));

    for (const path in paths) {
        if (paths[path] === minValue) {
            return `${path.split(",").join("->")}: ${minValue}`;
        }
    }
}

console.log(tripLength([-1, -2, 3.5, 0, 0, 2]));