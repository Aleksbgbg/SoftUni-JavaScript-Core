"use strict";

function captureTheNumbers(strings) {
    return strings.join(" ").match(/\d+/g).join(" ");
}

console.log(captureTheNumbers([
    "The300",
    "What is that?",
    "I think it’s the 3rd movie.",
    "Lets watch it at 22:45"
]));

console.log(captureTheNumbers([
    "123a456",
    "789b987",
    "654c321",
    "0"
]));

console.log(captureTheNumbers([
    "Let's go11!!!11!",
    "Okey!1!"
]));