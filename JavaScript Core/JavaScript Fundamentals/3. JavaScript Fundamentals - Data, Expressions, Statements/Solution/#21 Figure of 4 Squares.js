function figureOf4(size) {
    let figure = "";

    function drawBreak(size, figure) {
        figure += ("+" + "-".repeat(size - 2)).repeat(2) + "+\n";

        return figure;
    }

    function drawMiddle(size, figure) {
        const isEven = size % 2;

        let rows = 0;

        if (isEven) {
            rows = (size - 4) / 2;
        } else {
            rows = (size - 3) / 2;
        }

        rows = Math.max(rows, 0);

        for (let row = 0; row < rows; ++row) {
            figure += ("|" + " ".repeat(size - 2)).repeat(2) + "|\n";
        }

        return figure;
    }

    figure = drawBreak(size, figure);

    if (size !== 2) {
        figure = drawMiddle(size, figure);

        figure = drawBreak(size, figure);

        figure = drawMiddle(size, figure);

        figure = drawBreak(size, figure);
    }

    console.log(figure);
}

figureOf4(4);
figureOf4(5);
figureOf4(6);
figureOf4(7);