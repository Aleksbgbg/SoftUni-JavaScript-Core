const fs = require("fs");

const path = require("path");
const url = require("url");

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon"
};

function getContentType(file) {
    return mimeTypes[path.extname(file).trimLeft(".")];
}

module.exports = {
    canHandle(path) {
        return path.startsWith("/content");
    },
    handle(request, response) {
        const self = this;

        const filepath = path.normalize(path.join(__dirname, "..", url.parse(request.url).pathname));

        fs.exists(filepath, function(exists) {
            if (exists) {
                response.writeHead(200, {
                    "content-type": getContentType(filepath)
                });

                fs.createReadStream(filepath).pipe(response);

                return;
            }

            self.handle404(request, response);
        });
    }
};