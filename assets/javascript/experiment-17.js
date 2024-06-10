// //Erscheinungsfunktionen
// ////////////////////////
// let seite =60;      //80
// let winkel = 60;


// function setup() {
//     let seite = 60;
//     let abstand_diagonalen = 2*seite;
//     let abstand_horizontalen = sqrt(3)*seite;

//     createCanvas(windowWidth, windowHeight);
//     angleMode(DEGREES);
//     blendMode(DIFFERENCE);      //HARD_LIGHT
//     colorMode(HSB);
//     //translate(width/2, height/2);
//     rotate(frameCount/20);
//     rectMode(CENTER);
//     background(255);


//   }
  
//   function draw() {
//     let hoehe = (sqrt(3)/2)*seite;
//     stroke(0);


//     for (var x = 0; x < width; x += seite) {  
// 		for (var y = 0; y < height; y += hoehe) {
//             //diagonal von links oben nach rechts unten
//             stroke('purple');
//             //line(x, y, x+seite, y+2*hoehe);
//             stroke('blue');
//             //line(0, y, width, y);
// 		}
// 	}
//     for (var x = seite; x < width; x += seite) {  
// 		for (var y = 0; y < height; y += hoehe) {
//             //diagonal von rechts oben nach links unten
//             stroke('green');
//             //line(x, y, x-seite, y+2*hoehe);
// 		}
// 	}
    
//             //horizontale linien
//             //line(x, y, width, y+abstand_horizontalen);  //falsch aber spannender effekt
//             //line(x, y, width, height);
         
//     //Hilfslinien
//     //H-Linie
//     //stroke('green');
//     //line(0, 2*rasterhoehe, width, 2*rasterhoehe);
//     //Mittellinie
//     //stroke('blue');
//     //line(0, height/2, width, height/2);
//     //Grundlinie
//     //stroke('red');
//     //line(0, 6*rasterhoehe, width, 6*rasterhoehe);



//     let y_MittelLinie = 4*hoehe;
//     let y_HLinie = hoehe; //+dynamischeRate       //2
//     let y_GrundLinie = 7*hoehe; 

//     //Buchstaben
//     //strokeWeight(10);
//     //stroke(0, 100, 0,1);
//     //strokeJoin(ROUND);     //MITER, BEVEL, ROUND
//     noStroke();
//     fill(100,50, 50, 0.5);


// //noLoop();

//     //translate(width/2, height/2);
//     //rotate(frameCount);
//    // rectMode(CENTER);


//     //A
//     fill(0,50,100,0.8);
//     stroke('grey');
  
//     drawTriangle(90, 0,seite, hoehe,106);
  
//     drawTriangle(210,120, seite, hoehe,106);
//     drawTriangle(30,120, seite, hoehe,209);

//     drawTriangle(270,120, seite, hoehe,209);
//     drawTriangle(150,120, seite, hoehe,209);
//     drawTriangle(-30,120, seite, hoehe,313);
//     drawTriangle(330,120, seite, hoehe,313);
//     drawFlippedTriangle(90,120, seite, hoehe,210);
//     drawFlippedTriangle(210,120, seite, hoehe,210);
//     //Punze
//     fill(0,0,100,1);
//     drawFlippedTriangle(150,120, seite, hoehe,106);

//     //X
//     fill(100,50,100,0.8);
//     drawTriangle(330,120, seite, hoehe,106);
//     drawTriangle(210,120, seite, hoehe,313);
//     drawTriangle(450,120, seite, hoehe,313);
//     drawTriangle(390,120, seite, hoehe,209);
//     drawTriangle(270,120, seite, hoehe,209);
//     drawFlippedTriangle(330,120, seite, hoehe,210);
//     drawFlippedTriangle(390,120, seite, hoehe,106);
//     drawFlippedTriangle(270,120, seite, hoehe,106);
//     drawFlippedTriangle(450,120, seite, hoehe,2);
//     drawFlippedTriangle(210,120, seite, hoehe,2);

