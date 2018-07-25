var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	var address = socket.handshake.address;
	console.log('New connection from ' + address.address + ':' + address.port);
    socket.on('chat message', function(msg){
    io.emit('chat message', address.address + ':' + address.port + ': ' + msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
