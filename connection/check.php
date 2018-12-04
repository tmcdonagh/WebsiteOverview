<?php
function getDBData(){
  $servername = "10.0.0.84";
  $username = "test";
  $password = "test";
  $dbname = "clouddb";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname, 2162);
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "SELECT status, time FROM logs";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    echo "<h2>Connection Loss Data</h2>";
    echo "<table><tr><th>Status</th><th>Date</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
      echo "<tr><td>".$row["status"]."</td><td>".$row["time"]."</td></tr>";
    }
    echo "</table>";
  } else {
    echo "No connection loss data";
  }
  $conn->close();

  $memConn = new mysqli($servername, $username, $password, $dbname, 2162);
  if ($memConn->connect_error) {
    die("Connection failed: " . $memConn->connect_error);
  }

  
  /*
  $memInit = "SELECT * FROM mem ORDER BY time DESC LIMIT 50;";
  $memInitResult = $memConn->query($memInit);
   */

  $memSql = "SELECT * FROM mem ORDER BY time DESC LIMIT 1;";
  $memResult = $memConn->query($memSql);


  if ($memResult->num_rows > 0){
    echo "<h2>Memory</h2>";
    $free = $row["free"];
    while($row = $memResult->fetch_assoc()){
      echo $row["free"];
    }
  }
  else{
    echo "No Memory Data";
  }
  $memConn->close();
}
getDBData();

?>
