<!DOCTYPE html>
<html lang="en">
  <head>
    <?php $currentPage = 'Games'; ?>
    <?php include('/var/www/html/included/header.php') ?>
  </head>
  <body>
        <h1>Games</h1>
        <div class="album py-5 bg-light">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                  <a href="/games/breakout"><img class="card-img-top" src="/assets/breakoutScreenshot.png" alt="Card image cap"></a>
                  <div class="card-body">
                    <p class="card-text">Basic breakout clone for me to learn Phaser.js. Made with Phaser 2.</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="/games/breakout"><button type="button" class="btn btn-sm btn-outline-secondary">Play</button></a>
                        <a href="https://github.com/tmcdonagh/WebsiteOverview/tree/master/games/breakout"><button type="button" class="btn btn-sm btn-outline-secondary">Source</button></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                  <a href="/games/spaceInvaders/"><img class="card-img-top" src="/assets/spaceInvadersScreenshot.png" alt="Card image cap"></a>
                  <div class="card-body">
                    <p class="card-text">Space invaders style game with multiple levels and different enemies as levels go on. Made with Phaser 2.</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="/games/spaceInvaders/"><button type="button" class="btn btn-sm btn-outline-secondary">Play</button><a/>
                            <a href="https://github.com/tmcdonagh/WebsiteOverview/tree/master/games/spaceInvaders"><button type="button" class="btn btn-sm btn-outline-secondary">Source</button><a/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                  <a href="/games/towerDefense/"><img class="card-img-top" src="/assets/towerDefenseScreenshot.png" alt="Card image cap"></a>
                  <div class="card-body">
                    <p class="card-text">Tower defense game I made to learn pathfinding and Phaser 3. Made with EasyStar.js, TexturePacker, and Phaser 3.</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <a href="/games/towerDefense/"><button type="button" class="btn btn-sm btn-outline-secondary">Play</button><a/>
                            <a href="https://github.com/tmcdonagh/WebsiteOverview/tree/master/games/towerDefense"><button type="button" class="btn btn-sm btn-outline-secondary">Source</button><a/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        <?php include('/var/www/html/included/footer.php') ?>
  </body>
</html>
