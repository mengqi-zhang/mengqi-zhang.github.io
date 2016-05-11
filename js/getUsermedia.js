window.onmessage = function(ev){
  if(ev.data == 'photo'){
     openVideo();
  }else if(ev.data == 'startRecording'){
    startRecording()
  }else if(ev.data == 'stopRecording'){
    stopRecording()
  }else if(ev.data == 'takephoto'){
    iClick()
  }
}
var video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('canvas');
var imgdata= document.getElementById("imgdata");
var button = document.querySelector('button');
var oDownload = document.getElementById("download");
var imgStr = '';
var recordVideo = ''
canvas.width = 480;
canvas.height = 284;
function openVideo(){
      var constraints = {
        audio: true,
        video: true
      };
      function successCallback(stream) {
        window.stream = stream; 
        video.srcObject = stream;
        recordVideo = RecordRTC(stream, {
            type: 'video'
        });
      }

      function errorCallback(error) {
        console.log('navigator.getUserMedia error: ', error);
      }
      navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
      navigator.getUserMedia(constraints, successCallback, errorCallback);      
      
}
function iClick() {
    video.style.display = 'none';
    canvas.style.display='block';
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    convertCanvasToImage(canvas);
    parent.window.postMessage(imgdata.value,'http://localhost:8881/main.html');
};
function convertCanvasToImage(oCanvas) {
    imgdata.value=oCanvas.toDataURL();
}    
var recordVideo;
function startRecording() {
    navigator.getUserMedia({
            audio: true,
            video: true
        }, function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
            recordVideo = RecordRTC(stream, {
                type: 'video'
            });
            console.log(recordVideo,12345)
        }, function(error) {
            alert(JSON.stringify(error));
        });
};


function stopRecording() {
  var blob = recordRTC.blob;
  var buffer = recordRTC.buffer;
  var sampleRate = recordRTC.sampleRate;
  console.log(blob,buffer,sampleRate)
   recordVideo.stopRecording();
};
