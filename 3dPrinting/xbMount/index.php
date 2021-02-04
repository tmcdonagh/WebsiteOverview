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
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="images/full.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/single.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/all.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/part.jpg">
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
          <h4>Xbox One Game Case Wall Mount</h1>
          <p>By Thomas McDonagh<br>December 10, 2018</p>
          <a href="xbMount.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>

          <a href="https://www.thingiverse.com/thing:3274640"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/thingiverseLogo.png" width="42"></img> Thingiverse Link </button></a>


          <p>Xbox One game case holder that allows for mounting Xbox One games on a wall. I used command strips to hold them just in case but enough double sided tape could work as well.</p>




        </div>
      </div>
    </div>



    </div>
    <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html> 
