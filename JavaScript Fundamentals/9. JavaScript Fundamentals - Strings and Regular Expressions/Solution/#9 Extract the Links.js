"use strict";

function extractTheLinks(strings) {
    return strings.join("\n").match(/www.[A-Za-z\d-]+(?:\.[a-z]+)+/g).join("\n");
}

console.log(extractTheLinks([
    "Join WebStars now for free, at www.web-stars.com",
    "You can also support our partners:",
    "Internet - www.internet.com",
    "WebSpiders - www.webspiders101.com",
    "Sentinel - www.sentinel.-ko"
]));
console.log(extractTheLinks([
    "Need information about cheap hotels in London?",
    "You can check us at www.london-hotels.co.uk!",
    "We provide the best services in London.",
    "Here are some reviews in some blogs:",
    "\"London Hotels are awesome!\" - www.indigo.bloggers.com",
    "\"I am very satisfied with their services\" - ww.ivan.bg",
    "\"Best Hotel Services!\" - www.rebel21.sedecrem.moc"
]));