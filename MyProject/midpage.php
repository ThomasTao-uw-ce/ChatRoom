<?php
// Start the session
session_start();
?>
<html>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<head>
<link rel="stylesheet" type="text/css" href=".css/WebSetting.css"/>
<style>
body
{
  background-image: url("pictures/back.jpg");
}

</style>

</head>

<body>
<div class = "login_box">
<p id = "jump"><a href="index.php">Successful account registration, please click to jump to the login web.</a></p>
</div>
</body>
</html>

<?php
$_SESSION["username"] = $_POST["userid"];
//$_SESSION["password"]  =$_POST["password"];
?>