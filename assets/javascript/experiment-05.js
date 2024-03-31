var textTyped = '5';
var font;
var filled = true; // Boolean-Variable zur Steuerung der Füllung der Buchstaben
var secondCanvas;

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

 // Lädt die Schriftart asynchron und führt eine Funktion aus, sobald sie geladen ist
  opentype.load('/assets/fonts/GT-Eesti-Pro-Display-Bold-Italic.otf', function(err, f) {
    if (err) {
      console.log(err);
    } else {
      font = f;
      loop(); // Startet den Draw-Zyklus
    }
  });
}

function draw() {
  if (!font) return; // Beendet die draw-Funktion, falls die Schriftart noch nicht geladen ist

  background("#000");
  if (filled) {
    noStroke();
    fill(0);
  } else {
    noFill(); //Bézier-Kurven
    //fill(0); //gefüllte Bézier-Formen
    stroke(0);
    strokeWeight(2);
  }

  // margin border
  translate(20, 260);

  if (textTyped.length > 0) {
   // opentype.js liefert einen Pfad für den eingegebenen Text der geladenen Schriftart
    var fontPath = font.getPath(textTyped, windowWidth/3, windowHeight/2.5, 500);
    
    fill("0"); // Linienfarbe

    // Konvertiert den Pfad in ein g.Path-Objekt
    var path = new g.Path(fontPath.commands);
    // Teilt den Pfad in gleich lange Abschnitte (Zahl entspricht Angabe in Pixeln); Je grösser die Zahl, desto weniger Punkte definieren den Pfad.
    path = g.resampleByLength(path, 4);

    // Mapping der Mausachsen; Die Mausachsen steuern die Rotation und Höhe der Bézierkurven.
    var addToAngle = map(mouseX, 0, width, -PI, PI);
    var curveHeight = map(mouseY, 0, height, 0.1, 100);

    // Die Punkte werden vom ersten bis zum vorletzten durchlaufen.
    for (var i = 0; i < path.commands.length - 1; i++) {
      var pnt0 = path.commands[i];
      var pnt1 = path.commands[i + 1];
      var d = dist(pnt0.x, pnt0.y, pnt1.x, pnt1.y);    // Die Distanz vom aktuellen zum nächsten Punkt wird berechnet.

      // Falls die Distanz grösser als 20 ist, wird die Schleife abgebrochen; deshalb sind die einzelnen Buchstaben nicht miteinander verbunden
      if (d > 20) continue;

      // Damit die Bézierkurve auf- und abschwingen kann, werden für die Variable stepper abwechselnd die Werte -1 und 1 verwendet.
      var stepper = map(i % 2, 0, 1, -1, 1);
      // Berechnung des Winkels zwischen den Punkten und Anpassung um den Wert von addToAngle
      var angle = atan2(pnt1.y - pnt0.y, pnt1.x - pnt0.x);
      angle = angle + addToAngle;

      // Die Koordinaten des Kontrollpunktes werden durch cx und cy definiert; Berechnung der Koordinaten des Kontrollpunktes für die Bézierkurve
      var cx = pnt0.x + cos(angle * stepper) * d * 4 * curveHeight;
      var cy = pnt0.y + sin(angle * stepper) * d * 3 * curveHeight;

      // Zeichnet eine Bézierkurve zwischen aktuellen und nächsten Punkt mit dem Kontrollpunkt
      bezier(pnt0.x, pnt0.y, cx, cy, cx, cy, pnt1.x, pnt1.y);
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


  var btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
  var canvasHeight = windowHeight - btnContainerHeight;
  resizeCanvas(newWidth, canvasHeight);
}