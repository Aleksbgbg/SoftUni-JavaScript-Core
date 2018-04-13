$(function() {
    let townsList;

    (async function() {
        const [townTemplate, townsListTemplate] = await Promise.all([
            $.get("./templates/town.html"),
            $.get("./templates/townsList.html")
        ]);

        Handlebars.registerPartial("town", townTemplate);
        townsList = Handlebars.compile(townsListTemplate);
    })();

    const inputTowns = $("#towns");
    const divRoot = $("#root");

    $("#btnLoadTowns").click(function() {
        divRoot.html(
            townsList({
                towns: inputTowns
                    .val()
                    .split(", ")
                    .map(town => ({
                        name: town
                    }))
            })
        )
    });
});