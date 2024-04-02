let size = 50;
let rows = 10;
let cols = 10;

let boxes = [];

let font;
let msg = 'J';
let points = [];
let fontX = -195;
let fontY = 220;
let fontSize = 620;

function preload(){
  font = loadFont('assets/fonts/TheWClanEDU-RZA-WebXL.ttf');
}

function setup() {
  var btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
  var canvasHeight = windowHeight - btnContainerHeight;
  createCanvas(windowWidth, canvasHeight, WEBGL);
  angleMode(DEGREES);


  cols = width/size;
  rows = height/size;
  
  points = font.textToPoints(msg, fontX, fontY, fontSize); //Text von dem das Array erstellt werden soll, x- und y-Koordinate des linken unteren Eckens der Text-Bounding-Box, (Schriftgrösse)
  
  for (let i=0; i<cols; i++) {
    boxes[i] = [];
    for (let j=0; j<rows; j++) {
      boxes[i][j] = new Box(size/2 + i*size - size*cols/2, size/2 + j*size - size*rows/2);
    }
  }
}

function draw() {
  background(0, 0, 139);
  let distance;
  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      for (let k=0; k<points.length; k++){
        distance = dist(points[k].x, points[k].y, boxes[i][j].x, boxes[i][j].y);
        
        if (distance < 25) {
          boxes[i][j].isLetter = true;
        } 
      }

      boxes[i][j].display();
    }
  }
  
  // fill(255, 0, 0);
  // for (let i=0; i<points.length; i++) {
  //   ellipse(points[i].x, points[i].y, 10, 10);
  // }
  
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}

function windowResized() {
  var btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
  var canvasHeight = windowHeight - btnContainerHeight;
  resizeCanvas(windowWidth, canvasHeight);
}


// let cols;
// let rows;
// let size;
// let grid = []; // 2D array to store grid information

// function setup() {
//   let btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
//   let canvasHeight = windowHeight - btnContainerHeight;
//   createCanvas(windowWidth, canvasHeight);
//   updateGridSize(); // Initialize grid size
  
//   // Initialize the grid array
//   for (let i = 0; i < cols; i++) {
//     grid[i] = [];
//     for (let j = 0; j < rows; j++) {
//       grid[i][j] = {
//         x: i * size,
//         y: j * size,
//         color: color(255) // Default color (white)
//       };
//     }
//   }
//   grid[0][4].color = color('#FF0000');
//   grid[1][3].color = color('#00FF00');
//   grid[1][2].color = color('#00FF00');
//   grid[2][3].color = color('#00FF00');
//   grid[2][2].color = color('#00FF00');
// }

// function draw() {
//   background('#000');
//   updateGridSize(); // Update grid size based on mouseY
  
//   // Draw and color the rectangles
//   for (let i = 0; i < cols; i++) {
//     for (let j = 0; j < rows; j++) {
//       fill(grid[i][j].color); // Set fill color
//       rect(grid[i][j].x, grid[i][j].y, size, size); // Draw rectangle
//     }
//   }
// }

// function keyReleased() {
//   if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
// }

// function windowResized() {
//   let btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
//   let canvasHeight = windowHeight - btnContainerHeight;
//   resizeCanvas(windowWidth, canvasHeight);
// }

// function updateGridSize() {
//   //size = map(mouseY, 0, height, 50, height); // Adjust size based on mouseY position
//   let btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
//   let gridHeight = windowHeight - btnContainerHeight;
//   size = gridHeight/ 5;
//   cols = floor(windowWidth / size); // Recalculate the number of columns
//   rows = floor(windowHeight / size); // Recalculate the number of rows
// }


