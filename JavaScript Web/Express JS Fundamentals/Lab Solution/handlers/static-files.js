const fs = require("fs");
const path = require("path");
const url = require("url");

module.exports = function(request, response) {
    function getContentType(url) {
        const mimeTypes = {
            ".css": "text/css",
            ".ico": "image/x-icon",
            ".png": "image/png"
        };

        return mimeTypes[path.extname(url)];
    }

    if (!request.pathname) {
        request.pathname = url.parse(request.ulr).pathname;
    }

    if (request.pathname.startsWith("/content/") && request.method === "GET") {
        const filepath = path.normalize(path.join(__dirname, `..${request.pathname}`));

        fs.readFile(filepath, function(error, data) {
            if (error) {
                response.writeHead(404, {
                    "content-type": "text/plain"
                });

                response.write("Resource not found!");
                response.end();

                return;
            }

            response.writeHead(200, {
                "content-type": getContentType(request.pathname)
            });
            response.write(data);
            response.end();
        });

        return false;
    }

    return true;
};