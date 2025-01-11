//Fibonacci-Folge
/////////////////
// let segment = 100;
// let rasterbreite = 40;
// let rasterhoehe = 40;
// let buchstabenabstand = rasterbreite*2;
// let unterschneidung = rasterbreite;
let fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34];
let n = 6;  //6
let fibonacciStart = fibonacci[n];
let skalierungsfaktor = 13;
let rechteckbreite = fibonacciStart*skalierungsfaktor;
let rechteckhoehe = (fibonacci[n+1])*skalierungsfaktor;
let buchstabenabstand =40; //40
let strichstaerke = 5;  //5
let summand_1 = fibonacci[n-2];
let summand_2 = fibonacci[n-1];
let goldeneZahl = 0.618;    //Kehrwert des Goldenen Schnittes

//HSB
let s_saettigung = 50;
let b_helligkeit = 50;
let transparenz = 0.8;
let h_farbton = [100, 120, 140, 260, 180, 200];
//RGB
//let rgb_farbton = ['red', 'blue', 'yellow', 'black'];
//['darkslategrey'];
let rgb_farbton = ['black'];
//let quadrat_hintergrund = ['red', 'blue', 'yellow', 'white', 'white'];
//https://johndecember.com/html/spec/colorsvg.html  //Farben
//['pink', 'darkgreen', 'yellow', 'white', 'white'];
//['orange', 'darkgreen', 'violet', 'white', 'white'];
//['lightsalmon', 'paleturquoise', 'orangered', 'white', 'white'];
//['plum', 'mediumblue', 'mediumspringgreen', 'white', 'white'];
//['coral', 'cornflowerblue', 'darkseagreen', 'white', 'white'];
let quadrat_hintergrund = ['red', 'blue', 'yellow', 'white', 'white'];
//let quadrat_hintergrund = ['white'];

