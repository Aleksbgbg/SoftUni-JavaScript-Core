function addRemove(commands) {
    const values = [];
    let currentValue = 0;

    const commandActions = {
        "add": () => values.push(currentValue),
        "remove": () => values.splice(-1, 1)
    };

    for (const command of commands) {
        ++currentValue;
        commandActions[command]();
    }

    if (values.length === 0) {
        console.log("Empty");
    } else {
        console.log(values.join("\n"));
    }
}

addRemove(["add", "add", "add", "add"]);
addRemove(["add", "add", "remove", "add", "add"]);
addRemove(["remove", "remove", "remove"]);