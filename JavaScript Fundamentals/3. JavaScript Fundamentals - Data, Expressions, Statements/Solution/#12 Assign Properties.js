function assignProperties(properties) {
    let object = { };

    for (let index = 0; index < properties.length; index += 2) {
        object[properties[index]] = properties[index + 1];
    }

    return object;
}

console.log(assignProperties(["name", "Pesho", "age", "23", "gender", "male"]));
console.log(assignProperties(["ssid", "90127461", "status", "admin", "expires", "600"]));