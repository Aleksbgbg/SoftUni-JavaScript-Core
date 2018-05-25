function nthElement(elements) {
    const increment = Number(elements.pop());

    for (let index = 0; index < elements.length; index += increment) {
        console.log(elements[index]);
    }
}

nthElement(["5", "20", "31", "4", "20", "2"]);
nthElement(["dsa", "asd", "test", "tset", "2"]);
nthElement(["1", "2", "3", "4", "5", "6"]);