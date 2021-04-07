<!DOCTYPE html>
<head>
  <?php include('/var/www/html/included/header.php') ?>
</head>
<body>
  <div id="main">
    <center>
      <div class="container">
        <div class="row">
          <div class="col-8">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="false">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>

                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li> 
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> 
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li> 
                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li> 
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img class="d-block w-100" src="images/teensyAssembled.jpg">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="images/schematic.JPG">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="images/front.JPG">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="images/pcb.JPG">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="images/back.JPG">
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleIndicators" style="filter: invert(1);" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleIndicators" style="filter: invert(1);" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div class="col-sm">
            <h4>Console Pedal Fuzz PCB</h4>
            <p>By Thomas McDonagh<br>February 11th, 2021</p>

            <a href="consolePedalTeensy.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>

            <a href="https://github.com/tmcdonagh/PCBFiles/tree/main/ConsolePedalTeensy"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>

            <p>
            Guitar pedal that uses a <a href="https://www.pjrc.com/store/teensy32.html">Teensy 3.2 development board</a> to change audio signal. Works with my <a href="/pcbProjects/consolePedal/">ConsolePedal pcb design</a>. 

            </p>
          </div>
        </div>
      </div>



  </div>
  <?php include('/var/www/html/included/footer.php') ?>
</body>
</html>

