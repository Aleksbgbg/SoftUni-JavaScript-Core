function spiralMatrix(width, height) {
    const matrix = [];

    for (let row = 0; row < height; ++row) {
        const rowArray = [];

        for (let column = 0; column < width; ++column) {
            rowArray.push(0);
        }

        matrix.push(rowArray);
    }

    const area = width * height;

    let x = 0;
    let y = 0;

    let xVector = 1;
    let yVector = 0;

    let topsCompleted = 0;
    let rightsCompleted = 0;
    let bottomsCompleted = 0;
    let leftsCompleted = 0;

    const xlast = width - 1;
    const ylast = height - 1;

    for (let value = 1; value <= area; ++value) {
        matrix[y][x] = value;

        x += xVector;
        y += yVector;

        if (xVector === 1 && yVector === 0 && x === xlast - bottomsCompleted && y === topsCompleted) {
            xVector -= 1; // == 0
            yVector += 1; // == 1
            ++topsCompleted;
        } else if (xVector === 0 && yVector === 1 && x === xlast - bottomsCompleted && y === ylast - rightsCompleted) {
            xVector -= 1; // == -1
            yVector -= 1; // == 0
            ++rightsCompleted;
        } else if (xVector === -1 && yVector === 0 && x === leftsCompleted && y === ylast - bottomsCompleted) {
            xVector += 1; // == 0
            yVector -= 1; // == -1
            ++bottomsCompleted;
        } else if (xVector === 0 && yVector === -1 && x === leftsCompleted && y === topsCompleted) {
            xVector += 1; // == 1
            yVector += 1; // == 0
            ++leftsCompleted;
        }
    }

    console.log(matrix.map(row => row.join(" ")).join("\n"));
    return matrix;
}

spiralMatrix(5, 5);
spiralMatrix(3, 3);