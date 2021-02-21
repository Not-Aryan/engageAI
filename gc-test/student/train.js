// var CLIENT_ID = '229846019023-4ffjj2kv3qmkk6ecb3unfp87amhj6c98.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyCvDjA8icffmXu77w_ASDQA4OvYfm0UKCM';

var API_KEY = "AIzaSyCgE9A8a2k_NB8XNvvEBkV_Enf1TdzBUxY";
var CLIENT_ID = "1037786606011-mfuqk1j4fhb52vsdbs58ne4f1he85q11.apps.googleusercontent.com";

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest"];

var SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.profile.emails";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    alert("ERROR");
    appendPre(JSON.stringify(error, null, 2));
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    mainPageTrans();
    // listCourses();
    // listCoursework();
    // getPFP();
  } else {
    // alert("SAME SAME");
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}


function mainPageTrans() {
  console.log("HERE");
  var modal = document.querySelector(".start-modal");
  var main = document.querySelector(".main-container");
  modal.style.display = "none";
  main.style.display = "block";
  getPFP();
}

function getPFP() {
    var current = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    console.log(current.getGivenName());
    document.querySelector(".logo").innerHTML = "Hi " + current.getGivenName() + "!";
    document.querySelector("#PFP").src = "" + current.getImageUrl() + "";
    console.log(current.getImageUrl());
    console.log(current.getEmail());
}

var num = document.querySelector(".time");
var bar = document.querySelector("#myBar");
var title = document.querySelector(".fot");
var ex = document.querySelector(".fot-ex");
var ammt = 0
var audio = new Audio('/gc-test/done.mp3');


function startfront() {
    var current = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    var list = {};
    list.name = current.getName();
    list.type = 'front'
    num.innerHTML = 30;
    // $.ajax({
    //     type: "POST",
    //     url: "http://127.0.0.1:5000/train",
    //     data: JSON.stringify(list),
    //     dataType: 'json'
    // }).done(function() {
    //     console.log("DONE");
    // });
    countdown = setInterval(function(){
        trainfront();
    }, 1000);
}

function trainfront() {
    num.innerHTML = num.innerHTML -1;
    ammt = ammt + 3.33;
    bar.style.width = ammt + "%";
    console.log(ammt);
    if (num.innerHTML == 0){
        audio.play();
    }
    if (num.innerHTML == -1){
        clearInterval(countdown);
        setTimeout(transition(), 5000);
    }
}

function transition() {
    num.innerHTML = "Start";
    title.innerHTML = "Turned";
    ex.innerHTML = "Now, look away from your screen (remember a sound will be played when you're done)";
    bar.style.width = "0%";
    ammt = 0
    document.querySelector(".time").setAttribute('onclick','startturn()');
}

function startturn() {
    // var video = document.getElementById('vid');
    // video.pause();
    num.innerHTML = 30;
    // $.ajax({
    //     type: "GET",
    //     url: server,
    //     data: JSON.stringify("IDK"),
    //     dataType: 'json'
    // }).done(function() {
    //     console.log("DONE");
    // });
    countdown1 = setInterval(function(){
        trainturn();
    }, 1000);
}

function trainturn() {
    num.innerHTML = num.innerHTML -1;
    ammt = ammt + 3.33;
    bar.style.width = ammt + "%";
    console.log(ammt);
    if (num.innerHTML == 0){
        audio.play();
        clearInterval(countdown1);
    }
}

