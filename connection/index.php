<!DOCTYPE html>
<html lang="en">
  <head>
    <title>McDonagh Corp</title>
    <!-- Imports css and favicon -->
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/menu.css">
    <link rel="icon" type="img/ico" href="/favicon.ico">

  </head>
  <body>

    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <a href="/">Home</a>
      <a href="/games">Games</a>
      <a href="/emulators">Emulators</a>
    </div>

    <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>

    <script type="text/javascript" src="/nav.js"></script>
    <div id="main">
      <center>
        <h1>McDonagh Corp</h1>
<?php
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
  echo "<table><tr><th>Status</th><th>Date</th></tr>";
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "<tr><td>".$row["status"]."</td><td>".$row["time"]."</td></tr>";
  }
  echo "</table>";
} else {
  echo "0 results";
}
$conn->close();

$memConn = new mysqli($servername, $username, $password, $dbname, 2162);
if ($memConn->connect_error) {
  die("Connection failed: " . $memConn->connect_error);
}

$memSql = "SELECT * FROM mem ORDER BY time DESC LIMIT 1;"
$memResult = $memConn->query($memSql);

if ($memResult->num_rows > 0){
  echo "<center><p>";
  echo $memResult->fetch_assoc();
  echo "</p></center>";
}
else{
  echo "No Memory Data";
}
$memConn->close();
?> 



      </center>
    </div>
  </body>
</html> 
