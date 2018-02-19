function validate() {
    const tests = {
        "#username": (text) => /[A-Za-z\d]{3,20}/.test(text),
        "#password": (text) => /W{5, 15}/.test(text),
        "#confirm-password": (text) => tests["#password"](text) &&
                                       $("#password").val() === text,
        "#email": (text) => /.*@.*\..*/.test(text)
    };

    $(document).on("click", "#submit", (event) => {
        for (const field of Object.keys(tests)) {
            if (tests[field]($(field).val())) {
                $(field).css("border-color", "none");
            } else {
                $(field).css("border-color", "red");
            }
        }

        event.preventDefault();
    });
}