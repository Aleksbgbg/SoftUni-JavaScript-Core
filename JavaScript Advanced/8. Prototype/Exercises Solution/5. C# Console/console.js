class Console {
    static get placeholder() {
        return /{\d+}/g;
    }

    static writeLine() {
        let message = arguments[0];

        if (arguments.length === 1) {
            if (typeof(message) === "object") {
                return JSON.stringify(message);
            }
            else if (typeof(message) === "string") {
                return message;
            }
        }
        else {
            if (typeof(message) !== "string") {
                throw new TypeError("No string format provided!");
            }
            else {
                const tokens = message.match(this.placeholder).sort(function (a, b) {
                    a = Number(a.substring(1, a.length - 1));
                    b = Number(b.substring(1, b.length - 1));
                    return a - b;
                });

                if (tokens.length !== arguments.length - 1) {
                    throw new RangeError("Incorrect amount of parameters given!");
                }
                else {
                    for (let iteration = 0; iteration < tokens.length; ++iteration) {
                        if (Number(tokens[iteration].substring(1, tokens[iteration].length - 1)) !== iteration) {
                            throw new RangeError("Incorrect placeholders given!");
                        }
                        else {
                            message = message.replace(tokens[iteration], arguments[iteration + 1])
                        }
                    }

                    return message;
                }
            }
        }
    }
}

module.exports = {
    Console
};