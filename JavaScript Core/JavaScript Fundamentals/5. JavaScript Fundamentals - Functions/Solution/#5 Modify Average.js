function modifyAverage(number) {
    function averageDigitValues(number) {
        const digits = number.toString().split("").map(digit => Number(digit));

        let sum = 0;

        for (const digit of digits) {
            sum += digit;
        }

        return sum / digits.length;
    }

    while (averageDigitValues(number) < 5) {
        number = number * 10 + 9;
    }

    console.log(number);
}

cookingByNumbers(101);