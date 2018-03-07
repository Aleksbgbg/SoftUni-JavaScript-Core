"use strict";

function splitWithDelimiter(string, delimiter) {
    return string.split(delimiter).join("\n");
}

console.log(splitWithDelimiter("One-Two-Three-Four-Five", "-"));
console.log(splitWithDelimiter("http://platform.softuni.bg", "."));