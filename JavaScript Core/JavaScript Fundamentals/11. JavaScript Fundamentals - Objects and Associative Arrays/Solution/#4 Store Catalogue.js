"use strict";

function storeCatalogue(items) {
    const catalogue = items
        .map(item => item.split(" : "))
        .sort(([key1], [key2]) => key1.localeCompare(key2))
        .map(item => item.join(": "));

    let lastLetter = 0;

    for (const item of catalogue) {
        if (item[0] !== lastLetter) {
            lastLetter = item[0];
            console.log(lastLetter);
        }

        console.log(`  ${item}`);
    }

    return catalogue;
}

storeCatalogue([
    "Appricot : 20.4",
    "Fridge : 1500",
    "TV : 1499",
    "Deodorant : 10",
    "Boiler : 300",
    "Apple : 1.25",
    "Anti-Bug Spray : 15",
    "T-Shirt : 10"
]);
console.log();
storeCatalogue([
    "Banana : 2",
    "Rubic's Cube : 5",
    "Raspberry P : 4999",
    "Rolex : 100000",
    "Rollon : 10",
    "Rali Car : 2000000",
    "Pesho : 0.000001",
    "Barrel : 10"
]);