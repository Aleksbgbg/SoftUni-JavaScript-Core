module.exports = {
    canHandle(path, request) {
        return request.method === "GET" && path.endsWith("addMovie");
    },
    handle(request, response) {
        this.retrieveHtml("addMovie", response);
    }
};