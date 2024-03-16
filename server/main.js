const cli = require('node-server-cli');

cli.api.setup(90, {
    "/title": (request) => {
        request.sendJson({ "title": "Now time: " + new Date().toLocaleTimeString() });
    },
})