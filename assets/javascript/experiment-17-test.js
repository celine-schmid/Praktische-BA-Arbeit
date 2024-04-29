//Erscheinungsfunktionen
////////////////////////
let seite = 60;
let hexagons = [];
let schrift_sechsecke = [];
let dreieck = [];
let numRows = 8; // Number of rows of hexagons
let numCols = 40; // Number of columns of hexagons
let hexagonWidth = 20; // Width of the hexagon
let hexagonHeight = 103; // Height of the hexagon


function setup() {
    createCanvas(windowWidth, windowHeight);
    //angleMode(DEGREES);
    blendMode(DIFFERENCE);      //HARD_LIGHT
    colorMode(HSB);
background('white');
    //Sechseck
    let centerX = width / 2;
    let centerY = height / 2;
    let radius = 200;
    let sides = 6; // Number of sides in the hexagon
    
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Mithilfe von ChatGPT 3.5 erstellt
    ///////////////////////////////////////////////////////////////////////////////////////////////
   
    let startX = 91; // X-coordinate of the starting position
    let startY = 2; // Y-coordinate of the starting position
    
    // Populate the hexagons array with center positions using nested loops
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let centerX = startX + col * (hexagonWidth * 1.5);
        let centerY = startY + row * (hexagonHeight);
        if (col % 2 === 1) {
          centerY += hexagonHeight / 2;
        }
        hexagons.push({ x: centerX, y: centerY });
      }
    }

    //Gleichseitiges Dreieck
    let centerXt = width / 2;
    let centerYt = height / 2;
    let radiust = radius/2; // Distance from the center to each vertex of the triangle
    
    // Calculate the vertices of the equilateral triangle
    for (let i = 0; i < 3; i++) {
      let angle = TWO_PI / 3 * i; // Angle between each vertex
      let x = centerXt + cos(angle) * radiust;
      let y = centerYt + sin(angle) * radiust;
      dreieck.push([x, y]);
    }

    schrift_sechsecke.push({ x: 271, y: 105 });
    ///////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////
    fill(222, 20,20,0.5);
    schrift_sechsecke.push({ x: 271+radius/1.68, y: 105 });
    schrift_sechsecke.push({ x: 510, y: 105 });
    schrift_sechsecke.push({ x: 630, y: 105 });
    schrift_sechsecke.push({ x: 749, y: 105 });
    schrift_sechsecke.push({ x: 210, y: 210 });
    schrift_sechsecke.push({ x: 330, y: 210 });
    schrift_sechsecke.push({ x: 450, y: 210 });
    schrift_sechsecke.push({ x: 570, y: 210 });
    schrift_sechsecke.push({ x: 690, y: 210 });
    schrift_sechsecke.push({ x: 150, y: 313 });
    schrift_sechsecke.push({ x: 390, y: 313 });
    schrift_sechsecke.push({ x: 510, y: 313 });
    schrift_sechsecke.push({ x: 630, y: 313 });




  }
  
  function draw() {
    let hoehe = ((sqrt(3))/2)*seite;
    stroke(0);
    background(255);

    for (var x = 0; x < width; x += seite) {  
		for (var y = 0; y < height; y += hoehe) {
            //diagonal von links oben nach rechts unten
            stroke('purple');
            //line(x, y, x+seite, y+2*hoehe);
            stroke('blue');
            //line(0, y, width, y);
		}
	}
    for (var x = seite; x < width; x += seite) {  
		for (var y = 0; y < height; y += hoehe) {
            //diagonal von rechts oben nach links unten
            stroke('green');
            //line(x, y, x-seite, y+2*hoehe);
		}
	}
    
            //horizontale linien
            //line(x, y, width, y+abstand_horizontalen);  //falsch aber spannender effekt
            //line(x, y, width, height);
         
    //Hilfslinien
    //H-Linie
    //stroke('green');
    //line(0, 2*rasterhoehe, width, 2*rasterhoehe);
    //Mittellinie
    //stroke('blue');
    //line(0, height/2, width, height/2);
    //Grundlinie
    //stroke('red');
    //line(0, 6*rasterhoehe, width, 6*rasterhoehe);
    stroke(200, 100, 100,1);
    fill(0,0,80,0.5);
    rotate(frameCount*0.01);
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Mithilfe von ChatGPT 3.5 erstellt
    ///////////////////////////////////////////////////////////////////////////////////////////////
    let radius = 60; // Radius of the hexagon
    let sides = 6; // Number of sides in the hexagon
    
    // Draw each hexagon
    // for (let i = 0; i < hexagons.length; i++) {
    //   let centerX = hexagons[i].x;
    //   let centerY = hexagons[i].y;
      
    //   // Calculate the vertices of the hexagon
    //   beginShape();

    //   for (let j = 0; j < sides; j++) {
    //     let angle = TWO_PI / sides * j;
    //     let x = centerX + cos(angle) * radius;
    //     let y = centerY + sin(angle) * radius;
    //     vertex(x, y);
     
    //   }
    //   endShape(CLOSE);
    // }

    // Draw each hexagon
    //fill(100, 20,20,0.5);
    for (let i = 0; i < schrift_sechsecke.length; i++) {
     
    let centerX = schrift_sechsecke[i].x;
    let centerY = schrift_sechsecke[i].y;
   
    // Calculate the vertices of the hexagon
    beginShape();
 
    for (let j = 0; j < sides; j++) {
        
      let angle = TWO_PI / sides * j;
      let x = centerX + cos(angle) * radius;
      let y = centerY + sin(angle) * radius;
      vertex(x, y);
    }
    endShape(CLOSE);

  }
    // Draw the equilateral triangle
    // beginShape();
    // for (let i = 0; i < dreieck.length; i++) {
    // vertex(dreieck[i][0], dreieck[i][1]);
    // }
    // endShape(CLOSE);
    ///////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////


    let y_MittelLinie = 4*hoehe;
    let y_HLinie = hoehe; //+dynamischeRate       //2
    let y_GrundLinie = 7*hoehe; 

    beginShape();
    vertex(4*seite, hoehe);
    vertex(((3*seite)+4*seite)/2, seite+hoehe);
    vertex(4*seite, seite+(2*hoehe));
    vertex(5*seite, seite+(2*hoehe));
    vertex(((5*seite)+(7*seite))/2, seite+hoehe);
    vertex(5*seite, hoehe);
    vertex(4*seite, hoehe);
    endShape();


    //Buchstaben
    //strokeWeight(10);
    //stroke(0, 100, 0,1);
    //strokeJoin(ROUND);     //MITER, BEVEL, ROUND
    noStroke();
    fill(100,50, 50, 0.5);
    beginShape();
    //A1
    //vertex(4*seite,hoehe);
    let A1 = [4*seite, y_HLinie];
    vertex(A1[0], A1[1]);
    //A2
    let A2 = [A1[0]-3*seite, y_GrundLinie];
    vertex(A2[0],A2[1]);
    //A3
    let A3 = [A2[0]+2*seite, y_GrundLinie];
    vertex(A3[0], A3[1]);
    //A4
    let A4 = [A3[0]+seite, A3[1]-2*hoehe];
    vertex(A4[0], A4[1]);
    //A5
    let A5 = [A4[0]+seite, A4[1]];
    vertex(A5[0], A5[1]);
    //A6
    let A6 = [A5[0]+seite, y_GrundLinie];
    vertex(A6[0], A6[1]);
    //A7
    let A7 = [A6[0]+2*seite, y_GrundLinie];
    vertex(A7[0], A7[1]);
    //A8
    let A8 = [A1[0]+seite, y_HLinie];
    vertex(A8[0], A8[1]);
    //Grundform schliessen
    vertex(A1[0], A1[1]);
    endShape();
    //Punze
    fill(100,50);
    beginShape();
    //A9
    let A9 = [A4[0], A1[1]+2*hoehe];
    vertex(A9[0], A9[1]);
    //A10
    let A10 = [(A4[0]+A5[0])/2, y_MittelLinie];   //wenn ich mit 0.5*hoehe multipliziere ist der punkt ungenau im raster platziert
    vertex(A10[0], A10[1]);
    //A11
    let A11 = [A9[0]+seite, A9[1]];
    vertex(A11[0], A11[1]);
    //Grundform schliessen
    vertex(A9[0], A9[1]);
    endShape();

    fill(2,50, 50, 0.5);
    beginShape();
    //X1
    let X1 = [A8[0], y_HLinie];
    vertex(X1[0], X1[1]);
    //X2
    let X2 = [X1[0]+1.5*seite, y_MittelLinie];
    vertex(X2[0], X2[1]);
    //X3
    let X3 = [X1[0], y_GrundLinie];
    vertex(X3[0], X3[1]);
    //X4
    let X4 = [X3[0]+2*seite, y_GrundLinie];
    vertex(X4[0], X4[1]);
    //X5
    let X5 = [(X4[0]+(X4[0]+seite))/2, X4[1]-hoehe];
    vertex(X5[0], X5[1]);
    //X6
    let X6 = [X4[0]+seite, X4[1]];
    vertex(X6[0], X6[1]);
    //X7
    let X7 = [X6[0]+2*seite, X6[1]];
    vertex(X7[0], X7[1]);
    //X8
    let X8 = [X2[0]+2*seite, y_MittelLinie];
    vertex(X8[0], X8[1]);
    //X9
    let X9 = [X1[0]+5*seite, y_HLinie];
    vertex(X9[0], X9[1]);
    //X10
    let X10 = [X9[0]-2*seite, y_HLinie];
    vertex(X10[0], X10[1]);
    //X11
    let X11 = [X5[0], X10[1]+hoehe]
    vertex(X11[0], X11[1]);
    //X12
    let X12 = [X4[0], y_HLinie];
    vertex(X12[0], X12[1]);
    //Grundform schliessen
    vertex(X1[0], X1[1]);
    endShape();

    fill(200, 50, 50, 0.5);
    beginShape();
    let I1 = [X9[0], y_HLinie];
    vertex(I1[0], I1[1]);
    let I2 = [X4[0], y_GrundLinie];
    vertex(I2[0], I2[1]);
    let I3 = [I2[0]+2*seite, y_GrundLinie];
    vertex(I3[0], I3[1]);
    let I4 = [I1[0]+2*seite,y_HLinie];
    vertex(I4[0], I4[1]);
    //Grundform schliessen
    vertex(I1[0], I1[1]);
    endShape();

    fill(300, 50, 50, 0.3);
    beginShape();
    let S1 = [I1[0], y_HLinie];
    vertex(S1[0], S1[1]);
    let S2 = [(I3[0]+S1[0])/2, X11[1]];
    vertex(S2[0], S2[1]);
    let S3 = [X7[0]+seite, A5[1]];
    vertex(S3[0], S3[1]);
    let S4 = [A7[0],S3[1]];
    vertex(S4[0], S4[1]);
    let S5 = [I2[0],y_GrundLinie];
    vertex(S5[0], S5[1]);
    let S6 = [X7[0]+seite,y_GrundLinie];
    vertex(S6[0], S6[1]);
    let S7 = [X8[0]+4*seite, X8[1]];
    vertex(S7[0], S7[1]);
    let S8 = [I4[0], A11[1]];
    vertex(S8[0], S8[1]);
    let S9 = [S8[0]+seite, S8[1]];
    vertex(S9[0], S9[1]);
    let S10 = [I4[0]+2*seite,y_HLinie];
    vertex(S10[0], S10[1]);
    //Grundform schliessen
    vertex(S1[0], S1[1]);
    endShape();


  }


