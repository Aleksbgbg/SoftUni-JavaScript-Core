const fs = require("fs");

let database = { };

function checkKey(key, hasProperty) {
    if (typeof key !== "string") {
        throw new TypeError("Key must be a string.");
    }

    if (hasProperty) {
        if (database.hasOwnProperty(key)) {
            throw new Error("Key already exists in database.");
        }
    } else {
        if (!database.hasOwnProperty(key)) {
            throw new Error("Key does not exist within the database.");
        }
    }
}

module.exports = {
    put(key, value) {
        checkKey(key, true);

        database[key] = value;
    },
    get(key) {
        checkKey(key, false);
        return database[key];
    },
    getAll() {
        if (Object.keys(database).length === 0) {
            return "There are no items in the database.";
        }

        return database;
    },
    update(key, newValue) {
        checkKey(key, false);
        database[key] = newValue;
    },
    delete(key) {
        checkKey(key, false);
        delete database[key];
    },
    clear() {
        database = { };
    },
    save() {
        fs.writeFileSync("storage.json", JSON.stringify(database));
    },
    load() {
        if (fs.existsSync("storage.json")) {
            database = JSON.parse(fs.readFileSync("storage.json").toString());
        }
    }
};