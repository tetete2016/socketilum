var WebSocketServer = require('websocket').server;
var http = require('http');
console.log("app is running");
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen((process.env.PORT || 5000), function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        //remove conncetion from array
    });
    conncetionArr.push(connection);
});











var colors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var conncetionArr = [];

var id = 0;

var count = 0;
var animate = true;

/*
app.get('/getcolor', function (request, response) {
    console.log(request.query);
    responseArr.push(response);
    //response.send("[" + colors + "]");
});
app.get('/setcolor', function (request, response) {
    console.log(request.query);
    if (request.query.id != null && request.query.color != null) {
        var index = Number.parseInt(request.query.id, 10);
        colors[index] = request.query.color;
    }
    response.send("sent");
});
app.get('/animate', function (request, response) {
    animate = true;
    response.send("animation started!!");
});
app.get('/stopanimation', function (request, response) {
    animate = false;
    response.send("animation stopped!!");
});
*/
/*
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
    for (var i = 0; i < colors.length; i++) {
        colors[i] = 0;
    }
    timer();
});
*/
console.log('Node app is running on port');
for (var i = 0; i < colors.length; i++) {
    colors[i] = 0;
}
timer();
function timer() {
    for (var i = 0; i < connectionArr.length; i++) {
        connectionArr[i].sendUTF(JSON.stringify(colors));
    }
    if (animate) {
        for (var i = 0; i < colors.length; i++) {
            colors[i] = 0;
        }
        colors[count % 10] = "#FFFFFF";
        if (count > 0) {
            colors[(count - 1) % 10] = "#888888";
        }
        count++;
        /*
        switch (count % 3) {
            case 0:
                colors = [0xff88ff, 0x88ffff, 0x8888ff, 0xff88ff, 0x88ffff, 0x8888ff, 0xff88ff, 0x88ffff, 0x8888ff, 0xff88ff]
                break;
            case 1:
                colors = [0x88ffff, 0x8888ff, 0xff88ff, 0x88ffff, 0x8888ff, 0xff88ff, 0x88ffff, 0x8888ff, 0xff88ff, 0xff88ff]
                break;
            case 2:
                colors = [0x8888ff, 0xff88ff, 0x88ffff, 0x8888ff, 0xff88ff, 0x88ffff, 0x8888ff, 0xff88ff, 0xff88ff, 0x88ffff]
                break;
        }
        */
        setTimeout(timer, 500);
    } else {
        setTimeout(timer, 800);
    }
}