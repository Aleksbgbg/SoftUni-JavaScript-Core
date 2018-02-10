function sortArray(array) {
    return array.sort((a, b) => a.length < b.length ? -1 : a.length > b.length ? 1 : a.localeCompare(b));
}

console.log(sortArray(["alpha", "beta", "gamma"]));
console.log(sortArray(["Isacc", "Theodor", "Jack", "Harrison", "George"]));
console.log(sortArray(["test", "Deny", "omen", "Default"]));