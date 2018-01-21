function orbit([width, height, x, y]) {
    function isValidIndex([x, y]) {
        return 0 <= x && x < height &&
               0 <= y && y < width;
    }

    function cellsAt(index) {
        const cells = [];

        function push(coordinate) {
            if (isValidIndex(coordinate)) {
                cells.push(coordinate);
            }
        }

        const startX = x - index;
        const startY = y - index;

        const width = 2 * index + 1;

        // top
        for (let x = startX; x < startX + width; ++x) {
            push([x, startY]);
        }

        // right
        for (let y = startY + 1; y < startY + width; ++y) {
            push([startX + width - 1, y]);
        }

        // bottom
        for (let x = startX; x < startX + width - 1; ++x) {
            push([x, startY + width - 1]);
        }

        // left
        for (let y = startY + 1; y < startY + width - 1; ++y) {
            push([startX, y]);
        }

        return cells;
    }

    const matrix = [];

    for (let row = 0; row < height; ++row) {
        const rowArray = [];

        for (let column = 0; column < width; ++column) {
            rowArray.push(0);
        }

        matrix.push(rowArray);
    }

    let index = 0;

    while (true) {
        const cells = cellsAt(index++);

        if (cells.length === 0) {
            break;
        }

        for (const [x, y] of cells) {
            matrix[y][x] = index;
        }
    }

    console.log(matrix.map(x => x.join(" ")).join("\n"));
}

orbit([4, 4, 0, 0]);
orbit([5, 5, 2, 2]);
orbit([3, 3, 2, 2]);