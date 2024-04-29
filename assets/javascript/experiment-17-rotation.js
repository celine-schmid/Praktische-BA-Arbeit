
///////////////////////////////////////////////////////////////////////////////////////////////////
// Neustart
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    blendMode(DIFFERENCE);
 //blendMode(DARKEST);
//    blendMode(MULTIPLY);
blendMode(BLEND);
  frameRate(40);
  background(0);
  //Buchstabenoutlines
  //translate(width/4, height/4);
  //noFill();
  // noStroke();
  // fill(20,40,80,0.6);
  // //fill('white');
  // strokeWeight(4);
  // beginShape();
  // vertex(90,49);
  // vertex(-90,351);
  // vertex(30,351);
  // vertex(120,200);
  // vertex(210,351);
  // vertex(330,351);
  // vertex(150,49);
  // vertex(91,49);
  // endShape();
  
  // //noFill();
  // noStroke();
  // fill(130,40,80,0.6);
  // beginShape();
  // vertex(150,49);
  // vertex(240,200);
  // vertex(150,351);
  // vertex(270,351);
  // vertex(299,298);
  // vertex(330,351);
  // vertex(450,351);
  // vertex(360,200);
  // vertex(452,49);
  // vertex(330,49);
  // vertex(300,100);
  // vertex(270,49);
  // vertex(150,49);
  // endShape();
  
  
  // beginShape();
  // //noFill();
  // noStroke();
  // fill(300,40,80,0.6);
  // vertex(452,49);
  // vertex(268,351);
  // vertex(390,351);
  // vertex(570,49);
  // vertex(455,49);
  // endShape();
  
  // beginShape();
  // fill(200,40,80,0.6);
  // noStroke();
  // //noFill();
  
  // vertex(452,49);
  // vertex(420,100);
  // vertex(510,250);
  // vertex(330,250);
  // vertex(270,351);
  // vertex(510,351);
  // vertex(600,200);
  // vertex(570,150);
  // vertex(630,150);
  // vertex(690,49);
  // vertex(455,49);
  // endShape();
  
  
  }
  
  function draw() {
 background('white');
  translate(-100, 0);

//translate(-1000, -500);   //WEBGL
  //rotate(0.5*frameCount);
  //shearY(-20);



    let seite = 60; // Length of each side of the hexagon
    // Define the height of the hexagon
    let hoehe = sqrt(3) * seite;
    translate(width/4, height/4);
  
  
  
  
    // Draw hexagons
    // A
    noStroke();
    fill(20,40,80,0.2);
  fill('white');
  //noFill();
  stroke('white');
  noStroke();
    //noFill();
    stroke(20,40,80,0.4);
    //stroke('black');
    strokeWeight(2);
    push();
    translate(-65,0);
    drawRotatedHexagon(120, 100, seite, hoehe);
    drawRotatedHexagon(60, 200, seite, hoehe);
    drawRotatedHexagon(180, 200, seite, hoehe);
    drawRotatedHexagon(0, 300, seite, hoehe);
    drawRotatedHexagon(240, 300, seite, hoehe);
    drawRotatedTriangle(60,133,seite,hoehe);
    drawRotatedTriangle(180,133,seite,hoehe);
    drawRotatedTriangleG(60,267,seite,hoehe);
    drawRotatedTriangle(0,233,seite,hoehe);
    drawRotatedTriangle(240,233,seite,hoehe);
    drawRotatedTriangleG(180,267,seite,hoehe);
    drawRotatedTriangle(300,334,seite,hoehe);
    drawRotatedTriangle(-59,334,seite,hoehe);
  pop();
  
    // X
    //noStroke();
    //fill(270,40,80,0.4);
    //noFill();
    stroke(270,40,80,0.4);
    push();
    translate(115,0);
    drawRotatedHexagon(240, 100, seite, hoehe);
    drawRotatedHexagon(360, 100, seite, hoehe);
    drawRotatedHexagon(300, 200, seite, hoehe);
    drawRotatedHexagon(240, 300, seite, hoehe);
    drawRotatedHexagon(360, 300, seite, hoehe);
    drawRotatedTriangleG(180, 67, seite, hoehe);
    drawRotatedTriangleG(420, 67, seite, hoehe);
    drawRotatedTriangleG(240, 167, seite, hoehe);
    drawRotatedTriangleG(360, 167, seite, hoehe);
    drawRotatedTriangleG(300, 267, seite, hoehe);
    drawRotatedTriangle(300,133, seite, hoehe);
    drawRotatedTriangle(181,334, seite, hoehe);
    drawRotatedTriangle(420,334, seite, hoehe);
    drawRotatedTriangle(360,233, seite, hoehe);
    drawRotatedTriangle(240,233, seite, hoehe);
  pop();
    // I
    //fill(360,40,80,0.4);
    //noFill();
  stroke(360,40,80,0.4);
  push();
  translate(293,0);
    drawRotatedHexagon(360, 300, seite, hoehe);
    drawRotatedHexagon(420, 200, seite, hoehe);
    drawRotatedHexagon(480, 100, seite, hoehe);
    drawRotatedTriangleG(480, 167, seite, hoehe);
    drawRotatedTriangleG(420, 267, seite, hoehe);
    drawRotatedTriangleG(540, 67, seite, hoehe);
    //drawRotatedTriangleG(420, 267, seite, hoehe);
    drawRotatedTriangle(420,133, seite, hoehe);
    drawRotatedTriangle(360,233, seite, hoehe);
    drawRotatedTriangle(300,334, seite, hoehe);
  pop();
    // S
    //fill(50,40,80,0.7);
    //fill('black');
    stroke(200,40,80,0.4);
    //noFill();
    push();
    translate(470,0);
    drawRotatedHexagon(480, 100, seite, hoehe);
    drawRotatedHexagon(600, 100, seite, hoehe);
    drawRotatedHexagon(540, 200, seite, hoehe);
    drawRotatedHexagon(480, 300, seite, hoehe);
    drawRotatedHexagon(360, 300, seite, hoehe);
    drawRotatedTriangle(300,334, seite, hoehe);
    drawRotatedTriangle(420,334, seite, hoehe);
    drawRotatedTriangleG(420, 267, seite, hoehe);
    drawRotatedTriangleG(540, 267, seite, hoehe);
    //drawRotatedTriangleG(600, 167, seite, hoehe);
    drawRotatedTriangleG(480, 167, seite, hoehe);
    drawRotatedTriangleG(540, 67, seite, hoehe);
    drawRotatedTriangleG(660, 67, seite, hoehe);
      pop();
  
  
  
      // noStroke();
      // fill(20,40,80,0.6);
      // fill('black');
      // //stroke('white');
      // strokeWeight(2);
      // noStroke();
      // stroke('white');
      // push();
      // translate(-72,0);
      // beginShape();
      // vertex(90,49);
      // vertex(-90,351);
      // vertex(30,351);
      // vertex(120,200);
      // vertex(210,351);
      // vertex(330,351);
      // vertex(150,49);
      // vertex(91,49);
      // endShape();
      // pop();
      
      // //noFill();
      // //noStroke();
      // fill(270,40,80,0.6);
      // fill('black');        ////////////////////<
      // push();
      // translate(115,0);
      // //translate(187,0);
      // beginShape();
      // vertex(150,49);
      // vertex(240,200);
      // vertex(150,351);
      // vertex(268,351);
      // vertex(300,298);
      // vertex(330,351);
      // vertex(450,351);
      // vertex(360,200);
      // vertex(452,49);
      // vertex(330,49);
      // vertex(300,100);
      // vertex(270,49);
      // vertex(150,49);
      // endShape();
      // pop();
      
      // push();
      // //translate(235,0);
      // translate(305,0);
      // beginShape();
      // //noFill();
      // //noStroke();
      // fill(360,40,80,0.6);
      // fill('black');    
      // vertex(452,49);
      // vertex(268,351);
      // vertex(390,351);
      // vertex(570,49);
      // vertex(455,49);
      // endShape();
      // pop();
    
      // beginShape();
      // fill(200,40,80,0.6);
      // fill('black');    
      // //noStroke();
      // //noFill();
      // push();
      // translate(490,0);
      // vertex(450,49);
      // vertex(420,100);
      // vertex(510,250);
      // vertex(330,250);
      // vertex(270,351);
      // vertex(510,351);
      // vertex(600,200);
      // vertex(570,150);
      // vertex(630,150);
      // vertex(690,49);
      // vertex(455,49);
      // endShape();
      // pop();
    
    
    
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // ChatGPT3.5
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  let rotationCompleted = false;
  
  function drawRotatedHexagon(centerX, centerY, seite, hoehe) {
    push();
    translate(centerX, centerY); // Move origin to the center of the hexagon
    if (!rotationCompleted) {
      let rotationAngle = frameCount % 360; // Ensure rotation stops after one full rotation
      rotate(rotationAngle); // Rotate the hexagon based on frameCount
      if (rotationAngle === 0 && frameCount !== 0) {
        rotationCompleted = true;
      }
    }
    drawHexagon(0, 0, seite, hoehe); // Draw the hexagon
    pop();
  }
  function drawHexagon(centerX, centerY, seite, hoehe) {
      beginShape();
      for (let i = 0; i < 6; i++) {
        let angle = 60 * i;
        let x = centerX + cos(angle) * (seite - 0.5); // Adjusted radius to prevent overlap
        let y = centerY + sin(angle) * (seite - 2.28); // Adjusted radius to prevent overlap
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  let rotationCompletedT = false;
  let rotationCompletedTG = false;
  function drawRotatedTriangle(centerX, centerY, seite, hoehe) {
      push();
      
      translate(centerX, centerY); // Move origin to the center of the triangle
      rotate(30);
      if (!rotationCompletedT) {
          let rotationAngle = frameCount % 360; // Ensure rotation stops after one full rotation
          rotate(rotationAngle); // Rotate the hexagon based on frameCount
          if (rotationAngle === 0 && frameCount !== 0) {
            rotationCompletedT = true;
          }
        }
      drawEquilateralTriangle(0, 0, seite); // Draw the equilateral triangle
  
      pop();
    }
    function drawRotatedTriangleG(centerX, centerY, seite, hoehe) {
      push();
      translate(centerX, centerY); // Move origin to the center of the triangle
      rotate(-30);
      if (!rotationCompletedTG) {
          let rotationAngle = frameCount % 360; // Ensure rotation stops after one full rotation
          rotate(rotationAngle); // Rotate the hexagon based on frameCount
          if (rotationAngle === 0 && frameCount !== 0) {
            rotationCompletedTG = true;
          }
        }
      drawEquilateralTriangle(0, 0, seite); // Draw the equilateral triangle
      pop();
    }
    
    
    function drawEquilateralTriangle(centerX, centerY, sideLength) {
      beginShape();
      for (let i = 0; i < 3; i++) {
        let angle = 120 * i;
        let x = centerX + cos(angle) * (sideLength / sqrt(3));
        let y = centerY + sin(angle) * (sideLength / sqrt(3));
        vertex(x, y);
      }
      endShape(CLOSE);
    }
    