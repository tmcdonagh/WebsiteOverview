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
                                <li data-target="#carouselExampleIndicators" data-slide-to="6"></li> 
                            </ol>
                              <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img class="d-block w-100" src="images/front.PNG">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/back.PNG">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/jlcFront.PNG">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/jlcBack.PNG">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/Schematic.JPG">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/jlcFrontBlue.PNG">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/jlcBackBlue.PNG">
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
                              <h4>Distortion Pedal PCB</h4>
                                <p>By Thomas McDonagh<br>October 5th, 2020</p>

                                <a href="distortion.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>

                                <a href="https://github.com/tmcdonagh/PCBFiles/tree/main/Distortion"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>
  
                                <p>
My first PCB project. I wanted to make soldering together my distortion pedals a little easier. Based on pedal from <a href="https://www.modelectronics.com/product/thunderdrive">here</a>

                                </p>
                              </div>
                            </div>
                          </div>



                        </div>
          <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html>

