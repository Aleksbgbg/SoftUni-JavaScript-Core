function bookGenerator(selector, title, author, isbn) {
    let index = 0;

    const bookDiv = $(`<div id="book${++index}" style="border: medium none;">
    <p class="title">${title}</p>
    <p class="author">${author}</p>
    <p class="isbn">${isbn}</p>
</div>`);

    bookDiv.appendTo($(selector));

    const selectButton = $("<button>Select</button>");
    const deselectButton = $("<button>Deselect</button>");

    selectButton.click(() => {
        bookDiv.css("border", "2px solid blue");
    });

    deselectButton.click(() => {
        bookDiv.css("border", "");
    });

    selectButton.appendTo(bookDiv);
    deselectButton.appendTo(bookDiv);
}