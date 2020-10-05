
<html>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<head>
<link rel="stylesheet" type="text/css" href="css/WebSetting.css"/>
<style>
body
{
       background-image: url("pictures/back.jpg");
}

</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>

<?php 
$error_name = $error_password =$error_repeat= "";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["userid"])) {
    $error_name = "*Name is required.";
  }
  else{
    $_SESSION["username"] =  $_POST["userid"];
$name = $_POST["userid"];
$success = 1;
}
  if (empty($_POST["password"])) {
    $error_password = "*Password is required.";
  }
  if (empty($_POST["repeat"])) {
    $error_repeat = "*Please repeat your password.";
  }
else if($_POST["password"]!=$_POST["repeat"])
{
  $error_repeat = "*Passwords need to be same.";
}
else {
$password = $_POST["password"];
}
}

?>

<h1 class = "heads">
Create Your Account!
</h1>

<div class = "Login_box">
    <form name = "login" action="" style="position: absolute;left: 30%;top:20%" method = "post">
        <label for="userid">ID:</label><br>
        <input type="text" id="userid" name="userid" value ="<?php if(isset($_SESSION["username"])) {echo $_SESSION["username"];}?>" onkeyup="ifExist(this.value)" >
        <span id = "exist" ></span><span class = "error"><?php echo $error_name;?></span><br><br>
        <label for="password">PASSWORD:</label><br>
        <input type="password" id="password" name="password" >
        <span class = "error"><?php echo $error_password;?></span><br><br>
        <label for="repeat_password">REPEAT PASSWORD:</label><br>
        <input type="password" id="repeat" name="repeat" >
        <input type="checkbox" onclick="show_password()">Show<br>
        <span class = "error" id = "repeat_error"><?php echo $error_repeat;?></span>
        <input onclick = "decide_jump()" type = "button" value = "Sign Up" style="position:relative;margin-left:-50px;margin-top:30px;" class = "submit_button" >
        
      </form> 


</div>





<script>
function ifExist(str) {
  if (str.length == 0) {
    document.getElementById("exist").innerHTML = "";
    return;
  } else {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var text =this.responseText;
        if(text.length >28)
        {
          document.getElementById("exist").style.color = "red";
        }
        else
        {
          document.getElementById("exist").style.color = "blue";
        }
        document.getElementById("exist").innerHTML = text;
        
      }
    };
    xmlhttp.open("GET", "workers.php?type=0&q=" + str, true);
    xmlhttp.send();
  }
}
function decide_jump()
{
  var id = document.getElementById("userid").value;
  var pass = document.getElementById("password").value;
  var repea = document.getElementById("repeat").value;
  var exist = document.getElementById("exist").innerHTML;
var availability = 1;
var letter = 1;
var letter2 = 1;
var num = 1;
for(x of id)
{
if((x<='Z'&&x>='A')||(x<='z'&&x>='a'))
{
   letter2 = 0;
}
else if(x<='9'&&x>='0')
{

}
else{
  alert("Please dont inclue space or symbols in your username!")
  availability = 0;
  break;
}
}
for(x of pass)
{
if((x<='Z'&&x>='A')||(x<='z'&&x>='a'))
{
   letter = 0;
}
else if(x<='9'&&x>='0')
{
num = 0;
}
}
if(exist.length > 22)
{
  alert("Username is existed!")
  availability = 0;
}

if(letter2)
{
  alert("Please inclue letters in your username!")
  availability = 0;
}
if(letter||num)
{
  alert("Please inclue letters and numbers in your password!")
  availability = 0;
}
if(id.length>10)
{
  alert("Please set up an username with less than 10 characters!")
  availability = 0;
}
if(pass.length>20||pass.length<10)
{
  alert("Please set up a password with less than 20 characters and more than 10!")
  availability = 0;
}
 var sent = {username:"s", password:"s",sign_times:0};
 sent.username = document.getElementById("userid").value;
 sent.password = document.getElementById("password").value;
 sent.sign_time = dates();
  if (id.length>0 && pass.length>0 && repea == pass&&availability )
  {

    $.ajax({
  method: "POST",
  url: "workers.php?type=1",
  data: sent,
  cache: false,
  success: function(data){		
    alert(data);
    },
});

    login.action = "midpage.php";
    //login.action = "http://localhost/ChatRoom/midpage.php";
  }
  else{
    login.action = "SignUp.php";
    //login.action = "http://localhost/ChatRoom/SignUp.php";
  }
  login.submit();
}

function show_password() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  var y = document.getElementById("repeat");
  if (y.type === "password") {
    y.type = "text";
  } else {
    y.type = "password";
  }
}
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
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


</script>