//     //I
//     fill(200,50,100,0.5);
//     drawTriangle(450,120, seite, hoehe,106);
//     drawTriangle(390,120, seite, hoehe,209);
//     drawTriangle(330,120, seite, hoehe,313);
//     drawFlippedTriangle(570,120, seite, hoehe,2);
//     drawFlippedTriangle(510,120, seite, hoehe,106);
//     drawFlippedTriangle(450,120, seite, hoehe,209);
//     //S
//     fill(300,50,100,0.5);
//     drawTriangle(330,120, seite, hoehe,313);
//     drawTriangle(450,120, seite, hoehe,313);
//     drawFlippedTriangle(450,120, seite, hoehe,210);
//     drawFlippedTriangle(570,120, seite, hoehe,210);
//     drawFlippedTriangle(570,120, seite, hoehe,2);
//     drawFlippedTriangle(510,120, seite, hoehe,106);
//     drawFlippedTriangle(690,120, seite, hoehe,2);

//     ///////////////////////////////////////////////////////////////////////////////////////////////
//     // Dieser Code ist selbst geschrieben und diente als Grundlage für den Code unten
//     // beginShape();
//     // let H1 = [4*seite, y_HLinie];
//     // vertex(H1[0], H1[1]);
//     // let H2 = [H1[0]-(seite/2), y_HLinie+hoehe];
//     // vertex(H2[0], H2[1]);
//     // let H3 = [H1[0], y_HLinie+(2*hoehe)];
//     // vertex(H3[0], H3[1]);
//     // let H4 = [H1[0]+seite,  y_HLinie+(2*hoehe)];
//     // vertex(H4[0], H4[1]);
//     // let H5 = [H1[0]+(1.5*seite), y_HLinie+hoehe];
//     // vertex(H5[0], H5[1]);
//     // let H6 = [H4[0], y_HLinie];
//     // vertex(H6[0], H6[1]);
//     // vertex(H1[0], H1[1]);
//     // endShape();
//     ///////////////////////////////////////////////////////////////////////////////////////////////
//     ///////////////////////////////////////////////////////////////////////////////////////////////
//     // ChatGPT 3.5  // Die Positionen, Farben und Transformationen wurden selbst hinzugefügt
//     ///////////////////////////////////////////////////////////////////////////////////////////////
//     //A
//     fill(0,50,100,0.8);
   
//     rectMode(CENTER);

//     //rotate(frameCount);
//     rotate(frameCount);
//     //translate(centerX, centerY);
//     drawRotatedHexagon(120, 100, seite, hoehe, -50);

//     drawRotatedHexagon(60, 100, seite, hoehe, 55);
//     drawHexagon(180, 200, seite, hoehe, 155);
//     drawHexagon(0, 100, seite, hoehe, 259);
//     drawHexagon(240, 200, seite, hoehe, 259);
//     //X
//     fill(100,50,100,0.8);
//     drawHexagon(240, 200, seite, hoehe, y_HLinie);
//     drawHexagon(360, 300, seite, hoehe, y_HLinie);
//     drawHexagon(300, 300, seite, hoehe, 155);
//     drawHexagon(240, 200, seite, hoehe, 259);
//     drawHexagon(360, 300, seite, hoehe, 259);
//     //I
//     fill(200,50,100,0.5);
//     drawHexagon(480, 300, seite, hoehe, y_HLinie);
//     drawHexagon(420, 300, seite, hoehe, 155);
//     drawHexagon(360, 300, seite, hoehe, 259);
//     //S
//     fill(300,50,100,0.5);
//     drawHexagon(600, 300, seite, hoehe, y_HLinie);
//     drawHexagon(540, 300, seite, hoehe, 155);
//     drawHexagon(480, 300, seite, hoehe, 259);
//     drawHexagon(480, 300, seite, hoehe, y_HLinie);
//     //drawHexagon(420, 300, seite, hoehe, 155);
//     drawHexagon(360, 300, seite, hoehe, 259);
//   }

//   function drawRotatedHexagon(centerX, centerY, seite, hoehe, y_HLinie) {
//     push();
//     translate(centerX, centerY); // Move origin to the center of the hexagon
//     rotate(frameCount * 0.01); // Rotate the hexagon based on frameCount
//     drawHexagon(0, 0, seite, hoehe, y_HLinie); // Draw the hexagon
//     pop();
//   }
  
