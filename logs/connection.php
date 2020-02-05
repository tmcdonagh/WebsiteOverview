<?php
function getDBData(){

	$servername = "172.18.0.2";
	$username = "test";
	$password = "test";
	$dbname = "clouddb";

	session_start();
	$_SESSION['servername'] = $servername; // Lets other files use ip variable (see vars.php)


	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname, 3306);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "SELECT * FROM logs ORDER BY ID DESC";
	$result = $conn->query($sql);


	if ($result->num_rows > 0) {
		echo "<table align=\"center\" class=\"table-bordered\"><tr><th>Status</th><th>Date</th></tr>";
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
