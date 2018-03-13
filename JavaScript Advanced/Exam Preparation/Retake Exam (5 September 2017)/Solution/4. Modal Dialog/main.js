class Dialog {
    constructor(message, callback) {
        this.message = message;
        this.callback = callback;

        this.inputDialogs = [];
    }

    addInput(label, name, type) {
        this.inputDialogs.push($(`<div><label>${label}</label><input name="${name}" type="${type}"/><div/>`));
    }

    render() {
        const buttonOk = $("<button>OK</button>");
        const buttonCancel = $("<button>Cancel</button>");

        const overlayDiv = $(`<div class="overlay">`)
            .append(
                $(`<div class="dialog"><p>${this.message}</p></div>`)
                    .append(this.inputDialogs)
                    .append(buttonOk)
                    .append(buttonCancel)
            );

        {
            const inputDialogs = this.inputDialogs;
            const callback = this.callback;

            buttonOk.click(function() {
                const parameters = { };

                for (const inputDialog of inputDialogs) {
                    const input = inputDialog.find("input");

                    parameters[input.attr("name")] = input.val();
                }

                callback(parameters);

                overlayDiv.remove();
            });
        }

        buttonCancel.click(function() {
            overlayDiv.remove();
        });

        $("body").append(overlayDiv);
    }
}