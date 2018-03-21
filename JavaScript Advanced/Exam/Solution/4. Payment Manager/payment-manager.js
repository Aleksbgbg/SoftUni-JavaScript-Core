class PaymentManager {
    constructor(title) {
        this.title = title;
    }

    render(id) {
        const tableBody = $("<tbody class=\"payments\">");

        const nameInput = $("<input name=\"name\" type=\"text\">");
        const categoryInput = $("<input name=\"category\" type=\"text\">");
        const priceInput = $("<input name=\"price\" type=\"number\">");

        $(`#${id}`)
            .append($("<table>")
                .append($(`<caption>${this.title} Payment Manager</caption>`))
                .append($(`<thead>
        <tr>
            <th class="name">Name</th>
            <th class="category">Category</th>
            <th class="price">Price</th>
            <th>Actions</th>
        </tr>
   </thead>`))
                .append(tableBody)
                .append($(`<tfoot class="input-data">`)
                    .append($("<tr>")
                        .append($("<td>")
                            .append(nameInput))
                        .append($("<td>")
                            .append(categoryInput))
                        .append($("<td>")
                            .append(priceInput))
                        .append($("<td>")
                            .append($("<button>Add</button>")
                                .click(function () {
                                    const inputs = [nameInput, categoryInput, priceInput];
                                    const values = inputs.map(input => input.val());

                                    if (values.some(value => value === "")) {
                                        return;
                                    }

                                    const [name, category, price] = values;

                                    const row = $(`<tr>
            <td>${name}</td>
            <td>${category}</td>
            <td>${Number(price)}</td>
        </tr>`);

                                    tableBody
                                        .append(row
                                            .append($("<td>")
                                                .append($("<button>Delete</button>")
                                                    .click(function () {
                                                        row.remove();
                                                    })
                                                )
                                            )
                                        );

                                    for (const input of inputs) {
                                        input.val("");
                                    }
                                })
                            )
                        )
                    )
                )
            );
    }
}