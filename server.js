
const liveServer = require("live-server");

const params = {
    port: 3000,
    host: "0.0.0.0",
    root: ".",
    open: false,
    file: "index.html",
    wait: 1000,
    logLevel: 2
};

liveServer.start(params);
console.log("Live server started on port 3000!");
