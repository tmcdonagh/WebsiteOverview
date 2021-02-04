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
                <img class="d-block w-100" src="images/wall.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/demo.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/spacer.jpg">
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
          <h4>Nebula Capsule Wall Mount</h1>
          <p>By Thomas McDonagh<br>February 03, 2019</p>
          <a href="oldCapsule.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>

          <a href="https://www.thingiverse.com/thing:3403165"><button type="button" style="margin-top: 2px;" class="btn btn-secondary  btn-lg btn-block"><img src="/assets/thingiverseLogo.png" width="42"></img> Thingiverse Link </button></a>


          <p>EDIT: <a href="https://www.thingiverse.com/thing:3755169">Improved version with adjustable angle</a></p>

          <p>Wall mount for Anker Nebula Capsule. 35 Degree angle from wall. </p>

          <p>Attached to wall with <a href="https://www.amazon.com/Command-Refill-Strips-64-Strips-GP022-64NA/dp/B0751RPC6Q/ref=sr_1_4?ie=UTF8&amp;qid=1549256413&amp;sr=8-4&amp;keywords=command+strips">command strips</a></p>

          <p>Needs a 1/4"x1/2" bolt to fully secure</p>






        </div>
      </div>
    </div>



    </div>
    <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html> 
