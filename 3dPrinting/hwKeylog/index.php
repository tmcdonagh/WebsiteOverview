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
                <img class="d-block w-100" src="images/main.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/openCase.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/closedCase.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/pcb.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/topDown.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/3dCase.jpg">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="images/3dLid.jpg">
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
          <h4>Teensy Hardware Keylogger</h1>
          <p>By Thomas McDonagh<br>December 10, 2018</p>
          <a href="hwKeylog.zip"><button type="button" class="btn btn-primary btn-lg btn-block"><img src="/assets/download-button.svg" width="18"></img> Download All Files </button></a>
          <a href="https://github.com/tmcdonagh/HardwareKeylogger"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/githubLogo.png" width="32"></img> GitHub Link </button></a>

          <a href="https://www.thingiverse.com/thing:3274673"><button type="button" style="margin-top: 2px;" class="btn btn-secondary btn-lg btn-block"><img src="/assets/thingiverseLogo.png" width="42"></img> Thingiverse Link </button></a>


          <p>Hardware keylogger that uses a <a href="https://www.pjrc.com/teensy/">Teensy 3.6</a> to capture keystrokes, write them to a micro sd card, and send the keystrokes through the micro usb port on the Teensy. Keystrokes can either be read off sd card by taking it out or holding shift + password (default is 7980) to dump contents of text file out to the keyboard. Code can be found <a href="https://github.com/tmcdonagh/HardwareKeylogger">here</a>. Keyboard should be connected to female usb port and micro usb to male usb cable should be used to connect to computer. <a href="https://www.pjrc.com/teensy/pinout.html">Pinout information</a>.</p>






        </div>
      </div>
    </div>



    </div>
    <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html> 
