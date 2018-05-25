$(function() {
    Sammy("#container", function() {
        this.use("Handlebars", "hbs");

        function home(context) {
            context.isAuth = auth.isAuth();

            if (context.isAuth) {
                context.redirect("#/catalog");
                return;
            }

            context
                .loadPartials({
                    header: "./templates/common/header.hbs",
                    footer: "./templates/common/footer.hbs",
                    loginForm: "./templates/forms/login-form.hbs",
                    registerForm: "./templates/forms/register-form.hbs"
                })
                .then(function() {
                    this.partial("./templates/home-anon.hbs");
                });
        }

        this.get("index.html", home);
        this.get("#/home", home);

        this.post("#/register", function(context) {
            if (!/^[A-Za-z]{3,}$/.test(context.params.username)) {
                notify.showError("Username invalid.");
            } else if (!/^[A-Za-z\d]{6,}$/.test(context.params.password)) {
                notify.showError("Password invalid.");
            } else if (context.params.password !== context.params.repeatPass) {
                notify.showError("Passwords do not match.");
            } else {
                auth
                    .register(context.params.username, context.params.password)
                    .then(function(userData) {
                        auth.saveSession(userData);
                        notify.showInfo("User registration successful!");
                        context.redirect("#/catalog");
                    });
            }
        });

        this.post("#/login", function(context) {
            auth
                .login(context.params.username, context.params.password)
                .then(function(userData) {
                    auth.saveSession(userData);
                    notify.showInfo("Login successful!");
                    context.redirect("#/catalog");
                });
        });

        this.get("#/logout", function(context) {
            auth
                .logout()
                .then(function() {
                    sessionStorage.clear();
                    context.redirect("#/home");
                });
        });

        this.get("#/catalog", function(context) {
            if (!auth.isAuth()) {
                context.redirect("#/home");
                return;
            }

            posts
                .getAllPosts()
                .then(function(posts) {
                    for (let index = 0; index < posts.length; ++index) {
                        const post = posts[index];

                        post.rank = index + 1;
                        post.date = calcTime(post._kmd.ect);
                        post.isAuthor = post._acl.creator === sessionStorage.getItem("userId");
                    }

                    context.isAuth = auth.isAuth();
                    context.username = sessionStorage.getItem("username");
                    context.posts = posts;

                    context
                        .loadPartials({
                            header: "./templates/common/header.hbs",
                            footer: "./templates/common/footer.hbs",
                            navigation: "./templates/common/navigation.hbs",
                            postList: "./templates/posts/post-list.hbs",
                            post: "./templates/posts/post.hbs"
                        })
                        .then(function() {
                            this.partial("./templates/posts/catalog.hbs");
                        });
                });
        });

        this.get("#/create/post", function(context) {
            if (!auth.isAuth()) {
                context.redirect("#/home");
                return;
            }

            context.isAuth = auth.isAuth();
            context.username = sessionStorage.getItem("username");

            context
                .loadPartials({
                    header: "./templates/common/header.hbs",
                    footer: "./templates/common/footer.hbs",
                    navigation: "./templates/common/navigation.hbs"
                })
                .then(function() {
                    this.partial("./templates/posts/create-post.hbs");
                });
        });

        this.post("#/create/post", function(context) {
            if (context.params.title === '') {
                notify.showError("Title is required.");
            } else if (context.params.url === '') {
                notify.showError("Url is required.");
            } else if (!context.params.url.startsWith("http")) {
                notify.showError("Url must be a valid link.");
            } else {
                posts
                    .createPost(context.params.author, context.params.title, context.params.description, context.params.url, context.params.imageUrl)
                    .then(function() {
                        notify.showInfo("Post created.");
                        context.redirect("#/catalog");
                    });
            }
        });

        this.get("#/edit/post/:postId", function(context) {
            if (!auth.isAuth()) {
                context.redirect("#/home");
                return;
            }

            posts
                .getPost(context.params.postId)
                .then(function(post) {
                    context.isAuth = auth.isAuth();
                    context.username = sessionStorage.getItem("username");
                    context.post = post;

                    context
                        .loadPartials({
                            header: "./templates/common/header.hbs",
                            footer: "./templates/common/footer.hbs",
                            navigation: "./templates/common/navigation.hbs"
                        })
                        .then(function() {
                            this.partial("./templates/posts/edit-post-page.hbs");
                        });
                });
        });

        this.post("#/edit/post", function(context) {
            if (!auth.isAuth()) {
                context.redirect("#/home");
                return;
            }

            posts
                .editPost(context.params.postId, sessionStorage.getItem("username"), context.params.title, context.params.description, context.params.url, context.params.imageUrl)
                .then(function() {
                    notify.showInfo(`Post ${context.params.title} updated!`);
                });

            posts
                .getPost(context.params.postId)
                .then(function(post) {
                    context.isAuth = auth.isAuth();
                    context.username = sessionStorage.getItem("username");
                    context.post = post;

                    context
                        .loadPartials({
                            header: "./templates/common/header.hbs",
                            footer: "./templates/common/footer.hbs",
                            navigation: "./templates/common/navigation.hbs"
                        })
                        .then(function() {
                            this.partial("./templates/posts/edit-post-page.hbs");
                        });
                });
        });

        function calcTime(dateIsoFormat) {
            let diff = new Date - (new Date(dateIsoFormat));
            diff = Math.floor(diff / 60000);
            if (diff < 1) return 'less than a minute';
            if (diff < 60) return diff + ' minute' + pluralize(diff);
            diff = Math.floor(diff / 60);
            if (diff < 24) return diff + ' hour' + pluralize(diff);
            diff = Math.floor(diff / 24);
            if (diff < 30) return diff + ' day' + pluralize(diff);
            diff = Math.floor(diff / 30);
            if (diff < 12) return diff + ' month' + pluralize(diff);
            diff = Math.floor(diff / 12);
            return diff + ' year' + pluralize(diff);

            function pluralize(value) {
                if (value !== 1) return 's';
                else return '';
            }
        }
    }).run();
});