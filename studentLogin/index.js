var idNums = [];
var table = document.createElement('table');
function login(id) {

  if(id % 1 == 0 && id != ""){
    idNums.push(id);
  }

  updateTable();

  // Clears Text Box
  document.getElementById("loginBox").value = "";

}
function logout(id) {
  var index = idNums.indexOf(id);
  if (index > -1) {
    idNums.splice(index, 1);
    updateTable();
    // Clears Text Box
    document.getElementById("loginBox").value = "";
  }

}
function updateTable() {
  var list = "";
  for (var i = 0; i < idNums.length; i++) {
    list += "" + idNums[i] + "<br>";
  }

  // Sets list to list variable
  document.getElementById("list").innerHTML = list;
}

