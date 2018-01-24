"use strict";

function usernames(names) {
    return names.sort((a, b) => {
        const lengthDifference = a.length - b.length;
        return lengthDifference === 0 ? a.localeCompare(b) : lengthDifference;
    }).join("\n");
}

console.log(usernames([
    "Ashton",
    "Kutcher",
    "Ariel",
    "Lilly",
    "Keyden",
    "Aizen",
    "Billy",
    "Braston"
]));
console.log();
console.log(usernames([
    "Denise",
    "Ignatius",
    "Iris",
    "Isacc",
    "Indie",
    "Dean",
    "Donatello",
    "Enfuego"
]));