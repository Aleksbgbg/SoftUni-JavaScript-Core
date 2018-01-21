function templateFormat(elements) {
    function formatQuestion(question) {
        return `<question>\n${question}\n</question>\n`;
    }

    function formatAnswer(answer) {
        return `<answer>\n${answer}\n</answer>\n`;
    }

    let html = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
        "<quiz>\n";

    for (let index = 0; index < elements.length; index += 2) {
        html += formatQuestion(elements[index]);
        html += formatAnswer(elements[index + 1]);
    }

    html += "</quiz>";

    console.log(html);
}

templateFormat(["Who was the forty-second president of the U.S.A.?", "William Jefferson Clinton"]);
templateFormat(["Dry ice is a frozen form of which gas?", "Carbon Dioxide", "What is the brightest star in the night sky?", "Sirius"]);