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
                  <li data-target="#carouselExampleIndicators" data-slide-to="7"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="8"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="9"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="10"></li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="d-block w-100" src="images/newMain.jpg">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="images/horizontal.jpg">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="images/fullDesk.jpg">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="images/twoComplete.jpg">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="images/cables.jpg">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="images/pcb.jpg">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="images/arm.jpg">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="images/swivel.jpg">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="images/angle1.jpg">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="images/angle2.jpg">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="images/angle3.jpg">
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
              <h4>Chromebook Screen Monitor</h1>
              <p>By Thomas McDonagh<br>August 31, 2019</p>
              <a href="chromeMonitor.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>
              <a href="https://github.com/tmcdonagh/3dPrinting/tree/master/monitorCase"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>

              <a href="https://www.thingiverse.com/thing:3838876"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/thingiverseLogo.png" width="42"></img> Thingiverse Link </button></a>


              <p>I took the screens out of my <a href="https://www.samsung.com/us/support/owners/product/chromebook-2">Samsung Chromebook 2</a> and <a href="https://www.asus.com/us/Commercial-Laptops/ASUS-Chromebook-C202SA/">Asus Chromebook C202S</a> and turned them into monitors. I included files for a desk stand and a wall mount that works with both screens. The monitor also has a worm and wheel gear that lets you change the angle of the monitor. I used an <a href="https://www.amazon.com/gp/product/B06XC6SJF7/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&amp;psc=1">lcd controller board</a> that converts the screen's ribbon cable into HDMI input and 12v 2A barrel jack power. The board can be powered from USB with <a href="https://www.amazon.com/DROK-Voltage-Converter-Transformer-Regulator/dp/B074R7FDCR/ref=sr_1_7?keywords=12v+to+5v+usb&amp;qid=1567274194&amp;s=electronics&amp;sr=1-7">the proper cable</a>. I also used <a href="https://www.adafruit.com/product/3299">Adafruit nylon screws</a> but I assume any M2.5 screw set with standoffs would work as well.</p>

              <p><a href="https://www.amazon.com/Samsung-Chromebook-Replacement-XE500C12-K01US-B116XTN01-0/dp/B0169N5150/ref=sr_1_3?keywords=samsung+chromebook+2+replacement+screen&amp;qid=1567273634&amp;s=gateway&amp;sr=8-3">Samsung Compatible Screen</a>
              <br>
              <a href="https://www.amazon.com/ASUS-C202S-C202SA-Chromebook-Screen/dp/B01IMCZVGA/ref=sr_1_5?keywords=asus+chromebook+replacement+screen&amp;qid=1567273646&amp;s=gateway&amp;sr=8-5">Asus Compatible Screen</a>
          </div>
        </div>
    </div>
    </div>
    <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html> 
