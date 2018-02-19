function dnaHelix(length) {
    const sequences = [
        ["A", "T"],
        ["C", "G"],
        ["T", "T"],
        ["A", "G"],
        ["G", "G"]
    ];

    const formats = [
        ["**", "", "**"],
        ["*", "--", "*"],
        ["", "----", ""],
        ["*", "--", "*"]
    ];

    let outputString = "";

    for (let index = 0; index < length; ++index) {
        const [letterFirst, letterSecond] = sequences[index % 5];

        const output = formats[index % 4].slice();

        output.splice(1, 0, letterFirst);
        output.splice(3, 0, letterSecond);

        outputString += `${output.join("")}\n`;
    }

    return outputString;
}

console.log(dnaHelix(10));;