var idNums = [];
var firebaseRef = firebase.database().ref();

firebaseRef.on('value', function (snapshot) {
  // Clears idNums array
  var idNums = [];

  // Loops through each data point
  snapshot.forEach(function (childSnapshot) {
    idNums.push(childSnapshot.val());
  });

  // Builds an html paragraph to display list
  var list = "";
  console.log(idNums.length);
  for (var i = 0; i < idNums.length; i++) {
    list += "" + idNums[i] + "<br>";
  }
  document.getElementById("list").innerHTML = list;
});

firebaseRef.on('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var counter = 0;
    snapshot.forEach(function (secondChildSnapshot) {
      if (childSnapshot.val() == secondChildSnapshot.val()) {
        counter++;
      }
    });
    if (counter > 1) {
      firebaseRef.child(childSnapshot.key).remove();
      counter = 0;
    }
  });
});


function submit() {
  //connect to db
  var nameValue = document.getElementById("uniqueID").value;

  //append value to db based on input
  if (nameValue.length == 5 && !isNaN(nameValue)) {
    firebaseRef.push(nameValue);
    //alert("You have successfully signed out!")
  }
  else {
    console.log(nameValue)
    //alert("Sorry! Your input " + "(" + nameValue + ")" + " was invalid")
  }

}

//completely clear text entry
function clearThis() {
  var form = document.getElementById("inputForm");
  form.reset();
}

$(document).ready(function () {
  $('#uniqueID').keypress(function (e) {
    if (e.keyCode == 13) {
      submit();
      clearThis();
    }
  });
});


/*
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function (result) {
// This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
// The signed-in user info.
    var user = result.user;
// ...
}).catch(function (error) {
// Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
// The email of the user's account used.
    var email = error.email;
// The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
// ...
});
*/

