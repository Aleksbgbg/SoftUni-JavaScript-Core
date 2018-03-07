function extractSubsequence(sequence) {
    let biggestElement = 0;

    console.log(sequence.filter(element => {
        const isBigger = element >= biggestElement;

        if (isBigger) {
            biggestElement = element;
        }

        return isBigger;
    }).join("\n"));
}

extractSubsequence([1, 3, 8, 4, 10, 12, 3, 2, 24]);
extractSubsequence([1, 2, 3, 4]);
extractSubsequence([20, 3, 2, 15, 6, 1]);