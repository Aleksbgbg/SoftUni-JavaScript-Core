"use strict";

function stringEndCheck(string, substring) {
    return string.substring(string.length - substring.length) === substring;
}

console.log(stringEndCheck("This sentence ends with fun?", "fun?"));
console.log(stringEndCheck("This is Houston, we have...", "We have..."));
console.log(stringEndCheck("The new iPhone has no headphones jack.", "o headphones jack."));