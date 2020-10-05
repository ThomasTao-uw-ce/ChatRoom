/*$(document).ready(function(){
  "use strict";
  alert(uid);
  var send = {userid:0};
 send.userid = uid;


 var connecting = $('#connecting');

 window.WebSocket = window.WebSocket || window.MozWebSocket;
 if (!window.WebSocket) {
      connecting.html($('<p>',
        { text:'Sorry, but your browser doesn\'t support WebSocket.'}
      ));
      return;
    }
    var connection = new WebSocket('ws://192.168.56.1:8080');
    connection.onopen = function () {

    connecting.hide();

    };
    connection.onerror = function (error) {
   
      connecting.html($('<p>', {
        text: 'Sorry, but there\'s some problem with your '
           + 'connection or the server is down.'
      }));
    };
    connection.onmessage = function (message) {

      try 
      {
        var json = JSON.parse(message.data);
      }
      catch (e) 
      {
        console.log('Invalid JSON: ', message.data);
        return;
      }

      if (json.type == 'message') { 
  var msg_date = document.createElement("h6");
  msg_date.innerHTML = datestotime(json.data.time);
  msg_date.className = (json.data.id == uid) ? "slef_msg" : "other_msg";

  var msg_nickname = document.createElement("h5");
  msg_nickname .innerHTML = json.data.nickname;
  msg_nickname.className = (json.data.id == uid) ? "slef_msg" : "other_msg";
  var msg_content = document.createElement("p");
  msg_content.innerHTML = json.data.content;
  msg_content.className = (json.data.id == uid) ? "slef_msg" : "other_msg";
 $("#chat_message").append(msg_date,msg_nickname,msg_content); 
 var elmnt = document.getElementById("chat_message");
 
elmnt.scrollTop=elmnt.scrollHeight;
  
      }
      else if(json.type == 'alert')
      {
      alert(json.data);
      }
      else {
        console.log('Hmm..., I\'ve never seen JSON like this:', json);
      }
    };






  $.ajax({
  type: "POST",
  url: "workers.php?type=5",
  data: send,
  dataType:'JSON',
  cache: false,
  success: function(rep){	
   var arr =  JSON.parse(rep["contacts"]);
   var arr_g =  JSON.parse(rep["groups"]);
   var i = 0;
if(rep["nickname"] == null)
{
  alert("Need a nickname!");
  var newdiv3 = document.createElement("div");
  newdiv3.className = "popbox";
  newdiv3.id = "set_nickname";
  var txt1 = "<p>Please set a nickname:</p>";    
  var txt2 = $("<input id = 'in'>");  
  var txt3 = $("<button></button>").text("Set");

  $("body").append(newdiv3);
  $("#set_nickname").append(txt1,txt2,txt3);
  $("#set_nickname").on("click","button",function(){
    var sent = {userid:0, nickname:"s"};
sent.userid = uid;
sent.nickname = $(this).prev().val();
nickname = $(this).prev().val();

var msg = {
    type: "nickname",
    text: nickname,
    id:   uid,
 
  };  
  connection.send(JSON.stringify(msg));

$.ajax({
method: "POST",
url: "workers.php?type=10",
data: sent,
cache: false,
success: function(rep){alert(rep);},
});
$(this).parent().remove();
  });
}
else
{
  var msg = {
    type: "nickname",
    text: rep["nickname"],
    id:   uid,

  };  
  connection.send(JSON.stringify(msg));
nickname =  rep["nickname"];
}

while(i<arr.length)
{

 if(arr[i].indexOf("r")>0)
 {
  var con = arr[i].slice(0,arr[i].indexOf("r"));
  var sen = {userid:0};
  sen.userid = con;

  $.ajax({
  type: "POST",
  url: "workers.php?type=6",
  data: sen,
  dataType: 'JSON',
  cache: false,
  success: function(rep){	

  var newdiv = document.createElement("div");
  newdiv.className = "contacts"; 
  newdiv.id = rep["userid"];

  var show_name = document.createElement("span");
  show_name.innerHTML = rep["username"];

 var agree = document.createElement("button");
  agree.innerHTML = "AGREE";
  agree.className = "agrees";


 
  var refuse = document.createElement("button");
  refuse.innerHTML = "REFUSE";
  refuse.className = "refuses";

  newdiv.appendChild(show_name); 
  newdiv.appendChild(agree); 
  newdiv.appendChild(refuse); 
  $("#con_list").append(newdiv); 
  },
  });
 }
else
{
  var con = arr[i];
  var sen = {userid:0};
  sen.userid = con;

  $.ajax({
  type: "POST",
  url: "workers.php?type=6",
  data: sen,
  dataType: 'JSON',
  cache: false,
  success: function(rep){	

  var newdiv2 = document.createElement("div");
  newdiv2.className = "friends"; 
  newdiv2.id = rep["userid"];

  var show_name2 = document.createElement("span");
  show_name2.innerHTML = rep["username"];

 var c_message = document.createElement("button");
  c_message.innerHTML = "MESSAGE";
  c_message.className = "msg";

  var delete_friend = document.createElement("button");
  delete_friend.innerHTML = "DELETE";
  delete_friend.className = "deletes";
 
  newdiv2.appendChild(show_name2); 
  newdiv2.appendChild(c_message); 
  newdiv2.appendChild(delete_friend); 
  $("#con_list").append(newdiv2); 
  },
  });
 
}

  i++;
}
i = 0;
while(i<arr_g.length)
{

 
  var con = arr_g[i];
  var sen = {groupid:0};
  sen.groupid = con;

  $.ajax({
  type: "POST",
  url: "workers.php?type=15",
  data: sen,
  dataType: 'JSON',
  cache: false,
  success: function(rep){	

  var newdiv = document.createElement("div");
  newdiv.className = "groups"; 
  newdiv.id = "g" + rep["id"];

  var show_name = document.createElement("span");
  show_name.innerHTML = rep["name"];

  var enter = document.createElement("button");
  enter.innerHTML = "ENTER";
  enter.className = "enters";

  var leave = document.createElement("button");
  leave.innerHTML = "LEAVE";
  leave.className = "leaves";

  newdiv.appendChild(show_name); 
  newdiv.appendChild(enter); 
  newdiv.appendChild(leave); 
  $("#gro_list").append(newdiv); 
  },
  });
 


  i++;
}

   },
  });




  $(".tri_butt").click(function(){
    if($(this).attr('src')=='tri1.png'){
			$(this).attr('src','tri2.png');
		}else{
			$(this).attr('src','tri1.png');
		}
    $("#con_list").slideToggle("slow");
  });
var timers = setInterval(function() {
  var msg = {
    type: "target",
    text: "s",
    id:   uid,

  };  
    alert("bind");
    $(".agrees").one( "click", function(){
alert("agree");
var sent = {userid:0, target:0,times:0};
sent.userid = uid;
sent.target = $(this).parent().attr('id');
sent.times = dates();
$.ajax({
method: "POST",
url: "workers.php?type=7",
data: sent,
cache: false,
success: function(rep){alert(rep);},
});
var c_message = document.createElement("button");
  c_message.innerHTML = "MESSAGE";
  c_message.className = "msgs";

  var delete_friend = document.createElement("button");
  delete_friend.innerHTML = "DELETE";
  delete_friend.className = "adeletes";
  $(this).parent().append(c_message);
  $(this).parent().append(delete_friend);
  $(this).parent().find(".msgs").on( "click", function(){
    for(var c = 0;c<2;c++)
{

    c_type = 0;
var sent = {target:0};
sent.target = $(this).parent().attr('id');
msg.type = "target";
msg.text = sent.target;
connection.send(JSON.stringify(msg));

  $.ajax({
method: "POST",
url: "workers.php?type=9",
data: sent,
cache: false,
success: function(rep){

},
});
var final = false;
 var sent = {userid:0, target:0,con_type:0};
sent.userid = uid;

$.ajax({
  type: "GET",
  url: "workers.php?type=12",
  success: function(rep){	
    sent.target =rep;
    $.ajax({
  type: "POST",
  url: "workers.php?type=11",
  data: sent,
 dataType: 'JSON',
  cache: false,
  success: function(rep){	
 
    $("#chat_message").empty();
   var i = 0;

   while(i<rep.length)
{

  var meg_date = document.createElement("h6");
  meg_date.innerHTML = datestotime(rep[i].send_times);
  meg_date.className = (rep[i].id == uid) ? "slef_msg" : "other_msg";
  var msg_nickname = document.createElement("h5");
  msg_nickname .innerHTML = rep[i].nickname+":";
  msg_nickname.className = (rep[i].id == uid) ? "slef_msg" : "other_msg";
  var msg_content = document.createElement("p");
  msg_content.innerHTML = rep[i].content;
  msg_content.style = "word-break:break-all";
  msg_content.className = (rep[i].id == uid) ? "slef_msg" : "other_msg";
 $("#chat_message").append(meg_date,msg_nickname,msg_content); 
 i++;
}
 var elmnt = document.getElementById("chat_message");
 
elmnt.scrollTop=elmnt.scrollHeight;
  },
});


  },
});
  }
  });
  $(this).parent().find(".adeletes").on( "click", function(){
    alert("delete");
var sent = {userid:0, target:0};
sent.userid = uid;
sent.target = $(this).parent().attr('id');
$.ajax({
method: "POST",
url: "workers.php?type=8",
data: sent,
cache: false,

});
    
  });
  $(this).next().remove();
  $(this).remove();
});
  $(".refuses").one( "click", function(){
alert("refuse");
var sent = {userid:0, target:0};
sent.userid = uid;
sent.target = $(this).parent().attr('id');
$.ajax({
method: "POST",
url: "workers.php?type=8",
data: sent,
cache: false,

});
$(this).parent().remove();
});
$(".msg").on( "click", function(){
for(var c = 0;c<2;c++)
{
  
c_type = 0;
var sent = {target:0};
sent.target = $(this).parent().attr('id');
msg.type = "target";
msg.text = sent.target;
connection.send(JSON.stringify(msg));
  $.ajax({
method: "POST",
url: "workers.php?type=9",
data: sent,
cache: false,
success: function(rep){

},
});
var final = false;
 var sent = {userid:0, target:0,con_type:0};
sent.userid = uid;

$.ajax({
  type: "GET",
  url: "workers.php?type=12",
  success: function(rep){	
    sent.target =rep;
    $.ajax({
  type: "POST",
  url: "workers.php?type=11",
  data: sent,
 dataType: 'JSON',
  cache: false,
  success: function(rep){	
 
    $("#chat_message").empty();
   var i = 0;

   while(i<rep.length)
{

  var meg_date = document.createElement("h6");
  meg_date.innerHTML = datestotime(rep[i].send_times);
  meg_date.className = (rep[i].id == uid) ? "slef_msg" : "other_msg";
  var msg_nickname = document.createElement("h5");
  msg_nickname .innerHTML = rep[i].nickname+":";
  msg_nickname.className = (rep[i].id == uid) ? "slef_msg" : "other_msg";
  var msg_content = document.createElement("p");
  msg_content.innerHTML = rep[i].content;
  msg_content.style = "word-break:break-all";
  msg_content.className = (rep[i].id == uid) ? "slef_msg" : "other_msg";
 $("#chat_message").append(meg_date,msg_nickname,msg_content); 
 i++;
}
 var elmnt = document.getElementById("chat_message");
 
elmnt.scrollTop=elmnt.scrollHeight;
  },
});


  },
});
}
});
$(".deletes").one("click",function(){
alert("delete");
var sent = {userid:0, target:0};
sent.userid = uid;
sent.target = $(this).parent().attr('id');
$.ajax({
method: "POST",
url: "workers.php?type=8",
data: sent,
cache: false,

});


});










$(".enters").on("click",function(){
  $("#chat_members").empty();
  alert("enter");
var sent = {target:0,con_type:1};
var group_id=$(this).parent().attr('id');
sent.target = group_id.slice(1);

$.ajax({
  type: "POST",
  url: "workers.php?type=18",
  data: sent,
 dataType: 'JSON',
  cache: false,
  success: function(rep){	
    var msg_g = {
    type: "group",
    text:JSON.parse(rep["members"]),
    group:sent.target,
    id:   uid,

  }; 
  connection.send(JSON.stringify(msg_g));
  var n = 0;
  var arr_m = JSON.parse(rep["members"]);

  while( n < arr_m.length) {

    if(arr_m[n].indexOf("r")>0)
 {
  if(rep["founders"] == uid)
  {
   
    var se = {userid:0};
     var astring = arr_m[n];
    se.userid = astring.slice(0,astring.length-1);

    $.ajax({
  type: "POST",
  url: "workers.php?type=6",
  data: se,
 dataType: 'JSON',
  cache: false,
  success: function(rep){	
    var newdiv = document.createElement("div");
  newdiv.className = "member_div"; 
  newdiv.id = "m" + rep["userid"];
 
  var show_name = document.createElement("span");
  show_name.innerHTML = rep["username"] + "   ";
  var show_nickname = document.createElement("span");
  show_nickname.innerHTML = rep["nickname"];
  var agree = document.createElement("button");
  agree.innerHTML = "AGREE";
  agree.className = "g_agrees";
  var refuse = document.createElement("button");
  refuse.innerHTML = "REFUSE";
  refuse.className = "g_refuses";
  newdiv.appendChild(show_name); 
  newdiv.appendChild(show_nickname); 
  newdiv.appendChild(agree); 
  newdiv.appendChild(refuse); 
  $("#chat_members").append(newdiv); 
  },
});
  }
}
else
{
  if(rep["founders"] == uid)
  {
    var se = {userid:0};
    se.userid = arr_m[n];
  
    $.ajax({
  type: "POST",
  url: "workers.php?type=6",
  data: se,
 dataType: 'JSON',
  cache: false,
  success: function(rep){	
    var newdiv = document.createElement("div");
  newdiv.className = "member_div"; 
  newdiv.id = "m" + rep["userid"];
  var show_name = document.createElement("span");
  show_name.innerHTML = rep["username"] + "   ";
  var show_nickname = document.createElement("span");
  show_nickname.innerHTML = rep["nickname"];

  newdiv.appendChild(show_name); 
  newdiv.appendChild(show_nickname); 
  if(rep["userid"] != uid)
  {
  var kick = document.createElement("button");
  kick.innerHTML = "KICK";
  kick.className = "kicks";
  newdiv.appendChild(kick); 
  }
  $("#chat_members").append(newdiv); 
  },
  });
  }
else
{ var se = {userid:0};
    se.userid = arr_m[n];
    $.ajax({
  type: "POST",
  url: "workers.php?type=6",
  data: se,
 dataType: 'JSON',
  cache: false,
  success: function(rep){	
  var newdiv = document.createElement("div");
  newdiv.className = "member_div"; 
  
  var show_name = document.createElement("span");
  show_name.innerHTML = rep["username"] + "   ";

  var show_nickname = document.createElement("span");
  show_nickname.innerHTML = rep["nickname"];
  newdiv.appendChild(show_name); 
  newdiv.appendChild(show_nickname); 
  $("#chat_members").append(newdiv); 
  },
  });
}
}

n++;
}
var timer3 = setInterval(function() {

alert("group bind");
$(".g_agrees").off("click");
$(".g_agrees").on( "click", function(){
alert("agree");
var sen = {groupid:0, target:0};
sen.groupid = group_id.slice(1);
var num = $(this).parent().attr('id');
sen.target = num.slice(1);
$.ajax({
method: "POST",
url: "workers.php?type=19",
data: sen,
cache: false,

});
var kick = document.createElement("button");
  kick.innerHTML = "KICK";
  kick.className = "kic";
  $(this).parent().append(kick);
  $(this).parent().find(".kic").one( "click", function(){
    alert("kick");
    var sen = {groupid:0, target:0};
sen.groupid = group_id.slice(1);
var num = $(this).parent().attr('id');
sen.target = num.slice(1);
$.ajax({
method: "POST",
url: "workers.php?type=21",
data: sen,
cache: false,

});
$(this).parent().remove();
  });
  $(this).next().remove();
  $(this).remove();
});
$(".g_refuses").off("click");
$(".g_refuses").on( "click", function(){
alert("refuse");
var sen = {groupid:0, target:0};
sen.groupid = group_id.slice(1);
var num = $(this).parent().attr('id');
sen.target = num.slice(1);
alert(sen.groupid);
alert(sen.target);
$.ajax({
method: "POST",
url: "workers.php?type=20",
data: sen,
cache: false,
success: function(rep){
alert(rep);
},
});
$(this).parent().remove();
});
$(".kicks").off("click");
$(".kicks").on( "click", function(){
alert("kick");
var sen = {groupid:0, target:0};
sen.groupid = group_id.slice(1);
var num = $(this).parent().attr('id');
sen.target = num.slice(1);
$.ajax({
method: "POST",
url: "workers.php?type=21",
data: sen,
cache: false,

});
$(this).parent().remove();
});




  clearInterval(timer3);
    }, 1500);
  },
});
c_type = 1;
alert(sent.target);
  $.ajax({
method: "POST",
url: "workers.php?type=9",
data: sent,
cache: false,
success: function(rep){
alert(rep);
},
});
var final = false;

$.ajax({
  type: "GET",
  url: "workers.php?type=12",
  success: function(rep){	
    sent.target =rep;
    $.ajax({
  type: "POST",
  url: "workers.php?type=11",
  data: sent,
 dataType: 'JSON',
  cache: false,
  success: function(rep){	
 
    $("#chat_message").empty();
   var i = 0;

   while(i<rep.length)
{

  var meg_date = document.createElement("h6");
  meg_date.innerHTML = datestotime(rep[i].send_times);
  meg_date.className = (rep[i].id == uid) ? "slef_msg" : "other_msg";
  var msg_nickname = document.createElement("h5");
  msg_nickname .innerHTML = rep[i].nickname+":";
  msg_nickname.className = (rep[i].id == uid) ? "slef_msg" : "other_msg";
  var msg_content = document.createElement("p");
  msg_content.innerHTML = rep[i].content;
  msg_content.className = (rep[i].id == uid) ? "slef_msg" : "other_msg";
 $("#chat_message").append(meg_date,msg_nickname,msg_content); 
 i++;
}
 var elmnt = document.getElementById("chat_message");
 
elmnt.scrollTop=elmnt.scrollHeight;
  },
});


  },
});

});










$(".leaves").one("click",function(){
alert("leave");
var sent = {userid:0, target:0};
sent.userid = uid;
var group_id=$(this).parent().attr('id');
sent.target = slice(1);
$.ajax({
method: "POST",
url: "workers.php?type=17",
data: sent,
cache: false,

});


});


clearInterval(timers);
    }, 1500);



$("#send_message").on("click",function(){
  var msg = {
    type: "message",
    text: "s",
    id:   uid,

  }; 
  alert(c_type);

  if( !c_type )
{
  var sent = {other:0,userid:0, nickname:"s",send_times:"",content:"s",first:0};

sent.userid = uid;
sent.send_times = dates();
sent.nickname = nickname;
sent.content = document.getElementById("message_type").value;
msg.text = sent.content;

connection.send(JSON.stringify(msg));
sent.first = first;
$.ajax({
  type: "GET",
  url: "workers.php?type=12",
  success: function(rep){	
    alert(rep);
    sent.other =  rep;
    $.ajax({
 method: "POST",
 url: "workers.php?type=3",
 data: sent,
 cache: false,
 success: function(rep){alert(rep);},

});

},
});
first = 1;
document.getElementById("message_type").value = "";

}
else
{
  
  var sent = {other:0,userid:0, nickname:"s",send_times:"",content:"s"};

sent.userid = uid;
sent.send_times = dates();
sent.nickname = nickname;
sent.content = document.getElementById("message_type").value;
msg.text = sent.content;

connection.send(JSON.stringify(msg));

$.ajax({
  type: "GET",
  url: "workers.php?type=12",
  success: function(rep){	
    alert(rep);
    sent.other =  rep;
    $.ajax({
 method: "POST",
 url: "workers.php?type=16",
 data: sent,
 cache: false,
 success: function(rep){alert(rep);},

});

},
});

document.getElementById("message_type").value = "";

}

});

var message_type = $('#message_type');
message_type.keydown(function(e) {
      if (e.keyCode === 13) {
      
  
        var msg = {
    type: "message",
    text: "s",
    id:   uid,

  };     
       var sent = {other:0,userid:0, nickname:"s",send_times:"",content:"s",first:0};

sent.userid = uid;
sent.send_times = dates();
sent.nickname = nickname;
sent.content = document.getElementById("message_type").value;
msg.text = sent.content;

connection.send(JSON.stringify(msg));
sent.first = first;
$.ajax({
  type: "GET",
  url: "workers.php?type=12",
  success: function(rep){	
    alert(rep);
    sent.other =  rep;
    $.ajax({
 method: "POST",
 url: "workers.php?type=3",
 data: sent,
 cache: false,
 success: function(rep){alert(rep);},

});

},
});

document.getElementById("message_type").value = "";

      }
    });
});


*/




