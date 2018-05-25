"use strict";

function findVariableNames(string) {
    function matches(string, regex, formatMethod) {
        const formattedMatches = [];

        while (true) {
            const match = regex.exec(string);

            if (match === null) {
                break;
            }

            formattedMatches.push(formatMethod(match));
        }

        return formattedMatches;
    }

    return matches(string, /\b_([A-Za-z\d]+)\b/g, match => match[1]).join(",");
}

console.log(findVariableNames("The _id and _age variables are both integers."));
console.log(findVariableNames("Calculate the _area of the _perfectRectangle object."));
console.log(findVariableNames("__invalidVariable _evenMoreInvalidVariable_ _validVariable"));
