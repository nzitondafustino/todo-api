var http=require('http');
var app=require('./app');
var port=process.env.PORT || 3000;


//creating server
var server=http.createServer(app);

//listenning to a port

server.listen(port);
