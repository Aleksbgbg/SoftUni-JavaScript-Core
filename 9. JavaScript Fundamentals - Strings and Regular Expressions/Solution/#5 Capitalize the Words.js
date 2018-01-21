"use strict";

function capitalizeTheWords(input) {
    return input.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

console.log(capitalizeTheWords("Capitalize these words"));
console.log(capitalizeTheWords("Was that Easy? tRY thIs onE for SiZe!"));