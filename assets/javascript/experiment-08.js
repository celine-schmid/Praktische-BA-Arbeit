let video;  // Webcam-Video
let poseNet;
let pose;
let skeleton;
let vidWidth, vidHeight; // Declare variables to store video dimensions
let img;

function preload() {
  font = loadFont('assets/javascript/fonts/GT-Eesti-Pro-Display-Bold-Italic.otf');
  img = loadImage('/assets/images/biene.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);  // poseNet Funktion aufrufen
  poseNet.on('pose', gotPoses); // event listener; wenn ein Mensch eine Pose ausführt
}

function gotPoses(poses) {
  if (poses.length > 0) { // Wenn eine Pose ausgeführt wird
    pose = poses[0].pose; // Pose: nose, leftEye, rightEye, etc.
    skeleton = poses[0].skeleton;
    // Hier könnte noch der confidence-score eingebaut werden.
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  background(255); // Clear the canvas

  // Calculate the width and height of the video to maintain its aspect ratio
  let aspectRatio = video.width / video.height;
  let canvasRatio = width / height;
  if (aspectRatio > canvasRatio) {
    vidWidth = width;
    vidHeight = width / aspectRatio;
  } else {
    vidWidth = height * aspectRatio;
    vidHeight = height;
  }

  // Calculate the position to center the video on the canvas
  let posX = (width - vidWidth) / 2;
  let posY = (height - vidHeight) / 2;

  // Draw the video with the calculated dimensions and position
  image(video, posX, posY, vidWidth, vidHeight);

// Einzelne Punkte ansteuern
//  if (pose){

//Distanz zur Kamera mit Augendistanz ermitteln
// let eyeR = pose.rightEye;
// let eyeL = pose.leftEye;
// let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

//   fill(255,0,0);
//   ellipse(pose.nose.x, pose.nose.y, d);
// }

  if (pose) {
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;

      // Scale the position of the ellipses based on the scaling factor applied to the video
      let scaledX = map(x, 0, video.width, posX, posX + vidWidth);
      let scaledY = map(y, 0, video.height, posY, posY + vidHeight);

      // Draw ellipses with scaled positions
      imageMode(CENTER);
      image(img, scaledX, scaledY, 40, 40);
      imageMode(CORNER);
    }

    // Linien zwischen den Punkten zeichnen
    for (let i = 0; i < skeleton.length; i++) { //  skeleton ist ein zweidimensionales Array
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);

      // Scale the position of the line endpoints based on the scaling factor applied to the video
      let x1 = map(a.position.x, 0, video.width, posX, posX + vidWidth);
      let y1 = map(a.position.y, 0, video.height, posY, posY + vidHeight);
      let x2 = map(b.position.x, 0, video.width, posX, posX + vidWidth);
      let y2 = map(b.position.y, 0, video.height, posY, posY + vidHeight);

      stroke(255);
      line(x1, y1, x2, y2);
    }
  }
}
