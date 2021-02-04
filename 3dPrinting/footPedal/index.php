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
                <img class="d-block w-100" src="images/both.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/silverComponents.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/top.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/inSide.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/outSide.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/bottom.jpg">
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
          <h4>Distortion Guitar Pedal</h1>
          <p>By Thomas McDonagh<br>July 27, 2020</p>
          <a href="footPedal.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>
          <a href="https://github.com/tmcdonagh/3dPrinting/tree/master/guitarPedal"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>



          <p>Distortion Guitar Pedal based on <a href="https://www.modelectronics.com/pedal/thunderdrive">this design</a>. Demo video <a href="https://youtu.be/htGoqByS72Q">here</a>.




        </div>
      </div>
    </div>



    </div>
    <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html> 
