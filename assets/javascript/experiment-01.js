let fr = 1;
let letter = "A";
let letterSize;
let simplonFont;

function preload() {
    simplonFont = loadFont('assets/fonts/GT-America-Mono-Bold.woff');
}

function setup() {
    canvasDiv = document.getElementById('myCanvasContainer');
    let containerWidth = canvasDiv.offsetWidth;
    let containerHeight = window.innerHeight; // Get the window height
    var btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
    var canvasHeight = windowHeight - btnContainerHeight;


    // Create the canvas with the container's width and height
    canvas = createCanvas(containerWidth, canvasHeight, SVG);
    canvas.parent("parent-textbox");
    canvas.id('myCanvas');

    // Call a function to adjust the canvas size when the window is resized
    window.addEventListener('resize', resizeCanvas);

    textFont(simplonFont);
    textAlign(CENTER, BOTTOM);
    frameRate(fr);

//stroke(0);

    // Calculate letter size
    letterSize = min(containerWidth, containerHeight); // Adjust as needed

    // Set the background color of the SVG canvas
    let svgElement = select('svg');
    svgElement.style('background-color', '#000');
}

function draw() {
    fill(255);
    strokeWeight(random(1,15));
    let rot = random(0, 255);
    let gruen = random(0, 255);
    let blau = random(0, 255);
    stroke(rot, gruen, blau);
    textSize(letterSize);
    let yPlacement = (height / 2) + (textAscent() / 2); // Center vertically
    text(letter, width / 2, yPlacement);
}
function mouseDragged() {
    textSize((mouseX - width / 2) * 5 + 1);
    text(letter, width / 2, mouseY);
  }

function keyPressed() {
    if (key == 's' || key == 'S') save("mySVG.svg");
}

function windowResized() {
    let canvasDiv = document.getElementById('myCanvasContainer');
    let newWidth = canvasDiv.offsetWidth;
    let newHeight = window.innerHeight;
    letterSize = min(newWidth, newHeight) / 2.9; // Adjust as needed
    resizeCanvas(newWidth, newWidth);
}


