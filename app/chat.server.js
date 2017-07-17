var http = require('http');
var wSocket = require('ws');
var path = require('path');

var chatui = require("fs").readFileSync("./chatui.html");
// var loader = require("fs").readFileSync("./app/chat.client.js");

var httpServer = new http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(chatui);
        res.end();
    }
    else {
        var filePath = `.${req.url}`;
        extension = path.extname(filePath);

        var data = require('fs').readFile(filePath, (err, buffer) => {
            if (err) {
                errRes(res);
            }
            else {
                res.writeHead(200, require("../app/contenttype.js")(extension));
                res.write(buffer);
                res.end();
            }
        });
    }
});

// else if (req.url === "/app/chat.client.js") {
//     res.writeHead(200, { "Content-Type": "text/javascript" });
//     res.write(loader);
//     res.end();
// }
// else {
//     res.writeHead(404);
//     res.end();
// }


var errRes = function (res) {
    res.writeHead(404);
    res.end();
}

var socketServer = new wSocket.Server({ server: httpServer });

socketServer.broadcast = function (data) {
    socketServer.clients.forEach((client) => {
        if (client.readyState = wSocket.OPEN)
            client.send(data);
    });
};

socketServer.on("connection", (socket) => {
    socket.send("Welcome to chat room!");
    socket.on("message", (msg) => socketServer.broadcast(msg));
});


var port = 8000;
httpServer.listen(port);
console.log(`server running on port ${port}`);