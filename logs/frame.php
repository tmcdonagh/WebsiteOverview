<!DOCTYPE html>
<html lang="en">
<head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-109033178-1"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-109033178-1');
</script>

<title>McDonagh Corp</title>
<!-- Imports css and favicon -->

<link href="/bootstrap/css/bootstrap.css" rel="stylesheet" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="/bootstrap/js/bootstrap.min.js"></script>

<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" type="text/css" href="style.css">
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
svg {
    display: block;
    margin: 0 auto;
}
</style>
</head>
<body>
<br><br><br>


<div id="main">
<center>
<div class="wrapper">
<div class="shortcuts">
<div class="shortcut">
<div style="height:500px;width:480px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;">
<div id="mem"<p><h3>Connection Loss Data</h3><br>Loading...</p></div>
</div>
</div>
<div class="shortcut">
<div style="height:500px;width:480px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;">
<h3>Docker Containers</h3>
<p id="dockerP"><br>Loading...</p>
</div>
</div>
</div>
</div>
<h3 id="uptime"></h3>

<script type="text/javascript">
var statusIntervalId = window.setInterval(update, 2000);
window.freeMem = [];
window.usedMem = [];

function update() {
  $.ajax({
  url: 'connection.php',
    dataType: 'text',
    success: function(data) {
      document.getElementById("mem").innerHTML = data;
    }
});
var xmlhttp = new XMLHttpRequest();
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //var myObj = JSON.parse(this.responseText);
    //var memData = this.responseText;
    //console.log(this.responseText);
    var varsData = JSON.parse(this.responseText);

    // Make arrays public so other functions can use them
    window.total = varsData.total;
    window.freeMem = varsData.freeMem;




    // Delete old graph before creating new one
    $('svg').remove();
    showGraph("#cpuGraph", 300, 200, 1000, 1000, varsData.cpuPerc, 100, "cpu");
    showGraph("#memGraph", 300, 200, 1000, 1000, varsData.usedMem, varsData.total, "mem");
    // Updates Docker Container data
    document.getElementById("dockerP").innerHTML = "<br>Web: Online<br>Clouddb: Online" + "<br>Plex: " + varsData.plexStatus + "<br>NextCloud: " + varsData.nextcloudStatus + "<br>Grafana: " + varsData.grafanaStatus;
    document.getElementById("uptime").innerHTML = "Uptime: "  + varsData.uptime;

  }
};
xmlhttp.open("GET", "vars.php", true);
xmlhttp.send();

}

function showGraph(id, width, height, updateDelay, transitionDelay, data, totalY, type) {

  // Types:
  // cpu
  // mem

  //console.log(window.usedMem);
  //console.log(window.freeMem);

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
    .domain([0, totalY]) // input 
    .range([height, 0]); // output 

  // 7. d3's line generator
  var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    //.curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    //var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
    var dataset = d3.range(n).map(function(d) { return { "y": data[+d] } })

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select(id).append("svg")
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

  // Adds Title
  if(data[49] != undefined && type == "mem"){
    svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .text("RAM Usage: " + data[49] + "MB");
  }
  else if(data[49] != undefined && type == "cpu"){
    svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .text("CPU Usage: " + data[49] + "%");
  }
  else{
    svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .text("Loading...");

  }

}
showGraph("#cpuGraph", 300, 200, 1000, 1000, window.freeMem);
showGraph("#memGraph", 300, 200, 1000, 1000, window.freeMem);
</script>
</center>
</div>
<div class="wrapper">
<div class="shortcuts">
<div class="shortcut">
<div id="cpuGraph" class="aGraph"></div>
</div>
<div class="shortcut">
<div id="memGraph" class="bGraph"></div>
</div>
</div>
</div>
<center>
<footer class="pt-4 my-md-5 pt-md-5 border-top">
                                <div class="row">
                                        <div class="col-12 col-md">
                                                <small class="d-block mb-3 text-muted">&copy; 2020, Thomas McDonagh</small>
                                                </div>
                                        </div>
                        </footer>
</center>

</body>
</html> 