function setup() {
    createCanvas(windowWidth, windowHeight);

    angleMode(DEGREES);
    background(255);
    colorMode(HSB);
    //console.log(summand_1);

    frameRate(60*0.03);

    //Hilfslinien
    //H-Linie
    let y_HLinie = 100;
    stroke('green');
    //line(0, 100, width, 100);
    //Grundlinie
    let y_GrundLinie = y_HLinie+rechteckhoehe;
    stroke('red');
    //line(0, 100+rechteckhoehe, width, 100+rechteckhoehe);

    //monospace raster
    for (var x = 0; x < 9*rechteckbreite; x += rechteckbreite+buchstabenabstand) {
        //rect(x, y_HLinie, rechteckbreite, rechteckhoehe);
	}
    
    


    stroke(0);

    strokeWeight(strichstaerke);

  
}
  
  function draw() {
   background(255);
   translate(50,200);
   
    //noLoop();
    //translate(150,0);
    //shearY(-23);
   let grosseStrecke = rechteckbreite * goldeneZahl;
   let kleineStrecke = rechteckbreite - grosseStrecke;
   //console.log(linkeStrecke);
   //console.log(rechteStrecke);
   //rect(0, 100, grosseStrecke, rechteckhoehe);
   //rect(0+grosseStrecke, 100, kleineStrecke, rechteckhoehe)

    //shearX(-30);
    
    //Buchstaben
    //F
    stroke('black');
    //fill(200, 50, 50, 0.4);
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));
    let horizontaleTeilung = [];
    horizontaleTeilung.push(grosseStrecke, kleineStrecke);
    arrayZufall = floor(random(0, 2));
    beginShape();
    vertex(0, 100);
    vertex(0, 100+rechteckhoehe);
    vertex(horizontaleTeilung[arrayZufall], 100+rechteckhoehe);
    vertex(horizontaleTeilung[arrayZufall], 100);
    vertex(0, 100);
    endShape();

    let grosseStrecke_Vertikal1 = rechteckhoehe * goldeneZahl;
    let kleineStrecke_Vertikal1 = rechteckhoehe - grosseStrecke_Vertikal1;
    let vertikaleTeilung1 = [grosseStrecke_Vertikal1, kleineStrecke_Vertikal1];
    vertikaleTeilung1_zufall = floor(random(0, 2));
    let grosseStrecke_Vertikal2 = grosseStrecke_Vertikal1 * goldeneZahl;
    let kleineStrecke_Vertikal2 = grosseStrecke_Vertikal1 - grosseStrecke_Vertikal2;
    let vertikaleTeilung2 = [grosseStrecke_Vertikal2, kleineStrecke_Vertikal2];
    vertikaleTeilung2_zufall = floor(random(0, 2));
    let grosseStrecke_Vertikal7 = grosseStrecke_Vertikal2 * goldeneZahl;
    let kleineStrecke_Vertikal7 = grosseStrecke_Vertikal2 - grosseStrecke_Vertikal7;
    let vertikaleTeilung7 = [grosseStrecke_Vertikal7, kleineStrecke_Vertikal7];
    vertikaleTeilung7_Zufall = floor(random(0,2));

    let grosseStrecke_Vertikal3 = kleineStrecke_Vertikal1*0.618;
    let kleineStrecke_Vertikal3 = kleineStrecke_Vertikal1-grosseStrecke_Vertikal3;
    let vertikalTeilung3 = [grosseStrecke_Vertikal3, kleineStrecke_Vertikal3];
    arrayZufall1 = floor(random(0, 2));
  
    // fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    // beginShape();
    // vertex(horizontaleTeilung[arrayZufall], 100);
    // vertex(horizontaleTeilung[arrayZufall], 100+vertikaleTeilung1[vertikaleTeilung1_zufall]);
    // vertex(rechteckbreite, 100+vertikaleTeilung1[vertikaleTeilung1_zufall]);
    // vertex(rechteckbreite, 100);
    // vertex(horizontaleTeilung[arrayZufall], 100);
    // endShape();
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));
    beginShape();
    vertex(horizontaleTeilung[arrayZufall], 100);
    vertex(horizontaleTeilung[arrayZufall], 100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite, 100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite, 100);
    vertex(horizontaleTeilung[arrayZufall], 100);
    endShape();
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));
   
    beginShape();
    vertex(horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1);
    vertex(horizontaleTeilung[arrayZufall], 100+rechteckhoehe-vertikaleTeilung2[vertikaleTeilung2_zufall]);
    vertex(rechteckbreite, 100+rechteckhoehe-vertikaleTeilung2[vertikaleTeilung2_zufall]);
    vertex(rechteckbreite,100+kleineStrecke_Vertikal1);
    vertex(horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1);
    endShape();
    //Rechtecke im Weissraum
    fill('white');
    // beginShape();
    // vertex(rechteckbreite,100);
    // vertex(rechteckbreite,100+rechteckhoehe);
    // vertex(rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
    // vertex(rechteckbreite+buchstabenabstand, 100);
    // vertex(rechteckbreite,100);
    // endShape();

    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(horizontaleTeilung[arrayZufall], 100+rechteckhoehe-vertikaleTeilung2[vertikaleTeilung2_zufall]);
    vertex(horizontaleTeilung[arrayZufall], 100+rechteckhoehe);
    vertex(rechteckbreite, 100+rechteckhoehe);
    vertex(rechteckbreite, 100+rechteckhoehe-vertikaleTeilung2[vertikaleTeilung2_zufall]);
    vertex(horizontaleTeilung[arrayZufall], 100+rechteckhoehe-vertikaleTeilung2[vertikaleTeilung2_zufall]);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(horizontaleTeilung[arrayZufall], 100+vertikalTeilung3[arrayZufall1]);
    vertex(horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite, 100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite,100+vertikalTeilung3[arrayZufall1]);
    vertex(horizontaleTeilung[arrayZufall], 100+vertikalTeilung3[arrayZufall1]);
    endShape();
    
    // beginShape();
    // vertex(horizontaleTeilung[arrayZufall], 100+vertikaleTeilung2[vertikaleTeilung2_zufall]);
    // vertex(horizontaleTeilung[arrayZufall], 100+vertikaleTeilung2[vertikaleTeilung2_zufall]+vertikaleTeilung7[vertikaleTeilung7_Zufall]);
    // vertex(rechteckbreite,100+vertikaleTeilung2[vertikaleTeilung2_zufall]+vertikaleTeilung7[vertikaleTeilung7_Zufall]);
    // vertex(rechteckbreite, 100+vertikaleTeilung2[vertikaleTeilung2_zufall]);
    // vertex(horizontaleTeilung[arrayZufall], 100+vertikaleTeilung2[vertikaleTeilung2_zufall]);
    // endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(rechteckbreite,100);
    vertex(rechteckbreite,100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite+buchstabenabstand, 100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite+buchstabenabstand, 100);
    vertex(rechteckbreite,100);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(rechteckbreite,100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite,100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite+buchstabenabstand, 100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite,100+vertikalTeilung3[arrayZufall1]);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(rechteckbreite,100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite,100+rechteckhoehe-vertikaleTeilung2[vertikaleTeilung2_zufall]);
    vertex(rechteckbreite+buchstabenabstand,100+rechteckhoehe-vertikaleTeilung2[vertikaleTeilung2_zufall]);
    vertex(rechteckbreite+buchstabenabstand,100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite,100+kleineStrecke_Vertikal1);
    endShape();
    // beginShape();
    // vertex(rechteckbreite,100+vertikaleTeilung2[vertikaleTeilung2_zufall]+vertikaleTeilung7[vertikaleTeilung7_Zufall]);
    // vertex(rechteckbreite,100+rechteckhoehe-vertikaleTeilung2[vertikaleTeilung2_zufall]);
    // vertex(rechteckbreite+buchstabenabstand, 100+rechteckhoehe-vertikaleTeilung2[vertikaleTeilung2_zufall]);
    // vertex(rechteckbreite+buchstabenabstand,100+vertikaleTeilung2[vertikaleTeilung2_zufall]+vertikaleTeilung7[vertikaleTeilung7_Zufall]);
    // vertex(rechteckbreite,100+vertikaleTeilung2[vertikaleTeilung2_zufall]+vertikaleTeilung7[vertikaleTeilung7_Zufall]);
    // endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(rechteckbreite,100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite,100+rechteckhoehe);
    vertex(rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
    vertex(rechteckbreite+buchstabenabstand,100+rechteckhoehe-vertikaleTeilung2[vertikaleTeilung2_zufall]);
    vertex(rechteckbreite,100+rechteckhoehe-vertikaleTeilung2[vertikaleTeilung2_zufall]);
    endShape();

    //
    //shearY(25);
    //i

    // push();
    // translate(rechteckbreite+buchstabenabstand,0);
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));
    beginShape();
    vertex(rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+rechteckhoehe);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
    endShape();
    //pop();
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));
    beginShape();
    vertex(rechteckbreite+buchstabenabstand, 100);
    vertex(rechteckbreite+buchstabenabstand, 100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100);
    vertex(rechteckbreite+buchstabenabstand, 100);
    endShape();
    //fill('white');
    // beginShape();
    // vertex(rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
    // vertex(rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
    // vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+rechteckhoehe);
    // vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+kleineStrecke_Vertikal1);
    // vertex(rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
    // endShape();

    //Rechtecke im Weissraum
    fill('white');
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(rechteckbreite+buchstabenabstand, 100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite+buchstabenabstand, 100+vertikalTeilung3[arrayZufall1]);
    endShape();
    // beginShape();
    // vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100);
    // vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+rechteckhoehe);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand, 100+rechteckhoehe);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand, 100);
    // vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100);
    // endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1],  100+vertikalTeilung3[arrayZufall1]);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand, 100+vertikalTeilung3[arrayZufall1]);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand, 100);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1],  100+kleineStrecke_Vertikal1);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand, 100+kleineStrecke_Vertikal1);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand, 100+vertikalTeilung3[arrayZufall1]);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+vertikalTeilung3[arrayZufall1]);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1],  100+rechteckhoehe);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand, 100+rechteckhoehe);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand, 100+kleineStrecke_Vertikal1);
    vertex(rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall1], 100+kleineStrecke_Vertikal1);
    endShape();
    //

    //b
    //shearY(-31);
    //translate(0,130);
    arrayZufall2 = floor(random(0, 2));

    arrayZufall6 = floor(random(0, 2));
    let grosseStrecke_Horizontal2 = horizontaleTeilung[arrayZufall6] * goldeneZahl;
    let kleineStrecke_Horizontal2 = horizontaleTeilung[arrayZufall6] - grosseStrecke_Horizontal2;
    let grosseStrecke_Horizontal2_2 = grosseStrecke_Horizontal2 * goldeneZahl;
    let kleineStrecke_Horizontal2_2 = grosseStrecke_Horizontal2 -grosseStrecke_Horizontal2_2;
    let horizontaleTeilung2 = [grosseStrecke_Horizontal2_2, kleineStrecke_Horizontal2_2];
    arrayZufall8 = floor(random(0,2));



  let grosseStrecke_Vertikal4 = grosseStrecke_Vertikal1 * goldeneZahl;  //grösserer teil der x-höhe
  let kleineStrecke_Vertikal4 = grosseStrecke_Vertikal1 - grosseStrecke_Vertikal4;  //kleinerer teil der x-höhe
  let grosseStrecke_Vertikal5 = grosseStrecke_Vertikal4 * goldeneZahl;  //erneute unterteilung des grösseren teils der x-höhe; grösserer teil
  let kleineStrecke_Vertikal5 = kleineStrecke_Vertikal4 - grosseStrecke_Vertikal5;  //kleiner teil
  let grosseStrecke_Vertikal6 = grosseStrecke_Vertikal5 * goldeneZahl;
  let kleineStrecke_Vertikal6 = grosseStrecke_Vertikal5 - grosseStrecke_Vertikal6;
  let vertikaleTeilung4 = [grosseStrecke_Vertikal4, kleineStrecke_Vertikal4];
  let vertikaleTeilung5 = [grosseStrecke_Vertikal5, kleineStrecke_Vertikal5];
  let vertikaleTeilung6 = [grosseStrecke_Vertikal6, kleineStrecke_Vertikal6];
  arrayZufall5 = floor(random(0, 2));
  let positionO = horizontaleTeilung[arrayZufall1]+rechteckbreite+3*buchstabenabstand+rechteckbreite;
    //push();
    //translate(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand,0);
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));
    beginShape();
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand, 100);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand, 100+rechteckhoehe);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100+rechteckhoehe);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand, 100);
    endShape();
    // fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    // beginShape();
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100+rechteckhoehe);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100);
    // endShape();
    //pop();
    // fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    // beginShape();
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100+vertikaleTeilung1[arrayZufall2]);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100+rechteckhoehe);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+vertikaleTeilung1[arrayZufall2]);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100+vertikaleTeilung1[arrayZufall2]);
    // endShape();
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    // beginShape();
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100+vertikaleTeilung1[arrayZufall2]);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100+rechteckhoehe);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100+vertikaleTeilung1[arrayZufall2]);
    // endShape();
    let verschiebungb = horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2];
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));

    beginShape();
    vertex(verschiebungb, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(verschiebungb, 100+rechteckhoehe);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(verschiebungb, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    endShape();
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));

    beginShape();
    vertex(verschiebungb, 100+kleineStrecke_Vertikal1);
    vertex(verschiebungb, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
    vertex(verschiebungb, 100+kleineStrecke_Vertikal1);
    endShape();
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));

    beginShape();
    vertex(verschiebungb+horizontaleTeilung2[arrayZufall8],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(verschiebungb+horizontaleTeilung2[arrayZufall8], 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(verschiebungb,100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    endShape();
 
    //Rechtecke in Weissraum
    fill('white');
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100);
    vertex(verschiebungb, 100+kleineStrecke_Vertikal1);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+horizontaleTeilung[arrayZufall2], 100);
    endShape();
    // beginShape();
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
    // vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100);
    // endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(verschiebungb, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(verschiebungb, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(verschiebungb+horizontaleTeilung2[arrayZufall8], 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(verschiebungb+horizontaleTeilung2[arrayZufall8],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(verschiebungb, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand,100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand,100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand,100+rechteckhoehe);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    endShape();

    //


    //o
  //keine horizontale Teilung
  //Rechtecke im Weissraum
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
  vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
  vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
  vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
  vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
  endShape();
//   beginShape();
//   vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
//   vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
//   vertex(positionO+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
//   vertex(positionO+rechteckbreite+buchstabenabstand, 100);
//   vertex(horizontaleTeilung[arrayZufall1]+rechteckbreite+2*buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
//   endShape();
fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionO+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionO+rechteckbreite+buchstabenabstand,100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite, 100);
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+buchstabenabstand, 100);
  vertex(positionO+rechteckbreite, 100);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+buchstabenabstand,100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1);
  endShape();
  fill(random(quadrat_hintergrund));
 
  beginShape();
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionO+rechteckbreite+buchstabenabstand,100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionO+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionO+rechteckbreite, 100+rechteckhoehe);
  vertex(positionO+rechteckbreite+buchstabenabstand,100+rechteckhoehe);
  vertex(positionO+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  endShape();
  //
  
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));

    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));
    beginShape();
    vertex(positionO, 100+kleineStrecke_Vertikal1);
    vertex(positionO, 100+rechteckhoehe);
    vertex(positionO+horizontaleTeilung[arrayZufall6], 100+rechteckhoehe);
    vertex(positionO+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1);
    vertex(positionO, 100+kleineStrecke_Vertikal1);
    endShape();
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));

    beginShape();
    vertex(positionO+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(positionO+horizontaleTeilung[arrayZufall6], 100+rechteckhoehe);
    vertex(positionO+rechteckbreite, 100+rechteckhoehe);
    vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(positionO+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    endShape();
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));
   
    beginShape();
    vertex(positionO+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1);
    vertex(positionO+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1);
    vertex(positionO+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1);
    endShape();
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
   fill('green');
   fill(random(rgb_farbton));

    beginShape();
    vertex(positionO+horizontaleTeilung[arrayZufall6]+horizontaleTeilung2[arrayZufall8],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(positionO+horizontaleTeilung[arrayZufall6]+horizontaleTeilung2[arrayZufall8], 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(positionO+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    vertex(positionO+horizontaleTeilung[arrayZufall6],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
    endShape();

    

  //n
  //let horizontaleTeilung = [];
  horizontaleTeilung.push(grosseStrecke, kleineStrecke);
  arrayZufall3 = floor(random(0, 2));
  //push();
  //translate(4*rechteckbreite+4*buchstabenabstand,0);
  let horizontaleTeilungO = [grosseStrecke, rechteckbreite];
  arrayZufallo = floor(random(0, 2));
  let verschiebungO = horizontaleTeilung[arrayZufall1]+rechteckbreite+3*buchstabenabstand+rechteckbreite+horizontaleTeilungO[arrayZufallo];
  fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
  fill(random(rgb_farbton));
  beginShape();
  vertex(positionO+rechteckbreite+ buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+rechteckhoehe);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+ buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  endShape();
  fill('red');
//   beginShape();
//   vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
//   vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+rechteckhoehe);
//   vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
//   vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
//   vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
//   endShape();
  //pop();
  fill(random(rgb_farbton));
  beginShape();
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1);
  endShape();
  fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
 fill('yellow');
 fill(random(rgb_farbton));
  beginShape();
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall]+horizontaleTeilung2[arrayZufall8],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall]+horizontaleTeilung2[arrayZufall8], 100+rechteckhoehe);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall]+horizontaleTeilung2[arrayZufall8],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  endShape();

  //Rechtecke im Weissraum
  fill('white');
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite+ buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+ buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+ buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite+buchstabenabstand, 100);
  vertex(positionO+rechteckbreite+ buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100);
  vertex(positionO+rechteckbreite+buchstabenabstand, 100);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100);
  endShape();

