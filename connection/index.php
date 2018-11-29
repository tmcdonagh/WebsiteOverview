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
<script src="http://mbostock.github.com/d3/d3.v2.js"></script>
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
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //var myObj = JSON.parse(this.responseText);
    //var memData = this.responseText;
    var memData = JSON.parse(this.responseText);
    console.log(memData.free);
    data.push(memData.free);
  }
};
xmlhttp.open("GET", "vars.php", true);
xmlhttp.send();


}
</script>

<div id="graph3" class="aGraph" style="width:300px; height:100px;"></div>

<script>


function displayGraphExample(id, width, height, interpolation, animate, updateDelay, transitionDelay) {
  // create an SVG element inside the #graph div that fills 100% of the div
  var graph = d3.select(id).append("svg:svg").attr("width", "100%").attr("height", "100%");

  // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
  //var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 9];
  window.data = [];
  var data = window.data;

  // X scale will fit values from 0-10 within pixels 0-100
  var x = d3.scale.linear().domain([0, 48]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition
  // Y scale will fit values from 0-10 within pixels 0-100
  var y = d3.scale.linear().domain([0, 200]).range([0, height]);

  // create a line object that represents the SVN line we're creating
  var line = d3.svg.line()
    // assign the X function to plot our line as we wish
    .x(function(d,i) { 
      // verbose logging to show what's actually being done
      //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
      // return the X coordinate where we want to plot this datapoint
      return x(i); 
    })
      .y(function(d) { 
        // verbose logging to show what's actually being done
        //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
        // return the Y coordinate where we want to plot this datapoint
        return y(d); 
      })
        .interpolate(interpolation)

        // display the line by appending an svg:path element with the data line we created above
        graph.append("svg:path").attr("d", line(data));
  // or it can be done like this
  //graph.selectAll("path").data([data]).enter().append("svg:path").attr("d", line);


  function redrawWithAnimation() {
    // update with animation
    graph.selectAll("path")
      .data([data]) // set the new data
      .attr("transform", "translate(" + x(1) + ")") // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
      .attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
      .transition() // start a transition to bring the new value into view
      .ease("linear")
      .duration(transitionDelay) // for this demo we want a continual slide so set this to the same as the setInterval amount below
      .attr("transform", "translate(" + x(0) + ")"); // animate a slide to the left back to x(0) pixels to reveal the new value

    /* thanks to 'barrym' for examples of transform: https://gist.github.com/1137131 */
  }

  function redrawWithoutAnimation() {
    // static update without animation
    graph.selectAll("path")
      .data([data]) // set the new data
      .attr("d", line); // apply the new data values
  }

  setInterval(function() {
    var v = data.shift(); // remove the first element of the array
    data.push(v); // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
    if(animate) {
      redrawWithAnimation();
    } else {
      redrawWithoutAnimation();
    }
  }, updateDelay);
}

displayGraphExample("#graph3", 300, 100, "linear", true, 1000, 1000);
</script>
</center>
</div>
</body>
</html> 
