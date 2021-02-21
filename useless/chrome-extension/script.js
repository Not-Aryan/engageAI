// var video = document.getElementById('vid');

// if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({ 
//         video: {
//             width: 72,
//             height: 56
//         }
//     })
//     .then(function(stream) {
//         //video.src = window.URL.createObjectURL(stream);
//         video.srcObject = stream;
//         video.play();
//     });
// }


var server = "";

document.querySelector(".start").addEventListener('click', function() {
    if (document.querySelector(".start").value === "Start"){
        document.querySelector(".start").value = "End";
    }
    else if (document.querySelector(".start").value === "End") {
        setintervalde
        document.querySelector(".start").value = "Ended";
        countdown = setInterval(function(){
            document.querySelector(".start").value = "End";
            clearInterval(coutndown)
        }, 1000);
    }
});



if (document.querySelector(".submit").value === "S"){
    alert("Started");
    console.log("here");
    document.querySelector(".submit").value = "End";
    server = "http://127.0.0.1:5000/run"; 
}