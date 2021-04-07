
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>McDonagh Corp Home</title>
<link href="/bootstrap/css/bootstrap.css" rel="stylesheet" />
<link rel="icon" type="img/ico" href="/favicon.ico">
<link rel="stylesheet" type="text/css" href="/main.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="/bootstrap/js/bootstrap.min.js"></script>

<div id="topHeader">
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="/">McDonagh Corp</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item <?php if ($currentPage === 'Home') {echo 'active';} ?>">
          <a class="nav-link" href="/"> Home </a>
        </li>
        <li class="nav-item <?php if ($currentPage === 'Games') {echo 'active';} ?>">
          <a class="nav-link" href="/games/"> Games </a>
        </li>
        <li class="nav-item <?php if ($currentPage === 'Logs') {echo 'active';} ?>">
          <a class="nav-link" href="/logs/"> Logs </a>
        </li>
        <li class="nav-item <?php if ($currentPage === '3dPrinting') {echo 'active';} ?>">
          <a class="nav-link" href="/3dPrinting/"> 3D Printing </a>
        </li>
        <li class="nav-item <?php if ($currentPage === 'pcbProjects') {echo 'active';} ?>">
          <a class="nav-link" href="/pcbProjects/"> PCB Projects </a>
        </li>
      </ul>
      <!--
        <ul class="navbar-nav ml-auto">
        <li class="nav-item">
        <a class="nav-brand" href="#"><img src="/githubLogo.png"></a>
        </li>
        </ul>
      -->
    </div>
  </nav>
</div>


<center>

  <br>
  <br>
  <br>
  <h1 style="font-size:60px">McDonagh Corp</h1>
  <br>
  <link rel="stylesheet" type="text/css" href="/menu.css">
