const database = require("../config/database");

module.exports = {
    canHandle(path, request) {
        return path === "/status" && request.headers.statusheader === "Full";
    },
    handle(request, response) {
        this.retrieveHtml("status", response, {
            fileProcessor(file) {
                return file.replace("{{replaceMe}}", `${database.length} movies are available.`);
            }
        });
    }
};