'use strict';

var drawMode = 1;
var img;

function preload() {
img = loadImage('assets/images/experiment-11_H.png');
img.resize(100);
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  var btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
  var canvasHeight = windowHeight - btnContainerHeight;
  createCanvas(windowWidth, canvasHeight);
  // window.addEventListener('resize', windowResized);
}

function draw() {
  background(255);
  
  // Faktoren für die Veränderung der Zeichenparameter basierend auf der Mausposition
  var mouseXFactor = map(mouseX, 0, width, 0.05, 1);
  var mouseYFactor = map(mouseY, 0, height, 0.05, 1);

  // Schleife über die Pixel des Bildes
  for (var gridX = 0; gridX < img.width; gridX++) {
    for (var gridY = 0; gridY < img.height; gridY++) {
      // Position im Raster + Kachelgröße
      var tileWidth = width / img.width;
      var tileHeight = height / img.height;
      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;

      // Aktuelle Farbe abrufen
      img.loadPixels();
      var c = color(img.get(gridX, gridY));
      // Graustufenkonvertierung
      var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);

      switch (drawMode) {
      case 1:
        noStroke();
        fill(greyscale, greyscale * mouseXFactor, 100 * mouseYFactor);
        //noFill();
        stroke('#000');
        //fill(greyscale);
        //stroke('#000');
        //ellipse(posX, posY, mouseXFactor * 100, mouseYFactor * 20);
       strokeWeight(1);


        push(); // Save the current drawing state

        // Translate to the position where the ellipse should be drawn
        translate(posX, posY);
  
        // Calculate the angle of rotation based on mouseY
        var angle = radians(mouseY);
  
        // Rotate the ellipse around its center
        rotate(angle);
  
        // Draw the ellipse
        ellipse(0, 0, mouseXFactor * 100, mouseYFactor * 20);
  
        pop(); // Restore the previous drawing state
        break;
    
    //   case 2:
    //     // Graustufen zu Ellipsenfläche
    //     noFill();
    //     strokeWeight(1);
    //     stroke('#000');
    //     var r2 = 1.1284 * (tileWidth * tileWidth * (1 - greyscale / 255));
    //     r2 *= mouseXFactor ;
  
    //     push(); // Save the current drawing state
    //     translate(posX, posY); // Move the origin to the position of the ellipse
    //     rotate(mouseYFactor *30); // Apply rotation based on mouseYFactor
  
    //     // Draw the ellipse relative to the translated and rotated origin
    //     ellipse(0, 0, 30, r2);
  
    //     pop(); // Restore the previous drawing state
    //     break;
    //   case 3:
    //     // Graustufen zu Linienlänge
    //     var l3 = map(greyscale, 0, 255, 30, 0.1);
    //     l3 *= mouseXFactor;
    //     stroke(0);
    //     strokeWeight(10 * mouseYFactor);
    //     line(posX, posY, posX + l3, posY + l3);
    //     break;
    //   case 4:
    // // Graustufen zu Strichstärke
    // var w1 = map(greyscale, 0, 255, 15, 0.1);
    // stroke(0);
    // strokeWeight(w1 * mouseXFactor*3);
    // line(posX, posY, posX + 15, posY + 15);
    // break;
      
      }
    }
  }
}
function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  // change draw mode
  // if (key == '1') drawMode = 1;
  // if (key == '2') drawMode = 2;
  // if (key == '3') drawMode = 3;
  // if (key == '4') drawMode = 4;
}

function windowResized() {
  var btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
  var canvasHeight = windowHeight - btnContainerHeight;
  resizeCanvas(windowWidth, canvasHeight);
}