//   beginShape();
//   vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100);
//   vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
//   vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
//   vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
//   vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100);
//   endShape();
fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+rechteckhoehe);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall]+horizontaleTeilung2[arrayZufall8], 100+rechteckhoehe);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall]+horizontaleTeilung2[arrayZufall8],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionO+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite,  100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand,  100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite,  100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite,  100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung6[arrayZufall5]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung6[arrayZufall5]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung6[arrayZufall5]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite,  100+rechteckhoehe);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung6[arrayZufall5]);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung6[arrayZufall5]);
  endShape();
  //

  //a
    arrayZufall4 = floor(random(0, 2));
    //push();
    //translate(5*rechteckbreite+5*buchstabenabstand,0);
    let positionA = positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand;
    // fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    // fill('red');
    // beginShape();
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall3]);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall4], 100+rechteckhoehe);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall4], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall3]);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall3]);
    // endShape();
    // beginShape();
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall4], 100);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall4], 100+rechteckhoehe);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall4], 100);
    // endShape();
    //pop();
    let grosseStrecke_Vertikal8 = (rechteckhoehe - (kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5])) * goldeneZahl;
    let kleineStrecke_Vertikal8 = (rechteckhoehe - (kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5])) - grosseStrecke_Vertikal8;
    let vertikaleTeilung8 = [grosseStrecke_Vertikal8, kleineStrecke_Vertikal8];

    arrayZufall7 = floor(random(0, 2));

    fill('green');
    fill(random(rgb_farbton));

    beginShape();
    vertex(positionA, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
    vertex(positionA, 100+rechteckhoehe);
    vertex(positionA+horizontaleTeilung[arrayZufall2], 100+rechteckhoehe);
    vertex(positionA+horizontaleTeilung[arrayZufall2], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
    vertex(positionA, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
    endShape();
    fill('grey');
    fill(random(rgb_farbton));

    beginShape();
    vertex(positionA, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
    vertex(positionA, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung6[arrayZufall5]);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung6[arrayZufall5]);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
    vertex(positionA, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
    endShape();
    fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
    fill(random(rgb_farbton));

   //fill('blue');
    beginShape();
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],100+kleineStrecke_Vertikal1);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+rechteckhoehe);
    vertex(positionA+rechteckbreite, 100+rechteckhoehe);
    vertex(positionA+rechteckbreite, 100+kleineStrecke_Vertikal1);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],100+kleineStrecke_Vertikal1);
    endShape();
    fill(random(rgb_farbton));
    // fill('pink');
    // beginShape();
    // vertex(positionA+horizontaleTeilung[arrayZufall2],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung8[arrayZufall5]);
    // vertex(positionA+horizontaleTeilung[arrayZufall2], 100+rechteckhoehe);
    // vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+rechteckhoehe);
    // vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung8[arrayZufall5]);
    // vertex(positionA+horizontaleTeilung[arrayZufall2],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung8[arrayZufall5]);
    // endShape();
    
    fill(random(rgb_farbton));
  
    beginShape();
    // vertex(positionA+horizontaleTeilung[arrayZufall2],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung8[arrayZufall5]);
    // vertex(positionA+horizontaleTeilung[arrayZufall2], 100+rechteckhoehe);
    vertex(positionA+horizontaleTeilung[arrayZufall2],    100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(positionA+horizontaleTeilung[arrayZufall2], 100+rechteckhoehe);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+rechteckhoehe);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],     100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(positionA+horizontaleTeilung[arrayZufall2],    100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    endShape();
    fill(random(rgb_farbton));
  
    beginShape();
    vertex(positionA,    100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    vertex(positionA, 100+kleineStrecke_Vertikal1);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],  100+kleineStrecke_Vertikal1);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],     100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    vertex(positionA,    100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    endShape();
    // beginShape();
    // vertex(positionA,100+vertikalTeilung3[arrayZufall4]-vertikaleTeilung6[arrayZufall]);
    // vertex(positionA, 100+vertikalTeilung3[arrayZufall4]);
    // vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],100+vertikalTeilung3[arrayZufall4]);
    // vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+vertikalTeilung3[arrayZufall4]-vertikaleTeilung6[arrayZufall]);
    // vertex(positionA,100+vertikalTeilung3[arrayZufall4]-vertikaleTeilung6[arrayZufall]);
    // endShape();
    // beginShape();
    // vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+vertikalTeilung3[arrayZufall4]);
    // vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+kleineStrecke_Vertikal1);
    // vertex(positionA+rechteckbreite, 100+kleineStrecke_Vertikal1);
    // vertex(positionA+rechteckbreite, 100+vertikalTeilung3[arrayZufall4]);
    // vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+vertikalTeilung3[arrayZufall4]);
    // endShape();

    //Rechtecke im Weissraum
    fill('white');
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
    vertex(positionA,    100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],     100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],     100);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],     100);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],  100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],     100);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],      100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],  100+kleineStrecke_Vertikal1);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100+kleineStrecke_Vertikal1);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,   100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],      100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    endShape();
    
    // beginShape();
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100+rechteckhoehe);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand,  100+rechteckhoehe);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand,  100);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100);
    // endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(positionA, 100+kleineStrecke_Vertikal1);
    vertex(positionA, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],  100+kleineStrecke_Vertikal1);
    vertex(positionA, 100+kleineStrecke_Vertikal1);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(positionA+horizontaleTeilung[arrayZufall2], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung6[arrayZufall5]);
    vertex(positionA+horizontaleTeilung[arrayZufall2],    100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3],     100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
    vertex(positionA+horizontaleTeilung[arrayZufall2]+horizontaleTeilung2[arrayZufall3], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung6[arrayZufall5]);
    vertex(positionA+horizontaleTeilung[arrayZufall2],  100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]+vertikaleTeilung6[arrayZufall5]);
    endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100+kleineStrecke_Vertikal1);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand,  100+kleineStrecke_Vertikal1);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand,  100);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100);
    endShape();

    // beginShape();
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100+kleineStrecke_Vertikal1);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand,  100+kleineStrecke_Vertikal1);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand,  100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    // vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100+kleineStrecke_Vertikal1-vertikaleTeilung6[arrayZufall3]);
    // endShape();
    fill(random(quadrat_hintergrund));
    beginShape();
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100+kleineStrecke_Vertikal1);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100+rechteckhoehe);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand,  100+rechteckhoehe);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand,  100+kleineStrecke_Vertikal1);
    vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite,  100+kleineStrecke_Vertikal1);
    endShape();
    


  //c
  
  //push();
  //translate(6*rechteckbreite+6*buchstabenabstand,0);
  fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
  fill(random(rgb_farbton));
  //fill('black');
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+rechteckhoehe);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
  endShape();
  fill(random(rgb_farbton));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+rechteckhoehe);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  endShape();
  fill(random(rgb_farbton));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1);
  endShape();
  //pop();

  //Rechtecke im Weissraum
  fill('white');
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand,  100);
  vertex(positionA+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100);
  vertex(positionO+rechteckbreite+ buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand,  100);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall5], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  endShape();
