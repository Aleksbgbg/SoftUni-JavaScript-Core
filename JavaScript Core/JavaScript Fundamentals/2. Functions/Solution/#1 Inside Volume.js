function insideVolume(input) {
    for (let index = 0; index < input.length; index += 3) {
        const x = input[index];
        const y = input[index + 1];
        const z = input[index + 2];

        if (10 <= x && x <= 50 &&
            20 <= y && y <= 80 &&
            15 <= z && z <= 50) {
            console.log("inside");
        } else {
            console.log("outside");
        }
    }
}

insideVolume([8, 20, 22]);
insideVolume([13.1, 50, 31.5, 50, 80, 50, -5, 18, 43]);