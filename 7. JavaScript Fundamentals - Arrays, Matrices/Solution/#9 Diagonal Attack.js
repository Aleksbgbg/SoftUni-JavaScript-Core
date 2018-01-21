function diagonalAttack(input) {
    const matrix = input.map(string => string.split(" ").map(number => Number(number)));

    let sum = 0;

    for (let index = 0; index < matrix.length; ++index) {
        sum += matrix[index][index];
    }

    let otherSum = 0;

    for (let index = 0; index < matrix.length; ++index) {
        otherSum += matrix[index][matrix[0].length - index - 1];
    }

    if (sum === otherSum) {
        for (let row = 0; row < matrix.length; ++row) {
            const rowLength = matrix[row].length;
            const lastIndex = rowLength - row - 1;

            for (let column = 0; column < rowLength; ++column) {
                if (column === row || column === lastIndex) {
                    continue;
                }

                matrix[row][column] = sum;
            }
        }
    }

    console.log(matrix.map(row => row.join(" ")).join("\n"));
}

diagonalAttack(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']);
diagonalAttack(['1 1 1',
    '1 1 1',
    '1 1 0']);