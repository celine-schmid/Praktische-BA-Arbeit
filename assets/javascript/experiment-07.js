var typedKey = 'G'; 

var fontPath; // Der Pfad der Schriftart
var spacing = 20; // Abstand zwischen den Buchstaben
var spaceWidth = 80; // Breite des Leerzeichens
var fontSize = 200; // Schriftgröße
var lineSpacing = fontSize * 1.2; // Zeilenabstand
var textW = 0; // Breite des Textes
var letterX = 50 + spacing; // x-Position des ersten Buchstabens
var letterY = lineSpacing; // y-Position des ersten Buchstabens

var stepSize = 1; // Schrittgröße für die Bewegung der Buchstaben
var danceFactor = 0.4; // Faktor für die Verzerrung der Buchstaben

var font; // Die geladene Schriftart
var pnts; // Die Punkte des Buchstabens

var freeze = false; // Steuert die Bewegung der Buchstaben
var mousePressedFlag = false; // Flag to track if the mouse button is pressed


let bild;

function preload() {
  img = loadImage('/assets/images/biene.png');
  //img = loadImage('/assets/images/pusteblume-2.png');

}

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
  noLoop(); // Deaktiviert die automatische Aktualisierung der draw-Funktion

  img.resize(50,50);

  // Lädt die Schriftart asynchron und führt eine Funktion aus, sobald sie geladen ist
  opentype.load('/assets/fonts/GT-Eesti-Pro-Display-Bold-Italic.otf', function(err, f) {
    if (err) {
      console.log(err); // Gibt Fehlermeldungen in der Konsole aus, falls vorhanden
    } else {
      font = f; // Weist die geladene Schriftart der Variablen font zu
      pnts = getPoints(typedKey); // Ruft die Funktion getPoints auf, um die Punkte des eingegebenen Buchstabens zu erhalten
      loop(); // Startet den Draw-Zyklus
    }
  });
}

function draw() {
  if (!font) return; // Beendet die draw-Funktion, falls die Schriftart noch nicht geladen ist

  //noFill(); // Keine Füllung für Formen
  fill("#000");
  push(); // Speichert den aktuellen Zeichenkontext

  // Translation entsprechend der aktuellen Schreibposition
  translate(letterX, letterY);

  // Verzerrung an/aus
  danceFactor = 0.5;
  if (mouseIsPressed && mouseButton == LEFT) danceFactor = map(mouseX, 0, width, 0, 15);

  // Sind Punkte zum Zeichnen vorhanden?
  if (pnts.length > 0) {
    // Lassen Sie die Punkte tanzen
    for (var i = 0; i < pnts.length; i++) {
      pnts[i].x += random(-stepSize, stepSize) * danceFactor; // Ändert die x-Position des Punktes zufällig
      pnts[i].y += random(-stepSize, stepSize) * danceFactor; // Ändert die y-Position des Punktes zufällig
    }

    // Linien: Verbunden mit geraden Linien
    strokeWeight(0.1); // Strichstärke
    stroke(150); // Strichfarbe
    beginShape(); // Beginnt eine neue Form
    for (var i = 0; i < pnts.length; i++) {
      //vertex(pnts[i].x, pnts[i].y); // Fügt einen Scheitelpunkt hinzu
      //ellipse(pnts[i].x, pnts[i].y, 7, 7); // Zeichnet einen Punkt
      //square(pnts[i].x, pnts[i].y, 7, 7); // Zeichnet einen Punkt
      image(img, pnts[i].x, pnts[i].y); // Zeichnet einen Punkt
    }
    //vertex(pnts[0].x, pnts[0].y); // Verbindet den letzten Punkt mit dem ersten Punkt, um die Form zu schließen
    endShape(); // Beendet die Form

    // Linien: Verbunden mit abgerundeten Linien
    /*
      strokeWeight(0.08);

      beginShape();
      // Start controlpoint
      curveVertex(pnts[pnts.length-1].x, pnts[pnts.length-1].y);
      // Only these points are drawn
      for (var i = 0; i < pnts.length; i++) {
        curveVertex(pnts[i].x, pnts[i].y);
      }
      curveVertex(pnts[0].x, pnts[0].y);
      // End controlpoint
      curveVertex(pnts[1].x, pnts[1].y);
      endShape();
    */
  }

  pop(); // Wiederherstellen des vorherigen Zeichenkontexts
}

// Funktion zum Abrufen der Punkte des Buchstabens aus der Schriftart
function getPoints() {
  fontPath = font.getPath(typedKey, windowWidth/3, windowHeight/2.5, 500); // Erstellt einen Pfad für den eingegebenen Buchstaben
  var path = new g.Path(fontPath.commands); // Erstellt ein g.Path-Objekt aus dem Pfad
  path = g.resampleByLength(path, 10); // Resampling des Pfads mit equidistanten Punkten
  textW = path.bounds().width; // Berechnet die Breite des Textes
  // Entfernt alle Befehle ohne Koordinate aus dem Pfad
  for (var i = path.commands.length - 1; i >= 0 ; i--) {
    if (path.commands[i].x == undefined) {
      path.commands.splice(i, 1);
    }
  }
  return path.commands; // Gibt die Punkte des Buchstabens zurück
}

function keyPressed() {
    if (key == 's' || key == 'S') save("mySVG.png");
}

function mouseReleased() {
  mousePressedFlag = false; // Set the flag to false when mouse button is released
  resetImagePositions(); // Reset image positions
  redraw(); // Redraw the canvas
}

function resetImagePositions() {
  // Reset the position of the images to their original locations
  pnts = getPoints(typedKey);
}

function windowResized() {
  let canvasDiv = document.getElementById('myCanvasContainer');
  let newWidth = canvasDiv.offsetWidth;
  let newHeight = window.innerHeight;


  var btnContainerHeight = document.getElementById('myBtnContainer-top').clientHeight;
  var canvasHeight = windowHeight - btnContainerHeight;
  resizeCanvas(newWidth, canvasHeight);
}