<!DOCTYPE html>
<head>
  <?php include('/var/www/html/included/header.php') ?>
  <link rel="stylesheet" type="text/css" href="/pcbProjects/carousel.css">
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
                <li data-target="#carouselExampleIndicators" data-slide-to="5"></li> 
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img class="d-block w-100" src="images/8BitarAssembled.jpg">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="images/8BitarInConsole.jpg">
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
            <h4>Console Pedal 8Bitar PCB</h4>
            <p>By Thomas McDonagh<br>February 13th, 2021</p>

            <a href="consolePedal8Bitar.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>

            <a href="https://github.com/tmcdonagh/PCBFiles/tree/main/ConsolePedal8Bitar"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>

            <p>
            8 bit sounding octave down guitar pedal made to fit my <a href="/pcbProjects/consolePedal/">ConsolePedal pcb</a>. Schematic is based off <a href="https://www.parasitstudio.se/uploads/2/4/4/9/2449159/8bitar_doc.pdf">Parasit Studio 8Bitar design</a>

            </p>
          </div>
        </div>
      </div>



  </div>
  <?php include('/var/www/html/included/footer.php') ?>
</body>
</html>

