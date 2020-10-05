<?php
// Start the session
session_start();

?>
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
<title>Log in</title>
</head>

<body>

<?php 
$error_name = $error_password = "";
$name = $password = "";
$GLOBALS['ok'] = 0;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["userid"])) {
    $error_name = "*Name is required.";
    $GLOBALS['ok'] = 0;
  }
  else{
    $name = $_POST["userid"];
    $GLOBALS['ok'] = 1;
  }
  if (empty($_POST["password"])) {
    $error_password = "*Password is required.";
    $GLOBALS['ok'] = 0;
  }
  else
  {
    $password = $_POST["password"];
    $GLOBALS['ok'] = 1;
  }
}
?>
<h1 class = "heads">
Welcome to the chatting room.
</h1>
<div class = "Login_box">
    <form id = "login" name = "login"  style="position: absolute;left: 30%;top:20%" method = "post">
        <label for="userid">ID:</label><br>
        <input placeholder="Your username" type="text" id="userid" name="userid" value ="<?php if(isset($_SESSION["username"])) {echo $_SESSION["username"];}?>" >
        <span class = "error"><?php echo $error_name;?></span><br><br>
        <label for="password">PASSWORD:</label><br>
        <input placeholder="Your password" type="password" id="password" name="password" value ="<?php if(isset($_SESSION["password"])) {echo $_SESSION["password"];}?>" >
        <span class = "error"><?php echo $error_password;?></span>
        <input type="checkbox" onclick="show_password()">Show<br>
        <input  onclick = "decide_jump()" type = "button"  value = "Login" style="position:relative;margin-left:-50px;margin-top:100px;" class = "submit_button" >
        
      </form> 
      <span class = "go_sign" onclick ="go_signup()" >Create Your Account!</span>
</div>

<?php
if(isset($_SESSION["username"])){
unset($_SESSION["username"]);
}
?>
<script>
function go_signup() {

document.location = '../signup';
}
function show_password() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function decide_jump(){

  var id = document.getElementById("userid").value;
  var pass = document.getElementById("password").value;
  var sent = {username:"s", password:"s"};
 sent.username = document.getElementById("userid").value;
 sent.password = document.getElementById("password").value;
 
 if (id.length>0 && pass.length>0)
  {
    $.ajax({
  method: "POST",
  url: "../workers.php?type=2",
  data: sent,
  cache: false,
  success: function(rep){	

    $("#login").attr("action", rep);

   $("#login").submit();
   
    },
});

  }

 
}

</script>


</body>
</html>
