// YOUR CODE HERE:
//
//var url = 'https://api.parse.com/1/classes/chatterbox';

var app = {};

app.init = function(){
  this.server = 'https://api.parse.com/1/classes/chatterbox';
};

app.send = function(message){
  $.ajax({
    // always use this url
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      console.log(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
      console.log(data);
    }
  });
};

app.fetch = function(){
  $.ajax({
    // always use this url
    url: this.server,
    type: 'GET',
    //data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Get succeeded');
      console.log(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message(s)');
      console.log(data);
    }
  });
};

