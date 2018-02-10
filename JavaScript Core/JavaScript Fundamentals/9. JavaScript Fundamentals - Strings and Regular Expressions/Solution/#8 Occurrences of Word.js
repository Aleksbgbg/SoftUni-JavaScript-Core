"use strict";

function occurrencesOfWord(sentence, word) {
    const match = sentence.match(new RegExp(`\\b${word}\\b`, "gi"));
    return match === null ? 0 : match.length;
}

console.log(occurrencesOfWord("The waterfall was so high, that the child couldn't see its peak.", "the"));
console.log(occurrencesOfWord("How do you plan on achieving that? How? How can you even think of that?", "how"));
console.log(occurrencesOfWord("There was one. Therefore I bought it. I wouldn't buy it otherwise.", "there"));