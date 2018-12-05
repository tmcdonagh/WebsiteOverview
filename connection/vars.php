<?php
function getVars(){
  $servername = "10.0.0.84"; //server ip
  $username = "test";
  $password = "test";
  $dbname = "clouddb";
  $freeMem = array();
  $usedMem = array();

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
      $total = preg_replace("/[^0-9]/", "", $total); // Removes KB ending
      $available = $row["available"];
      $available = preg_replace("/[^0-9]/", "", $available); // Removes KB ending
      $used = $total - $available;
      $used = floor($used / 1000);
      array_push($usedMem, $used);
      
      $free = preg_replace("/[^0-9]/", "", $free); // Removes KB ending
      $free = floor($free / 1000); // Converts KB to MB
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
  $memData->usedMem = $usedMem;

  $JSON = json_encode($memData);
  echo $JSON;

}
getVars();
?>
