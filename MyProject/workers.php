<?php
session_start();
include ".php/functions.php";
if($_REQUEST["type"] == 0)
{


init();
echo(check("userinfo","username",$_REQUEST["q"]));
close();



}
if($_REQUEST["type"] == 1)
{


init();

insert_into("userinfo","username","password","create_time",$_POST['username'],$_POST['password'],$_POST['sign_time']);
close();

echo "success";

}

if($_REQUEST["type"] == 2)
{


	init();

	if(check_same("userinfo","username","password",$_POST['username'],$_POST['password']))
	{
		
	$datas = gain_data("userinfo","username",$_POST['username'],"userid","nickname","contacts");
		$_SESSION["userid"] = $datas["userid"];
		
		echo  "WebRoom.php";
		//echo  "http://localhost/ChatRoom/WebRoom.php";
	}
	else 
	{
	
		echo "index.php";
		//echo "http://localhost/ChatRoom/web_login.php";
	}
	
	close();

}
if($_REQUEST["type"] == 3)
{
	//ι
	init();
	$address = find_result("records","address","id","id2",$_POST['other'],$_POST['userid']);
	echo $address;
	$write = fopen($address,"a") or die("Unable to open file!");
	if(!$_POST["first"])
	{
		$txt = $_POST['userid']."_".$_POST['nickname']."_".$_POST['send_times']."_".$_POST['content']."\r\n";
	}
	else
	{
		$txt = $_POST['userid']."_".$_POST['nickname']."_".$_POST['send_times']."_".$_POST['content']."\r\n";
	}

	fwrite($write, $txt);
	fclose($write);
	close();


}
if($_REQUEST["type"] == 4)
{
	init();
	if(search_and_change("userinfo","username",$_POST['target'],$_POST['searcher_id']."r","username","contacts"))
	{
	echo("Request has sent to " . $_POST['target']);
	}
	else
	{
	echo("user ". $_POST['target'] . " does not exist.");
	}
	close();

}

