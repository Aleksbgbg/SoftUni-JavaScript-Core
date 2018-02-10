"use strict";

function stringStartCheck(string, substring) {
    return string.substr(0, substring.length) === substring;
}

console.log(stringStartCheck("How have you been?", "how"));
console.log(stringStartCheck("The quick brown fox...", "The quick brown fox..."));
console.log(stringStartCheck("Marketing Fundamentals, starting 19/10/2016", "Marketing Fundamentals, sta"));