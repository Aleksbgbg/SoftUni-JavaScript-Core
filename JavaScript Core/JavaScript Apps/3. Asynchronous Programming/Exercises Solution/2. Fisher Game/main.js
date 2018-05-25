function attachEvents() {
    function getFullUrl(part) {
        return `https://baas.kinvey.com/appdata/kid_SJxHHj75G/${part}`;
    }

    class CatchManager {
        constructor(dataForm) {
            this.dataForm = dataForm;
        }

        getData(inputType) {
            return this.dataForm.children(`input.${inputType}`).val();
        }
    }

    const authorization = `Basic ${btoa("Gosho:pesho")}`;

    const divCatches = $("#catches").empty();

    class Catch {
        constructor(dataProvider) {
            this.data = { };

            {
                const dataProviderManager = (function() {
                    if (dataProvider instanceof CatchManager) {
                        return function(property) {
                            return dataProvider.getData(property);
                        };
                    }

                    return function(property) {
                        return dataProvider[property];
                    };
                })();

                for (const property of [
                    "angler",
                    "weight",
                    "species",
                    "location",
                    "bait",
                    "captureTime"
                ]) {
                    this.data[property] = dataProviderManager(property);
                }
            }

            const dataForm = $("<div class=\"catch\">");

            this.dataForm = dataForm;

            divCatches
                .append(
                    dataForm
                        .append("<label>Angler</label>")
                        .append(`<input type="text" class="angler" value="${this.data.angler}">`)
                        .append("<label>Weight</label>")
                        .append(`<input type="number" class="weight" value="${this.data.weight}">`)
                        .append("<label>Species</label>")
                        .append(`<input type="text" class="species" value="${this.data.species}">`)
                        .append("<label>Location</label>")
                        .append(`<input type="text" class="location" value="${this.data.location}">`)
                        .append("<label>Bait</label>")
                        .append(`<input type="text" class="bait" value="${this.data.bait}">`)
                        .append("<label>Capture Time</label>")
                        .append(`<input type="number" class="captureTime" value="${this.data.captureTime}">`)
                        .append(
                            $("<button class=\"update\">Update</button>")
                                .click((function() {
                                    this.put();
                                }).bind(this))
                        )
                        .append(
                            $("<button class=\"delete\">Delete</button>")
                                .click((function() {
                                    this.delete();
                                }).bind(this))
                        )
                );

            this.catchManager = new CatchManager(dataForm);
        }

        get catchId() {
            return this._catchId;
        }

        set catchId(value) {
            this._catchId = value;

            this.dataForm.attr("data-id", this.catchId);
        }

        get requestUrl() {
            return getFullUrl(`biggestCatches/${this.catchId}`);
        }

        updateData() {
            for (const property in this.data) {
                this.data[property] = this.catchManager.getData(property);
            }
        }

        post() {
            $
                .post({
                    url: getFullUrl("biggestCatches"),
                    headers: {
                        authorization,
                        contentType: "application/json"
                    },
                    data: this.data
                })
                .then((function(response) {
                    this.catchId = response._id;
                }).bind(this));
        }

        put() {
            this.updateData();

            $.ajax({
                url: this.requestUrl,
                method: "PUT",
                headers: {
                    authorization,
                    contentType: "application/json"
                },
                data: this.data
            });
        }

        delete() {
            $.ajax({
                url: this.requestUrl,
                method: "DELETE",
                headers: {
                    authorization,
                    contentType: "application/json"
                }
            });

            this.dataForm.remove();
        }
    }

    $("button.load").click(function() {
        divCatches.empty();

        $
            .get({
                url: getFullUrl("biggestCatches"),
                headers: {
                    authorization
                }
            })
            .then(function(response) {
                for (const catchData of response) {
                    new Catch(catchData).catchId = catchData._id;
                }
            });
    });

    const catchManager = new CatchManager($("#addForm"));

    $("button.add").click(function() {
        new Catch(catchManager).post();
    });
}

$(attachEvents);