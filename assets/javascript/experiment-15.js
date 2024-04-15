function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    stroke(255);
    strokeWeight(1);
    noFill();
    angleMode(DEGREES);

    filter(INVERT);
    //blendMode(SUBTRACT);
  }
  
  function draw() {
    orbitControl();
    background('#000');
    let drehgeschwindigkeit = frameCount;
  
    let x = 0;
    let y = -300;
    let z = 0;
    let a = 400; 
    let h = (sqrt(3)/2) * a; 
  

    rotateX(drehgeschwindigkeit);
  
    // Mittleres Dreieck
    let M1 = [x, y, z];
    let M2 = [x - (a/2), y + h, z];
    let M3 = [x + (a/2), y + h, z];
  
    push();
    translate(M2[0], M2[1], M2[2]);
    triangle(M1[0], M1[1], M2[0], M2[1], M3[0], M3[1]);
    pop();

    //rechtes Dreieck
    push();
    rotateY(90);
    rotateX(30);
    translate(0, 380,-47);
    triangle(M1[0], M1[1], M2[0], M2[1], M3[0], M3[1]);
    pop();

    //linkes Dreieck
    push();
    rotateY(90);
    rotateX(330);
    translate(0, 580,-300);
    triangle(M1[0], M1[1], M2[0], M2[1], M3[0], M3[1]);
    pop();

  }
  


    // // Linkes Dreieck
    // let L1 = [x - (a/2), y + h, z];
    // let L2 = [x - a, -y, z];
    // let L3 = [x - (a/2), -y, z - (a * sqrt(3)/2)];
  
    // // Rechtes Dreieck
    // let R1 = [x + (a/2), y + h, z];
    // let R2 = [x + a, -y, z];
    // let R3 = [x + (a/2), -y, z + (a * sqrt(3)/2)];
