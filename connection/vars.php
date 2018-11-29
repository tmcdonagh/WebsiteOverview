<?php
function getVars(){
  $servername = "10.0.0.84"; //server ip
  $username = "test";
  $password = "test";
  $dbname = "clouddb";

  $memConn = new mysqli($servername, $username, $password, $dbname, 2162);
  if ($memConn->connect_error) {
    die("Connection failed: " . $memConn->connect_error);
  }
  $memSql = "SELECT * FROM mem ORDER BY time DESC LIMIT 1;";
  $memResult = $memConn->query($memSql);

  if ($memResult->num_rows > 0){
    $free = $row["free"];
  }
  else{
  }
  $memConn->close();

  $memData = new \stdClass();
  $memData->free = "100";

  $JSON = json_encode($memData);
  echo $JSON;

}
getVars();
?>
