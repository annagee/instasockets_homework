var socket = io.connect('http://b671d092.ngrok.io');
socket.on('instagram', function() {
   alert("Connected!");
});

$.ajax({
      url: 'https://api.instagram.com/v1/tags/' + obj[0].object_id +'/media/recent?client_id=' + '4723704c5af04fcbbe835ae0a27a29bb',
      crossdomain: true,
      dataType: 'jsonp'
    }).done 