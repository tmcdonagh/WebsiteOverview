import os



# Variables to change before running
name = "Test Project"
date = "January 63rd, 2047"
paragraph = """
Test paragraph. Add something here.
"""
githubLink = "test"
thingiverseLink = "test"
copyYear = "2021"


# Leave these variables alone
directory = r'./images'
zipName = ""
for filename in os.listdir(r'./'):
  if filename.endswith(".zip"):
    zipName = filename

longText = """<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <title>McDonagh Corp</title>
    <meta charset=\"utf-8\"/>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <link href=\"/bootstrap/css/bootstrap.css\" rel=\"stylesheet\" />
    <!--
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/main.css\">
    -->
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/menu.css\">
    <link rel=\"icon\" type=\"img/ico\" href=\"/favicon.ico\">
  </head>
  <body>
    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js\"></script>
    <script src=\"/bootstrap/js/bootstrap.min.js\"></script>

    <nav class=\"navbar navbar-expand-md navbar-dark fixed-top bg-dark\">
      <a class=\"navbar-brand\" href=\"/\">McDonagh Corp</a>
      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarCollapse\" aria-controls=\"navbarCollapse\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">
        <span class=\"navbar-toggler-icon\"></span>
      </button>
      <div class=\"collapse navbar-collapse\" id=\"navbarCollapse\">
        <ul class=\"navbar-nav mr-auto\">
          <li class=\"nav-item\">
            <a class=\"nav-link\" href=\"/\"> Home </a>
          </li>
          <li class=\"nav-item\">
            <a class=\"nav-link\" href=\"/games/\"> Games </a>
          </li>
          <li class=\"nav-item\">
            <a class=\"nav-link\" href=\"/logs/\"> Logs </a>
          </li>
          <li class=\"nav-item\">
            <a class=\"nav-link\" href=\"/3dPrinting/\"> 3D Printing </a>
          </li>
        </ul>
      </div>
    </nav>

    <div id=\"main\">
    <center>
        <br><br><br>

        <h1 style=\"font-size:60px\">McDonagh Corp</h1>
            <div class=\"container\">
                <div class=\"row\">
                    <div class=\"col-8\">
                        <div id=\"carouselExampleIndicators\" class=\"carousel slide\" data-ride=\"carousel\" data-interval=\"false\">
                            <ol class=\"carousel-indicators\">
                                <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"0\" class=\"active\"></li>
"""
counter = 0
for filename in os.listdir(directory):
    if counter != 0:
        longText += """
                                <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"""" + str(counter) + """\"></li> """
    counter += 1

longText += """
                            </ol>
                              <div class=\"carousel-inner\">
                                <div class=\"carousel-item active\">"""
counter = 0
for filename in os.listdir(directory):
  if counter != 0:
    longText += """
                                <div class=\"carousel-item\">"""
  longText += """
                                    <img class=\"d-block w-100\" src=\"images/""" + filename + """\">
                                </div>"""
  counter += 1

longText += """
                              </div>
                                <a class=\"carousel-control-prev\" href=\"#carouselExampleIndicators\" style=\"filter: invert(1);\" role=\"button\" data-slide=\"prev\">
                                  <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>
                                  <span class=\"sr-only\">Previous</span>
                                </a>
                                <a class=\"carousel-control-next\" href=\"#carouselExampleIndicators\" style=\"filter: invert(1);\" role=\"button\" data-slide=\"next\">
                                  <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>
                                  <span class=\"sr-only\">Next</span>
                                </a>
                              </div>
                            </div>
                            <div class=\"col-sm\">
                              <h4>""" + name + """</h4>
                                <p>By Thomas McDonagh<br>""" + date + """</p>

                                <a href=\"""" + zipName + """\"><button type=\"button\" class=\"btn btn-primary btn-lg btn-block\"><img src=\"/assets/download-button.svg\" width=\"18\"></img> Download All Files </button></a>"""

if bool(githubLink):
  longText += """

                                <a href=\"""" + githubLink + """\"><button type=\"button\" style=\"margin-top: 2px;\" class=\"btn btn-secondary btn-lg btn-block\"><img src=\"/assets/githubLogo.png\" width=\"32\"></img> GitHub Link </button></a>
  """
if bool(thingiverseLink):
  longText += """
                                <a href=\"""" + thingiverseLink + """\"><button type=\"button\" style=\"margin-top: 2px;\" class=\"btn btn-secondary btn-lg btn-block\"><img src=\"/assets/thingiverseLogo.png\" width=\"42\"></img> Thingiverse Link </button></a>
  """
longText += """
                                <p>""" + paragraph + """
                                </p>
                              </div>
                            </div>
                          </div>



                        </div>
                        <center>
                        <footer class=\"pt-4 my-md-5 pt-md-5 border-top\">
                          <div class="row">
                            <div class="col-12 col-md">
                              <small class="d-block mb-3 text-muted">&copy; """ + str(copyYear) + """, Thomas McDonagh</small>
                            </div>
                          </div>
                        </footer>
                        </center>

             </center>
  </body>
</html>

"""

output = open("index.html", 'w')
output.write(longText)

print longText
