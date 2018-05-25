function lastMonth([day, month, year]) {
    return new Date(year, month - 1, 0).getDate();
}

console.log(lastMonth([17, 3, 2002]));
console.log(lastMonth([13, 12, 2004]));