function create()
{
  var sent = {founder_id:0, group_name:"s",send_time : "s"};
 sent.founder_id = usid;
sent.group_name = document.getElementById("group_name").value;
sent.send_time = dates();
  $.ajax({
  method: "POST",
  url: "workers.php?type=13",
  data: sent,
  cache: false,
  success: function(rep){	
   
 alert(rep);
 $("#popbox1").toggle();
   },
  });
}

function search_group()
{
  var sent = {searcher_id:0, target:"s"};
 sent.searcher_id = usid;
sent.target = group_name.value;
  $.ajax({
  method: "POST",
  url: "workers.php?type=14",
  data: sent,
  cache: false,
  success: function(rep){	
   
 alert(rep);
 $("#popbox1").toggle();
   },
  });
}
function search()
{
  var sent = {searcher_id:0, target:"s"};
 sent.searcher_id = usid;
sent.target = search_user.value;
  $.ajax({
  method: "POST",
  url: "workers.php?type=4",
  data: sent,
  cache: false,
  success: function(rep){	
   
 alert(rep);
 $("#popbox1").toggle();
   },
  });
}

function logout() {
 
  document.location = 'login.php';
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "workers.php?type=22", true);
    xmlhttp.send();
}

function add_friend() {
 
  $("#popbox1").empty();
  var txt1 = "<p>Please type your friends user name:</p>";    
  var txt2 = $("<input id = 'search_user'>");  
  var txt3 = $("<button onclick = 'search()'></button>").text("Search and send request");
  $("#popbox1").append(txt1, txt2,txt3);   
  $("#popbox1").toggle();
}

function new_group() {
 

 $("#popbox1").empty();
 var txt1 = "<p>Please type the name for the group:</p>";    
 var txt2 = $("<input id = 'group_name'>");  
 var txt3 = $("<button onclick = 'create()'></button>").text("Create a group");
 $("#popbox1").append(txt1, txt2,txt3);   
 $("#popbox1").toggle();
}
function add_group() {
 

 $("#popbox1").empty();
 var txt1 = "<p>Please type the name of the group:</p>";    
 var txt2 = $("<input id = 'group_name'>");  
 var txt3 = $("<button onclick = 'search_group()'></button>").text("Send request!");
 $("#popbox1").append(txt1, txt2,txt3);   
 $("#popbox1").toggle();
}


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
function datestotime(date) {

  return date[4] + date[5] +'.'+date[6] + date[7] +' '+ date[8] + date[9] + ':' + date[10] +date[11];
}

function later_dates(date1,date2)
{
return(parseInt(date1)>parseInt(date2));
}






