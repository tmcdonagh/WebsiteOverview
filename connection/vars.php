<?php
function getVars(){
  $servername = "10.0.0.84"; //server ip
  $username = "test";
  $password = "test";
  $dbname = "clouddb";
  $freeMem = array();

  $memConn = new mysqli($servername, $username, $password, $dbname, 2162);
  if ($memConn->connect_error) {
    die("Connection failed: " . $memConn->connect_error);
  }
  $memSql = "SELECT * FROM mem ORDER BY time ASC LIMIT 50;";
  $memResult = $memConn->query($memSql);

  if ($memResult->num_rows > 0){
    while($row = $memResult->fetch_assoc()){
      $free = $row["free"];
      $total = $row["total"];
      $free = preg_replace("/[^0-9]/", "", $free);
      array_push($freeMem, $free);
    }
  }
  else{
  }
  $memConn->close();

  $memData = new \stdClass();
  $memData->free = preg_replace("/[^0-9]/", "", $free);
  $memData->total = preg_replace("/[^0-9]/", "", $total);
  $memData->freeMem = $freeMem;

  $JSON = json_encode($memData);
  echo $JSON;

}
getVars();
?>
