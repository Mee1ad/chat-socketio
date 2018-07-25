var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	var socketId = socket.id;
  	var clientIp = socket.request.connection.remoteAddress;

	console.log('New connection from: ' , clientIp);
    socket.on('chat message', function(msg){
    io.emit('chat message', clientIp + ': ' + msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
