"use strict";

function cappyJuice(juices) {
    const juiceVolumes = {};
    const juiceBottles = new Map();

    for (const juice of juices) {
        const [flavour, volume] = juice.split(" => ");

        if (!juiceVolumes.hasOwnProperty(flavour)) {
            juiceVolumes[flavour] = 0;
        }

        juiceVolumes[flavour] += Number(volume);

        if (juiceVolumes[flavour] >= 1000) {
            if (!juiceBottles.has(flavour)) {
                juiceBottles.set(flavour, 0);
            }

            const bottles = Math.floor(juiceVolumes[flavour] / 1000);

            juiceBottles.set(flavour, juiceBottles.get(flavour) + bottles);
            juiceVolumes[flavour] -= 1000 * bottles;
        }
    }

    return Array.from(juiceBottles).map(([key, value]) => `${key} => ${value}`).join("\n");
}

console.log(cappyJuice([
    "Orange => 2000",
    "Peach => 1432",
    "Banana => 450",
    "Peach => 600",
    "Strawberry => 549"
]));
console.log();
console.log(cappyJuice([
    "Kiwi => 234",
    "Pear => 2345",
    "Watermelon => 3456",
    "Kiwi => 4567",
    "Pear => 5678",
    "Watermelon => 6789"
]));