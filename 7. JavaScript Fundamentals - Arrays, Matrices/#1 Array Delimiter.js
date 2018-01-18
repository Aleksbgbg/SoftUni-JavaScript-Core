function arrayDelimiter(input) {
    console.log(input.join(input.pop()));
}

arrayDelimiter(["How about no?", "I", "will", "not", "do", "it!", "_"]);