//   function drawHexagon(centerX, centerY, seite, hoehe, y_HLinie) {
//     beginShape();
//     let H1 = [centerX + 2 * seite, y_HLinie];
//     vertex(H1[0], H1[1]);
//     let H2 = [H1[0] - (seite / 2), y_HLinie + hoehe];
//     vertex(H2[0], H2[1]);
//     let H3 = [H1[0], y_HLinie + (2 * hoehe)];
//     vertex(H3[0], H3[1]);
//     let H4 = [H1[0] + seite, y_HLinie + (2 * hoehe)];
//     vertex(H4[0], H4[1]);
//     let H5 = [H1[0] + (1.5 * seite), y_HLinie + hoehe];
//     vertex(H5[0], H5[1]);
//     let H6 = [H4[0], y_HLinie];
//     vertex(H6[0], H6[1]);
//     vertex(H1[0], H1[1]);
//     endShape(CLOSE);
//   }

//   function drawTriangle(centerX, centerY, seite, hoehe, y_HLinie) {
//     beginShape();
//     let T1 = [centerX + 2 * seite, y_HLinie-1];
//     vertex(T1[0], T1[1]);
//     let T2 = [T1[0] - (hoehe / 2)-4, y_HLinie + hoehe-2];
//     vertex(T2[0], T2[1]);
//     let T3 = [T2[0]+hoehe+8, T2[1]];
//     vertex(T3[0], T3[1]);
//     vertex(T1[0], T1[1]);
//     endShape();
//   }

//   function drawFlippedTriangle(centerX, centerY, seite, hoehe, y_HLinie) {
//     beginShape();
//     let T1 = [centerX + 2 * seite, y_HLinie+2*hoehe];

//     let T2 = [T1[0] - (hoehe / 2)-4, y_HLinie + hoehe-2];
//     vertex(T2[0], T2[1]);
//     vertex(T1[0], T1[1]);
//     let T3 = [T2[0]+hoehe+8, T2[1]];
//     vertex(T3[0], T3[1]);
//     vertex(T2[0], T2[1]);
//     endShape();
//   }


// //   let seite = 30;
// // let hoehe = 50;

// // function setup() {
// //   createCanvas(400, 400);
// // }

// // function draw() {
// //   background(220);
  
// //   // Translate to the center of the canvas
// //   translate(width / 2, height / 2);
  
// //   // Rotate the hexagon
// //   rotate(frameCount * 0.01); // Adjust rotation speed as needed
  
// //   // Draw the hexagon
// //   drawHexagon(0, 0, seite, hoehe);
// // }

// // function drawHexagon(centerX, centerY, seite, hoehe) {
// //   beginShape();
// //   let angle = TWO_PI / 6;
// //   for (let i = 0; i < 6; i++) {
// //     let x = centerX + cos(angle * i) * seite;
// //     let y = centerY + sin(angle * i) * seite;
// //     vertex(x, y);
// //   }
// //   endShape(CLOSE);
// // }

///////////////////////////////////////////////////////////////////////////////////////////////////
// Neustart
function setup() {
  createCanvas(windowWidth*2, windowHeight);
  scale(0.5);
  colorMode(HSB);
  angleMode(DEGREES);
  blendMode(DIFFERENCE);
 blendMode(DARKEST);
 blendMode(MULTIPLY);
blendMode(BLEND);
frameRate(40);
background(255);
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

  let seite = 60; // Length of each side of the hexagon
  // Define the height of the hexagon
  let hoehe = sqrt(3) * seite;
  translate(width/4, height/4);




  // Draw hexagons
  // A
  noStroke();
  fill(20,40,80,0.2);
fill('black');
stroke('black');
  //noFill();
  //stroke(20,40,80,0.4);
  //stroke('black');
  strokeWeight(2);
  push();
  translate(-65,0);
  scale(0.5);
  scale(0.5);
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
  //stroke(270,40,80,0.4);
  scale(0.5);
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
//stroke(360,40,80,0.4);
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
  //stroke(200,40,80,0.4);
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
  scale(0.5);
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
    scale(0.5);
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
  