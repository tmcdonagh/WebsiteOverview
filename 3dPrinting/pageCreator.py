import os



# Variables to change before running
name = "Test Project"
date = "January 63rd, 2047"
paragraph = """
Test paragraph
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
  <head>
    <?php include(\'/var/www/html/included/header.php\') ?>
  </head>
  <body>
    <div id=\"main\">
    <center>
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
          <?php include(\'/var/www/html/included/footer.php\') ?>
  </body>
</html>

"""

output = open("index.php", 'w')
output.write(longText)

#print longText
