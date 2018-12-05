<?php
function getVars(){
  $servername = "10.0.0.84"; //server ip
  $username = "test";
  $password = "test";
  $dbname = "clouddb";
  $freeMem = array();
  $usedMem = array();
  $cpuPerc = array();

  $conn = new mysqli($servername, $username, $password, $dbname, 2162);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $memSql = "SELECT * FROM mem ORDER BY time ASC LIMIT 50;";
  $memResult = $conn->query($memSql);

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
      $total = floor($total / 1000);
    }
  }
  else{
  }

  $cpuSql = "SELECT * FROM cpu ORDER BY time ASC LIMIT 100;";
  $cpuResult = $conn->query($cpuSql);

  if($cpuResult->num_rows > 0){
    while($row = $cpuResult->fetch_assoc()){
      $perc = $row["perc"];

      array_push($cpuPerc, $perc);
    }
  }

  $conn->close();

  $varsData = new \stdClass();
  $varsData->free = preg_replace("/[^0-9]/", "", $free);
  $varsData->total = preg_replace("/[^0-9]/", "", $total);
  $varsData->freeMem = $freeMem;
  $varsData->usedMem = $usedMem;

  $varsData->cpuPerc = $cpuPerc;

  $JSON = json_encode($varsData);
  echo $JSON;

}
getVars();
?>
