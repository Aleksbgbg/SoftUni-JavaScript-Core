function magicMatrices(matrix) {
    function sumRow(rowIndex) {
        return matrix[rowIndex].reduce((sum, element) => sum + element);
    }

    function sumColumn(columnIndex) {
        return matrix.map(row => row[columnIndex]).reduce((sum, element) => sum + element);
    }

    const sum = sumRow(0);

    for (let rowIndex = 1; rowIndex < matrix.length; ++rowIndex) {
        if (sumRow(rowIndex) !== sum) {
            return false;
        }
    }

    for (let columnIndex = 0; columnIndex < matrix[0].length; ++columnIndex) {
        if (sumColumn(columnIndex) !== sum) {
            return false;
        }
    }

    return true;
}

console.log(magicMatrices([[4, 5, 6], [6, 5, 4], [5, 5, 5]]));
console.log(magicMatrices([[11, 32, 45], [21, 0, 1], [21, 1, 1]]));
console.log(magicMatrices([[1, 0, 0], [0, 0, 1], [0, 1, 0]]));