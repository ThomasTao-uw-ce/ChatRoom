
<?php

function init() {
    $GLOBALS['servername'] = "localhost";
  $GLOBALS['myname'] = "root";

  $GLOBALS['mypassword'] = "123...qqq";
  $GLOBALS['conn'] =  mysqli_connect( $GLOBALS['servername'], $GLOBALS['myname'] , $GLOBALS['mypassword'] );
  mysqli_select_db($GLOBALS['conn'],'CHATDB');
}

function check($tablename,$column,$input)
{
  
  $command = "SELECT $column FROM $tablename WHERE $column = '$input'";
  $success = 0;


if($check = mysqli_query($GLOBALS['conn'],$command))
{
if(!$check)
{
  die("Error".mysqli_error($GLOBALS['conn']));
}
$info = mysqli_fetch_array($check);

}
if(empty($info))
{
return "Username is not used.";
}
else
{
  return "Username is already existed.";
}
}
function check_same($tablename,$column1,$column2,$input1,$input2)
{
  
  $command = "SELECT $column1,$column2 FROM $tablename WHERE $column1 = '$input1'";
  $success = 0;


if($check = mysqli_query($GLOBALS['conn'],$command))
{
if(!$check)
{
  die("Error".mysqli_error($GLOBALS['conn']));
}
$info = mysqli_fetch_array($check);


$success = ($info["$column2"] == $input2);

}
return $success;
}

function gain_data($tablename,$column1,$input1,$data1,$data2,$data3)
{
  
  $command = "SELECT $data1,$data2,$data3 FROM $tablename WHERE $column1 = '$input1'";
  $response;


if($check = mysqli_query($GLOBALS['conn'],$command))
{
if(!$check)
{
  die("Error".mysqli_error($GLOBALS['conn']));
}
$info = mysqli_fetch_array($check);

$response = array($data1=>$info["$data1"],$data2=>$info["$data2"], $data3=>$info["$data3"]);

return $response;
}

}


function search_and_change($tablename,$column1,$input1,$change,$data1,$data2)
{
  
  $command1 = "SELECT $data1,$data2 FROM $tablename WHERE $column1 = '$input1'";
 



if($check = mysqli_query($GLOBALS['conn'],$command1))
{
  if(!$check)
  {
   die("Error".mysqli_error($GLOBALS['conn']));
  }
  $info = mysqli_fetch_array($check);
  if(empty($info["$data1"]))
  {
    return 0;
  }
  else
  {
   $arr = json_decode($info["$data2"]);

   if(gettype($arr) != 'array')
   {
    $arr[] = $change;
   }
   else if(in_array($change."r", $arr))
   {
     $arr[array_search($change."r",$arr)] = $change;
   }
   else
   {
    $arr[] = $change;
   }
   $json_obj = json_encode(array_unique($arr));
 
  $command2 = "UPDATE $tablename SET $data2 = '$json_obj'  WHERE $column1 = '$input1'";
  if($check = mysqli_query($GLOBALS['conn'],$command2))
  {
  if(!$check)
  {
    die("Error".mysqli_error($GLOBALS['conn']));
  }
  
  }
  return 1;
  
  }

}

}

function search_and_delete($tablename,$column1,$input1,$delete,$data1,$data2)
{
  
  $command1 = "SELECT $data1,$data2 FROM $tablename WHERE $column1 = '$input1'";
 



if($check = mysqli_query($GLOBALS['conn'],$command1))
{
  if(!$check)
  {
   die("Error".mysqli_error($GLOBALS['conn']));
  }
  $info = mysqli_fetch_array($check);
  if(empty($info["$data1"]))
  {
   return 0;
  }
  else
  {
   $arr = json_decode($info["$data2"]);

   if(in_array($delete."r", $arr))
   {
    $countnum = array_search($delete."r",$arr)-count($arr)+1;
    if($countnum == 0)
    {
    $countnum = 1; 
    }
     array_splice($arr,array_search($delete."r",$arr),$countnum);
    
   $json_obj = json_encode(array_unique($arr));
  $command2 = "UPDATE $tablename SET $data2 = '$json_obj'  WHERE $column1 = '$input1'";
  if($check = mysqli_query($GLOBALS['conn'],$command2))
  {
  if(!$check)
  {
    die("Error".mysqli_error($GLOBALS['conn']));
  }
   return array_search($delete."r",$arr);
  }
}
else
{
  $countnum = array_search($delete,$arr)-count($arr)+1;
if($countnum == 0)
{
$countnum = 1; 
}
  array_splice($arr,array_search($delete,$arr),$countnum);
    
  $json_obj = json_encode(array_unique($arr));
 $command2 = "UPDATE $tablename SET $data2 = '$json_obj'  WHERE $column1 = '$input1'";
 if($check = mysqli_query($GLOBALS['conn'],$command2))
 {
 if(!$check)
 {
   die("Error".mysqli_error($GLOBALS['conn']));
 }
  return array_search($delete,$arr);
 }
}
  }

}

}
function change($tablename,$column1,$data,$input1,$input2)
{
  $sql = "UPDATE $tablename SET $data = '$input2'  WHERE $column1 = '$input1'";
  mysqli_select_db($GLOBALS['conn'],'CHATDB');
  $check = mysqli_query($GLOBALS['conn'],$sql);
  if(!$check)
  {
    die("Error".mysqli_error($GLOBALS['conn']));
  }
}


function insert_into($tablename,$column1,$column2,$column3,$content1,$content2,$content3) {
  
        $sql = "INSERT INTO $tablename".
            "($column1,$column2,$column3)".
            "VALUES ".
            "('$content1','$content2','$content3')";
        mysqli_select_db($GLOBALS['conn'],'CHATDB');
        $check = mysqli_query($GLOBALS['conn'],$sql);
        if(!$check)
        {
          die("Error".mysqli_error($GLOBALS['conn']));
        }
        }
        function insert_into2($tablename,$column1,$column2,$content1,$content2) {
  
          $sql = "INSERT INTO $tablename".
              "($column1,$column2)".
              "VALUES ".
              "('$content1','$content2')";
          mysqli_select_db($GLOBALS['conn'],'CHATDB');
          $check = mysqli_query($GLOBALS['conn'],$sql);
          if(!$check)
          {
            die("Error".mysqli_error($GLOBALS['conn']));
          }
          }
function find_result($tablename,$data,$column1,$column2,$input1,$input2)
{
  $sql = "SELECT $data FROM $tablename  WHERE ($column1 = '$input1' AND $column2 = '$input2') OR ($column2 = '$input1' AND $column1 = '$input2') ";
  mysqli_select_db($GLOBALS['conn'],'CHATDB');
  $check = mysqli_query($GLOBALS['conn'],$sql);
  if(!$check)
  {
    die("Error".mysqli_error($GLOBALS['conn']));
  }
  else
  {
    $info = mysqli_fetch_array($check);
    return $info["$data"];
  }

}
function find_result2($tablename,$data,$column1,$input1)
{
  $sql = "SELECT $data FROM $tablename  WHERE $column1 = '$input1'";
  mysqli_select_db($GLOBALS['conn'],'CHATDB');
  $check = mysqli_query($GLOBALS['conn'],$sql);
  if(!$check)
  {
    die("Error".mysqli_error($GLOBALS['conn']));
  }
  else
  {
    $info = mysqli_fetch_array($check);
    return $info["$data"];
  }

}
function close()
{
    mysqli_close( $GLOBALS['conn']);
}

function plus($a,$b)
{
    return $a+$b;
}
?>