function multiplicationTable(n) {
    let html = "<table border=\"1\">\n";

    for (let row = 0; row <= n; ++row) {
        html += `  <tr><th>${row === 0 ? "x" : row}</th>`;

        for (let column = 1; column <= n; ++column) {
            html += `<th>${column * Math.max(1, row)}</th>`;
        }

        html += "</tr>\n";
    }

    html += "</table>";

    console.log(html);
}

multiplicationTable(5);