let video;  // Webcam-Video
let poseNet;
let pose;
let skeleton;
let vidWidth, vidHeight; // Declare variables to store video dimensions

let brain; // Neural Network speichern

let state = 'waiting';
let targetLabel;

let img;

function preload () {
  img = loadImage('/assets/images/biene.png');
}

function keyPressed(){
  if (key == 's') {
    brain.saveData();
  } else {
    targetLabel = key;
    console.log(targetLabel);
    setTimeout(function(){
      console.log('collecting');
      state = 'collecting';
      setTimeout(function(){
        console.log('not collecting');
        state = 'waiting';
      }, 10000);
    }, 10000);

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);  // poseNet Funktion aufrufen
  poseNet.on('pose', gotPoses); // event listener; wenn ein Mensch eine Pose ausführt

  let options = {
    inputs: 34, // 17 Punkt-Paare, also 34 Werte
    outputs: 3, // Klassifizierung als Y, M, C oder A
    task: 'regression',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  ///////////////// neues color-json file hier laden
  brain.loadData('/assets/json/Regression-TrainingData.json', dataReady);
}

function dataReady() {
  brain.normalizeData();
  brain.train({epochs: 75}, finished);
}

function finished (){
  console.log('model trained');
  brain.save();
}

function gotPoses(poses) {
  if (poses.length > 0) { // Wenn eine Pose ausgeführt wird
    pose = poses[0].pose; // Pose: nose, leftEye, rightEye, etc.
    skeleton = poses[0].skeleton;

    if(state == 'collecting'){
      let inputs = [];  // Leeres Array um danach die Koordinaten als flache Struktur einzulesen
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;

        // Scale the position of the ellipses based on the scaling factor applied to the video
        let scaledX = map(x, 0, video.width, x, x + vidWidth);
        let scaledY = map(y, 0, video.height, y, y + vidHeight);

        inputs.push(scaledX);
        inputs.push(scaledY);
   
      }
      let target = [targetLabel];
      // Hier könnte noch der confidence-score eingebaut werden.
      brain.addData(inputs, target);
   }
  } 
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  //background(255);
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

  // Video spiegeln und erst dann zeichnen
  // Apply transformations to mirror the canvas horizontally
  translate(width, 0);
  scale(-1, 1);
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
    // Linien zwischen den Punkten zeichnen
    for (let i = 0; i < skeleton.length; i++) { //  skeleton ist ein zweidimensionales Array
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);
      // Scale the position of the line endpoints based on the scaling factor applied to the video
      let x1 = map(a.position.x, 0, video.width, posX, posX + vidWidth);
      let y1 = map(a.position.y, 0, video.height, posY, posY + vidHeight);
      let x2 = map(b.position.x, 0, video.width, posX, posX + vidWidth);
      let y2 = map(b.position.y, 0, video.height, posY, posY + vidHeight);

      line(x1, y1, x2, y2);
    }

      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;

        // Scale the position of the ellipses based on the scaling factor applied to the video
        let scaledX = map(x, 0, video.width, posX, posX + vidWidth);
        let scaledY = map(y, 0, video.height, posY, posY + vidHeight);

         // Draw ellipses with scaled positions
        fill(0);
        stroke(255);
        //ellipse(scaledX, scaledY, 16, 16);
        imageMode(CENTER);
        image(img, scaledX, scaledY, 40, 40);
        imageMode(CORNER);
   
      }
  }
}
