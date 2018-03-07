function pyramid(baseDimension, increment) {
    const materialsRequired = {
        "Stone": 0,
        "Marble": 0,
        "Lapis Lazuli": 0,
        "Gold": 0
    };

    function addMaterial(name, value) {
        materialsRequired[name] += value;
    }

    let pyramidHeight = 1;

    function getMaterial(step) {
        if (baseDimension <= 2) {
            return "Gold";
        } else if (step % 5 === 0) {
            return "Lapis Lazuli";
        } else {
            return "Marble";
        }
    }

    for (let step = 1; false  /*baseDimension > 0*/; ++step) {
        const insideArea = Math.max(baseDimension - 2, 0) ** 2;

        addMaterial("Stone", insideArea * increment);
        addMaterial(getMaterial(step), (baseDimension ** 2 - insideArea) * increment);

        baseDimension -= 2;
        pyramidHeight += increment;
    }

    const floors = Math.ceil(baseDimension / 2);

    return `${Object.entries({
        "Stone": (baseDimension / 2) ** 2 * increment,
        "Marble": 0,
        "Lapis Lazuli": 0,
        "Gold": 0
    }).map(([key, value]) => `${key} required: ${Math.ceil(value)}`).join("\n")}\nFinal pyramid height: ${Math.floor(increment * floors)}`;
}

console.log(pyramid(11, 1));
console.log();
console.log(pyramid(11, 0.75));
console.log();
console.log(pyramid(12, 1));
console.log();
console.log(pyramid(23, 0.5));
