function binaryToDecimal(binary) {
    let sum = 0;
    let placeValue = 1;

    for (let character of binary.split("").reverse().join("")) {
        sum += Number(character) * placeValue;
        placeValue *= 2;
    }

    console.log(sum);
}

binaryToDecimal("00001001");
binaryToDecimal("11110000");