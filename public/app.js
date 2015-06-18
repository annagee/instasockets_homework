var socket = io.connect('http://b671d092.ngrok.io');
socket.on('connected', function() {
   alert("Connected!");
});



mostRecent: function() {
    socket.on('firstShow', function (data) {
        var
            query = data,
            source = $('#firstShow-tpl').html(),
            compiledTemplate = Handlebars.compile(source),
            result = compiledTemplate(query),
            imgWrap = $('#imgContent');

        imgWrap.html(result);
    });
},

getData: function() {
    var self = this;
    socket.on('show', function(data) {
        var url = data.show;
        $.ajax({
            url: url,
            type: 'POST',
            crossDomain: true,
            dataType: 'jsonp'
        }).done(function (data) {
            self.renderTemplate(data);
        }); 
    });
}
// $(document).ready(function() {
// $.ajax({
//       url: 'https://api.instagram.com/v1/tags/' + obj[0].object_id +'/media/recent?client_id=' + 'key',
//       crossdomain: true,
//       dataType: 'jsonp'
//     }).done   

// });



