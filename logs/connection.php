<?php
function getDBData(){
  $servername = "172.18.0.3"; // Docker network ip
  $username = "test";
  $password = "test";
  $dbname = "clouddb";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname, 3306);
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "SELECT status, time FROM logs";
  $result = $conn->query($sql);

  echo "<h3>Connection Loss Data</h2>";

  if ($result->num_rows > 0) {
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
}
getDBData();

?>
