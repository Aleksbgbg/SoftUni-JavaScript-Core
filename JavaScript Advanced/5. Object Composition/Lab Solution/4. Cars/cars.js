function cars(commands) {
    const module = (() => {
        const objects = { };

        function create(name) {
            objects[name] = { };
        }

        function createInherits(name, parentName) {
            objects[name] = Object.create(objects[parentName]);
        }

        function set(name, key, value) {
            objects[name][key] = value;
        }

        function print(name) {
            const object = objects[name];

            console.log((() => {
                const strings = [];

                for (const property in object) {
                    strings.push(`${property}: ${object[property]}`);
                }

                return strings;
            })().join(", "));
        }

        return {
            create,
            createInherits,
            set,
            print
        };
    })();

    for (const command of commands) {
        const [name, ...properties] = command.split(' ');

        if (name === "create") {
            if (properties.length === 3) { // inherits
                module.createInherits(properties[0], properties[2]);
            } else {
                module.create(properties[0]);
            }
        } else {
            module[name](...properties);
        }
    }
}

cars([
    "create c1",
    "create c2 inherit c1",
    "set c1 color red",
    "set c2 model new",
    "print c1",
    "print c2"
]);