"use strict";

function heroicInventory(input) {
    const heroes = [];

    for (const hero of input) {
        const [name, level, items] = hero.split("/");

        heroes.push({
            "name": name.trim(),
            "level": Number(level),
            "items": items.split(", ").map(item => item.trim())
        });
    }

    return heroes;
}

console.log(heroicInventory([
    "Isacc / 25 / Apple, GravityGun",
    "Derek / 12 / BarrelVest, DestructionSword",
    "Hes / 1 / Desolator, Sentinel, Antara"
]));

console.log(heroicInventory(["Jake / 1000 / Gauss, HolidayGrenade"]));