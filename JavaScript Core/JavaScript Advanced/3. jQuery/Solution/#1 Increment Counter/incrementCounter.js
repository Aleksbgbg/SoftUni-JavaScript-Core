function incrementCounter(selector) {
    const textArea = $("<textarea class='counter' attr='disabled'>").val(0);
    const incrementButton = $("<button class='button' id='incrementBtn'>Increment</button>");
    const addButton = $("<button class='button' id='addBtn'>Add</button>");
    const ul = $("<ul class='results'>");

    incrementButton.click(() => {
        textArea.val(Number(textArea.val()) + 1);
    });

    addButton.click(() => {
        $(`<li>${textArea.val()}</li>`).appendTo(ul);
    });

    $(selector)
        .append(textArea)
        .append(incrementButton)
        .append(addButton)
        .append(ul);
}