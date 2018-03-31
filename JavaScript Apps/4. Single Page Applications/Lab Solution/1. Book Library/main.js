$(function() {
    const authorization = `Basic ${btoa("kid_SJoe9TjqM:c0c4cc8058e441b39cdb09af56558156")}`;

    function formRequest(branch = "", part = "appdata", method = "GET", data = {}) {
        return $.ajax({
            url: `https://baas.kinvey.com/${part}/kid_SJoe9TjqM${branch}`,
            method,
            headers: {
                authorization,
                contentType: "application/json"
            },
            data
        });
    }

    const allSections = $("main section:nth-child(n+4)");

    const sectionsById = {};

    for (let section of allSections) {
        section = $(section);

        const sectionId = section.attr("id");

        sectionsById[sectionId] = section;

        $(sectionId.replace("view", "#link")).click(() => showSection(sectionId));
    }

    function showSection(id) {
        allSections.hide();

        sectionsById[id].show();
    }

    function findInput(section, query, find="name") {
        console.log("here");
        return sectionsById[section].find(`form input[${find}='${query}']`);
    }

    const headersById = {};

    for (let anchor of $("header a")) {
        anchor = $(anchor);

        headersById[anchor.attr("id")] = anchor;
    }

    // Home

    showSection("viewHome");

    // Login

    const loggedInUser = $("#loggedInUser");

    function onLogin(authToken, username) {
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("username", username);

        loggedInUser.text(username);

        for (const header of ["linkLogin", "linkRegister"]) {
            headersById[header].hide();
        }

        headersById["linkLogout"].show();
    }

    findInput("viewLogin", "submit", "type")
        .click(function(event) {
            event.preventDefault();

            console.log(event);

            $
                .ajax(formRequest("/login", "user", "POST", {
                    username: findInput("viewLogin", "username"),
                    password: findInput("viewLogin", "password")
                }))
                .then(function(response) {
                    console.log(response);
                    onLogin(response._kmd.authtoken, response.username);
                });
        });

    // Register

    findInput("viewRegister", "submit")
        .click(function(event) {
            event.preventDefault();

            $
                .ajax(formRequest("", "user", "POST", {
                    username: findInput("viewRegister", "username").val(),
                    password: findInput("viewRegister", "password").val()
                }))
                .then(function(response) {
                    onLogin(response._kmd.authtoken, response.username);
                });
        });

    // Logout

    headersById["linkLogout"]
        .hide()
        .click(function() {
            $
                .ajax(formRequest("_logout", "user", "POST"))
                .then(function(response) {

                });

            for (const item of ["authToken", "username"]) {
                localStorage.removeItem(item);
            }

            headersById["linkLogout"].hide();

            for (const header of ["linkLogin", "linkRegister"]) {
                header.show();
            }
        });

    // List Books

    const table = $("#books table");

    function reloadTable() {
        const excessTrs = table.find("tr:nth-child(n+2)");

        excessTrs.remove();

        $
            .ajax("https://baas.kinvey.com/appdata/kid_SJoe9TjqM/Books", {
                headers: {
                    authorization: `Basic ${btoa("Gosho:pesho")}`
                }
            })
            .then(function(response) {
                for (const book of response) {
                    table
                        .append($(`<tr>
                                        <td>${book.title}</td>
                                        <td>${book.author}</td>
                                        <td>${book.description}</td>
                                   </tr>`)
                            .append($("<td>")
                                .append($("<a href='#'>[Delete]</a>")
                                    .click(function() {
                                        $.ajax(`https://baas.kinvey.com/appdata/kid_SJoe9TjqM/Books/${book._id}`, {
                                            method: "DELETE",
                                            headers: {
                                                authorization
                                            }
                                        });
                                    })
                                )
                                .append($("<a href='#'>[Edit]</a>")
                                    .click(function() {

                                    })
                                )
                            )
                        );
                }
            });
    }

    reloadTable();

    // Create Book
});