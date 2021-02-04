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
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="images/front.jpg" style="max-width:100%;" alt="front.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/back.jpg" alt="back.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/parts.jpg"  alt="parts.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/lid.jpg"  alt="lid.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/top.jpg"  alt="top.jpg">
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
          <h4>Portable Guitar Amp</h1>
          <p>By Thomas McDonagh<br>May 6, 2020</p>
          <a href="batteryAmpFiles.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>
          <a href="https://github.com/tmcdonagh/3dPrinting/tree/master/batteryAmp"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>

          <a href="https://www.thingiverse.com/thing:4342719"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/thingiverseLogo.png" width="42"></img> Thingiverse Link </button></a>


          <p>Portable 9v battery powered guitar amplifier based on a <a href="https://www.cbgitty.com/kits-guitar-kits-amp-kits-more/amplifier-effects-kits/great-2-5-watt-parts-only-cigar-box-guitar-amplifier-kit-build-your-own-amp/">C. B. Gitty Amp Kit</a>. Uses pick guard screws that I got from <a href="https://www.amazon.com/gp/product/B07TT5YYPV/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&amp;psc=1">this kit</a> to hold on top lid and M2.5 nylon screws that I got from <a href="https://www.amazon.com/gp/product/B01C5QHFSG/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&amp;psc=1">this kit</a> and cut short but I assume any pick guard screws and M2.5 nuts and bolts should work. Comes with an attachable belt clip to make it easier to carry.</p>

        </div>
      </div>
    </div>
    </div>
    <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html> 