//   beginShape();
//   vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
//   vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
//   vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
//   vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
//   vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
//   endShape();
fill(random(quadrat_hintergrund));
beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  endShape();

  //c

  //push();
  //translate(7*rechteckbreite+7*buchstabenabstand,0);
  fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
  fill(random(rgb_farbton));
  let postitionC = positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand;
  beginShape();
  vertex(postitionC, 100+kleineStrecke_Vertikal1);
  vertex(postitionC, 100+rechteckhoehe);
  vertex(postitionC+horizontaleTeilung[arrayZufall6], 100+rechteckhoehe);
  vertex(postitionC+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1);
  vertex(postitionC, 100+kleineStrecke_Vertikal1);
  endShape();
  fill(random(rgb_farbton));
  beginShape();
  vertex(postitionC+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(postitionC+horizontaleTeilung[arrayZufall6], 100+rechteckhoehe);
  vertex(postitionC+rechteckbreite, 100+rechteckhoehe);
  vertex(postitionC+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(postitionC+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  endShape();
  fill(random(rgb_farbton));

  beginShape();
  vertex(postitionC+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1);
  vertex(postitionC+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(postitionC+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(postitionC+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(postitionC+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1);
  endShape();
  //pop();

  //Rechtecke im Weissraum
  fill('white');
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall6], 100);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall6], 100);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall6], 100);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(postitionC+horizontaleTeilung[arrayZufall6],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall6], 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+horizontaleTeilung[arrayZufall6],100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall6]);
  endShape();
