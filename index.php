<!DOCTYPE html>
<html lang="en">
  <head>
    <?php $currentPage = 'Home'; ?>
    <?php include('/var/www/html/included/header.php') ?>
  </head>
  <body>
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <a href="/games/"><img class="card-img-top" src="/assets/gameThumbnail.png" alt="View"></a>
                <div class="card-body">
                  <a class="noBlue" href="/games/"><p class="card-text">Javascript Games</p></a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <a href="/logs/"><img class="card-img-top" src="/assets/logsThumbnail.PNG" alt="View"></a>
                <div class="card-body">
                  <a class="noBlue" href="/logs/"><p class="card-text">CPU, RAM, and connection loss data</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <a href="/3dPrinting/"><img class="card-img-top" src="/assets/3dPrintingThumbnail.PNG" alt="View"></a>
                <div class="card-body">
                  <a class="noBlue" href="/3dPrinting/"><p class="card-text">My 3D Printed Designs</p></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html>
