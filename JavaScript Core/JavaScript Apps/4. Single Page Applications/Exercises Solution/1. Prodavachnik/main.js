function main() {
    const anchors = $("header a");
    const anchorsById = {};

    for (let anchor of anchors) {
        anchor = $(anchor);

        const anchorId = anchor.attr("id");
        anchorsById[anchorId] = anchor;

        if (anchorId === "linkLogout") {
            continue;
        }

        const sectionId = anchorId.replace("link", "view");
        anchor.click(() => showSection(sectionId));
    }

    function showAnchors(ids) {
        anchors.hide();

        for (const id of ids) {
            anchorsById[id].show();
        }
    }

    function showInitialAnchors() {
        showAnchors(["linkHome", "linkLogin", "linkRegister"]);
    }

    showInitialAnchors();

    const sections = $("section:nth-of-type(n+4)");
    const sectionsById = {};

    for (let section of sections) {
        section = $(section);
        sectionsById[section.attr("id")] = section;
    }

    function showSection(id) {
        sections.hide();
        sectionsById[id].show();
    }

    showSection("viewHome");

    const [showLoadingBox, showInfoBox, showErrorBox] = (function() {
        const boxes = $("section:nth-of-type(-n+3)");

        function makeShowBox(boxSelector, parameterFormatter) {
            const box = $(boxSelector);

            return function(parameter) {
                boxes.hide();

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
    })();

    const request = (function() {
        const basicAuth = `Basic ${btoa("kid_B1zZzDGoz:39b6d04401cb4788994fe59aeee49e05")}`;
        // const basicAuth = `Basic ${btoa("Admin:admin")}`;

        function getRequest(branch, part, method, data, authorization) {
            return $.ajax({
                url: `https://baas.kinvey.com/${part}/kid_B1zZzDGoz${branch}`,
                method,
                headers: {
                    authorization,
                    contentType: "application/json"
                },
                data,
                error: showErrorBox
            });
        }

        return {
            make: function(branch = "", part = "appdata", method = "GET", data = {}) {
                return getRequest(branch, part, method, data, basicAuth);
            },
            makeKinvey: function(branch = "", part = "appdata", method = "GET", data = {}) {
                return getRequest(branch, part, method, data, `Kinvey ${sessionStorage.getItem("authToken")}`);
            }
        };
    })();

    function findElement(section, query, find = "name", type = "input") {
        return sectionsById[section].find(`form ${type}[${find}='${query}']`);
    }

    function getLoginData(section) {
        return {
            username: findElement(section, "username").val(),
            password: findElement(section, "password").val()
        };
    }

    const loggedInUser = $("#loggedInUser");

    function onLogin(authToken, username) {
        sessionStorage.setItem("authToken", authToken);
        sessionStorage.setItem("username", username);

        loggedInUser.text(`Welcome, ${username}!`);

        showAnchors(["linkHome", "linkListAds", "linkCreateAd", "linkLogout"]);
        showInfoBox("Logged in!");

        refreshAds();

        showSection("viewListAds");
    }

    findElement("viewRegister", "button", "type")
        .click(function() {
            showLoadingBox();

            request
                .make("", "user", "POST", getLoginData("viewRegister"))
                .then(function(response) {
                    showInfoBox("Registered successfully!");
                    onLogin(response._kmd.authtoken, response.username);
                });
        });

    findElement("viewLogin", "button", "type")
        .click(function() {
            showLoadingBox();

            request
                .make("/login", "user", "POST", getLoginData("viewLogin"))
                .then(function(response) {
                    onLogin(response._kmd.authtoken, response.username);
                });
        });

    anchorsById["linkLogout"]
        .click(function() {
            showLoadingBox();

            request
                .makeKinvey("/_logout", "user", "POST")
                .then(function() {
                    for (const item of ["authToken", "username"]) {
                        sessionStorage.removeItem(item);
                    }

                    showInitialAnchors();

                    showSection("viewHome");

                    loggedInUser.text("");

                    showInfoBox("Logged out.");
                });
        });

    const table = sectionsById["viewListAds"].find("table");

    function refreshAds() {
        showLoadingBox();

        table
            .empty()
            .append(`<tr>
                    <th>Title</th>
                    <th>Publisher</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Date Published</th>
                </tr>`);

        request
            .makeKinvey("/ads")
            .then(function(response) {
                for (const ad of response) {
                    attachAd(ad);
                }

                showInfoBox("Loaded all ads.");
            });
    }

    const ads = {};

    function attachAd(ad) {
        const row = $("<tr>");

        const title = $(`<td>${ad.title}</td>`);
        const author = $(`<td>${ad.author}</td>`);
        const description = $(`<td>${ad.description}</td>`);
        const price = $(`<td>${ad.price}</td>`);
        const publishDate = $(`<td>${ad.publishDate}</td>`);

        ads[ad._id] = {
            title,
            author,
            description,
            price,
            publishDate
        };

        table
            .append(row
                .append(title)
                .append(author)
                .append(description)
                .append(price)
                .append(publishDate)
                .append($("<td>")
                    .append($("<a href='#'>[Delete]</a>")
                        .click(function() {
                            showLoadingBox();

                            request
                                .makeKinvey(`/ads/${ad._id}`, "appdata", "DELETE")
                                .then(function() {
                                    row.remove();
                                    showInfoBox("Deleted ad.");
                                });
                        })
                    )
                    .append($("<a href='#'>[Edit]</a>")
                        .click(function() {
                            if (localStorage.getItem("username") !== ad.publisher) {
                                showErrorBox({
                                    status: 401,
                                    statusText: "Unauthorized"
                                });
                                return;
                            }

                            findElement("viewEditAd", "id").val(ad._id);
                            findElement("viewEditAd", "title").val(ad.title);
                            findElement("viewEditAd", "description", "name", "textarea").val(ad.description);
                            findElement("viewEditAd", "datePublished").val(ad.publishDate);
                            findElement("viewEditAd", "price").val(ad.price);

                            showSection("viewEditAd");
                        })
                    )
                )
            );
    }

    function getPostData(section) {
        return {
            title: findElement(section, "title").val(),
            author: sessionStorage.getItem("username"),
            description: findElement(section, "description", "name", "textarea").val(),
            publishDate: findElement(section, "datePublished").val(),
            price: findElement(section, "price").val()
        };
    }

    findElement("viewCreateAd", "button", "type")
        .click(function() {
            showLoadingBox();

            request
                .makeKinvey("/ads", "appdata", "POST", getPostData("viewCreateAd"))
                .then(function(response) {
                    attachAd(response);
                    showInfoBox("Added ad!");

                    showSection("viewListAds");
                });
        });

    findElement("viewEditAd", "button", "type")
        .click(function() {
            showLoadingBox();

            const adId = findElement("viewEditAd", "id").val();

            request
                .makeKinvey(`/ads/${adId}`, "appdata", "PUT", getPostData("viewEditAd"))
                .then(function(response) {
                    const adColumns = ads[adId];

                    for (const parameter of ["title", "author", "description", "publishDate", "price"]) {
                        adColumns[parameter].text(response[parameter]);
                    }

                    showInfoBox("Edited ad!");

                    showSection("viewListAds");
                });
        });
}

$(main);