//   beginShape();
//   vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
//   vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
//   vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
//   vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
//   vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
//   endShape();
fill(random(quadrat_hintergrund));
beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+vertikalTeilung3[arrayZufall7]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand,100+vertikalTeilung3[arrayZufall7]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+vertikalTeilung3[arrayZufall7]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+vertikalTeilung3[arrayZufall7]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+vertikalTeilung3[arrayZufall7]);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+vertikaleTeilung6[arrayZufall5]);
  endShape();
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+rechteckhoehe);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+rechteckhoehe);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  vertex(positionA+rechteckbreite+buchstabenabstand+rechteckbreite+buchstabenabstand+rechteckbreite, 100+kleineStrecke_Vertikal1+grosseStrecke_Vertikal4);
  endShape();
  //



  //i 
  let positionI = postitionC+rechteckbreite+buchstabenabstand;
  fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
  fill(random(rgb_farbton));
  beginShape();
  vertex(positionI, 100+kleineStrecke_Vertikal1);
  vertex(positionI, 100+rechteckhoehe);
  vertex(positionI+horizontaleTeilung[arrayZufall7], 100+rechteckhoehe);
  vertex(positionI+horizontaleTeilung[arrayZufall7], 100+kleineStrecke_Vertikal1);
  vertex(positionI, 100+kleineStrecke_Vertikal1);
  endShape();
  //pop();
  fill(random(h_farbton), s_saettigung, b_helligkeit, transparenz);
  fill(random(rgb_farbton));
  beginShape();
  vertex(positionI, 100);
  vertex(positionI, 100+vertikalTeilung3[arrayZufall7]);
  vertex(positionI+horizontaleTeilung[arrayZufall7], 100+vertikalTeilung3[arrayZufall7]);
  vertex(positionI+horizontaleTeilung[arrayZufall7], 100);
  vertex(positionI, 100);
  endShape();

  //Rechtecke im Weissraum
  fill('white');
  fill(random(quadrat_hintergrund));
  beginShape();
  vertex(positionI, 100+vertikalTeilung3[arrayZufall7]);
  vertex(positionI, 100+kleineStrecke_Vertikal1);
  vertex(positionI+horizontaleTeilung[arrayZufall7], 100+kleineStrecke_Vertikal1);
  vertex(positionI+horizontaleTeilung[arrayZufall7], 100+vertikalTeilung3[arrayZufall7]);
  vertex(positionI, 100+vertikalTeilung3[arrayZufall7]);
  endShape();
  //

  }


