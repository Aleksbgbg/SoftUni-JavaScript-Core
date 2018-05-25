$(function() {
    const request = (function() {
        const basicAuth = `Basic ${btoa("kid_HkkMcIJnM:db90bf12722b4613b3a38082d34a9211")}`;

        // const basicAuth = `Basic ${btoa("Admin:admin")}`;

        function getRequest(branch, part, method, data, authorization) {
            return $.ajax({
                url: `https://baas.kinvey.com/${part}/kid_HkkMcIJnM${branch}`,
                method,
                headers: {
                    authorization,
                    contentType: "application/json"
                },
                data
                // error: showErrorBox
            });
        }

        return {
            make: function(branch = "", part = "appdata", method = "GET", data = {}) {
                return getRequest(branch, part, method, data, basicAuth);
            },
            makeKinvey: function(branch = "", part = "appdata", method = "GET", data = {}) {
                return getRequest(branch, part, method, data, `Kinvey ${sessionStorage.getItem("authtoken")}`);
            }
        };
    })();

    Sammy("main", function() {
        this.use("Handlebars", "hbs");

        function homeRoute() {
            this
                .loadPartials({
                    header: "./templates/common/header.hbs",
                    footer: "./templates/common/footer.hbs"
                })
                .then(function() {
                    this.partial("./templates/welcome.hbs");
                });
        }

        this.get("index.html", homeRoute);

        this.get("#/login", homeRoute);

        this.get("#/register", function() {
            this
                .loadPartials({
                    header: "./templates/common/header.hbs",
                    footer: "./templates/common/footer.hbs"
                })
                .then(function() {
                    this.partial("./templates/register.hbs");
                });
        });

        this.get("#/contacts", function(context) {
            request
                .makeKinvey("/contacts")
                .then(function(response) {
                    context
                        .loadPartials({
                            header: "./templates/common/header.hbs",
                            footer: "./templates/common/footer.hbs",
                            contact: "./templates/common/contact.hbs",
                            contact_details: "./templates/common/details.hbs",
                            contact_list: "./templates/contact-list.hbs"
                        })
                        .then(function() {
                            context.contacts = response.filter(contact => contact.????? ==!= ???);

                            this.partial("./templates/contacts.hbs");
                        });
                });
        });

        this.get("#/profile", function(context) {
            request
                .makeKinvey(`/contacts/?query={"userId":"${sessionStorage.getItem("id")}"}`)
                .then(function(response) {
                    context.user = response[0];
                    context
                        .loadPartials({
                            header: "./templates/common/header.hbs",
                            footer: "./templates/common/footer.hbs"
                        })
                        .then(function() {
                            this.partial("./templates/profile.hbs");
                        });
                });
        });

        this.get("#/logout", function(context) {
            request
                .makeKinvey("/_logout", "user", "POST")
                .then(function() {
                    sessionStorage.clear();
                    context.redirect("#/login");
                });
        });

        function onLogin(authtoken, username, id) {
            sessionStorage.setItem("authtoken", authtoken);
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("id", id);
        }

        this.post("#/login", function(context) {
            request
                .make("/login", "user", "POST", {
                    username: context.params.username,
                    password: context.params.password
                })
                .then(function(response) {
                    onLogin(response._kmd.authtoken, response.username, response._id);
                    context.redirect("#/contacts");
                });
        });

        this.post("#/register", function(context) {
            request
                .make("", "user", "POST", {
                    username: context.params.username,
                    password: context.params.password
                })
                .then(function(response) {
                    onLogin(response._kmd.authtoken, response.username, response._id);

                    request.makeKinvey("/contacts", "appdata", "POST", {
                        userId: response._id,
                        email: "",
                        firstName: "",
                        lastName: "",
                        phone: ""
                    });

                    context.redirect("#/contacts");
                });
        });

        this.post("#/profile", function(context) {
            request
                .makeKinvey(`/contacts/${context.params.id}`, "appdata", "PUT", {
                    userId: context.params.id,
                    email: context.params.email,
                    firstName: context.params.firstName,
                    lastName: context.params.lastName,
                    phone: context.params.phone
                })
                .then(function() {
                    context.redirect("#/profile");
                });
        });
    }).run();
});