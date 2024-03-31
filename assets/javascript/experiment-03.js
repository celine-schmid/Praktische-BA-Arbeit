var doSave = false;

var textTyped = 'C';

var font;

var shapeSet = 0;
var module1, module2;

function preload() {
  module1 = loadImage('/assets/images/opentype_1.svg');
  module2 = loadImage('/assets/images/opentype_2.svg');
}

function setup() {
  var btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
  var canvasHeight = windowHeight - btnContainerHeight;
  createCanvas(windowWidth, canvasHeight);

  opentype.load('/assets/fonts/GT-Eesti-Pro-Display-Bold-Italic.otf', function(err, f) {
    if (err) {
      console.log(err);
    } else {
      font = f;
    }
  });

}

function draw() {
  background(255);
  noStroke();
  imageMode(CENTER);

  // margin border
  translate(windowWidth/3, windowHeight/1.5);

  if (textTyped.length > 0 && font != undefined) {
    // get a path from OpenType.js
    var fontPath = font.getPath(textTyped, 0, 0, 600);
    // convert it to a g.Path object
    var path = new g.Path(fontPath.commands);
    // resample it with equidistant points
    path = g.resampleByLength(path, 15);

    // ------ svg modules ------
    // module1
    var diameter = 2;

    for (var i = 0; i < path.commands.length - 1; i++) {
      var pnt = path.commands[i];
      var nextPnt = path.commands[i + 1];

      // skip this loop if one of the points doesn't have coordinates (could happen for path closing commands)
      if (!pnt.x || !nextPnt.x) continue;

      // on every third point
      if (i % 3 == 0) {
        // rotate the module facing to the next one (i+1)
        push();
        var angle = atan2(pnt.y - nextPnt.y, pnt.x - nextPnt.x);
        translate(pnt.x, pnt.y);
        rotate(angle);
        rotate(radians(-mouseX));
        image(module1, 0, 0, diameter + (mouseY / 2.5), diameter + (mouseY / 2.5));
        pop();
      }
    }

    // module2
    diameter = 2;
    for (var i = 0; i < path.commands.length - 1; i++) {
      var pnt = path.commands[i];
      var nextPnt = path.commands[i + 1];

      // skip this loop if one of the points doesn't have coordinates (could happen for path closing commands)
      if (!pnt.x || !nextPnt.x) continue;

      // on every third point
      if (i % 3 == 0) {
        // rotate the module facing to the next one (i+1)
        push();
        var angle = atan2(pnt.y - nextPnt.y, pnt.x - nextPnt.x);
        translate(pnt.x, pnt.y);
        rotate(angle);
        rotate(radians(mouseX));
        image(module2, 0, 0, diameter + (mouseY / 2.5), diameter + (mouseY / 2.5));
        pop();
      }
    }

  }
}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
    }
  }

  if (keyCode == ALT) {
    shapeSet = (shapeSet + 1) % 4;
    switch (shapeSet) {
    case 0:
      module1 = loadImage('/assets/images/opentype_2.svg');
      module2 = loadImage('/assets/images/opentype_2.svg');
      break;
    case 1:
      module1 = loadImage('/assets/images/opentype_1.svg');
      module2 = loadImage('/assets/images/opentype_2.svg');
      break;
    case 2:
      module1 = loadImage('/assets/images/opentype_1.svg');
      module2 = loadImage('/assets/images/opentype_2.svg');
      break;
    case 3:
      module1 = loadImage('/assets/images/opentype_1.svg');
      module2 = loadImage('/assets/images/opentype_2.svg');
      break;
    }
  }
}

// function keyTyped() {
//   if (keyCode >= 32) {
//     textTyped += key;
//   }
// }

function keyPressed() {
    if (key == 's' || key == 'S') save("mySVG.png");
}

function windowResized() {
  var btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
  var canvasHeight = windowHeight - btnContainerHeight;
  resizeCanvas(windowWidth, canvasHeight);
  
}