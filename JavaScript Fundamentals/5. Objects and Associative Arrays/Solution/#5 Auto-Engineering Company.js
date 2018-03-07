"use strict";

function autoEngineeringCompany(cars) {
    const brands = new Map();

    for (const car of cars) {
        const [brand, model, productions] = car.split(" | ");

        if (!brands.has(brand)) {
            brands.set(brand, new Map());
        }

        const brandMap = brands.get(brand);

        if (!brandMap.has(model)) {
            brandMap.set(model, 0);
        }

        brandMap.set(model, brandMap.get(model) + Number(productions));
    }

    for (const brand of brands.keys()) {
        console.log(brand);

        for (const model of brands.get(brand).keys()) {
            console.log(`###${model} -> ${brands.get(brand).get(model)}`);
        }
    }
}

autoEngineeringCompany([
    "Audi | Q7 | 1000",
    "Audi | Q6 | 100",
    "BMW | X5 | 1000",
    "BMW | X6 | 100",
    "Citroen | C4 | 123",
    "Volga | GAZ-24 | 1000000",
    "Lada | Niva | 1000000",
    "Lada | Jigula | 1000000",
    "Citroen | C4 | 22",
    "Citroen | C5 | 10"
]);