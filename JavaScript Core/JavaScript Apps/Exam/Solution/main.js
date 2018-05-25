$(function() {
    Sammy("#container", function() {
        this.use("Handlebars", "hbs");

        function home(context) {
            if (auth.isAuth()) {
                context.redirect("#/editor");
                return;
            }

            context
                .loadPartials({
                    header: "./templates/common/header.hbs",
                    footer: "./templates/common/footer.hbs",
                    login: "./templates/forms/login.hbs",
                    register: "./templates/forms/register.hbs"
                })
                .then(function() {
                    this.partial("./templates/home-anon.hbs");
                });
        }

        this.get("index.html", home);
        this.get("#/home", home);

        function validateLogin(username, password, passwordRepeat = password) {
            // typeof username !== "string" ||
            if (username.length < 5) {
                notify.showError("Username should be of a minimum length of 5 characters.");
                return false;
            } else if (password === "") {
                notify.showError("Password fields shouldn't be empty!");
                return false;
            } else if (password !== passwordRepeat) {
                notify.showError("Passwords should match!");
                return false;
            }

            return true;
        }

        this.post("#/register", function(context) {
            const username = context.params["username-register"];
            const password = context.params["password-register"];
            const passwordRepeat = context.params["password-register-check"];

            if (validateLogin(username, password, passwordRepeat)) {
                auth
                    .register(username, password, passwordRepeat)
                    .then(function(response) {
                        auth.saveSession(response);
                        notify.showInfo("User registration successful.");
                        context.redirect("#/overview");
                    });
            }
        });

        this.post("#/login", function(context) {
            const username = context.params["username-login"];
            const password = context.params["password-login"];

            if (validateLogin(username, password)) {
                auth
                    .login(username, password)
                    .then(function(response) {
                        auth.saveSession(response);
                        notify.showInfo("Login successful.");
                        context.redirect("#/overview");
                    });
            }
        });

        this.get("#/logout", function(context) {
            auth
                .logout()
                .then(function() {
                    sessionStorage.clear();
                    context.redirect("#/home");
                    notify.showInfo("Logout successful.");
                });
        });

        this.get("#/editor", function(context) {
            if (!auth.isAuth()) {
                context.redirect("#/home");
                return;
            }

            context.isAuth = auth.isAuth();
            context.username = sessionStorage.getItem("username");

            product
                .getActiveReceipt(sessionStorage.getItem("userId"))
                .then(function(response) {
                    product
                        .getEntries(response._id)
                        .then(function(entries) {
                            for (const entry of entries) {
                                entry.totalCost = entry.quantity * entry.price;
                            }

                            context.products = entries;
                            context.totalPrice = entries.length === 0 ? 0 : entries.reduce((accumulator, entry) => accumulator + entry.totalCost, 0);
                            context.productCount = entries.length;
                            context._id = response._id;

                            context
                                .loadPartials({
                                    header: "./templates/common/header.hbs",
                                    footer: "./templates/common/footer.hbs",
                                    createProduct: "./templates/forms/create-product.hbs",
                                    checkoutReceipt: "./templates/forms/checkout-receipt.hbs"
                                })
                                .then(function() {
                                    this
                                        .partial("./templates/editor.hbs")
                                        .then(function() {
                                            const inputQuantity = $("#create-entry-form input[name='qty']");
                                            const inputPrice = $("#create-entry-form input[name='price']");

                                            const subTotal = $("#sub-total");
                                            const total = $("#totalPrice");

                                            const originalPrice = Number(total.text());

                                            function onChange() {
                                                for (const input of [inputQuantity, inputPrice]) {
                                                    if (!$.isNumeric(input.val())) {
                                                        return;
                                                    }
                                                }

                                                const subTotalPrice = Number(inputQuantity.val()) * Number(inputPrice.val());

                                                subTotal.text(subTotalPrice);
                                                total.text(originalPrice + subTotalPrice);
                                            }

                                            inputQuantity.change(onChange);
                                            inputPrice.change(onChange);
                                        });
                                });
                        });
                });
        });

        this.post("#/product/create", function(context) {
            const type = context.params.type;
            const quantity = context.params.qty;
            const price = context.params.price;

            if (type.length === 0) {
                notify.showError("Product name should be non-empty!");
            } else if (!$.isNumeric(quantity)) {
                notify.showError("Product quantity should be a numeric string!");
            } else if (!$.isNumeric(price)) {
                notify.showError("Product price should be a numeric string!");
            } else {
                product
                    .addEntry(type, quantity, price)
                    .then(function() {
                        context.redirect("#/editor");
                        notify.showInfo("Entry added!");
                    });
            }
        });

        this.get("#/product/delete/:productId", function(context) {
            product.deleteEntry(context.params.productId);
            context.redirect("#/editor");
            notify.showInfo("Entry removed!");
        });

        this.post("#/receipt/checkout", function(context) {
            console.log(context.params);
            if (context.params.productCount === 0) {
                notify.showError("Empty receipts cannot be checked out!");
                return;
            }

            product
                .commitReceipt(context.params.receiptId, context.params.productCount, context.params.total)
                .then(function() {
                    notify.showInfo("Receipt checked out!");
                    context.redirect("#/editor");
                });
        });

        this.get("#/overview", function(context) {
            if (!auth.isAuth()) {
                context.redirect("#/home");
                return;
            }

            context.isAuth = auth.isAuth();
            context.username = sessionStorage.getItem("username");

            product
                .userReceipts(sessionStorage.getItem("userId"))
                .then(function(response) {
                    for (const receipt of response) {
                        const date = new Date(receipt._kmd.ect);

                        const month = (date.getMonth() + 1).toString();

                        receipt.creationDate = `${date.getFullYear()}-${month.length === 1 ? `0${month}` : month}-${date.getUTCDate()} ${date.getHours()}:${date.getMinutes()}`;
                    }

                    context.receipts = response;

                    context
                        .loadPartials({
                            header: "./templates/common/header.hbs",
                            footer: "./templates/common/footer.hbs"
                        })
                        .then(function() {
                            this.partial("./templates/all-receipts.hbs");
                        });
                });
        });

        this.get("#/details/:receiptId", function(context) {
            if (!auth.isAuth()) {
                context.redirect("#/home");
                return;
            }

            context.isAuth = auth.isAuth();
            context.username = sessionStorage.getItem("username");

            product
                .getEntries(context.params.receiptId)
                .then(function(response) {
                    for (const product of response) {
                        product.totalCost = (product.quantity * product.price).toFixed(2);
                        product.price = Number(product.price).toFixed(2);
                    }

                    context.products = response;

                    context
                        .loadPartials({
                            header: "./templates/common/header.hbs",
                            footer: "./templates/common/footer.hbs"
                        })
                        .then(function() {
                            this.partial("./templates/receipt-details.hbs");
                        });
                });
        });
    }).run();
});