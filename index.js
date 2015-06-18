var express = require('express');
var app = express();
var Instagram = require('instagram-node-lib');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require("body-parser");
server = http.createServer(app); // Create an HTTP server.
port = process.env.PORT || 3000; // Listen on the default port, or on 4000 if there's not one.
var io = require('socket.io').listen(server);


Instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', process.env.INTAGRAM_CLIENT_SECRET);
Instagram.set('callback_url', 'http://b671d092.ngrok.io/callback');
Instagram.set('redirect_uri', 'http://b671d092.ngrok.io/');
Instagram.set('maxSockets', 10);

app.use(morgan('dev'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

app.get('/', function(req,res){
  res.render('index')
});
app.get('/callback', function(req, res){
   Instagram.subscriptions.handshake(req, res); 
});

// app.get('/callback', function(request, response){
//   console.log(data)
// });

app.post('/callback', function(req, res){
  var data = req.body;
  // data.forEach(function(tag){
    io.sockets.emit('instagram', data);
  //   var url = 'https://api.instagram.com/v1/tags/' + tag.object_id +'media/recent?client_id=' + '4723704c5af04fcbbe835ae0a27a29bb';
  //   sendMessage(url);
  // });
  // res.end();
});





Instagram.tags.info({
  name: 'blue',
  complete: function(data){
    console.log(data);
  }
});

Instagram.subscriptions.subscribe({
    object: 'tag',
        object_id: 'blue',
        aspect: 'media',
        callback_url: "http://b671d092.ngrok.io/callback",
        type: 'subscription',
        id: '#' });

server.listen(port, function() {
  console.log('Server started on http://localhost:' + port);
  console.log('working');
  });

// var io = require('socket.io').listen(server);


io.sockets.on('connetion', function(socket) {
   Instagram.tags.recent({
    name:'blue',
    complete: function(data){
      socket.emit('firstShow', {firstShow: data});
    }
   })
  
});


// io.sockets.on('connection', function (socket) {
//   Instagram.tags.recent({ 
//       name: 'lollapalooza',
//       complete: function(data) {
//         socket.emit('firstShow', { firstShow: data });
//       }
//   });
// });