<!DOCTYPE html>
<html lang="en">
<head>
<title>McDonagh Corp</title>
<!-- Imports css and favicon -->
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" type="text/css" href="/menu.css">
<link rel="icon" type="img/ico" href="/favicon.ico">
<script src="js/jquery-3.3.1.min.js"></script>

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

<p id="mem">Loading...</p>

<script type="text/javascript">
var statusIntervalId = window.setInterval(update, 2000);

function update() {
  $.ajax({
  url: 'check.php',
    dataType: 'text',
    success: function(data) {
      document.getElementById("mem").innerHTML = data;
    }
  });
}

</script>
</center>
</div>
</body>
</html> 
