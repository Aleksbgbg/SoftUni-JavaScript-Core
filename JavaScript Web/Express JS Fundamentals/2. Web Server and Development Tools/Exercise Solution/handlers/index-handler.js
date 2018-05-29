const fs = require("fs");

module.exports = {
    canHandle(path) {
        return path === "" || path === "/";
    },
    handle(request, response) {
        this.retrieveHtml("home", response);
    }
};