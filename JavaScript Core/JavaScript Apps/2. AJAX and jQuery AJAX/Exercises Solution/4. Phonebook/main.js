function attachEvents() {
    const phonebook = $("#phonebook");

    const personInput = $("#person");
    const phoneInput = $("#phone");

    function refresh() {
        $.ajax("https://phonebook-nakov.firebaseio.com/phonebook.json", {
            complete: function (response) {
                populateList(response.responseJSON);
            }
        });
    }

    function populateList(response) {
        phonebook.empty();

        for (const phoneEntry in response) {
            const phoneEntryObject = response[phoneEntry];

            const listItem = $(`<li>${phoneEntryObject.person}: ${phoneEntryObject.phone}</li>`);

            phonebook.append(
                listItem
                    .append($("<button>Delete</button>")
                        .click(function () {
                            $.ajax(`https://phonebook-nakov.firebaseio.com/phonebook/${phoneEntry}.json`, {
                                complete: function (response) {
                                    refresh();
                                },
                                method: "DELETE"
                            });
                        })
                    )
            );
        }
    }

    $("#btnLoad").click(refresh);

    $("#btnCreate").click(function () {
        $.ajax("https://phonebook-nakov.firebaseio.com/phonebook.json", {
            complete: function (response) {
                console.log(response.responseJSON);
                refresh();
            },
            data: JSON.stringify({
                person: personInput.val(),
                phone: phoneInput.val()
            }),
            method: "POST"
        });
    });
}

$(attachEvents);