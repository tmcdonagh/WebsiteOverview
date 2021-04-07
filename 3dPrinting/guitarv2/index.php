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
                            </ol>
                              <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img class="d-block w-100" src="images/front.jpg">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/back.jpg">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/name.jpg">
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
                              <h4>Modular Electric Guitar Body V2</h4>
                                <p>By Thomas McDonagh<br>July 30th, 2020</p>

                                <a href="guitarv2.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>

                                <a href="https://github.com/tmcdonagh/3dPrinting/tree/master/guitarv2"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>
  
                                <p>
Second attempt at making a 3D printed guitar body. First attempt is <a href="/3dPrinting/guitar/">here</a>. Main improvements over the last iteration are fixed intonation, two threaded rods instead of three, two pickups instead of one, and an internal distortion pedal. The distortion is activated by pulling the volume knob.

                                </p>
                              </div>
                            </div>
                          </div>



                        </div>
          <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html>

