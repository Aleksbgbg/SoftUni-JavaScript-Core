$(function() {
    const authorization = `Basic ${btoa("kid_SJoe9TjqM:c0c4cc8058e441b39cdb09af56558156")}`;

    function formRequest(branch = "", part = "appdata", method = "GET", data = { }) {
        return {
            url: `https://baas.kinvey.com/${part}/kid_SJoe9TjqM${branch}`,
            method,
            headers: {
                authorization,
                contentType: "application/json"
            },
            data
        };
    }

    function attachKinveyAuth(request) {
        request.headers.authorization = `Kinvey ${localStorage.getItem("authToken")}`;

        return request;
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

    function findElement(section, query, find = "name", type = "input") {
        return sectionsById[section].find(`form ${type}[${find}='${query}']`);
    }

    const headersById = {};

    for (let anchor of $("header a")) {
        anchor = $(anchor);

        headersById[anchor.attr("id")] = anchor;
    }

    function showInitialHeader() {
        for (const header of ["linkLogout", "linkListBooks", "linkCreateBook"]) {
            headersById[header].hide();
        }

        for (const header of ["linkLogin", "linkRegister"]) {
            headersById[header].show();
        }
    }

    showInitialHeader();

    showSection("viewHome");

    // Message Boxes

    const [showLoadingBox, showInfoBox, showErrorBox] = function() {
        function makeShowBox(boxSelector, parameterFormatter) {
            const box = $(boxSelector);

            return function(parameter) {
                if (parameter !== undefined) {
                    box.text(parameterFormatter(parameter));
                }

                box.fadeIn();

                setTimeout(() => box.fadeOut(), 1500);
            };
        }

        return [
            makeShowBox("#loadingBox"),
            makeShowBox("#infoBox", message => message),
            makeShowBox("#errorBox", error => `Error ${error.status}: ${error.statusText}`)
        ];
    }();

    // Login

    const loggedInUser = $("#loggedInUser");

    function onLogin(authToken, username) {
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("username", username);

        loggedInUser.text(`Welcome, ${username}!`);

        for (const header of ["linkLogin", "linkRegister"]) {
            headersById[header].hide();
        }

        for (const header of ["linkListBooks", "linkCreateBook", "linkLogout"]) {
            headersById[header].show();
        }

        showInfoBox("Logged in!");

        showSection("viewHome");
    }

    function getLoginData(section) {
        return {
            username: findElement(section, "username").val(),
            password: findElement(section, "password").val()
        };
    }

    findElement("viewLogin", "submit", "type")
        .click(function(event) {
            event.preventDefault();

            showLoadingBox();

            $
                .ajax(formRequest("/login", "user", "POST", getLoginData("viewLogin")))
                .then(function(response) {
                    onLogin(response._kmd.authtoken, response.username);
                })
                .catch(showErrorBox);
        });

    // Register

    findElement("viewRegister", "submit", "type")
        .click(function(event) {
            event.preventDefault();

            showLoadingBox();

            $
                .ajax(formRequest("", "user", "POST", getLoginData("viewRegister")))
                .then(function(response) {
                    onLogin(response._kmd.authtoken, response.username);
                })
                .catch(showErrorBox);
        });

    // Logout

    headersById["linkLogout"]
        .hide()
        .click(function() {
            showLoadingBox();

            $
                .ajax(attachKinveyAuth(formRequest("/_logout", "user", "POST")))
                .then(showInfoBox)
                .catch(showErrorBox);

            for (const item of ["authToken", "username"]) {
                localStorage.removeItem(item);
            }

            showInitialHeader();

            loggedInUser.text("");

            showSection("viewHome");
        });

    // List Books

    const books = { };

    const table = $("#books table");

    function attachBook(book) {
        const title = $(`<td>${book.title}</td>`);
        const author = $(`<td>${book.author}</td>`);
        const description = $(`<td>${book.description}</td>`);

        const row = $("<tr>")
            .append(title)
            .append(author)
            .append(description);

        books[book._id] = {
            title,
            author,
            description
        };

        table
            .append(row
                .append($("<td>")
                    .append($("<a href='#'>[Delete]</a>")
                        .click(function() {
                            showLoadingBox();

                            $
                                .ajax(attachKinveyAuth(formRequest(`/Books/${book._id}`, "appdata", "DELETE")))
                                .then(function() {
                                    row.remove();
                                    showInfoBox("Deleted book!");
                                })
                                .catch(showErrorBox);
                        })
                    )
                    .append($("<a href='#'>[Edit]</a>")
                        .click(function() {
                            findElement("viewEditBook", "id").val(book._id);
                            findElement("viewEditBook", "title").val(book.title);
                            findElement("viewEditBook", "author").val(book.author);
                            findElement("viewEditBook", "description", "name", "textarea").val(book.description);

                            showSection("viewEditBook");
                        })
                    )
                )
            );
    }

    // Load books
    (function() {
        showLoadingBox();

        const excessTrs = table.find("tr:nth-child(n+2)");

        excessTrs.remove();

        $
            .ajax(attachKinveyAuth(formRequest("/Books")))
            .then(function(response) {
                for (const book of response) {
                    attachBook(book);
                }

                showInfoBox("Loaded all books!");
            })
            .catch(showErrorBox);
    })();

    // Create Book

    function getBookData(section) {
        return {
            title: findElement(section, "title").val(),
            author: findElement(section, "author").val(),
            description: findElement(section, "description", "name", "textarea").val()
        };
    }

    findElement("viewCreateBook", "submit", "type")
        .click(function(event) {
            event.preventDefault();

            showLoadingBox();

            $
                .ajax(attachKinveyAuth(formRequest("/Books", "appdata", "POST", getBookData("viewCreateBook"))))
                .then(function(response) {
                    showInfoBox("Added book!");
                    attachBook(response);
                    showSection("viewListBooks");
                })
                .catch(showErrorBox);
        });

    // Edit Book

    findElement("viewEditBook", "submit", "type")
        .click(function(event) {
            event.preventDefault();

            showLoadingBox();

            $
                .ajax(attachKinveyAuth(formRequest(`/Books/${findElement("viewEditBook", "id").val()}`, "appdata",
                    "PUT", getBookData("viewEditBook"))))
                .then(function(response) {
                    showInfoBox("Updated book!");

                    const book = books[response._id];

                    book.title.text(response.title);
                    book.author.text(response.author);
                    book.description.text(response.description);

                    showSection("viewListBooks");
                })
                .catch(showErrorBox);
        });
});