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
              <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="images/front.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/openMobo.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/leftMobo.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/openBattery.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/closedBattery.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/htop.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/plex.jpg">
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
          <h4>Chromebook Portable Plex Server</h1>
          <p>By Thomas McDonagh<br>June 23, 2019</p>
          <a href="chromeServer.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>
          <a href="https://github.com/tmcdonagh/3dPrinting/tree/master/laptopCase"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>

          <a href="https://www.thingiverse.com/thing:3709523"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/thingiverseLogo.png" width="42"></img> Thingiverse Link </button></a>


          <p>Enclosure for the motherboard, battery, and wifi card of a <a href="https://www.samsung.com/us/support/owners/product/chromebook-2">Samsung Chromebook 2</a> to turn it into a portable server. It runs Gallium OS (based on Ubuntu) using <a href="https://johnlewis.ie/custom-chromebook-firmware/rom-archive/">John Lewis's coreboot ROM</a> with Plex in a Docker container allowing movies and music to be streamed from it.</p>




        </div>
      </div>
    </div>



    </div>
    <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html> 
