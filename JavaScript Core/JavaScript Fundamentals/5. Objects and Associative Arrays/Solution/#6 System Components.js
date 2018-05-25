"use strict";

function systemComponents(components) {
    const database = new Map();

    for (const component of components) {
        const [systemName, componentName, subcomponentName] = component.split(" | ");

        if (!database.has(systemName)) {
            database.set(systemName, new Map());
        }

        const systemDatabase = database.get(systemName);

        if (!systemDatabase.has(componentName)) {
            systemDatabase.set(componentName, []);
        }

        systemDatabase.get(componentName).push(subcomponentName);
    }

    for (const system of Array.from(database.keys())
        .sort((a, b) => {
        const difference = database.get(b).size - database.get(a).size;
        return difference === 0 ? a.localeCompare(b) : difference;
    })) {
        console.log(system);

        const componentDatabase = database.get(system);

        for (const component of Array.from(componentDatabase.keys())
            .sort((a, b) => componentDatabase.get(b).length - componentDatabase.get(a).length)) {
            console.log(`|||${component}`);
            console.log(componentDatabase.get(component).map(subcomponent => `||||||${subcomponent}`).join("\n"));
        }
    }
}

systemComponents([
    "SULS | Main Site | Home Page",
    "SULS | Main Site | Login Page",
    "SULS | Main Site | Register Page",
    "SULS | Judge Site | Login Page",
    "SULS | Judge Site | Submittion Page",
    "Lambda | CoreA | A23",
    "SULS | Digital Site | Login Page",
    "Lambda | CoreB | B24",
    "Lambda | CoreA | A24",
    "Lambda | CoreA | A25",
    "Lambda | CoreC | C4",
    "Indice | Session | Default Storage",
    "Indice | Session | Default Security"
]);