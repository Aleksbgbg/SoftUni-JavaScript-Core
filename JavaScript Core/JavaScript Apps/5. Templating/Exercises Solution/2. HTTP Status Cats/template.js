$(function() {
    (async function() {
        const [catTemplate, catsListTemplate] = await Promise.all([
            $.get("./templates/cat.html"),
            $.get("./templates/catsList.html")
        ]);

        Handlebars.registerPartial("cat", catTemplate);

        const catList = Handlebars.compile(catsListTemplate);

        $("#allCats").html(catList({ cats }));

        for (let button of $("button.btn.btn-primary")) {
            let isOpened = false;

            button = $(button);

            button.click(function() {
                button.siblings("div").css("display", isOpened ? "none" : "");

                button.text(isOpened ? "Show status code" : "Hide status code");

                isOpened = !isOpened;
            });
        }
    })();
});