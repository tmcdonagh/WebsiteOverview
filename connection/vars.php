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
    while($row = $memResult->fetch_assoc()){
      $free = $row["free"];
      $total = $row["total"];
    }
  }
  else{
  }
  $memConn->close();

  $memData = new \stdClass();
  $memData->free = preg_replace("/[^0-9]/", "", $free);
  $memData->total = preg_replace("/[^0-9]/", "", $total);

  $JSON = json_encode($memData);
  echo $JSON;

}
getVars();
?>
