function validityChecker([x1, y1, x2, y2]) {
    function isValidDistance(distance) {
        const isValid = Number.isInteger(distance);

        console.log(isValid ? "valid" : "invalid");

        return isValid;
    }

    function getDistanceFromPoint(x1, y1, x2, y2) {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is `);
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }

    return isValidDistance(getDistanceFromPoint(x1, y1, 0, 0)) &
        isValidDistance(getDistanceFromPoint(x2, y2, 0, 0)) &
        isValidDistance(getDistanceFromPoint(x1, y1, x2, y2));
}

validityChecker([2, 1, 1, 1]);