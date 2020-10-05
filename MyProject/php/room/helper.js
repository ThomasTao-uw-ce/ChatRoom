


function create()
{
  var sent = {founder_id:0, group_name:"s",send_time : "s"};
 sent.founder_id = usid;
sent.group_name = document.getElementById("group_name").value;
sent.send_time = dates();
  $.ajax({
  method: "POST",
  url: "../workers.php?type=13",
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
  url: "../workers.php?type=14",
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
  url: "../workers.php?type=4",
  data: sent,
  cache: false,
  success: function(rep){	
   
 alert(rep);
 $("#popbox1").toggle();
   },
  });
}

function logout() {
 
  document.location = '../login';
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "../workers.php?type=22", true);
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






