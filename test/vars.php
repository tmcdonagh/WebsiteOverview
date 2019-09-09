<?php
function getVars(){

  session_start();
  $servername = $_SESSION['servername']; // Gets ip from connection.php file
  $username = "test";
  $password = "test";
  $dbname = "clouddb";

  $freeMem = array();
  $usedMem = array();
  $cpuPerc = array();

  $conn = new mysqli($servername, $username, $password, $dbname, 3306);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $memSql = "SELECT * FROM mem ORDER BY ID ASC LIMIT 50;";
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

  $cpuSql = "SELECT * FROM cpu ORDER BY ID ASC LIMIT 100;";
  $cpuResult = $conn->query($cpuSql);

  if($cpuResult->num_rows > 0){
    while($row = $cpuResult->fetch_assoc()){
      $perc = $row["perc"];

      array_push($cpuPerc, $perc);
    }
  }

  $containerSql = "SELECT * FROM containers;";
  $containerResult = $conn->query($containerSql);

  if($containerResult->num_rows > 0){
    while($row = $containerResult->fetch_assoc()){
      $plexStatus = $row["plexStatus"];
      $nextcloudStatus = $row["nextcloudStatus"];
      $grafanaStatus = $row["grafanaStatus"];
      $lastUpdated = $row["time"];
    }
  }

  $conn->close();

  $varsData = new \stdClass();
  $varsData->free = preg_replace("/[^0-9]/", "", $free);
  $varsData->total = preg_replace("/[^0-9]/", "", $total);
  $varsData->freeMem = $freeMem;
  $varsData->usedMem = $usedMem;

  $varsData->cpuPerc = $cpuPerc;

  $varsData->plexStatus = $plexStatus;
  $varsData->nextcloudStatus = $plexStatus;
  $varsData->grafanaStatus = $grafanaStatus;

  $JSON = json_encode($varsData);
  echo $JSON;

}
getVars();
?>
