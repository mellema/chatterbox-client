// YOUR CODE HERE:
//
//var url = 'https://api.parse.com/1/classes/chatterbox';

var app = {};
//clean up user
var user = {'name': window.location.href.split('username=')[1], 'friends': {}};

//do we need this?
app.init = function(){
  this.server = 'https://api.parse.com/1/classes/chatterbox';
};

app.send = function(message){
  app.init();
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log(message);
      console.log('chatterbox: Message sent');
      app.addMessage(message);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
      console.log(data);
    }
  });
};

app.fetch = function(){
  app.init();
  $.ajax({
    url: app.server,
    type: 'GET',
    //data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      //improve iteration?
      console.log('chatterbox: Get succeeded');
      for(var i = 0; i < data.results.length; i++){
        app.addMessage(data.results[i]);
      }
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message(s)');
    }
  });
};

app.clearMessages = function(){
  $('#chats').empty();
};

app.addMessage = function(message){
  var $userName = $('<span>').addClass('username').text(message.username);
  var $message = $('<p>').addClass('messageContent').text(message.text);
  var $fullMessage = $('<div>').addClass('message').append($userName).append($message);
  $('#chats').prepend($fullMessage);
};

//make this matter more
app.addRoom = function(roomName){
  var $roomNode = $('<div class="room"></div>');
  $('#roomSelect').append($roomNode.text(roomName));
};

app.addFriend = function(friend){
  if(!user.friends[friend]){
    user.friends[friend] = true;
  }
};

app.removeFriend = function(friend){
  if (!user.friends[friend]){
    delete user.friends[friend];
  }
};


app.handleSubmit = function(){
  var json = {};
  json.text = $('#input').val();
  json.room = null;
  json.username = user.name;

  app.send(json);
};

$(document).ready(function(){
  $('#chats').delegate('span', 'click', function(){
    var temp = this;
    app.addFriend(temp.innerText);
  });

  $('#send').submit(function(){
    app.handleSubmit();
    event.preventDefault();
  });

  setInterval(app.fetch, 5000);
});


//$("button").click(function(){
//  $("input").trigger("select");
//});






















