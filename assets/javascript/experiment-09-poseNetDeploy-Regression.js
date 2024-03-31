let video;  // Webcam-Video
let poseNet;
let pose;
let skeleton;
let vidWidth, vidHeight; // Declare variables to store video dimensions

let brain; // Neural Network speichern

let state = 'waiting';
let targetLabel;

let img;

let rSlider, gSlider, bSlider;

function preload () {
  img = loadImage('/assets/images/biene.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  rSlider = createSlider(0, 255, 0);
  gSlider = createSlider(0, 255, 0);
  bSlider = createSlider(0, 255, 0);

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
  //brain.loadData('/assets/json/YMCA.json', dataReady);

  // Objekt erstellen
  const modelInfo = {
    //////////////////////// neue json files hier laden
    model: 'assets/json/Regression-Model/model.json',
    metadata: 'assets/json/Regression-Model/model_meta.json',
    weights: 'assets/json/Regression-Model/model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log('Posen-Klassifizierung ist ready');
  predictColor();

}

function predictColor(){
  if (pose) {
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
    brain.predict(inputs, gotResult);
  } else {
    setTimeout(predictColor, 100);
  }

}

function gotResult(error, results) {
//console.log(results);
let r = results[0].value;
let g = results[1].value;
let b = results[2].value;
rSlider.value(r);
gSlider.value(g);
bSlider.value(b);
predictColor();
}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function finished (){
  console.log('model trained');
  brain.save();
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  push();
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

  pop();

 let r = rSlider.value();
 let g = gSlider.value();
 let b = bSlider.value();
 background(r, g, b, 100);
}
