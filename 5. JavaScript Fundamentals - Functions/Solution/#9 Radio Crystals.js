function radioCrystals(inputs) {
    const operations = {
        "Cut": crystal => crystal / 4,
        "Lap": crystal => crystal * 0.8,
        "Grind": crystal => crystal - 20,
        "Etch": crystal => crystal - 2
    };

    function xray(crystal) {
        console.log("X-ray x1");
        return crystal + 1;
    }

    function transportAndWashing(crystal) {
        console.log("Transporting and washing");
        return Math.floor(crystal);
    }

    const desiredSize = inputs.splice(0, 1);

    for (let crystalSize of inputs) {
        console.log(`Processing chunk ${crystalSize} microns`);

        for (const operation in operations) {
            for (let counter = 0; true; ++counter) {
                const operationResult = operations[operation](crystalSize);

                if (operationResult >= desiredSize - 1) {
                    crystalSize = operationResult;
                } else {
                    if (counter !== 0) {
                        console.log(`${operation} x${counter}`);
                        crystalSize = transportAndWashing(crystalSize);
                    }
                    break;
                }
            }
        }

        if (crystalSize === desiredSize - 1) {
            crystalSize = xray(crystalSize);
            //crystalSize = transportAndWashing(crystalSize);
        }

        console.log(`Finished crystal ${crystalSize} microns`);
    }
}

radioCrystals([10, 9]);