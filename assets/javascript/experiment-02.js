var textTyped = 'B';
var font;
var secondCanvas;
var letterSize = 800;
let textX;
let textY;

function setup() {
    canvasDiv = document.getElementById('myCanvasContainer');
    let containerWidth = canvasDiv.offsetWidth;
    var btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
    var canvasHeight = windowHeight - btnContainerHeight;
    let containerHeight = window.innerHeight - btnContainerHeight; // Get the window height

    // Create the second canvas with the container's width and height
    secondCanvas = createCanvas(containerWidth, containerHeight);
    secondCanvas.parent("parent-textbox");
    secondCanvas.id('myCanvas2');
    secondCanvas.style('position', 'absolute');
    secondCanvas.style('top');
    secondCanvas.style('left');

    // Call a function to adjust the canvas size when the window is resized
   

    noLoop();

    // Load the font
    opentype.load('/assets/fonts/GT-Eesti-Pro-Display-Bold-Italic.otf', function(err, f) {
        if (err) {
            console.log(err);
        } else {
            font = f;
            loop();
        }
    });

    // Set initial letter size based on container width
    //letterSize = min(containerWidth, containerHeight); // Adjust as needed
    textX = containerWidth / 2; // Center horizontally
    textY = containerHeight / 2; // Center horizontally
    textAlign(CENTER, CENTER);

    angleMode(DEGREES); // Corrected typo
}

function draw() {
    background(255);
    if (!font) return;

    // margin border
   translate(-windowWidth/8, windowHeight/3.8);

    if (textTyped.length > 0) {
        // get a path from OpenType.js
        var fontPath = font.getPath(textTyped, textX, textY, letterSize); // Center horizontally
        // convert it to a g.Path object
        var path = new g.Path(fontPath.commands);
        // resample it with equidistant points
       
        path = g.resampleByLength(path, 11);
        //path = g.resampleByAmount(path, 500);

        // lines
        stroke('#ff0000');
        strokeWeight(1.0);
        var l = 5;
        // for (var i = 0; i < path.commands.length; i++) {
        //     var pnt = path.commands[i];
        //     line(pnt.x - l, pnt.y - l+10, pnt.x + l, pnt.y + l);
        // }

        // dots
        fill('#000');
        noStroke();
        var diameter = 13;
        for (var i = 0; i < path.commands.length; i++) {
            var pnt = path.commands[i];
            // on every 2nd point
            if (i % 1 == 0) {
                push();
                 var strichDicke = mouseX/100;
                 var linienRotation = mouseY;
                translate(pnt.x, pnt.y); // Move to the point
                rotate(linienRotation); // Rotate by 10 degrees
                ellipse(0, 0, diameter*20,   strichDicke); // Draw ellipse relative to the point
                pop();
            }
        }
    }


}

function keyPressed() {
    if (key == 's' || key == 'S') save("mySVG.png");
}

function windowResized() {
    let canvasDiv = document.getElementById('myCanvasContainer');
    let newWidth = canvasDiv.offsetWidth;
    let newHeight = window.innerHeight;
    letterSize = min(newWidth, newHeight) / 2.9; // Adjust as needed
    textX = newWidth / 2; // Center horizontally
    textY = newHeight / 2; // Center vertically
    var btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
    var canvasHeight = windowHeight - btnContainerHeight;
    resizeCanvas(newWidth, canvasHeight);
}


