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
                                <li data-target="#carouselExampleIndicators" data-slide-to="5"></li> 
                                <li data-target="#carouselExampleIndicators" data-slide-to="6"></li> 
                            </ol>
                              <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img class="d-block w-100" src="images/front-min.jpg">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/redGuitarCart-min.jpg">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/sideTuner-min.jpg">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/allElectronics-min.jpg">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/tuner-min.jpg">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/tuner2-min.jpg">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="images/tuner1-min.jpg">
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
                              <h4>Modular Electric Guitar Body V3</h4>
                                <p>By Thomas McDonagh<br>December 19th, 2021</p>


                                <a href="https://github.com/tmcdonagh/3dPrinting/tree/master/guitarv3"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>
  
                                <p>
Third attempt at making a 3D printed guitar body. First attempt is <a href="/3dPrinting/guitar/">here</a> and second attempt is <a href="/3dPrinting/guitarv2/">here</a>. Main improvements over the last iteration are fixed intonation, built in speaker, built in spring loaded pick holder, built in capo holder, a built in bitcrusher pedal and built in distortion pedal activated by push pull knobs, a built in guitar tuner I made by programming an AtMega328P with Arduino software, and a slot on the bottom for plugging in my <a href="http://consolepedals.com">N64 cartridge guitar pedals</a>.

                                </p>
                              </div>
                            </div>
                          </div>



                        </div>
          <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html>

