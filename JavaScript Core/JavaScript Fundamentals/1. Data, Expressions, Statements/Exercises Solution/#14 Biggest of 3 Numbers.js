function biggestNumber(numbers) {
    return Math.max(...numbers);
}

console.log(biggestNumber([5, -2, 7]));
console.log(biggestNumber([130, 5, 99]));
console.log(biggestNumber([43, 43.2, 43.1]));
console.log(biggestNumber([5, 5, 5]));
console.log(biggestNumber([-10, -20, -30]));