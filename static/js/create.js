// var CLIENT_ID = '229846019023-4ffjj2kv3qmkk6ecb3unfp87amhj6c98.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyCvDjA8icffmXu77w_ASDQA4OvYfm0UKCM';

var API_KEY = "AIzaSyCih5BY8cubJIbwv3QLmii0QYDbihi-5jI";
var CLIENT_ID = "1043579866785-70df3q6f6rgp11ifhacehllg7up7r7d6.apps.googleusercontent.com";

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
      alert("HERE");
      alert(JSON.stringify(error, null, 2));
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    mainPageTrans();
    // listCourses();
    // listCoursework();
    // getPFP();
  } else {
    alert("SAME SAME");
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
  listCourses();
  // change();
}

function listCourses() {
  gapi.client.classroom.courses.list({
    pageSize: 10
  }).then(function(response) {
    var courses = response.result.courses;
    if (courses.length > 0) {
      for (i = 0; i < courses.length; i++) {
        var course = courses[i];
        console.log(course.name);
        let option = `<option value="${course.id}">${course.name}</option>`;
        $("#classes").append(option);
        // appendPre(course.name);
        console.log(course.id);
      }
    } else {
      let option = `<option value="no-course">No courses</option>`;
      $("#classes").append(option);
    }
  });
}

$('#classes').change(function () {
  console.log("HERE");
  $('#assignments').empty();
  var value = $(this).find('option:selected').text();
  var id = $(this).find('option:selected').val();
  if (value != "No courses"){
    gapi.client.classroom.courses.courseWork.list({
      "courseId": id
    }).then(function(response) {
      var data = response.result.courseWork;
      console.log(data)
      // appendPre1('Course Work:');
  
      if (data.length > 0 && data.length >= 5) {
        for (i = 0; i < 5; i++) {
          var course = data[i];
          let option = `<option value="${course.title}">${course.title}</option>`;
          $("#assignments").append(option);
        }
      } else {
        let option = `<option value="no-assignments">No assignments</option>`;
        $("#assignments").append(option);
        // appendPre1('No courses found.');
      }
    });
  }
});

function getPFP() {
  var current = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
  console.log(current.getGivenName());
  document.querySelector(".logo").innerHTML = "Hi " + current.getGivenName() + "!";
  document.querySelector("#PFP").src = "" + current.getImageUrl() + "";
  console.log(current.getImageUrl());
  console.log(current.getEmail());
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['0 min', '4 min', '8 min', '10 min', '12 min', '14 min'],
        datasets: [{
            label: 'BlueprintMIT Test',
            backgroundColor: '#1CA8E6',
            borderColor: '#1CA8E6',
            data: [80, 50, 30, 55, 60, 70]
        }]
    },

    // Configuration options go here
    options: {
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time Passed'
          }
        }],
        yAxes: [{
          ticks: {
            stepSize: 10,
            min: 0,
            max: 100
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: '% of Engagement'
          }
        }]
      }
    }
});


function change() {
  // alert("HERE");
  // var current = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
  // var list = {};
  // list.name = current.getName();
  // list.class = $('#classes').find('option:selected').text();
  // list.assign = $('#assignments').find('option:selected').text();


  document.querySelector(".start").innerHTML = "End";

  setTimeout(function() {
      document.querySelector(".content").style = "display: none";
      document.querySelector(".info-container").style = "display: flex";

  }, 1000);




  // if (document.querySelector(".start").innerHTML == "Start EngageAI"){
  //     document.querySelector(".start").innerHTML = "End";
  //     // $.ajax({
  //     //     type: "POST",
  //     //     url: "http://127.0.0.1:8000/startimg",
  //     //     data: JSON.stringify(list),
  //     //     dataType: 'json'
  //     // }).done(function() {
  //     //     console.log("DONE");
  //     // });
  // }
  // else if (document.querySelector(".start").innerHTML === "End") {
  //     document.querySelector(".start").innerHTML = "Ended";
  //     countdown = setInterval(function(){
  //         document.querySelector(".start").innerHTML = "Start";
  //         clearInterval(countdown)
  //     }, 1000);
  //     // $.ajax({
  //     //   type: "POST",
  //     //   url: "http://127.0.0.1:8000/stopimg",
  //     //   data: JSON.stringify(list),
  //     //   dataType: 'json'
  //     // }).done(function() {
  //     //     console.log("DONE");
  //     // });
}



// document.querySelector(".startbtn").addEventListener('click', function() {
//   alert("HERE");
//   if (document.querySelector(".start").value === "Start"){
//       document.querySelector(".start").value = "End";
//   }
//   else if (document.querySelector(".start").value === "End") {
//       document.querySelector(".start").value = "Ended";
//       countdown = setInterval(function(){
//           document.querySelector(".start").value = "End";
//           clearInterval(coutndown)
//       }, 1000);
//   }
// });


