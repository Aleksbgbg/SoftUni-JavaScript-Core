const fs = require("fs");
const path = require("path");

const handlers = [];

const functions = {
    handle404(request, response) {
        response.writeHead(404, {
            "content-type": "text/plain"
        });

        response.write("Content not found.");
        response.end();
    },
    retrieveHtml(name, responseStream, options) {
        const defaultOptions = {
            streamProcessor: (file, response) => file.pipe(response),
            fileProcessor: null
        };

        if (!options) {
            options = { };
        }

        for (const option in defaultOptions) {
            if (!options.hasOwnProperty(option)) {
                options[option] = defaultOptions[option];
            }
        }

        responseStream.writeHead(200, {
            "content-type": "text/html"
        });

        const fileStream = fs.createReadStream(path.join(`./views/${name}.html`));

        if (options.fileProcessor) {
            this.processStream(fileStream, function(file) {
                responseStream.write(options.fileProcessor(file));
                responseStream.end();
            });
        } else {
            options.streamProcessor(fileStream, responseStream);
        }
    },
    processStream(stream, processor) {
        let file = "";

        stream.on("data", data => file += data.toString());
        stream.on("end", function() {
            processor(file);
        });
    }
};

for (const file of fs.readdirSync("./handlers")) {
    if (!file.endsWith("handler.js")) {
        continue;
    }

    const handler = require(`./${file}`);
    handlers.push(handler);

    for (const func in functions) {
        handler[func] = functions[func];
    }
}

module.exports = {
    handlers,
    functions
};