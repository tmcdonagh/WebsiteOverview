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
<script src="https://d3js.org/d3.v5.min.js"></script>
<style>
      /* tell the SVG path to be a thin blue line without any area fill */
      path {
        stroke: steelblue;
        stroke-width: 1;
        fill: none;
      }
    </style>
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

<div id="freeGraph" class="aGraph" style="width:300px; height:100px;"></div>

<script type="text/javascript">
var statusIntervalId = window.setInterval(update, 2000);
window.freeMem = [];

function update() {
  $.ajax({
  url: 'check.php',
    dataType: 'text',
    success: function(data) {
      document.getElementById("mem").innerHTML = data;
    }
});
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //var myObj = JSON.parse(this.responseText);
    //var memData = this.responseText;
    var memData = JSON.parse(this.responseText);
    window.total = memData.total;
    console.log(memData.free);
    //data.length = 0;
    //data.push(memData.free);
    window.freeMem = memData.freeMem;
    $('svg').remove();
    showFreeMem("#freeGraph", 300, 200, 1000, 1000, window.freeMem);

  }
};
xmlhttp.open("GET", "vars.php", true);
xmlhttp.send();


}

function showFreeMem(id, width, height, updateDelay, transitionDelay, data) {

  var margin = {top: 50, right: 50, bottom: 50, left: 50}
  //, width = window.innerWidth - margin.left - margin.right // Use the window's width 
  //, height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

  // The number of datapoints
  var n = 50;

  // 5. X scale will use the index of our data
  var xScale = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, width]); // output

  // 6. Y scale will use the randomly generate number 
  var yScale = d3.scaleLinear()
    .domain([0, 24311]) // input 
    .range([height, 0]); // output 

  // 7. d3's line generator
  var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    //.curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    //var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
    var dataset = d3.range(n).map(function(d) { return { "y": window.freeMem[+d] } })

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // 3. Call the x axis in a group tag
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

  // 4. Call the y axis in a group tag
  svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

  // 9. Append the path, bind the data, and call the line generator 
  svg.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

}
showFreeMem("#freeGraph", 300, 200, 1000, 1000, window.freeMem);
</script>
</center>
</div>
</body>
</html> 
