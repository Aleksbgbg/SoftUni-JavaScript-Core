function rounding([number, decimalPlaces]) {
    const userRequestedDecimalPlaces = decimalPlaces > 15 ? 15 : decimalPlaces;
    const maximumDecimalPlaces = number.toString().split('.')[1].length;

    console.log(number.toFixed(Math.min(userRequestedDecimalPlaces, maximumDecimalPlaces)));
}

rounding([3.1415926535897932384626433832795, 2]);
rounding([10.5, 3]);