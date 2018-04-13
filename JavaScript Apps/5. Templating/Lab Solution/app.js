$(async function() {
    const [contact, contactsList, detail] = await Promise.all([
        $.get("./templates/contact.html"),
        $.get("./templates/contactsList.html"),
        $.get("./templates/detail.html")
    ]);

    Handlebars.registerPartial("contact", contact);

    const templates = {
        contactsList: Handlebars.compile(contactsList),
        detail: Handlebars.compile(detail)
    };

    const context = {
        contacts: await $.get("data.json")
    };

    $("div#list div.content").html(templates.contactsList(context));

    const divDetails = $("div#details div.content");

    $(".contact").click(function(event) {
        const contactIndex = $(event.target)
            .closest(".contact")
            .attr("data-index");

        divDetails.html(templates.detail(context.contacts[contactIndex]));
    });
});