// YOUR CODE HERE:
//
//var url = 'https://api.parse.com/1/classes/chatterbox';

var app = {};
//clean up user
var user = {'name': window.location.href.split('?')[1].split('&')[0].split('=')[1],
  'friends': {},
  'rooms': {},
  'currentRoom': null
};
var defaultData = {'order': '-createdAt'};

var currentData = {'order': '-createdAt'};
//'where': JSON.stringify({"roomname": 'the green room'})

app.reset = function(){
  currentData = defaultData;
  app.fetch(currentData);
};
app.refresh = function(){
  app.fetch(currentData);
};

//do we need this?
app.init = function(){
  this.server = 'https://api.parse.com/1/classes/chatterbox';
};

app.send = function(message){
  // app.init();
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

app.fetch = function(params){
  // app.init();

  $.ajax({
    url: app.server,
    type: 'GET',
    data: params,//, 'username': {'$ne': '123s'}},
    contentType: 'application/json',
    success: function (data) {
      //improve iteration?
      app.clearMessages();
      console.log(data);
      console.log('chatterbox: Get succeeded');
      for(var i = 0; i < data.results.length; i++){
        if (data.results[i].username !== '123s'){
          app.addMessage(data.results[i]);
        }
      }
    },
    error: function (data) {
      console.log(data);
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message(s)');
    }
  });
};

app.clearMessages = function(){
  $('#chats').empty();
};

app.addMessage = function(message){
  if(user.friends[message.username]){
    var $userName = $('<span>', {class: 'username'}).text(message.username).attr('style', 'font-weight: bold');
  }else{
    var $userName = $('<span>', {class: 'username'}).text(message.username);
  }
  var $message = $('<p>', {class: 'messageContent'}).text(message.text);

  var $room = $('<span>', {class: 'room'}).text(message.roomname);
  var $fullMessage = $('<div>', {class: 'message'}).append($userName).append($message).append($room);

  $('#chats').append($fullMessage);
};

//make this matter more
app.addRoom = function(roomName){
  user.rooms[roomName] = true;

  $('#roomList').empty();


  for (var key in user.rooms){
    var room = $('<p>', {class: 'room'}).text(key);
    $('#roomList').append(room);
  }
};

app.addFriend = function(friend){
  if(!user.friends[friend]){
    user.friends[friend] = true;
  }
  $('#friendList').empty();
  for (var key in user.friends){
    var friend = $('<p>', {class: 'username'}).text(key);
    $('#friendList').append(friend);
  }
};

app.removeFriend = function(friend){
  if (user.friends[friend]){
    user.friends[friend] = false;
  }
};


app.handleSubmit = function(){
  var json = {};
  json.text = $('#input').val();
  json.roomname = user.currentRoom || null;
  json.username = user.name;
  $('#input').val('');
  app.send(json);
};

app.leaveRoom = function(){
  user.currentRoom = null;//temp.innerText;
  delete currentData.where;//JSON.stringify({'roomname': temp.innerText});
};

$(document).ready(function(){
  app.init();

  $('body').on('click', '.username', function(){
    var temp = this;
    app.addFriend(temp.innerText);
  });

  $('body').on('click', '.room', function(){
    var temp = this;
    app.addRoom(temp.innerText);
  });

  $('#roomList').on('click', '.room', function(){
    var temp = this;
    user.currentRoom = temp.innerText;
    currentData.where = JSON.stringify({'roomname': temp.innerText});
  });
//'where': JSON.stringify({"roomname": 'the green room'})

  $('#send').submit(function(){
    app.handleSubmit();
    event.preventDefault();

  });

  $('.makeRoom').submit(function(){
    event.preventDefault();
    var room = $('#roomInput').val()
    $('#roomInput').val('');
    app.addRoom(room);
  });


  setInterval(function(){app.fetch(currentData)}, 2000);
});


//$("button").click(function(){
//  $("input").trigger("select");
//});






















