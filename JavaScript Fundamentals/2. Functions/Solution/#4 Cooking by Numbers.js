function cookingByNumbers(inputs) {
    const operations = {
        "chop": number => number / 2,
        "dice": number => Math.sqrt(number),
        "spice": number => number + 1,
        "bake": number => number * 3,
        "fillet": number => number - number * 0.2
    };

    let number = Number(inputs.splice(0, 1));

    for (const operationString of inputs) {
        number = operations[operationString](number);
        console.log(number);
    }
}

cookingByNumbers(["9", "dice", "spice", "chop", "bake", "fillet"]);