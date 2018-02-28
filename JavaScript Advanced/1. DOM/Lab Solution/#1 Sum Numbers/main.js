function calc() {
    document.getElementById("sum").value = [...Array(2).keys()]
        .map(element => Number(document.getElementById(`num${element + 1}`).value))
        .reduce((first, second) => first + second);
}