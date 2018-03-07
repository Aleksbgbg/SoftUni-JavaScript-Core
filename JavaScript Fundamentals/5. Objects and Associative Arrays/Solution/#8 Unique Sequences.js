"use strict";

function uniqueSequences(arrays) {
    const uniques = [];

    function isUnique(array) {
        function areEqual(array1, array2) {
            if (array1.length !== array2.length) {
                return false;
            }

            for (let index = 0; index < array1.length; ++index) {
                if (array1[index] !== array2[index]) {
                    return false;
                }
            }

            return true;
        }

        return !uniques.some(unique => areEqual(unique, array));
    }

    for (const array of arrays) {
        if (isUnique(array.sort((a, b) => b - a))) {
            uniques.push(array);
        }
    }

    console.log(uniques
        .sort((a, b) => a.length - b.length)
        .map(array => `[${array.join(", ")}]`)
        .join("\n"));
}

uniqueSequences([
    [-3, -2, -1, 0, 1, 2, 3, 4],
    [10, 1, -17, 0, 2, 13],
    [4, -3, 3, -2, 2, -1, 1, 0]
]);
console.log();
uniqueSequences([
    [7.14, 7.180, 7.339, 80.099],
    [7.339, 80.0990, 7.140000, 7.18],
    [7.339, 7.180, 7.14, 80.099]
]);