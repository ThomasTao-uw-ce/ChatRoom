"use strict";

process.title = 'node-chat';
// Port where we'll run the websocket server
var webSocketsServerPort = 8080;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

var clients = [ ];

function htmlEntities(str) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var server = http.createServer(function(request, response) {

});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "
      + webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({

  httpServer: server
});

wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin '
      + request.origin + '.');

  var connection = request.accept(null, request.origin); 
  var user = {
    nickname: "s",
    userid: 0,
    connect: connection,
    target: 0,
    members:{}
  }
 
  var index = clients.push(user) - 1;
  console.log((new Date())+index +' is signed to a user.');
  console.log((new Date()) + ' Connection accepted.');


  connection.on('message', function(message) {
    if (message.type === 'utf8') { 
    var msg = JSON.parse(message.utf8Data);

     if(msg.type == "nickname")
     {
      user.nickname = msg.text;
      user.userid = msg.id;
     }
    else if(msg.type == "target")
     {
     
      user.target = msg.text;
      console.log((new Date()) + ' User num.' + user.userid
      + ' is commicating with user num.' + user.target + '.');
     }
     else if(msg.type == "group")
     {
     user.members = msg.text;
      user.target = "g"+msg.group;
      console.log((new Date()) + ' User num.' + user.userid
      + ' is commicating with group num.' + msg.group + '.');
      
     }
     else if(msg.type == "message")
     {
    
      var obj = {

        id: user.userid,
        nickname: user.nickname,
        time: dates(),
        content: msg.text
      };
      var json = JSON.stringify({ type:'message', data: obj });
      var alert = JSON.stringify({ type:'alert', data: user.userid+' have sent a message to you.' });
      if(user.target >0){
      for (var i=0; i < clients.length; i++) {
        if(clients[i].userid == user.target)
        {
          if(clients[i].target == user.userid)
          {
            clients[i].connect.sendUTF(json);
          }
          else
          {
            clients[i].connect.sendUTF(alert);
          }
          
        }
        else if (clients[i].userid == user.userid)
        {
          clients[i].connect.sendUTF(json);
        }
     }
    }
    else
    {

      for (var i=0; i < clients.length; i++) {
        for (var n=0; n < user.members.length; n++) {
        if(clients[i].userid == user.members[n])
        {
          if(clients[i].target == user.target)
          {
            clients[i].connect.sendUTF(json);
          }
          
        }
      }
     }
    }
    }
  }
  });
  // user disconnected
  connection.on('close', function(connection) {
    
      console.log((new Date()) + " User num."
          + user.userid + " disconnected.");
   
      clients.splice(index, 1);
     

    
  });
});
function dates() {
  var d = new Date();
  var y = d.getFullYear();
  var n = addZero(parseInt(d.getMonth())+1);
  var a = addZero(d.getDate());
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  return y + n +a + h + m + s;
}
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}