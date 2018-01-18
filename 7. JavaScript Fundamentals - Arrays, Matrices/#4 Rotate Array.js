function rotateArray(elements) {
    const shiftLength = Number(elements.pop());

    for (let iteration = 0; iteration < shiftLength; ++iteration) {
        elements.unshift(elements.pop());
    }

    console.log(elements.join(" "));
}

rotateArray(["1", "2", "3", "4", "2"]);
rotateArray(["Banana", "Orange", "Coconut", "Apple", "15"]);