const database = require("../config/database");
const querystring = require("querystring");
const url = require("url");

module.exports = {
    canHandle(path, request) {
        return request.method === "POST" && path.endsWith("addMovie");
    },
    handle(request, response) {
        this.processStream(request, data => {
            const parsedData = querystring.parse(data);

            this.retrieveHtml("addMovie", response, {
                fileProcessor(file) {
                    if (parsedData.movieTitle && parsedData.moviePoster) {
                        database.push(parsedData);

                        return file.replace("{{replaceMe}}", "<div id=\"succssesBox\"><h2 id=\"succssesMsg\">Movie Added</h2></div>");
                    }

                    return file.replace("{{replaceMe}}", "<div id=\"errBox\"><h2 id=\"errMsg\">Please fill all fields</h2></div>");
                }
            });
        });
    }
};