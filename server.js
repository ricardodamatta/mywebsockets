var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs')
// had to add ", process.env.IP || '127.0.0.1'" below to make the process work
    app.listen(process.env.PORT || 8001, process.env.IP || '127.0.0.1');

function handler(req, res) {
    fs.readFile('index.html',

    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200, {
            'Content-Type': 'text/html',
            "Content-Length": data.length
        });
        res.end(data);
    });
}

io.sockets.on('connection', function (socket) {
    // echo the message
    socket.on('message', function (data) {
        console.info(data);
        socket.send("[ECHO] " + data);
    });
});