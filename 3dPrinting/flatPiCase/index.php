<!DOCTYPE html>
<html lang="en">
  <head>
    <?php include('/var/www/html/included/header.php') ?>
  </head>
  <body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="/bootstrap/js/bootstrap.min.js"></script>

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
                <img class="d-block w-100" src="images/closedLid.jpg" style="max-width:100%;" alt="closedLid.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/openLid1.jpg" alt="openLid1.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/oldOpenLid.jpg"  alt="openOpenLid.jpg">
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
          <h4>Flat Portable Raspberry Pi Zero Enclosure</h1>
          <p>By Thomas McDonagh<br>January 29, 2020</p>
          <a href="flatPiCaseFiles.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>
          <a href="https://github.com/tmcdonagh/3dPrinting/tree/master/flatRpiZero"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>

          <a href="https://www.thingiverse.com/thing:4134490"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/thingiverseLogo.png" width="42"></img> Thingiverse Link </button></a>


          <p>Enclosure for Raspberry Pi Zero W that fits a <a href="https://www.adafruit.com/product/328">2500 mAh LiPo Battery</a> , <a href="https://www.adafruit.com/product/2465">PowerBoost 1000 Charger</a> , and <a href="https://www.adafruit.com/product/805">switch</a>. Uses <a href="https://www.adafruit.com/product/3299">Adafruit Nylon M2.5 Screws</a> but I assume any M2.5 set should work as long as it has the same standoffs.</p>





        </div>
      </div>
    </div>
    <?php include('/var/www/html/included/footer.php') ?>
    </div>
  </body>
</html> 
