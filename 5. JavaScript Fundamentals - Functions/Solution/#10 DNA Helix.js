function dnaHelix(length) {
    const sequences = {
        0: ["A", "T"],
        1: ["C", "G"],
        2: ["T", "T"],
        3: ["A", "G"],
        4: ["G", "G"]
    };

    const formats = {
        0: ["**", "", "**"],
        1: ["*", "--", "*"],
        2: ["", "----", ""],
        3: ["*", "--", "*"]
    }

    for (let index = 0; index < length; ++index) {
        const [letterFirst, letterSecond] = sequences[index % 5];

        const output = formats[index % 4].slice();

        output.splice(1, 0, letterFirst);
        output.splice(3, 0, letterSecond);

        console.log(output.join(""));
    }
}

dnaHelix(10);