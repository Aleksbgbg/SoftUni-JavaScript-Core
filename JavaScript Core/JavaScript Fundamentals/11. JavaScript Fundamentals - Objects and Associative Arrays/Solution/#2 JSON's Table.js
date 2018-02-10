"use strict";

function jsonTable(employees) {
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    let table = "<table>\n";

    for (const employee of employees) {
        table += "    <tr>\n";

        const employeeJson = JSON.parse(employee);

        for (const parameter in employeeJson) {
            table += `        <td>${escapeHtml(employeeJson[parameter].toString())}</td>\n`;
        }

        table += "    </tr>\n";
    }

    return table + "</table>";
}

console.log(jsonTable([
    "{\"name\":\"Pesho\",\"position\":\"Promenliva\",\"salary\":100000}",
    "{\"name\":\"Teo\",\"position\":\"Lecturer\",\"salary\":1000}",
    "{\"name\":\"Georgi\",\"position\":\"Lecturer\",\"salary\":1000}"
]));