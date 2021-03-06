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
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="images/front.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/frontOn.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/frontOpen.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/topOpen.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/standing.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/backOpen.jpg">
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
          <h4>Dual Speaker Portable Guitar Amp</h1>
          <p>By Thomas McDonagh<br>June 28, 2020</p>
          <a href="dualAmp.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>

          <a href="https://github.com/tmcdonagh/3dPrinting/tree/master/dualSpeakerAmp"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>

          <a href="https://www.thingiverse.com/thing:4508447"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/thingiverseLogo.png" width="42"></img> Thingiverse Link </button></a>


          <p>Dual Speaker portable 9v battery powered guitar amplifier based on a <a href="https://www.cbgitty.com/kits-guitar-kits-amp-kits-more/amplifier-effects-kits/great-2-5-watt-parts-only-cigar-box-guitar-amplifier-kit-build-your-own-amp/">C. B. Gitty Amp Kit</a> and <a href="https://www.cbgitty.com/instruments-amps/amplifiers-accessories/amp-accessories/1pc-3-inch-4-watt-8-ohm-amp-speaker-by-pui-audio-with-mounting-hardware-speaker-grill/">extra speaker</a>. Uses pick guard screws that I got from <a href="https://www.amazon.com/gp/product/B07TT5YYPV/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&amp;psc=1">this kit</a> to hold on lid. Has a swivel belt clip to make it easier to carry.</p>
        </div>
      </div>
    </div>
    <?php include('/var/www/html/included/footer.php') ?>
    </div>
  </body>
</html> 