if($_REQUEST["type"] == 5)
{
	init();

	$datas = gain_data("userinfo","userid",$_POST['userid'],"groups","nickname","contacts");
	$arr = array("groups"=>$datas["groups"],"nickname"=>$datas["nickname"],"contacts"=>$datas["contacts"]);
	echo json_encode($arr);
	close();
	
}
if($_REQUEST["type"] == 6)
{
	init();

	$datas = gain_data("userinfo","userid",$_POST['userid'],"username","nickname","contacts");
	$arr = array("username"=>$datas["username"],"userid"=>$_POST['userid'],"nickname"=>$datas["nickname"]);
	$myJSON = json_encode($arr);
	echo $myJSON;
	close();
	
}
if($_REQUEST["type"] == 7)
{
	init();
	if(search_and_change("userinfo","userid",$_POST['userid'],$_POST['target'],"username","contacts"))
	{
		search_and_change("userinfo","userid",$_POST['target'],$_POST['userid'],"username","contacts");
		$filename = $_POST['target']."a".$_POST['userid'].".txt";
		$address = "records/".$filename;
		
		$create = fopen($address,'w');
		fclose($create);
	//$array = array($_POST['userid'],$_POST['target']);
	insert_into("records","id","id2","address",$_POST['target'],$_POST['userid'],$address);
	}
    echo "success";
	close();

}
if($_REQUEST["type"] == 8)
{
	init();
	search_and_delete("userinfo","userid",$_POST['userid'],$_POST['target'],"username","contacts");
	search_and_delete("userinfo","userid",$_POST['target'],$_POST['userid'],"username","contacts");
echo "success";
	close();

}
if($_REQUEST["type"] == 9)
{
	$_SESSION["contact_id"] = 	$_POST['target'];
	
	echo($_SESSION["contact_id"]);
}
if($_REQUEST["type"] == 10)
{
	init();
	change("userinfo","userid","nickname",$_POST['userid'],$_POST['nickname']);
close();
echo "Success to set nickname!";
}
if($_REQUEST["type"] == 11)
{
	init();
	$address = "s";
	if($_POST['con_type'])
	{
	$address = find_result2("g_records","address","id",$_POST['target']);	
	}
	else{
	$address = find_result("records","address","id","id2",$_POST['target'],$_POST['userid']);
	}
	$read = fopen($address, "r") or die("Unable to open file!");
	$id="";
	$nickname="";
	$send_times="";
	$content="";
	$next = 0;
	$history = [];
	while(! feof($read))
	{
		$oneline = fgets($read);
	if(strlen($oneline)>5)
	{
	for($i = 0;$i < strlen($oneline);$i++)
	{

		if($oneline[$i] != "_"&&$next == 3)
		{
		$content =$content.$oneline[$i];
		}
		if($oneline[$i] == "_"&&$next == 2)
		{
			$next=3;
		}
		else if($next == 2)
		{
			$send_times =$send_times.$oneline[$i];
		
		}
		if($oneline[$i] == "_"&&$next == 1)
		{
			$next=2;
	
		}
		else if($next == 1)
		{
			$nickname =$nickname.$oneline[$i];
			
		}
		if($oneline[$i] == "_"&&$next == 0)
		{
			$next=1;
		}
		else if($next ==0)
		{
		$id =$id.$oneline[$i];
		
		}
		
       
	}  
	
	$arr = array("id"=>$id,"nickname"=>$nickname,"send_times"=>$send_times,"content"=>$content);
	$id="";
	$nickname="";
	$send_times="";
	$content="";
	$next = 0;
	if($arr["id"]){
	$history[] = $arr;
	}
	}
	}
	fclose($read);
	
	$tojson = json_encode($history);

	close();
	echo $tojson;


}
if($_REQUEST["type"] == 12)
{

echo ($_SESSION["contact_id"]);
}
if($_REQUEST["type"] == 13)
{
	init();
	$result = check("groups","name",$_POST['group_name']);
	if(strlen($result)>25)
	{
echo "Group ".$_POST['group_name']." is already exist!";
	}
	else{
	insert_into("groups","name","founders","create_time",$_POST['group_name'],$_POST['founder_id'],$_POST['send_time']);
	search_and_change("groups","name",$_POST['group_name'],$_POST['founder_id'],"name","members");
	
	$datas = gain_data("groups","name",$_POST['group_name'],"founders","id","name");
	$filename = "g".$datas["id"].".txt";
	$address = "records/".$filename;
	insert_into2("g_records","id","address",$datas["id"],$address);
	search_and_change("userinfo","userid",$_POST['founder_id'],$datas["id"],"username","groups");
	$create = fopen($address,'w');
	fclose($create);
	close();
	echo "Group ".$_POST['group_name']." is created!";
	}
}
if($_REQUEST["type"] == 14)
{
	init();
	if(search_and_change("groups","name",$_POST['target'],$_POST['searcher_id']."r","name","members"))
	{
	echo("Request has sent to " . $_POST['target'].". Please wait for the founder's approval.");
	}
	else
	{
	echo("Group ". $_POST['target'] . " does not exist.");
	}
	close();

}
if($_REQUEST["type"] == 15)
{
	init();

	$datas = gain_data("groups","id",$_POST['groupid'],"name","id","members");
	$arr = array("name"=>$datas["name"],"id"=>$datas["id"],"members"=>$datas["members"]);
	$myJSON = json_encode($arr);
	echo $myJSON;
	close();
	
}
if($_REQUEST["type"] == 16)
{
	//ι
	init();
	$address = find_result2("g_records","address","id",$_POST['other']);
	echo $address;
	$write = fopen($address,"a") or die("Unable to open file!");

	$txt = $_POST['userid']."_".$_POST['nickname']."_".$_POST['send_times']."_".$_POST['content']."\r\n";
	
	fwrite($write, $txt);
	fclose($write);
	close();


}
if($_REQUEST["type"] == 17)
{
	//ι
	init();
	search_and_delete("userinfo","userid",$_POST['userid'],$_POST['target'],"username","groups");
	search_and_delete("groups","id",$_POST['target'],$_POST['userid'],"name","members");
echo "success";
	close();


}
if($_REQUEST["type"] == 18)
{
	init();

	$datas = find_result2("groups","members","id",$_POST['target']);
	$datas2 = find_result2("groups","founders","id",$_POST['target']);
	$arr =  array("members"=>$datas,"founders"=>$datas2);
	$myJSON = json_encode($arr);
	echo $myJSON;
	close();
	
}
if($_REQUEST["type"] == 19)
{
	init();
	if(search_and_change("groups","id",$_POST['groupid'],$_POST['target'],"name","members"))
	{
		search_and_change("userinfo","userid",$_POST['target'],$_POST['groupid'],"username","groups");
	
	}
    echo "success";
	close();

}
if($_REQUEST["type"] == 20)
{
	init();
	

echo search_and_delete("groups","id",$_POST['groupid'],$_POST['target'],"name","members");
	close();

}
if($_REQUEST["type"] == 21)
{
	init();
	search_and_delete("groups","id",$_POST['groupid'],$_POST['target'],"name","members");
	search_and_delete("userinfo","userid",$_POST['target'],$_POST['userid'],"username","groups");
echo "success";
	close();

}
if($_REQUEST["type"] == 22)
{
	session_unset();
}
?>
