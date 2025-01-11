// Allgemein
let schriftgrad = 150;
let durchschuss = schriftgrad;
let buchstabenabstand = 20; 
let wortabstand = schriftgrad / 2; 
let strichstaerke = 1; //30
let strichstaerke_waagerecht = strichstaerke * 0.8;
let strichstaerke_fein =10;

// let noiseOffset = 10;
let noiseOffsetBase = 0;
let noiseOffsetVariance = 5; 

// Horizontale Schriftlinien
let grundlinie, ueberhang, grundlinie_ueberhang, k_Linie, H_linie, H_linie_ueberhang, mittellinie, mittellinie_ueberhang, p_linie;

// Horizontale Hilfslinien
let versalien_hilfslinie_1, versalien_hilfslinie_2, versalien_oeffnung_oben, versalien_oeffnung_unten, gemeine_hilfsline_1, gemeine_hilfsline_2, gemeine_oeffnung_oben, gemeine_oeffnung_unten;

// Schriftbild
let O_versalhoehe, O_schriftbild, x_hoehe, o_schriftbild, o_schriftbild_3;

// Zurichtung der Buchstaben
let Versal_vbn_minimal, Versal_vbn_augenmass, n_vb, n_nb, o_vnb, n_vb_vergroessert, Gemeine_vbn_minimal, Gemeine_vbn_augenmass;

// Glyphen
// Versalien
let A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
let a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;

// Positionierung
let x_startwert, y_startwert, spalte_1, spalte_2, x_buchstabenposition, y_buchstabenposition;

let lines = [];
let numLines = 10;
let wanderNoiseResolution = 0.001; 
let maxWanderDistance = 200;  
let yGap = 10; 
                           
let xDifference = 0.02;   
let yDifference = 0.03;    

let numPoints;


let buchstaben_hintergrund = 255;

function setup() {
createCanvas(windowWidth, windowHeight);
rectMode(CENTER);
ellipseMode(CENTER);
//angleMode(DEGREES);
background(buchstaben_hintergrund);
blendMode(MULTIPLY);

strokeWeight(strichstaerke);
stroke('RED');

// Horizontale Schriftlinien
let grundlinie = schriftgrad * 0.7;
let ueberhang = 0.01;
let grundlinie_ueberhang = schriftgrad * (0.7 + ueberhang);
let k_linie = schriftgrad * 0.05;
let H_linie = schriftgrad * 0.15;
let H_linie_ueberhang = schriftgrad * (0.15 - ueberhang);
let mittellinie = schriftgrad * 0.36;
let mittellinie_ueberhang = schriftgrad * (0.36 - ueberhang);
let p_linie = schriftgrad * 0.89;
let p_linie_ueberhang = schriftgrad * (0.89 + ueberhang);
// Hilfslinien
let versalien_hilfslinie_1 = mittellinie * 1.15;

// Wie kann ich die Breite des Schriftbildes der Versalien festlegen? -> von O ausgehen und dann E definieren
let O_versalhoehe = grundlinie_ueberhang - H_linie_ueberhang; // Versalhoehe für den Buchstaben O berechnen
let O_schriftbild = O_versalhoehe * 0.8; // Faktor unterscheidet sich je nach Schrift; hier an Helvetica orientiert
let O_vnb = O_schriftbild * 0.14; // Faktor muss je nach Schrift angepasst werden.

// Wie kann ich die Breite des Schriftbildes der Gemeinen festlegen? -> von o ausgehen und dann die übrigen Gemeinen definieren
// Zuerst muss dafür die x-Höhe definiert werden.
let x_hoehe = O_versalhoehe * 0.72; // Faktor unterscheidet sich je nach Schrift -> 60–75% der Versalhöhe; eine höhere x-Höhe kann die Lesbarkeit in kleinen Grössen verbessern
let o_schriftbild = x_hoehe * 0.92; // Der Buchstabe o entspricht nicht einem perfekten Kreis. // a, b, d, e, g, p, q, v, x, y, z

let o_schriftbild_3 = o_schriftbild * 1.6; // m, w

// Wie können die Gemeinen zugerichtet werden? -> von n und o ausgehen
let n_vb = O_schriftbild * 0.25; // Die Vorbreite des Buchstaben n entspricht 25–50 % des Binnenraumes.
let n_nb = n_vb * 0.9; // Faktor muss je nach Schrift angepasst werden; Die Nachbreite des n ist etwas kleiner als dessen Vorbreite.
// Test mit nnn
let o_vnb = n_vb * 0.8; // Faktor muss je nach Schrift angepasst werden; Die Vor- und Nachbreite des o ist etwas kleiner als die des n.
// Test mit non, nnonn, nnonon, nnoonn
let n_vb_vergroessert = n_vb * 1.1; // Faktor muss je nach Schrift angepasst werden.

let Gemeine_vbn_minimal = n_vb * 0.2; // Faktor muss je nach Schrift angepasst werden.
let Gemeine_vbn_augenmass = n_vb * 0.4; // Faktor muss nach Augenmass entschieden werden.

// Koordinaten der Punkte; der buchstabe bezieht sich auf die y-position (linie) und die zahl auf den x-wert (raster)
//   let h_2 = createVector(0.2 * schriftgrad, H_linie); 
//   let h_3_5 = createVector(0.35 * schriftgrad, H_linie);     
//   let h_5 = createVector(0.5 * schriftgrad, H_linie);  
//   let h_6_5 = createVector(0.65 * schriftgrad, H_linie);       
//   let h_8 = createVector(0.8 * schriftgrad, H_linie);   
  
//   let m_2 = createVector(0.2 * schriftgrad, mittellinie);  
//   let m_3_5 = createVector(0.35 * schriftgrad, mittellinie); 
//   let m_5 = createVector(0.5 * schriftgrad, mittellinie);  
//   let m_6_5 = createVector(0.65 * schriftgrad, mittellinie); 
//   let m_8 = createVector(0.8 * schriftgrad, mittellinie);  

//   let schnittpunkt_m_1_5 = createVector(0.15 * schriftgrad, mittellinie + 0.05 * schriftgrad); 
//   let schnittpunkt_m_3_5 = createVector(0.35 * schriftgrad, mittellinie + 0.05 * schriftgrad);  
//   let schnittpunkt_m_6_5 = createVector(0.65 * schriftgrad, mittellinie + 0.05 * schriftgrad);  
//   let schnittpunkt_m_8_5 = createVector(0.85 * schriftgrad, mittellinie + 0.05 * schriftgrad); 

//   let unter_m_2 = createVector(0.2 * schriftgrad, mittellinie + 0.1 * schriftgrad);  
//   let unter_m_5 = createVector(0.5 * schriftgrad, mittellinie + 0.1 * schriftgrad);  
//   let unter_m_8 = createVector(0.8 * schriftgrad, mittellinie + 0.1 * schriftgrad);  

//   let g_2 = createVector(0.2 * schriftgrad, grundlinie);
//   let g_3_5 = createVector(0.35 * schriftgrad, grundlinie);
//   let g_5 = createVector(0.5 * schriftgrad, grundlinie);
//   let g_6_5 = createVector(0.65 * schriftgrad, grundlinie);
//   let g_8 = createVector(0.8 * schriftgrad, grundlinie);


// «Schriftkegel» der Gemeinen erstellen
n = createGraphics(O_schriftbild + n_vb + n_nb , schriftgrad * 0.95);
n.background(buchstaben_hintergrund);
o = createGraphics(o_schriftbild + (2 * o_vnb), schriftgrad * 0.95);
o.background(buchstaben_hintergrund);

a = createGraphics(o_schriftbild + (2 * Gemeine_vbn_augenmass), schriftgrad * 0.95); // breite, hoehe
a.background(buchstaben_hintergrund);
a.translate(-0.1 * schriftgrad,0);

  // Hilfsraster
  for (let i = 0; i < schriftgrad; i++) {
    a.stroke('grey');
    a.line(0, i * (schriftgrad/20), schriftgrad, i * (schriftgrad/20));
    a.line(i * (schriftgrad/20), 0, i * (schriftgrad/20), schriftgrad);
  }
  // Hilfslinien
  a.stroke('blue');
  a.line(0, k_linie, schriftgrad, k_linie);     // k-linie
  a.line(0, H_linie, schriftgrad, H_linie);     // H-linie
  a.line(0, H_linie_ueberhang, schriftgrad, H_linie_ueberhang);     // H-linie
  a.line(0, mittellinie_ueberhang, schriftgrad, mittellinie_ueberhang);     // mittellinie mit optischem Ausgleich fuer rundungen
  a.line(0, mittellinie, schriftgrad, mittellinie);     // mittellinie
  a.line(0, grundlinie, schriftgrad, grundlinie);     // grundlinie
  a.line(0, grundlinie_ueberhang, schriftgrad, grundlinie_ueberhang);     // grundlinie mit optischem Ausgleich fuer rundungen
  a.line(0, p_linie, schriftgrad, p_linie);     // p-linie
  a.line(0, p_linie_ueberhang, schriftgrad, p_linie_ueberhang);     // p-linie

//   a.line(g_2.x, g_2.y, h_5.x,h_5.y);
//   a.stroke('red');
//   a.fill('red');
//   a.ellipse(h_2.x, h_2.y, 5);
//   a.ellipse(h_3_5.x, h_3_5.y, 5);
//   a.ellipse(h_5.x, h_5.y, 5);
//   a.ellipse(h_6_5.x, h_6_5.y, 5);
//   a.ellipse(h_8.x, h_8.y, 5);
//   a.ellipse(g_2.x, g_2.y, 5);
//   a.ellipse(g_3_5.x, g_3_5.y, 5);
//   a.ellipse(g_5.x, g_5.y, 5);
//   a.ellipse(g_6_5.x, g_6_5.y, 5);
//   a.ellipse(g_8.x, g_8.y, 5);
//   a.ellipse(m_2.x, m_2.y, 5);
//   a.ellipse(m_5.x, m_5.y, 5);
//   a.ellipse(m_8.x, m_8.y, 5);
//   a.ellipse(schnittpunkt_m_1_5.x, schnittpunkt_m_1_5.y, 5);
//   a.ellipse(schnittpunkt_m_3_5.x, schnittpunkt_m_3_5.y, 5);
//   a.ellipse(schnittpunkt_m_6_5.x, schnittpunkt_m_6_5.y, 5);
//   a.ellipse(schnittpunkt_m_8_5.x, schnittpunkt_m_8_5.y, 5);
//   a.ellipse(unter_m_2.x, unter_m_2.y, 5);
//   a.ellipse(unter_m_5.x, unter_m_5.y, 5);
//   a.ellipse(unter_m_8.x, unter_m_8.y, 5);

//   a.noFill();
//   a.ellipse(0.5 * schriftgrad, 0.35 * schriftgrad, 0.7 * schriftgrad);
//   a.arc(m_5.x, m_5.y, 0.6 * schriftgrad , 0.6 * schriftgrad, -HALF_PI, 0);

  
  b = createGraphics(o_schriftbild + n_vb + o_vnb, schriftgrad * 0.95);
  b.background(buchstaben_hintergrund);
  c = createGraphics(O_schriftbild + o_vnb + O_vnb, schriftgrad * 0.95);
  c.background(buchstaben_hintergrund);
  d = createGraphics(o_schriftbild + o_vnb + n_vb, schriftgrad * 0.95);
  d.background(buchstaben_hintergrund);
  e = createGraphics(o_schriftbild + o_vnb + O_vnb, schriftgrad * 0.95);
  e.background(buchstaben_hintergrund);
  f = createGraphics(O_schriftbild + (2 * Gemeine_vbn_augenmass), schriftgrad * 0.95);
  f.background(buchstaben_hintergrund);
  g = createGraphics(o_schriftbild + (2 * Gemeine_vbn_augenmass), schriftgrad * 0.95);
  g.background(buchstaben_hintergrund);
  h = createGraphics(O_schriftbild + n_vb_vergroessert + n_nb, schriftgrad * 0.95);
  h.background(buchstaben_hintergrund);
  i = createGraphics(strichstaerke + n_vb_vergroessert + n_vb, schriftgrad * 0.95);
  i.background(buchstaben_hintergrund);
  j = createGraphics(O_schriftbild + (2 * n_vb), schriftgrad * 0.95);
  j.background(buchstaben_hintergrund);
  k = createGraphics(O_schriftbild + n_vb_vergroessert + Gemeine_vbn_minimal, schriftgrad * 0.95);
  k.background(buchstaben_hintergrund);
  l = createGraphics(O_schriftbild + n_vb_vergroessert + n_nb, schriftgrad * 0.95);
  l.background(buchstaben_hintergrund);
  m = createGraphics(o_schriftbild_3 + n_vb + n_nb, schriftgrad * 0.95);
  m.background(buchstaben_hintergrund);

  p = createGraphics(o_schriftbild + n_vb_vergroessert + o_vnb, schriftgrad * 0.95);
  p.background(buchstaben_hintergrund);
  q = createGraphics(o_schriftbild + n_vb_vergroessert + o_vnb, schriftgrad * 0.95);
  q.background(buchstaben_hintergrund);
  r = createGraphics(O_schriftbild + n_vb + Gemeine_vbn_minimal, schriftgrad * 0.95);
  r.background(buchstaben_hintergrund);
  s = createGraphics(O_schriftbild + (2 * Gemeine_vbn_augenmass), schriftgrad * 0.95);
  s.background(buchstaben_hintergrund);
  t = createGraphics(O_schriftbild + (2 * Gemeine_vbn_augenmass), schriftgrad * 0.95);
  t.background(buchstaben_hintergrund);
  u = createGraphics(O_schriftbild + (2 * n_nb), schriftgrad * 0.95);
  u.background(buchstaben_hintergrund);
  v = createGraphics(o_schriftbild + (2 * Gemeine_vbn_minimal), schriftgrad * 0.95);
  v.background(buchstaben_hintergrund);
  w = createGraphics(o_schriftbild_3 + (2 * Gemeine_vbn_minimal), schriftgrad * 0.95);
  w.background(buchstaben_hintergrund);
  x = createGraphics(o_schriftbild + (2 * Gemeine_vbn_minimal), schriftgrad * 0.95);
  x.background(buchstaben_hintergrund);
  y = createGraphics(o_schriftbild + (2 * Gemeine_vbn_minimal), schriftgrad * 0.95);
  y.background(buchstaben_hintergrund);
  z = createGraphics(o_schriftbild + (2 * Gemeine_vbn_augenmass), schriftgrad * 0.95);
  z.background(buchstaben_hintergrund);

  // «Schriftkegel» der Versalien erstellen
  H = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //H.background('white');
  H.strokeWeight(30);
  H.strokeCap(SQUARE);
  //H.background('red');
  O = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //O.background('GREEN');
  // Zurichtung testen und allenfalls die Parameter in O_vnb und/oder O_vnb anpassen.
  E = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //E.background('YELLOW');
  A = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //A.background('orange');
  B = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95); //angepasst
  //B.background('white');
  C = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //C.background('ORANGE');
  D = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //D.background('RED');
  F = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //F.background('green');
  G = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //G.background('BLUE');
  I = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //I.background('YELLOW');
  J = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //J.background('white');
  //K = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  K = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //K.background('white');
  L = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //L.background('BLUE');
  M = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95); //angepasst
  //M.background('purple');
  N = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95); //angepasst
  //N.background('red');
  P = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95); // angepasst
  //P.background('pink');
  Q = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //Q.background('white');
  R = createGraphics(O_schriftbild + (1 * O_vnb), schriftgrad * 0.95);
  //R.background('RED');
  S = createGraphics(O_schriftbild + (1 * O_vnb), schriftgrad * 0.95);
  //S.background('PURPLE');
  T = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //T.background('GREEN');
  U = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //U.background('GREEN');
  V = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //V.background('white');
  W = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95); //angepasst
  //W.background('grey');
  X = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95); //angepasst
  //X.background('white');
  Y = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //Y.background('BLUE');
  Z = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  //Z.background('white');




  // Positionierung
  x_startwert = 13;
  y_startwert = 13;

  // Koordinatenpunkte; Der erste Buchstabe bezieht sich auf den Buchstaben, die zweite Angabe auf die Höhe und weitere Angaben, falls mehr als ein Punkt auf derselben Höhe liegt.
  let O_H_Linie_ueberhang_mitte = createVector((O_schriftbild / 2) + O_vnb, H_linie_ueberhang);
  let O_grundlinie_ueberhang_mitte = createVector((O_schriftbild / 2) + O_vnb, grundlinie);
  let O_mitte_links = createVector(O_vnb, (H_linie_ueberhang + grundlinie) / 2);
  let O_mitte_rechts = createVector(O_schriftbild + O_vnb, (H_linie_ueberhang + grundlinie) / 2);


  //background(0);
  // Koordinaten der Punkte; der buchstabe bezieht sich auf die y-position (linie) und die zahl auf den x-wert (raster)
  let h_2 = createVector(0.2 * schriftgrad, H_linie); 
  let h_3_5 = createVector(0.35 * schriftgrad, H_linie);     
  let h_5 = createVector(0.5 * schriftgrad, H_linie);  
  let h_6_5 = createVector(0.65 * schriftgrad, H_linie);       
  let h_8 = createVector(0.8 * schriftgrad, H_linie);   
    
  let m_2 = createVector(0.2 * schriftgrad, mittellinie);  
  let m_3_5 = createVector(0.35 * schriftgrad, mittellinie); 
  let m_5 = createVector(0.5 * schriftgrad, mittellinie);  
  let m_6_5 = createVector(0.65 * schriftgrad, mittellinie); 
  let m_8 = createVector(0.8 * schriftgrad, mittellinie);  
  
  let schnittpunkt_m_1_5 = createVector(0.15 * schriftgrad, mittellinie + 0.05 * schriftgrad); 
  let schnittpunkt_m_3_5 = createVector(0.35 * schriftgrad, mittellinie + 0.05 * schriftgrad);  
  let schnittpunkt_m_6_5 = createVector(0.65 * schriftgrad, mittellinie + 0.05 * schriftgrad);  
  let schnittpunkt_m_8_5 = createVector(0.85 * schriftgrad, mittellinie + 0.05 * schriftgrad); 
  
  let unter_m_2 = createVector(0.2 * schriftgrad, mittellinie + 0.1 * schriftgrad);  
  let unter_m_5 = createVector(0.5 * schriftgrad, mittellinie + 0.1 * schriftgrad);  
  let unter_m_8 = createVector(0.8 * schriftgrad, mittellinie + 0.1 * schriftgrad);  
  
  let g_2 = createVector(0.2 * schriftgrad, grundlinie);
  let g_3_5 = createVector(0.35 * schriftgrad, grundlinie);
  let g_5 = createVector(0.5 * schriftgrad, grundlinie);
  let g_6_5 = createVector(0.65 * schriftgrad, grundlinie);
  let g_8 = createVector(0.8 * schriftgrad, grundlinie);
  

  a.beginShape();
  a.vertex(h_2.x, h_2.y);
  a.vertex(g_2.x, g_2.y);
  a.endShape();

//O.beginShape();
//   //O.push();
//    O.ellipse(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y, 5);
//    O.ellipse(O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y, 5);
//    O.ellipse(O_mitte_links.x, O_mitte_links.y, 5);
//    O.ellipse(O_mitte_rechts.x, O_mitte_rechts.y, 5);
//   O.curve(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y, O_mitte_links.x, O_mitte_links.y, O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y, O_mitte_rechts.x, O_mitte_rechts.y, O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y);
//   O.translate(O_vnb, 0);

//   O.rect(0, 0, 40, 40);
  //O.pop();

  //O.endShape();
//   O.beginShape();
//   O.vertex(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y);
//   O.curveVertex(O_H_Linie_ueberhang_mitte.x - 300, O_H_Linie_ueberhang_mitte.y, O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y);
//   //O.curveVertex(O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y);

  
//   O.endShape();

  //O.stroke(0);
 //O.bezier(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y, O_mitte_links.x, O_mitte_links.y , O_mitte_rechts.x, O_mitte_rechts.y , O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y);

 

//////////////////////////////////////////////////////////////////////////////////



    // noFill();
    // stroke(0);
    // strokeWeight(5);
    // O.beginShape();
    // O.vertex(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y);
    // O.bezierVertex(O_H_Linie_ueberhang_mitte.x + 2 *O_vnb, O_H_Linie_ueberhang_mitte.y, O_grundlinie_ueberhang_mitte.x + O_vnb, O_grundlinie_ueberhang_mitte.y, O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y);
  
    // O.endShape(CLOSE);

//     O.beginShape();
//     O.fill('black');
//     O.curveVertex(-O_schriftbild * 3, O_H_Linie_ueberhang_mitte.y);
//     O.curveVertex(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y);
//     O.curveVertex(O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y);
//     O.curveVertex(-O_schriftbild * 3, O_grundlinie_ueberhang_mitte.y);
// O.endShape();
// O.beginShape();
//     O.curveVertex(O_schriftbild * 3, O_H_Linie_ueberhang_mitte.y);
//     O.curveVertex(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y);
//     O.curveVertex(O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y);
//     O.curveVertex(O_schriftbild * 3, O_grundlinie_ueberhang_mitte.y);
//     O.endShape();


// O.beginShape();
// O.fill('black');

// // Define points for the left half
// O.curveVertex(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y); // Start point
// O.curveVertex(O_H_Linie_ueberhang_mitte.x * 1.5, O_H_Linie_ueberhang_mitte.y); // Control point
// O.curveVertex(O_grundlinie_ueberhang_mitte.x * 1.5, O_grundlinie_ueberhang_mitte.y); // Control point
// O.curveVertex(O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y); // End point

// // Define points for the right half
// O.curveVertex(O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y); // Start point for right half
// O.curveVertex(O_grundlinie_ueberhang_mitte.x * 1.5, O_grundlinie_ueberhang_mitte.y); // Control point
// O.curveVertex(O_H_Linie_ueberhang_mitte.x * 1.5, O_H_Linie_ueberhang_mitte.y); // Control point
// O.curveVertex(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y); // End point

// // Close the shape to form a complete loop
// O.curveVertex(-O_schriftbild * 3, O_H_Linie_ueberhang_mitte.y); // Reconnect to the start

// O.endShape(CLOSE);

// O.beginShape();
// O.fill('black');

// // Define points for the top half
// O.curveVertex(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y); // Start point for smoothness
// O.curveVertex(O_H_Linie_ueberhang_mitte.x + (O_schriftbild), O_H_Linie_ueberhang_mitte.y); // Top left control point
// //O.curveVertex(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y); // Top middle
// O.curveVertex(O_H_Linie_ueberhang_mitte.x + O_schriftbild * 1.5, O_H_Linie_ueberhang_mitte.y); // Top right control point

// // Define points for the bottom half
// O.curveVertex(O_grundlinie_ueberhang_mitte.x + O_schriftbild * 1.5, O_grundlinie_ueberhang_mitte.y); // Bottom right control point
// O.curveVertex(O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y); // Bottom middle
// O.curveVertex(O_grundlinie_ueberhang_mitte.x - O_schriftbild * 1.5, O_grundlinie_ueberhang_mitte.y); // Bottom left control point

// // Close the shape to form a complete loop
// //O.curveVertex(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y); // Reconnect to the start

// O.endShape(CLOSE);

}

function draw() {


// Horizontale Schriftlinien
let grundlinie = schriftgrad * 0.7;
let ueberhang = 0.01;
let grundlinie_ueberhang = schriftgrad * (0.7 + ueberhang);
let k_linie = schriftgrad * 0.05;
let H_linie = schriftgrad * 0.15;
let H_linie_ueberhang = schriftgrad * (0.15 - ueberhang);
let mittellinie = schriftgrad * 0.36;
let mittellinie_ueberhang = schriftgrad * (0.36 - ueberhang);
let p_linie = schriftgrad * 0.89;
let p_linie_ueberhang = schriftgrad * (0.89 + ueberhang);
// Hilfslinien
let versalien_hilfslinie_1 = mittellinie * 1.15;
let versalien_hilfslinie_2 = mittellinie * 1.2;

// Wie kann ich die Breite des Schriftbildes der Versalien festlegen? -> von O ausgehen und dann E definieren
let O_versalhoehe = grundlinie_ueberhang - H_linie_ueberhang; // Versalhoehe für den Buchstaben O berechnen
let O_schriftbild = O_versalhoehe * 0.8; // Faktor unterscheidet sich je nach Schrift; hier an Helvetica orientiert

// Das Schriftbild der übrigen Versalien orientiert sich an jenem des Buchstaben E. -> Die Buchstaben wurden zur Vereinfachung je einem von fünf Faktoren zugeordnet.


// Wie kann ich die Breite des Schriftbildes der Gemeinen festlegen? -> von o ausgehen und dann die übrigen Gemeinen definieren
// Zuerst muss dafür die x-Höhe definiert werden.
let x_hoehe = O_versalhoehe * 0.72; // Faktor unterscheidet sich je nach Schrift -> 60–75% der Versalhöhe; eine höhere x-Höhe kann die Lesbarkeit in kleinen Grössen verbessern
let o_schriftbild = x_hoehe * 0.92; // Der Buchstabe o entspricht nicht einem perfekten Kreis. // a, b, d, e, g, p, q, v, x, y, z


// Zurichtung
let O_vnb = O_schriftbild * 0.14; // Faktor muss je nach Schrift angepasst werden; Die Vor- und Nachbreite des O ist etwas kleiner als jenen des H.


// Wie können die Gemeinen zugerichtet werden? -> von n und o ausgehen
let n_vb = O_schriftbild * 0.25; // Die Vorbreite des Buchstaben n entspricht 25–50 % des Binnenraumes.
let n_nb = n_vb * 0.9; // Faktor muss je nach Schrift angepasst werden; Die Nachbreite des n ist etwas kleiner als dessen Vorbreite.
// Test mit nnn
let o_vnb = n_vb * 0.8; // Faktor muss je nach Schrift angepasst werden; Die Vor- und Nachbreite des o ist etwas kleiner als die des n.
// Test mit non, nnonn, nnonon, nnoonn
let n_vb_vergroessert = n_vb * 1.1; // Faktor muss je nach Schrift angepasst werden.
let Gemeine_vbn_minimal = n_vb * 0.2; // Faktor muss je nach Schrift angepasst werden.
let Gemeine_vbn_augenmass = n_vb * 0.4; // Faktor muss nach Augenmass entschieden werden.

// POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, QUAD_STRIP, TESS
let form_art = POINTS;
let schritt = 0.1; // 0.2, 0.02, 0.1, 0.003
//let schritt = random(0.1, 0.0001);
let r = random(0, 256);
let g = random(0, 256);
let b = random(0, 256);
// let fuellfarbe = [r, g, b];
// let konturfarbe = [r, g, b];
let fuellfarbe = 'WHITE';
let konturfarbe = 'BLACK';

let kreis_radius = 12;

let min_Wert = 0;
let max_Wert = 0;

///////////
let noiseOffset = noiseOffsetBase + random(-noiseOffsetVariance, noiseOffsetVariance);

////////////

// Buchstabenskelette der Versalien zeichnen.

// Buchstabenform
// H.beginShape(form_art);
// H.stroke(0);
// H.strokeWeight(strichstaerke);
// H.vertex(O_vnb + (strichstaerke/2) , H_linie);
// H.vertex(O_vnb + (strichstaerke/2), grundlinie);
// H.endShape();
// H.beginShape(form_art);
// H.stroke(0);
// H.vertex(O_schriftbild + O_vnb - (strichstaerke/2), H_linie);
// H.vertex(O_schriftbild + O_vnb - (strichstaerke/2), grundlinie);
// H.endShape();
// H.beginShape(form_art);
// H.strokeWeight(strichstaerke_waagerecht); // damit die waagerechte Linie geringfügig dünner ist wie die Stämme
// H.stroke(0);
// H.vertex(O_vnb, versalien_hilfslinie_1);
// H.vertex(O_vnb + O_schriftbild - (strichstaerke_waagerecht/2), versalien_hilfslinie_1);
// H.endShape();

// 
let H_4_x1 = O_vnb + (strichstaerke/2) ;
let H_4_y1 = H_linie ;
let H_4_x2 =  O_vnb + (strichstaerke/2);
let H_4_y2 = grundlinie ;
H.push();
H.beginShape(form_art);
H.strokeJoin(BEVEL);
H.strokeCap(PROJECT);
H.stroke(konturfarbe);
H.fill(fuellfarbe);
H.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(H_4_x1, H_4_x2, t);
    let y = lerp(H_4_y1, H_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 15), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 15), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    H.vertex(x + xOffset, y + yOffset);
  }

H.endShape();
H.pop();
let H2_4_x1 =O_schriftbild + O_vnb - (strichstaerke) ;
let H2_4_y1 = H_linie ;
let H2_4_x2 =  O_schriftbild + O_vnb - (strichstaerke);
let H2_4_y2 = grundlinie;
H.push();
H.beginShape(form_art);
H.strokeJoin(BEVEL);
H.strokeCap(PROJECT);
H.stroke(konturfarbe);
H.fill(fuellfarbe);
H.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(H2_4_x1, H2_4_x2, t);
    let y = lerp(H2_4_y1, H2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    H.vertex(x + xOffset, y + yOffset);
  }

H.endShape();
H.pop();
let H3_4_x1 =O_vnb + (strichstaerke/2);
let H3_4_y1 = versalien_hilfslinie_1 ;
let H3_4_x2 =  O_schriftbild + O_vnb - (strichstaerke/2);
let H3_4_y2 = versalien_hilfslinie_1;
H.push();
H.beginShape(form_art);
H.strokeJoin(BEVEL);
H.strokeCap(PROJECT);
H.stroke(konturfarbe);
H.fill(fuellfarbe);
H.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(H3_4_x1, H3_4_x2, t);
    let y = lerp(H3_4_y1, H3_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    H.vertex(x + xOffset, y + yOffset);
  }

H.endShape();
H.pop();


// Punktskelett
// H.strokeWeight(1);
// H.ellipse(O_vnb + (strichstaerke/2), H_linie, kreis_radius);
// H.ellipse(O_vnb + (strichstaerke/2), grundlinie, kreis_radius);
// H.ellipse(O_schriftbild + O_vnb - (strichstaerke/2), H_linie, kreis_radius);
// H.ellipse(O_schriftbild + O_vnb - (strichstaerke/2), grundlinie, kreis_radius);
// H.ellipse(O_vnb+ (strichstaerke/2), versalien_hilfslinie_1, kreis_radius);
// H.ellipse(O_schriftbild + O_vnb - (strichstaerke/2), versalien_hilfslinie_1, kreis_radius);

// Hilfsliniein
// H.stroke('black');
// H.strokeWeight(1);
// H.line(0, k_linie, schriftgrad, k_linie);     // k-linie
// H.line(0, H_linie, schriftgrad, H_linie);     // H-linie
// H.line(0, H_linie_ueberhang, schriftgrad, H_linie_ueberhang);     // H-linie
// H.line(0, mittellinie_ueberhang, schriftgrad, mittellinie_ueberhang);     // mittellinie mit optischem Ausgleich fuer rundungen
// H.line(0, mittellinie, schriftgrad, mittellinie);     // mittellinie
// H.line(0, grundlinie, schriftgrad, grundlinie);     // grundlinie
// H.line(0, grundlinie_ueberhang, schriftgrad, grundlinie_ueberhang);     // grundlinie mit optischem Ausgleich fuer rundungen
// H.line(0, p_linie, schriftgrad, p_linie);     // p-linie
// H.line(0, p_linie_ueberhang, schriftgrad, p_linie_ueberhang);     // p-linie

// H.beginShape(POINTS);
// H.stroke(0);
// H.fill(0);
// H.vertex(O_vnb, H_linie);
// H.vertex(O_vnb, grundlinie);
// H.endShape();
// H.beginShape(POINTS);
// H.stroke(0);
// H.stroke(0);
// H.vertex(O_vnb + O_schriftbild, H_linie);
// H.vertex(O_vnb + O_schriftbild, grundlinie);
// H.endShape();
// H.beginShape(POINTS);
// H.strokeWeight(strichstaerke_waagerecht); // damit die waagerechte Linie geringfügig dünner ist wie die Stämme
// H.stroke(0);
// H.stroke(0);
// H.vertex(O_vnb, versalien_hilfslinie_1);
// H.vertex(O_vnb + O_schriftbild, versalien_hilfslinie_1);
// H.endShape();

//////////////////////////////////////////////////////////////////////////////
// ChatGPT 3.5 wurde verwendet, um mit Bézier-Kurven einen Kreis zu erstellen.
//////////////////////////////////////////////////////////////////////////////
let centerX = (O_schriftbild + (2*O_vnb)) / 2;
let centerY = (H_linie_ueberhang + grundlinie) / 2;
let outerRadiusX = O_schriftbild / 2; // Outer ellipse horizontal radius
let outerRadiusY = O_versalhoehe / 2; // Outer ellipse vertical radius, making it taller than wide
let innerRadiusX = outerRadiusX - 30; // Inner ellipse horizontal radius
let innerRadiusY = outerRadiusY - 25; // Inner ellipse vertical radius // Hier kann mit dem inneren Radius gespielt werden! outerRadiusY = innerRadiusY -> sehr hoher Strichstärkenkontrast

let kappa = 0.552284749831; // This is a constant to approximate a circle with Bezier curves

// Control point offsets for outer ellipse
let ox = outerRadiusX * kappa;
let oy = outerRadiusY * kappa;

// Control point offsets for inner ellipse
let ix = innerRadiusX * kappa;
let iy = innerRadiusY * kappa;
// O.push();
// O.beginShape(form_art);
// O.fill('black');

// // Outer ellipse
// O.vertex(centerX + outerRadiusX, centerY);
// O.bezierVertex(centerX + outerRadiusX, centerY - oy, 
//                centerX + ox, centerY - outerRadiusY, 
//                centerX, centerY - outerRadiusY);
// O.bezierVertex(centerX - ox, centerY - outerRadiusY, 
//                centerX - outerRadiusX, centerY - oy, 
//                centerX - outerRadiusX, centerY);
// O.bezierVertex(centerX - outerRadiusX, centerY + oy, 
//                centerX - ox, centerY + outerRadiusY, 
//                centerX, centerY + outerRadiusY);
// O.bezierVertex(centerX + ox, centerY + outerRadiusY, 
//                centerX + outerRadiusX, centerY + oy, 
//                centerX + outerRadiusX, centerY);

// O.beginContour();

// // Inner ellipse
// O.vertex(centerX + innerRadiusX, centerY);
// O.bezierVertex(centerX + innerRadiusX, centerY + iy, 
//                centerX + ix, centerY + innerRadiusY, 
//                centerX, centerY + innerRadiusY);
// O.bezierVertex(centerX - ix, centerY + innerRadiusY, 
//                centerX - innerRadiusX, centerY + iy, 
//                centerX - innerRadiusX, centerY);
// O.bezierVertex(centerX - innerRadiusX, centerY - iy, 
//                centerX - ix, centerY - innerRadiusY, 
//                centerX, centerY - innerRadiusY);
// O.bezierVertex(centerX + ix, centerY - innerRadiusY, 
//                centerX + innerRadiusX, centerY - iy, 
//                centerX + innerRadiusX, centerY);

// O.endContour();
// O.endShape();
// O.pop();
///////////////////////////////////////////////////////////////////////////////////////

// E.beginShape(form_art);
// E.stroke(0);
// E.strokeWeight(strichstaerke);
// E.strokeCap(SQUARE);
// E.vertex(O_vnb + (strichstaerke/1.6) , H_linie);
// E.vertex(O_vnb + (strichstaerke/1.6), grundlinie);
// E.endShape();
// E.beginShape(form_art);
// E.stroke(0);
// E.strokeWeight(strichstaerke_waagerecht);
// E.strokeCap(SQUARE);
// E.vertex(O_vnb + (strichstaerke/1.6), H_linie + (strichstaerke_waagerecht/2));
// E.vertex(O_vnb + (strichstaerke/1.6) + (O_schriftbild * 0.805), H_linie + (strichstaerke_waagerecht/2));
// E.endShape();
// E.beginShape(form_art);
// E.stroke(0);
// E.strokeWeight(strichstaerke_waagerecht);
// E.strokeCap(SQUARE);
// E.vertex(O_vnb+ (strichstaerke/1.6), versalien_hilfslinie_1);
// E.vertex(O_vnb + (strichstaerke/1.6)+ (O_schriftbild * 0.78), versalien_hilfslinie_1);
// E.endShape();
// E.beginShape(form_art);
// E.stroke(0);
// E.strokeWeight(strichstaerke_waagerecht);
// E.strokeCap(SQUARE);
// E.vertex(O_vnb+ (strichstaerke/1.6), grundlinie - (strichstaerke_waagerecht/2));
// E.vertex(O_vnb + (strichstaerke/1.6)+ (O_schriftbild * 0.82), grundlinie - (strichstaerke_waagerecht/2));
// E.endShape();

let E_4_x1 = 3*O_vnb + (strichstaerke*2) ;
let E_4_y1 = H_linie +(strichstaerke/2);
let E_4_x2 = 3*O_vnb + (strichstaerke*2);
let E_4_y2 = grundlinie;
E.push();
E.beginShape(form_art);
E.strokeJoin(BEVEL);
E.strokeCap(PROJECT);
E.stroke(konturfarbe);
E.fill(fuellfarbe);
E.strokeWeight(strichstaerke_fein+random(-0.8, 2));
E.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(E_4_x1, E_4_x2, t);
    let y = lerp(E_4_y1, E_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    E.vertex(x + xOffset, y + yOffset);
  }

E.endShape();
E.pop();
let E2_4_x1 = 3*O_vnb + (strichstaerke*2) ;
let E2_4_y1 = H_linie + (strichstaerke_waagerecht/2) ;
let E2_4_x2 = O_vnb + (strichstaerke/1.6) + (O_schriftbild);
let E2_4_y2 = H_linie + (strichstaerke_waagerecht/2);
E.push();
E.beginShape(form_art);
E.strokeJoin(BEVEL);
E.strokeCap(PROJECT);
E.stroke(konturfarbe);
E.fill(fuellfarbe);
E.strokeWeight(strichstaerke_fein+random(-0.8, 2));
E.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(E2_4_x1, E2_4_x2, t);
    let y = lerp(E2_4_y1, E2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    E.vertex(x + xOffset, y + yOffset);
  }

E.endShape();
E.pop();
let E3_4_x1 = 3*O_vnb + (strichstaerke*2) ;
let E3_4_y1 = versalien_hilfslinie_1;
let E3_4_x2 = O_vnb + (strichstaerke/1.6)+ (O_schriftbild * 0.78);
let E3_4_y2 = versalien_hilfslinie_1;
E.push();
E.beginShape(form_art);
E.strokeJoin(BEVEL);
E.strokeCap(PROJECT);
E.stroke(konturfarbe);
E.fill(fuellfarbe);
E.strokeWeight(strichstaerke_fein+random(-0.8, 2));
E.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(E3_4_x1, E3_4_x2, t);
    let y = lerp(E3_4_y1, E3_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    E.vertex(x + xOffset, y + yOffset);
  }

E.endShape();
E.pop();
let E4_4_x1 = 3*O_vnb + (strichstaerke*2) ;
let E4_4_y1 = grundlinie - (strichstaerke_waagerecht/2);
let E4_4_x2 = O_vnb + (strichstaerke/1.6)+ (O_schriftbild );
let E4_4_y2 = grundlinie - (strichstaerke_waagerecht/2);
E.push();
E.beginShape(form_art);
E.strokeJoin(BEVEL);
E.strokeCap(PROJECT);
E.stroke(konturfarbe);

E.fill(fuellfarbe);
// E.strokeWeight(strichstaerke_fein+random(-0.8, 2));
E.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt +random(-0.1,0.1)) {
//     let x = lerp(E4_4_x1, E4_4_x2, t);
//     let y = lerp(E4_4_y1, E4_4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
//     E.vertex(x + xOffset, y + yOffset);
//   }

for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(E4_4_x1, E4_4_x2, t);
    let y = lerp(E4_4_y1, E4_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    E.vertex(x + xOffset, y + yOffset);
  }

E.endShape();
E.pop();

let D_4_x1 = 2*O_vnb + (strichstaerke/2);
let D_4_y1 = H_linie ;
let D_4_x2 = 2*O_vnb + (strichstaerke/2);
let D_4_y2 = grundlinie;
D.push();
D.beginShape(form_art);
D.strokeJoin(BEVEL);
D.strokeCap(PROJECT);
D.stroke(konturfarbe);
D.fill(fuellfarbe);
D.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(D_4_x1, D_4_x2, t);
    let y = lerp(D_4_y1, D_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    D.vertex(x + xOffset, y + yOffset);
  }

D.endShape();
D.pop();

D.push();
D.stroke(konturfarbe);
D.fill(fuellfarbe);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
D.pop();
// let D2_4_x1 = O_vnb + (strichstaerke/2);
// let D2_4_y1 = grundlinie ;
// let D2_4_x2 = O_schriftbild-O_vnb;
// let D2_4_y2 = mittellinie;
// D.push();
// D.beginShape(form_art);
// D.strokeJoin(BEVEL);
// D.strokeCap(PROJECT);
// D.stroke(konturfarbe);
// D.fill(fuellfarbe);
// D.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(D2_4_x1, D2_4_x2, t);
//     let y = lerp(D2_4_y1, D2_4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
//     D.vertex(x + xOffset, y + yOffset);
//   }

// D.endShape();
// D.pop();

// D.push();
// D.stroke(konturfarbe);
//D.fill(fuellfarbe);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
// D.pop();
// let D3_4_x1 = O_schriftbild-O_vnb;
// let D3_4_y1 = mittellinie ;
// let D3_4_x2 = O_vnb + (strichstaerke/2);
// let D3_4_y2 = H_linie;
// D.push();
// D.beginShape(form_art);
// D.strokeJoin(BEVEL);
// D.strokeCap(PROJECT);
// D.stroke(0);
// D.fill(fuellfarbe);
// D.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(D3_4_x1, D3_4_x2, t);
//     let y = lerp(D3_4_y1, D3_4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
//     D.vertex(x + xOffset, y + yOffset);
//   }

// D.endShape();
// D.pop();

let D4_4_x1 = O_vnb * 2 + (strichstaerke/2) ;
let D4_4_y1 = H_linie + (strichstaerke/2);
let D4_4_x2 =O_vnb * 2 + (strichstaerke/2) ;
let D4_4_y2 =grundlinie;

// Define the control points for the bezier curve
 let controlDX1 = D4_4_x1 + 76;  // Adjust control points as needed
//let control2X1 = P4_4_x1 + 140;  // Adjust control points as needed
let controlDY1 = D4_4_y1 - 10;  // Example control point, adjust as needed
 let controlDX2 = D4_4_x2 + 76;  // Adjust control points as needed
//let control2X2 = P4_4_x2 + 140;  // Adjust control points as needed
let controlDY2 = D4_4_y2 + 10;  // Example control point, adjust as needed

D.push();
D.strokeJoin(BEVEL);
D.strokeCap(PROJECT);
D.stroke(konturfarbe);
D.fill(fuellfarbe);
D.strokeWeight(strichstaerke_fein);
D.beginShape(form_art);
// Initialize previous points
let prevDX = D4_4_x1;
let prevDY = D4_4_y1;

for (let t = 0; t <= 1; t += schritt) {
    let x = bezierPoint(D4_4_x1, controlDX1, controlDX2, D4_4_x2, t);
    let y = bezierPoint(D4_4_y1, controlDY1, controlDY2, D4_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);

    let currentDX = x + xOffset;
    let currentDY = y + yOffset;

    if (t > 0) {
        //P.beginShape(form_art);
        D.vertex(prevDX, prevDY);
        D.vertex(currentDX, currentDY);
        //P.vertex(currentX + 1, currentY + 1); // Small triangle for the line segment
        //P.endShape();
    }

    prevDX = currentDX;
    prevDY = currentDY;
}
D.endShape();
D.pop();

let U_4_x1 = O_vnb+(strichstaerke) ;
let U_4_y1 = H_linie ;
let U_4_x2 = O_vnb +(strichstaerke);
let U_4_y2 = grundlinie;
U.push();
U.beginShape(form_art);
U.strokeJoin(BEVEL);
U.strokeCap(PROJECT);
U.stroke(konturfarbe);
U.fill(fuellfarbe);
U.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(U_4_x1, U_4_x2, t);
    let y = lerp(U_4_y1, U_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    U.vertex(x + xOffset, y + yOffset);
  }

U.endShape();
U.pop();

U.push();
U.noStroke();
U.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
U.pop();
let U2_4_x1 = O_schriftbild-O_vnb ;
let U2_4_y1 = H_linie ;
let U2_4_x2 = O_schriftbild -O_vnb;
let U2_4_y2 = grundlinie;
U.push();
U.beginShape(form_art);
U.strokeJoin(BEVEL);
U.strokeCap(PROJECT);
U.stroke(konturfarbe);
U.fill(fuellfarbe);
U.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(U2_4_x1, U2_4_x2, t);
    let y = lerp(U2_4_y1, U2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    U.vertex(x + xOffset, y + yOffset);
  }

U.endShape();
U.pop();

U.push();
U.noStroke();
U.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
U.pop();
let U3_4_x1 = O_vnb + (strichstaerke);
let U3_4_y1 = grundlinie ;
let U3_4_x2 = O_schriftbild;
let U3_4_y2 = grundlinie - (O_versalhoehe* 0.33);
U.push();
U.beginShape(form_art);
U.strokeJoin(BEVEL);
U.strokeCap(PROJECT);
U.stroke(konturfarbe);
U.fill(fuellfarbe);
U.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(U3_4_x1, U3_4_x2, t);
    let y = lerp(U3_4_y1, U3_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    U.vertex(x + xOffset, y + yOffset);
  }

U.endShape();
U.pop();

// let C_4_x1 = O_schriftbild-O_vnb;
// let C_4_y1 = H_linie ;
// let C_4_x2 = 2.5*O_vnb;
// let C_4_y2 = mittellinie;
// C.push();
// C.beginShape(form_art);
// C.strokeJoin(BEVEL);
// C.strokeCap(PROJECT);
// C.stroke(konturfarbe);
// C.fill(fuellfarbe);
// C.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(C_4_x1, C_4_x2, t);
//     let y = lerp(C_4_y1, C_4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
//     C.vertex(x + xOffset, y + yOffset);
//   }

// C.endShape();
// C.pop();

// C.push();
// C.noStroke();
// C.fill(fuellfarbe);
// // D.rect(0, 0, H_vnb, schriftgrad * 0.95);
// C.pop();
// let C2_4_x1 = 2.5*O_vnb ;
// let C2_4_y1 = mittellinie ;
// let C2_4_x2 =  O_schriftbild -O_vnb;
// let C2_4_y2 = grundlinie;
// C.push();
// C.beginShape(form_art);
// C.strokeJoin(BEVEL);
// C.strokeCap(PROJECT);
// C.stroke(konturfarbe);
// C.fill(fuellfarbe);
// C.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(C2_4_x1, C2_4_x2, t);
//     let y = lerp(C2_4_y1, C2_4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1,min_Wert, max_Wert);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
//     C.vertex(x + xOffset, y + yOffset);
//   }

// C.endShape();
// C.pop();

let C4_4_x1 = O_schriftbild ;
let C4_4_y1 = H_linie + 2*O_vnb;
let C4_4_x2 =O_schriftbild  ;
let C4_4_y2 =grundlinie-2*O_vnb;

// Define the control points for the bezier curve
 let controlCX1 = C4_4_x1 - 70;  // Adjust control points as needed
//let control2X1 = P4_4_x1 + 140;  // Adjust control points as needed
let controlCY1 = C4_4_y1 - 80;  // Example control point, adjust as needed
 let controlCX2 = C4_4_x2 - 70;  // Adjust control points as needed
//let control2X2 = P4_4_x2 + 140;  // Adjust control points as needed
let controlCY2 = C4_4_y2 + 80;  // Example control point, adjust as needed

C.push();
C.strokeJoin(BEVEL);
C.strokeCap(PROJECT);
C.stroke(konturfarbe);
C.fill(fuellfarbe);
C.strokeWeight(strichstaerke_fein);
C.beginShape(form_art);
// Initialize previous points
let prevCX = C4_4_x1;
let prevCY = C4_4_y1;

for (let t = 0; t <= 1; t += schritt) {
    let x = bezierPoint(C4_4_x1, controlCX1, controlCX2, C4_4_x2, t);
    let y = bezierPoint(C4_4_y1, controlCY1, controlCY2, C4_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);

    let currentCX = x + xOffset;
    let currentCY = y + yOffset;

    if (t > 0) {
        //P.beginShape(form_art);
        C.vertex(prevCX, prevCY);
        C.vertex(currentCX, currentCY);
        //P.vertex(currentX + 1, currentY + 1); // Small triangle for the line segment
        //P.endShape();
    }

    prevCX = currentCX;
    prevCY = currentCY;
}
C.endShape();
C.pop();

// Punktskelett
// E.strokeWeight(1);
// E.ellipse(O_vnb + (strichstaerke/1.6) , H_linie, kreis_radius);
// E.ellipse(O_vnb + (strichstaerke/1.6) , grundlinie, kreis_radius);
// E.ellipse(O_vnb + (strichstaerke/1.6) ,versalien_hilfslinie_1, kreis_radius);
// E.ellipse(O_vnb + (strichstaerke/1.6) + (O_schriftbild * 0.805) , H_linie+ (strichstaerke/2.5), kreis_radius);
// E.ellipse(O_vnb + (strichstaerke/1.6) , H_linie+ (strichstaerke/2.5), kreis_radius);
// E.ellipse(O_vnb + (strichstaerke/1.6)+ (O_schriftbild * 0.78) ,versalien_hilfslinie_1, kreis_radius);
// E.ellipse(O_vnb + (strichstaerke/1.6)+ (O_schriftbild * 0.82) , grundlinie- (strichstaerke/2.5), kreis_radius);
// E.ellipse(O_vnb + (strichstaerke/1.6) , grundlinie- (strichstaerke/2.5), kreis_radius);

// E.vertex(O_schriftbild + O_vnb, H_linie + (strichstaerke/2));
// E.vertex(O_vnb, H_linie + (strichstaerke/2));
// E.vertex(O_vnb, versalien_hilfslinie_1);
// E.vertex(O_vnb, grundlinie - (strichstaerke/2));
// E.vertex(O_schriftbild + O_vnb, grundlinie - (strichstaerke/2));
// E.endShape();
// E.beginShape(form_art);
// E.strokeWeight(strichstaerke_waagerecht);
// E.strokeCap(SQUARE);


// E.vertex(O_vnb, versalien_hilfslinie_1);
// E.vertex(O_vnb + O_schriftbild - (O_schriftbild * 0.1), versalien_hilfslinie_1);

// E.endShape();

// A.beginShape(form_art);
// A.noFill();
// A.stroke(0);
// A.strokeCap(PROJECT);
// A.strokeJoin(BEVEL);
// A.strokeWeight(strichstaerke);
// A.vertex(Versal_vbn_minimal + (strichstaerke/2 ), grundlinie);
// A.vertex(Versal_vbn_minimal + (O_schriftbild / 2), H_linie);
// A.vertex(Versal_vbn_minimal + O_schriftbild - (strichstaerke /2), grundlinie);
// A.endShape();
// A.beginShape(form_art);
// A.strokeCap(SQUARE);
// A.strokeWeight(strichstaerke_waagerecht);
// A.vertex(Versal_vbn_minimal + (O_schriftbild * 0.24), versalien_hilfslinie_2);
// A.vertex(Versal_vbn_minimal + (O_schriftbild * 0.74 ), versalien_hilfslinie_2);
// A.endShape();
// A.beginShape(form_art);
// A.fill('white');
// A.noStroke();
// A.vertex(0, grundlinie);
// A.vertex(O_schriftbild + (2 * Versal_vbn_minimal), grundlinie);
// A.vertex(O_schriftbild + (2 * Versal_vbn_minimal), schriftgrad * 0.95);
// A.vertex(0, schriftgrad * 0.95);
// A.endShape();

// B
// B.push();
// B.beginShape(form_art);
// B.strokeWeight(strichstaerke);
// B.strokeCap(SQUARE);
// B.vertex(O_vnb + (strichstaerke /2), H_linie);
// B.vertex(O_vnb + (strichstaerke /2), grundlinie);
// B.endShape();
// B.beginShape(form_art);
// B.vertex(O_vnb + (strichstaerke /2), H_linie + (strichstaerke/2));
// B.vertex(O_vnb + (strichstaerke /2) + (O_schriftbild * 0.5), H_linie + (strichstaerke/2));
// B.endShape();
// B.beginShape(form_art);
// B.vertex(O_vnb + (strichstaerke /2), versalien_hilfslinie_1);
// B.vertex(O_vnb + (strichstaerke /2) + (O_schriftbild * 0.5), versalien_hilfslinie_1);
// B.endShape();
// B.beginShape(form_art);
// B.vertex(O_vnb + (strichstaerke /2), grundlinie -(strichstaerke/2));
// B.vertex(O_vnb + (strichstaerke /2) + (O_schriftbild * 0.5), grundlinie -(strichstaerke/2));
// B.endShape();
// B.pop();
// B.push();
// B.strokeWeight(strichstaerke);
// B.strokeCap(SQUARE);
// B.noFill();
// B.beginShape(form_art);
// B.vertex(O_vnb + strichstaerke + (O_schriftbild / 3), H_linie + (strichstaerke / 2));

// let B_controlX1 = O_vnb + strichstaerke + (O_schriftbild / 2) + 40;
// let B_controlY1 = H_linie + (strichstaerke / 2) ;
// let B_controlX2 = O_vnb + strichstaerke + (O_schriftbild / 2) + 40;
// let B_controlY2 = versalien_hilfslinie_1;
// B.bezierVertex(B_controlX1, B_controlY1, B_controlX2, B_controlY2, O_vnb + strichstaerke + (O_schriftbild / 3), versalien_hilfslinie_1);
// B.endShape();
// B.pop();
// B.push();
// B.strokeWeight(strichstaerke);
// B.strokeCap(SQUARE);
// B.noFill();
// B.beginShape(form_art);
// B.vertex(O_vnb + strichstaerke + (O_schriftbild / 3), grundlinie - (strichstaerke / 2));
// let B2_controlX1 = O_vnb + strichstaerke + (O_schriftbild / 2) + 55;
// let B2_controlY1 = grundlinie- (strichstaerke / 2) ;
// let B2_controlX2 = O_vnb + strichstaerke + (O_schriftbild / 2) + 55;
// let B2_controlY2 = versalien_hilfslinie_1;
// B.bezierVertex(B2_controlX1, B2_controlY1, B2_controlX2, B2_controlY2, O_vnb + strichstaerke + (O_schriftbild / 3), versalien_hilfslinie_1);
// B.endShape();
// B.pop();
// C
let C_outerRadiusX = O_schriftbild / 2.3; 
let C_outerRadiusY = O_versalhoehe / 2; 
let C_innerRadiusX = C_outerRadiusX - 30; 
let C_innerRadiusY = C_outerRadiusY - 25; 

// Control point offsets for outer ellipse
let C_ox = outerRadiusX * kappa;
let C_oy = outerRadiusY * kappa;

// Control point offsets for inner ellipse
let C_ix = innerRadiusX * kappa;
let C_iy = innerRadiusY * kappa;



// C.push();
// C.beginShape(form_art);
// C.fill('black');
// Outer ellipse
// C.vertex(centerX + C_outerRadiusX, centerY);
// C.bezierVertex(centerX + C_outerRadiusX, centerY - C_oy, 
//                centerX + C_ox, centerY - C_outerRadiusY, 
//                centerX, centerY - outerRadiusY);
// C.bezierVertex(centerX - C_ox, centerY - C_outerRadiusY, 
//                centerX - C_outerRadiusX, centerY - C_oy, 
//                centerX - C_outerRadiusX, centerY);
// C.bezierVertex(centerX - C_outerRadiusX, centerY + C_oy, 
//                centerX - C_ox, centerY + C_outerRadiusY, 
//                centerX, centerY + C_outerRadiusY);
// C.bezierVertex(centerX + C_ox, centerY + C_outerRadiusY, 
//                centerX + C_outerRadiusX, centerY + C_oy, 
//                centerX + C_outerRadiusX, centerY);

// C.beginContour();

// // Inner ellipse
// C.vertex(centerX + C_innerRadiusX, centerY);
// C.bezierVertex(centerX + C_innerRadiusX, centerY + C_iy, 
//                centerX + C_ix, centerY + C_innerRadiusY, 
//                centerX, centerY + C_innerRadiusY);
// C.bezierVertex(centerX - C_ix, centerY + C_innerRadiusY, 
//                centerX - C_innerRadiusX, centerY + C_iy, 
//                centerX - C_innerRadiusX, centerY);
// C.bezierVertex(centerX - C_innerRadiusX, centerY - iy, 
//                centerX - C_ix, centerY - C_innerRadiusY, 
//                centerX, centerY - C_innerRadiusY);
// C.bezierVertex(centerX + C_ix, centerY - C_innerRadiusY, 
//                centerX + C_innerRadiusX, centerY - C_iy, 
//                centerX + C_innerRadiusX, centerY);

// C.endContour();
// C.endShape();
// C.pop();
// C.push();
// C.fill(buchstaben_hintergrund);
// C.noStroke();
// C.rect(O_vnb + O_schriftbild, H_linie + (O_versalhoehe * 0.25), O_schriftbild * 0.6, O_versalhoehe * 0.4);
// C.pop();

// D
// D.push();
// D.beginShape(form_art);
// D.strokeWeight(strichstaerke);
// D.strokeCap(SQUARE);
// D.vertex(O_vnb + (strichstaerke/2), H_linie+(strichstaerke/4));
// D.vertex(O_vnb + (strichstaerke/2), grundlinie- (strichstaerke/4));
// D.endShape();
// D.pop();
// D.push();
// D.strokeWeight(strichstaerke);
// D.strokeCap(SQUARE);
// D.noFill();
// D.beginShape(form_art);
// D.vertex(O_vnb ,  H_linie+(strichstaerke/4));
// let D_controlX1 = O_vnb + (strichstaerke/2) + (schriftgrad * 0.5);
// let D_controlY1 = H_linie - (schriftgrad * 0.05);
// let D_controlX2 = O_vnb + (strichstaerke/2)+ (schriftgrad * 0.5);
// let D_controlY2 = grundlinie + (schriftgrad * 0.05);
// D.bezierVertex(D_controlX1, D_controlY1, D_controlX2, D_controlY2, O_vnb , grundlinie-(strichstaerke/4) );
// D.endShape();
// D.pop();
// D.push();
// D.noStroke();
// D.fill(buchstaben_hintergrund);
// D.rect(0, 0, O_vnb, schriftgrad * 0.95);
// D.pop();



// F
let F_4_x1 = 3*O_vnb + (strichstaerke*2);
let F_4_y1 = H_linie ;
let F_4_x2 =3*O_vnb + (strichstaerke*2);
let F_4_y2 = grundlinie;
F.push();
F.beginShape(form_art);
F.strokeJoin(BEVEL);
F.strokeCap(PROJECT);
F.stroke(konturfarbe);
F.fill(fuellfarbe);
F.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(F_4_x1, F_4_x2, t);
    let y = lerp(F_4_y1, F_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    F.vertex(x + xOffset, y + yOffset);
  }

F.endShape();
F.pop();
let F2_4_x1 = 3*O_vnb + (strichstaerke*2);
let F2_4_y1 = H_linie +(strichstaerke/2) ;
let F2_4_x2 = O_vnb + O_schriftbild;
let F2_4_y2 = H_linie +(strichstaerke/2);
F.push();
F.beginShape(form_art);
F.strokeJoin(BEVEL);
F.strokeCap(PROJECT);
F.stroke(konturfarbe);
F.fill(fuellfarbe);
F.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(F2_4_x1, F2_4_x2, t);
    let y = lerp(F2_4_y1, F2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    F.vertex(x + xOffset, y + yOffset);
  }

F.endShape();
F.pop();
let F3_4_x1 = 3*O_vnb + (strichstaerke*2);
let F3_4_y1 = versalien_hilfslinie_1 ;
let F3_4_x2 = O_vnb + (strichstaerke/1.6)+ (O_schriftbild * 0.78);
let F3_4_y2 = versalien_hilfslinie_1;
F.push();
F.beginShape(form_art);
F.strokeJoin(BEVEL);
F.strokeCap(PROJECT);
F.stroke(konturfarbe);
F.fill(fuellfarbe);
F.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(F3_4_x1, F3_4_x2, t);
    let y = lerp(F3_4_y1, F3_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    F.vertex(x + xOffset, y + yOffset);
  }

F.endShape();
F.pop();

// F.push();
// F.beginShape(form_art);
// F.strokeWeight(strichstaerke);
// F.strokeCap(SQUARE);
// F.vertex(O_vnb + O_schriftbild, H_linie + (strichstaerke / 2));
// F.vertex(O_vnb, H_linie + (strichstaerke / 2));
// F.vertex(O_vnb, grundlinie);
// F.endShape();
// F.beginShape(form_art);
// F.strokeWeight(strichstaerke_waagerecht);
// F.vertex(O_vnb,  versalien_hilfslinie_1);
// F.vertex(O_vnb + O_schriftbild - (O_schriftbild * 0.1), versalien_hilfslinie_1);
// F.endShape();
// F.pop();


// G
let G_centerX = (O_schriftbild + O_vnb+ O_vnb) / 2;
let G_centerY = (H_linie_ueberhang + grundlinie) / 2;
let G_outerRadiusX = O_schriftbild / 2; 
let G_outerRadiusY = O_versalhoehe / 2; 
let G_innerRadiusX = G_outerRadiusX - 30; 
let G_innerRadiusY = G_outerRadiusY - 25; 

// Control point offsets for outer ellipse
let G_ox = G_outerRadiusX * kappa;
let G_oy = G_outerRadiusY * kappa;

// Control point offsets for inner ellipse
let G_ix = innerRadiusX * kappa;
let G_iy = innerRadiusY * kappa;



// G.push();
// G.beginShape(form_art);
// G.fill('black');

// // Outer ellipse
// G.vertex(G_centerX + G_outerRadiusX, centerY);
// G.bezierVertex(G_centerX + G_outerRadiusX, centerY - G_oy, 
//                G_centerX + G_ox, centerY - G_outerRadiusY, 
//                G_centerX, centerY - G_outerRadiusY);
// G.bezierVertex(G_centerX - G_ox, centerY - G_outerRadiusY, 
//                G_centerX - G_outerRadiusX, centerY - G_oy, 
//                G_centerX - G_outerRadiusX, centerY);
// G.bezierVertex(G_centerX - G_outerRadiusX, centerY + G_oy, 
//                G_centerX - G_ox, centerY + G_outerRadiusY, 
//                G_centerX, centerY + G_outerRadiusY);
// G.bezierVertex(G_centerX + G_ox, centerY + G_outerRadiusY, 
//                G_centerX + G_outerRadiusX, centerY + C_oy, 
//                G_centerX + G_outerRadiusX, centerY);

// G.beginContour();

// // Inner ellipse
// G.vertex(G_centerX + G_innerRadiusX, centerY);
// G.bezierVertex(G_centerX + G_innerRadiusX, centerY + G_iy, 
//                G_centerX + G_ix, centerY + G_innerRadiusY, 
//                G_centerX, centerY + G_innerRadiusY);
// G.bezierVertex(G_centerX - G_ix, centerY + C_innerRadiusY, 
//                G_centerX - G_innerRadiusX, centerY + G_iy, 
//                G_centerX - G_innerRadiusX, centerY);
// G.bezierVertex(G_centerX - G_innerRadiusX, centerY - G_iy, 
//                G_centerX - G_ix, centerY - G_innerRadiusY, 
//                G_centerX, centerY - G_innerRadiusY);
// G.bezierVertex(G_centerX + G_ix, centerY - G_innerRadiusY, 
//                G_centerX + G_innerRadiusX, centerY - G_iy, 
//                G_centerX + G_innerRadiusX, centerY);

// G.endContour();
// G.endShape(CLOSE);
// G.pop();
// G.push();
// G.fill(buchstaben_hintergrund);
// G.noStroke();
// G.rect(O_schriftbild * 0.8, H_linie + (O_versalhoehe * 0.25), strichstaerke * 16, O_versalhoehe * 0.4);
// G.pop();

// G.push();
// G.beginShape(form_art);
// G.noFill();
// G.strokeWeight(strichstaerke *1.125);
// G.strokeCap(SQUARE);
// G.stroke('black');
// // G.vertex(O_vnb + O_schriftbild - (strichstaerke *0.81),  H_linie + (O_versalhoehe * 0.25) + (O_versalhoehe * 0.41));
// G.vertex(O_vnb + O_schriftbild - (strichstaerke *0.6),   H_linie + (O_versalhoehe * 0.25) + (O_versalhoehe * 0.33));

// G.vertex(O_vnb + O_schriftbild - (strichstaerke *3.7),    H_linie + (O_versalhoehe * 0.25) + (O_versalhoehe * 0.33));
// G.endShape();
// G.pop();
// I
let I_4_x1 = ((O_vnb)+O_schriftbild)/2;
let I_4_y1 =  grundlinie ;
let I_4_x2 = ((O_vnb)+O_schriftbild)/2;
let I_4_y2 = H_linie ;
I.push();
I.beginShape(form_art);
I.strokeJoin(BEVEL);
I.strokeCap(PROJECT);
I.stroke(konturfarbe);
I.fill(fuellfarbe);
I.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(I_4_x1, I_4_x2, t);
    let y = lerp(I_4_y1, I_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    I.vertex(x + xOffset, y + yOffset);
  }

I.endShape();
I.pop();
let I2_4_x1 = (((O_vnb)+O_schriftbild)/2) + (O_schriftbild / 3);
let I2_4_y1 =  H_linie ;
let I2_4_x2 = (((O_vnb)+O_schriftbild)/2) - (O_schriftbild / 3);
let I2_4_y2 = H_linie ;
I.push();
I.beginShape(form_art);
I.strokeJoin(BEVEL);
I.strokeCap(PROJECT);
I.stroke(konturfarbe);
I.fill(fuellfarbe);
I.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(I2_4_x1, I2_4_x2, t);
    let y = lerp(I2_4_y1, I2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    I.vertex(x + xOffset, y + yOffset);
  }

I.endShape();
I.pop();
let I3_4_x1 = (((O_vnb)+O_schriftbild)/2) - (O_schriftbild / 3);
let I3_4_y1 =  grundlinie ;
let I3_4_x2 = (((O_vnb)+O_schriftbild)/2) + (O_schriftbild / 3);
let I3_4_y2 = grundlinie ;
I.push();
I.beginShape(form_art);
I.strokeJoin(BEVEL);
I.strokeCap(PROJECT);
I.stroke(konturfarbe);
I.fill(fuellfarbe);
I.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(I3_4_x1, I3_4_x2, t);
    let y = lerp(I3_4_y1, I3_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    I.vertex(x + xOffset, y + yOffset);
  }

I.endShape();
I.pop();

// J
// J.push();
// J.beginShape(form_art);
// J.strokeWeight(strichstaerke);
// J.strokeCap(SQUARE);
// J.vertex(O_vnb + strichstaerke + (O_schriftbild / 2), H_linie);
// J.vertex(O_vnb + strichstaerke + (O_schriftbild / 2), grundlinie);
// J.endShape();
// J.pop();
// J.push();
// J.strokeWeight(strichstaerke);
// J.strokeCap(SQUARE);
// J.noFill();
// J.beginShape(form_art);
// J.vertex(O_vnb + strichstaerke + (O_schriftbild / 2), grundlinie);
// let J_controlX1 = O_vnb + strichstaerke + (O_schriftbild / 2);
// let J_controlY1 = p_linie ;
// let J_controlX2 = Versal_vbn_minimal + (strichstaerke/2);
// let J_controlY2 = p_linie;
// J.bezierVertex(J_controlX1, J_controlY1, J_controlX2, J_controlY2, Versal_vbn_minimal + (strichstaerke/2), grundlinie );
// J.endShape();
// J.pop();
// J.push();
// J.fill('white');
// J.noStroke();
// J.rect(0, grundlinie, O_schriftbild + O_vnb + O_vnb, (schriftgrad * 0.95) - grundlinie);
// J.pop();
// K
// K.push();
// K.beginShape(form_art);
// K.strokeWeight(strichstaerke);
// K.strokeCap(PROJECT);

// K.vertex(O_vnb + (strichstaerke / 3), H_linie + (strichstaerke/2));
// K.vertex(O_vnb + (strichstaerke / 3), grundlinie - (strichstaerke/2));
// K.endShape();
// K.beginShape(form_art);
// K.strokeWeight(strichstaerke);
// K.strokeCap(ROUND);
// K.vertex(O_vnb + (O_schriftbild * 0.96)  , (H_linie * 0.7)); // damit die Linie vom Rechteck richtig beschnitten wird.
// K.vertex(O_vnb + (strichstaerke/2)   , (versalien_hilfslinie_1 * 1.2));
// K.endShape();
// K.beginShape(form_art);
// K.strokeCap(PROJECT);
// K.vertex(O_vnb + (strichstaerke) + (O_schriftbild * 0.26) , (versalien_hilfslinie_1 * 0.95));
// K.vertex(O_vnb + (O_schriftbild * 0.92), grundlinie);
// K.endShape();
// K.pop();

// weisse Rechtecke für Strichbeschnitt oben und unten
// K.push();
// K.fill(255);
// K.noStroke();
// K.rect(0, 0, (2 * O_vnb) + O_schriftbild, H_linie);
// K.rect(0, grundlinie, (2 * O_vnb) + O_schriftbild, (schriftgrad * 0.95) - grundlinie);
// K.pop();
// weisse Formen für Kehlungen
// K.push();
// K.beginShape();
// K.fill(255);
// K.noStroke();
// K.vertex(O_vnb + (strichstaerke*0.84), H_linie_ueberhang);
// K.vertex(O_vnb +  (strichstaerke*0.84),  (versalien_hilfslinie_1));
// K.vertex(O_vnb + (O_schriftbild * 0.77), H_linie_ueberhang);
// K.endShape();
// K.pop();
// K.push();
// K.beginShape();
// K.fill(255);
// K.noStroke();
// K.vertex(O_vnb+(strichstaerke*0.84), (versalien_hilfslinie_1 * 1.05) + strichstaerke);
// K.vertex(O_vnb+(strichstaerke*0.84),  grundlinie);
// K.vertex(O_vnb + (O_schriftbild * 0.92) - (strichstaerke/2), grundlinie);
// K.vertex(O_vnb + (strichstaerke) + (O_schriftbild * 0.17), versalien_hilfslinie_1 * 1.0);
// K.endShape();
// K.beginShape();
// K.fill(255);
// K.noStroke();
// K.vertex(O_vnb + (strichstaerke*1.5) + (O_schriftbild * 0.2), versalien_hilfslinie_1 * 0.88);
// K.vertex(O_vnb + (O_schriftbild * 0.94) + (strichstaerke/2),  grundlinie);
// K.vertex(O_vnb + (O_schriftbild * 0.99), H_linie);
// K.endShape();
// K.pop();

let K_4_x1 = 2*O_vnb  ;
let K_4_y1 = H_linie +(strichstaerke/2);
let K_4_x2 = 2*O_vnb ;
let K_4_y2 = grundlinie ;
K.push();
K.beginShape(form_art);
K.strokeJoin(BEVEL);
K.strokeCap(PROJECT);
K.stroke(konturfarbe);
K.fill(fuellfarbe);
K.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(K_4_x1, K_4_x2, t);
    let y = lerp(K_4_y1, K_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    K.vertex(x + xOffset, y + yOffset);
  }

K.endShape();
K.pop();
let K2_4_x1 =  (O_schriftbild * 0.96)  ;
let K2_4_y1 = H_linie+(strichstaerke/2);
let K2_4_x2 = O_vnb + (strichstaerke/2) ;
let K2_4_y2 = (versalien_hilfslinie_1 * 1.2) ;
K.push();
K.beginShape(form_art);
K.strokeJoin(BEVEL);
K.strokeCap(PROJECT);
K.stroke(konturfarbe);
K.fill(fuellfarbe);
K.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(K2_4_x1, K2_4_x2, t);
    let y = lerp(K2_4_y1, K2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    K.vertex(x + xOffset, y + yOffset);
  }

K.endShape();
K.pop();
let K3_4_x1 =  (strichstaerke) + (O_schriftbild * 0.26) ;
let K3_4_y1 = (versalien_hilfslinie_1 * 0.95);
let K3_4_x2 = O_vnb + (O_schriftbild * 0.92) ;
let K3_4_y2 = grundlinie ;
K.push();
K.beginShape(form_art);
K.strokeJoin(BEVEL);
K.strokeCap(PROJECT);
K.stroke(konturfarbe);
K.fill(fuellfarbe);
K.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(K3_4_x1, K3_4_x2, t);
    let y = lerp(K3_4_y1, K3_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    K.vertex(x + xOffset, y + yOffset);
  }

K.endShape();
K.pop();

// Punktskelett
// K.strokeWeight(1);
// K.ellipse(O_vnb + (strichstaerke / 3), H_linie , kreis_radius);
// K.ellipse(O_vnb + (strichstaerke / 3), grundlinie , kreis_radius);
// K.ellipse(O_vnb + (strichstaerke / 3), (versalien_hilfslinie_1 * 1.2), kreis_radius);
// K.ellipse(O_vnb + (O_schriftbild * 0.96) - (strichstaerke/2), H_linie , kreis_radius);
// K.ellipse(O_vnb + (O_schriftbild * 0.92), grundlinie , kreis_radius);
// K.ellipse(O_vnb + (strichstaerke/2) + (O_schriftbild * 0.3) , (versalien_hilfslinie_1 * 0.88), kreis_radius);

// L
let L_4_x1 = 2*O_vnb;
let L_4_y1 =  H_linie ;
let L_4_x2 = 2*O_vnb ;
let L_4_y2 = grundlinie ;
L.push();
L.beginShape(form_art);
L.strokeJoin(BEVEL);
L.strokeCap(PROJECT);
L.stroke(0);
L.fill(fuellfarbe);
L.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(L_4_x1, L_4_x2, t);
    let y = lerp(L_4_y1, L_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    L.vertex(x + xOffset, y + yOffset);
  }

L.endShape();
L.pop();
let L2_4_x1 = 2*O_vnb ;
let L2_4_y1 =  grundlinie -(strichstaerke/2) ;
let L2_4_x2 =O_schriftbild -(O_vnb/1.5);
let L2_4_y2 = grundlinie - (strichstaerke/2);
L.push();
L.beginShape(form_art);
L.strokeJoin(BEVEL);
L.strokeCap(PROJECT);
L.stroke(konturfarbe);
L.fill(fuellfarbe);
L.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(L2_4_x1, L2_4_x2, t);
    let y = lerp(L2_4_y1, L2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    L.vertex(x + xOffset, y + yOffset);
  }

L.endShape();
L.pop();
// M

// M.beginShape(QUADS);
// M.fill('red');
// M.noStroke();
// M.vertex(0, grundlinie);
// M.vertex(0, schriftgrad * 0.95);
// M.vertex(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
// M.vertex(O_schriftbild + (2 * O_vnb), grundlinie);
// M.endShape();
// M.beginShape();
// M.vertex(O_schriftbild + (2 * O_vnb) - (strichstaerke), H_linie);
// M.vertex(O_schriftbild + (2 * O_vnb) - (strichstaerke), grundlinie);
// M.endShape();
// N
// N.push();
// N.beginShape(form_art);
// N.strokeWeight(strichstaerke);
// N.strokeCap(PROJECT);
// N.strokeJoin(ROUND);
// N.vertex(O_vnb + (strichstaerke / 2), grundlinie);
// N.vertex(O_vnb + (strichstaerke / 2), H_linie);
// N.vertex(O_vnb + O_schriftbild - (strichstaerke / 2), grundlinie);
// N.vertex(O_vnb + O_schriftbild - (strichstaerke / 2), H_linie);
// N.endShape();
// N.pop();
// N.push();
// N.fill(buchstaben_hintergrund);
// N.noStroke();
// N.rect(0, 0, (2 * O_vnb) + O_schriftbild, H_linie);
// N.rect(0, grundlinie, (2 * O_vnb) + O_schriftbild, (schriftgrad * 0.95) - grundlinie);
// N.pop();
// P
// P.push();
// P.beginShape(form_art);
// P.strokeWeight(strichstaerke);
// P.strokeCap(SQUARE);
// P.vertex(O_vnb * 1.5 + (strichstaerke/2), H_linie);
// P.vertex(O_vnb * 1.5 + (strichstaerke/2), grundlinie);
// P.endShape();
// P.pop();
// P.push();
// P.strokeWeight(strichstaerke_waagerecht);
// P.beginShape(form_art);
// P.strokeCap(SQUARE);
// P.vertex(O_vnb * 1.5 + (strichstaerke_waagerecht/2), H_linie + (strichstaerke_waagerecht / 2));
// P.vertex(O_vnb + (O_schriftbild/1.5), H_linie + (strichstaerke_waagerecht /2));
// P.endShape();
// P.beginShape(form_art);
// P.strokeCap(SQUARE);
// P.vertex(O_vnb * 1.5 + (strichstaerke/2), (versalien_hilfslinie_1 * 1.07));
// P.vertex(O_vnb + (O_schriftbild/1.5), (versalien_hilfslinie_1 * 1.07));
// P.endShape();
// P.pop();

// Die Bézier-Kurve wurde mithilfe von ChatGPT 3.5 erstellt.
////////////////////////////////////////////////////////////////////////////////////
// P.push();
// P.strokeWeight(strichstaerke_waagerecht);
// P.strokeCap(SQUARE);
// P.noFill();
// P.beginShape(form_art);
// P.vertex(O_vnb + strichstaerke_waagerecht + (O_schriftbild / 2.2), H_linie + (strichstaerke_waagerecht / 2));
// Control points for bezier curve - adjust as needed for desired curvature
let controlX1 = O_vnb * 1.5 + strichstaerke + (O_schriftbild / 1.5) + 30;
let controlY1 = H_linie + (strichstaerke / 2) ;
let controlX2 = O_vnb * 1.5 + strichstaerke + (O_schriftbild / 1.5) + 20;
let controlY2 =(versalien_hilfslinie_1 * 1.07);
// P.bezierVertex(controlX1, controlY1, controlX2, controlY2, O_vnb + strichstaerke_waagerecht + (O_schriftbild / 2.2), (versalien_hilfslinie_1 * 1.07));
// P.endShape();
// P.pop();
/////////////////////////////////////////////////////////////////////////////////////
// zweite Kurve, um die Dicke der Bogenform steuern zu können
// P.push();
// P.strokeWeight(strichstaerke_waagerecht);
// P.strokeCap(SQUARE);
// P.noFill();
// P.beginShape(form_art);
// P.vertex(O_vnb + strichstaerke_waagerecht + (O_schriftbild / 2.8), H_linie + (strichstaerke_waagerecht / 2));
// Control points for bezier curve - adjust as needed for desired curvature
// let control2X1 = O_vnb * 1.5 + strichstaerke + (O_schriftbild / 1.5)+60 ;
// let control2Y1 = H_linie + (strichstaerke / 2) ;
// let control2X2 = O_vnb * 1.5 + strichstaerke + (O_schriftbild / 1.5) + 20;
// let control2Y2 =(versalien_hilfslinie_1 * 1.07);
// P.bezierVertex(control2X1, control2Y1, control2X2, control2Y2, O_vnb + strichstaerke_waagerecht + (O_schriftbild / 2.8), (versalien_hilfslinie_1 * 1.07));
// P.endShape();
// P.pop();


let P_4_x1 =O_vnb * 2 + (strichstaerke/2) ;
let P_4_y1 = H_linie + strichstaerke/2;
let P_4_x2 = O_vnb * 2 + (strichstaerke/2);
let P_4_y2 = grundlinie_ueberhang;
P.push();
P.beginShape(form_art);
P.strokeJoin(BEVEL);
P.strokeCap(PROJECT);
P.stroke(konturfarbe);
P.fill(fuellfarbe);
P.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(P_4_x1, P_4_x2, t);
    let y = lerp(P_4_y1, P_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    P.vertex(x + xOffset, y + yOffset);
  }

P.endShape();
P.pop();
// let P2_4_x1 =O_vnb * 1.5 + (strichstaerke/2) ;
// let P2_4_y1 = H_linie+ strichstaerke/2 ;
// let P2_4_x2 = O_vnb + (O_schriftbild/1.5);
// let P2_4_y2 =H_linie+ strichstaerke/2;
// P.push();
// P.beginShape(form_art);
// P.strokeJoin(BEVEL);
// P.strokeCap(PROJECT);
// P.stroke(0);
// P.fill(0);
// P.strokeWeight(strichstaerke_fein/2);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(P2_4_x1, P2_4_x2, t);
//     let y = lerp(P2_4_y1, P2_4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
//     P.vertex(x + xOffset, y + yOffset);
//   }

// P.endShape();
// P.pop();
// let P3_4_x1 = O_vnb * 1.5 + (strichstaerke / 2);
// let P3_4_y1 = versalien_hilfslinie_1 * 1.07;
// let P3_4_x2 = O_vnb + (O_schriftbild / 1.5);
// let P3_4_y2 = versalien_hilfslinie_1 * 1.07;

// P.push();
// P.beginShape(form_art);
// P.strokeJoin(BEVEL);
// P.strokeCap(PROJECT);
// P.stroke(0);
// P.fill(0);
// P.strokeWeight(strichstaerke_fein);

// for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(P3_4_x1, P3_4_x2, t);
//     let y = lerp(P3_4_y1, P3_4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
//     P.vertex(x + xOffset, y + yOffset);
// }

// P.endShape();
// P.pop();

///////// ChatGPT
let P4_4_x1 = O_vnb * 2 + (strichstaerke/2) ;
let P4_4_y1 = H_linie + (strichstaerke/2);
let P4_4_x2 =O_vnb * 2 + (strichstaerke/2) ;
let P4_4_y2 = versalien_hilfslinie_1 * 1.17 - (strichstaerke/2);

// Define the control points for the bezier curve
 let control2X1 = P4_4_x1 + 72;  // Adjust control points as needed
//let control2X1 = P4_4_x1 + 140;  // Adjust control points as needed
let control2Y1 = P4_4_y1 - 10;  // Example control point, adjust as needed
 let control2X2 = P4_4_x2 + 72;  // Adjust control points as needed
//let control2X2 = P4_4_x2 + 140;  // Adjust control points as needed
let control2Y2 = P4_4_y2 + 10;  // Example control point, adjust as needed

P.push();
P.strokeJoin(BEVEL);
P.strokeCap(PROJECT);
P.stroke(konturfarbe);
P.fill(fuellfarbe);
P.strokeWeight(strichstaerke_fein);
P.beginShape(form_art);
// Initialize previous points
let prevX = P4_4_x1;
let prevY = P4_4_y1;

for (let t = 0; t <= 1; t += schritt) {
    let x = bezierPoint(P4_4_x1, control2X1, control2X2, P4_4_x2, t);
    let y = bezierPoint(P4_4_y1, control2Y1, control2Y2, P4_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);

    let currentX = x + xOffset;
    let currentY = y + yOffset;

    if (t > 0) {
        //P.beginShape(form_art);
        P.vertex(prevX, prevY);
        P.vertex(currentX, currentY);
        //P.vertex(currentX + 1, currentY + 1); // Small triangle for the line segment
        //P.endShape();
    }

    prevX = currentX;
    prevY = currentY;
}
P.endShape();
P.pop();



/////////////////////////////////////////

// let S_4_x1 =   O_schriftbild-O_vnb ;
// let S_4_y1 = H_linie ;
// let S_4_x2 =  2*O_vnb ;
// let S_4_y2 = versalien_hilfslinie_1 - (O_versalhoehe * 0.33);
// S.push();
// S.beginShape(form_art);
// S.strokeJoin(BEVEL);
// S.strokeCap(PROJECT);
// S.stroke(0);
// S.fill(fuellfarbe);
// S.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(S_4_x1, S_4_x2, t);
//     let y = lerp(S_4_y1, S_4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
//     S.vertex(x + xOffset, y + yOffset);
//   }

// S.endShape();
// S.pop();

// S.push();
// S.noStroke();
// S.fill(fuellfarbe);
// // D.rect(0, 0, H_vnb, schriftgrad * 0.95);
// S.pop();
// let S2_4_x1 = 3*O_vnb;
// let S2_4_y1 = versalien_hilfslinie_1 - (O_versalhoehe * 0.33) ;
// let S2_4_x2 = O_schriftbild-O_vnb;
// let S2_4_y2 = grundlinie - (O_versalhoehe * 0.33);
// S.push();
// S.beginShape(form_art);
// S.strokeJoin(BEVEL);
// S.strokeCap(PROJECT);
// S.stroke(0);
// S.fill(fuellfarbe);
// S.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(S2_4_x1, S2_4_x2, t);
//     let y = lerp(S2_4_y1, S2_4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
//     S.vertex(x + xOffset, y + yOffset);
//   }

// S.endShape();
// S.pop();

// S.push();
// S.noStroke();
// S.fill(fuellfarbe);
// // D.rect(0, 0, H_vnb, schriftgrad * 0.95);
// S.pop();
// let S3_4_x1 = O_schriftbild-O_vnb ;
// let S3_4_y1 = grundlinie - (O_versalhoehe * 0.33) ;
// let S3_4_x2 =  2*O_vnb ;
// let S3_4_y2 = grundlinie;
// S.push();
// S.beginShape(form_art);
// S.strokeJoin(BEVEL);
// S.strokeCap(PROJECT);
// S.stroke(0);
// S.fill(fuellfarbe);
// S.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(S3_4_x1, S3_4_x2, t);
//     let y = lerp(S3_4_y1, S3_4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
//     S.vertex(x + xOffset, y + yOffset);
//   }

// S.endShape();
// S.pop();


let S_4_x1 = O_schriftbild-O_vnb ;
let S_4_y1 = H_linie;
let S_4_x2 =(O_schriftbild/2) ;
let S_4_y2 = versalien_hilfslinie_1;

// Define the control points for the bezier curve
 let controlSX1 = S_4_x1 - 30;  // Adjust control points as needed
//let control2X1 = P4_4_x1 + 140;  // Adjust control points as needed
let controlSY1 = S_4_y1 - 10;  // Example control point, adjust as needed
 let controlSX2 =  S_4_x2 - 30;  // Adjust control points as needed
//let control2X2 = P4_4_x2 + 140;  // Adjust control points as needed
let controlSY2 = S_4_y2 -20;  // Example control point, adjust as needed

S.push();
S.strokeJoin(BEVEL);
S.strokeCap(PROJECT);
S.stroke(konturfarbe);
S.fill(fuellfarbe);
S.strokeWeight(strichstaerke_fein);
S.beginShape(form_art);
// Initialize previous points
let prevSX = S_4_x1;
let prevSY = S_4_y1;

for (let t = 0; t <= 1; t += schritt) {
    let x = bezierPoint(S_4_x1, controlSX1, controlSX2, S_4_x2, t);
    let y = bezierPoint(S_4_y1, controlSY1, controlSY2, S_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);

    let currentX = x + xOffset;
    let currentY = y + yOffset;

    if (t > 0) {
        //P.beginShape(form_art);
        S.vertex(prevSX, prevSY);
        S.vertex(currentX, currentY);
        //P.vertex(currentX + 1, currentY + 1); // Small triangle for the line segment
        //P.endShape();
    }

    prevSX = currentX;
    prevSY = currentY;
}
S.endShape();
S.pop();

let S2_4_x1 =  (O_schriftbild/2) ;
let S2_4_y1 = versalien_hilfslinie_1;
let S2_4_x2 = O_vnb;
let S2_4_y2 = grundlinie-O_vnb;

// Define the control points for the bezier curve
 let controlS2X1 = S2_4_x1 + 50;  // Adjust control points as needed
//let control2X1 = P4_4_x1 + 140;  // Adjust control points as needed
let controlS2Y1 = S2_4_y1 + 5;  // Example control point, adjust as needed
 let controlS2X2 =  S2_4_x2 + 50;  // Adjust control points as needed
//let control2X2 = P4_4_x2 + 140;  // Adjust control points as needed
let controlS2Y2 = S2_4_y2 + 40;  // Example control point, adjust as needed

S.push();
S.strokeJoin(BEVEL);
S.strokeCap(PROJECT);
S.stroke(konturfarbe);
S.fill(fuellfarbe);
S.strokeWeight(strichstaerke_fein);
S.beginShape(form_art);
// Initialize previous points
let prevS2X = S_4_x1;
let prevS2Y = S_4_y1;

for (let t = 0; t <= 1; t += schritt) {
    let x = bezierPoint(S2_4_x1, controlS2X1, controlS2X2, S2_4_x2, t);
    let y = bezierPoint(S2_4_y1, controlS2Y1, controlS2Y2, S2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);

    let currentX = x + xOffset;
    let currentY = y + yOffset;

    if (t > 0) {
        //P.beginShape(form_art);
        S.vertex(prevS2X, prevS2Y);
        S.vertex(currentX, currentY);
        //P.vertex(currentX + 1, currentY + 1); // Small triangle for the line segment
        //P.endShape();
    }

    prevS2X = currentX;
    prevS2Y = currentY;
}
S.endShape();
S.pop();



// Punkteskelett
// P.strokeWeight(1);
// P.ellipse(O_vnb * 1.5 + (strichstaerke/2), H_linie, kreis_radius);
// P.ellipse(O_vnb * 1.5 + (strichstaerke/2), H_linie + (strichstaerke_waagerecht / 2), kreis_radius);
// P.ellipse(O_vnb * 1.5 + (strichstaerke/2), grundlinie, kreis_radius);
// P.ellipse(O_vnb * 1.5 + (strichstaerke/2), (versalien_hilfslinie_1 * 1.07), kreis_radius);
// P.ellipse(O_vnb + strichstaerke_waagerecht + (O_schriftbild / 2.8), (versalien_hilfslinie_1 * 1.07), kreis_radius);
// P.ellipse(O_vnb + strichstaerke_waagerecht + (O_schriftbild / 2.8),H_linie + (strichstaerke_waagerecht / 2), kreis_radius);

// Q
// Gemäss der Erstellung des O
// Q.beginShape(form_art);
// Q.fill('black');

// // Outer ellipse
// Q.vertex(centerX + outerRadiusX, centerY);
// Q.bezierVertex(centerX + outerRadiusX, centerY - oy, 
//                centerX + ox, centerY - outerRadiusY, 
//                centerX, centerY - outerRadiusY);
// Q.bezierVertex(centerX - ox, centerY - outerRadiusY, 
//                centerX - outerRadiusX, centerY - oy, 
//                centerX - outerRadiusX, centerY);
// Q.bezierVertex(centerX - outerRadiusX, centerY + oy, 
//                centerX - ox, centerY + outerRadiusY, 
//                centerX, centerY + outerRadiusY);
// Q.bezierVertex(centerX + ox, centerY + outerRadiusY, 
//                centerX + outerRadiusX, centerY + oy, 
//                centerX + outerRadiusX, centerY);

// Q.beginContour();

// // Inner ellipse
// Q.vertex(centerX + innerRadiusX, centerY);
// Q.bezierVertex(centerX + innerRadiusX, centerY + iy, 
//                centerX + ix, centerY + innerRadiusY, 
//                centerX, centerY + innerRadiusY);
// Q.bezierVertex(centerX - ix, centerY + innerRadiusY, 
//                centerX - innerRadiusX, centerY + iy, 
//                centerX - innerRadiusX, centerY);
// Q.bezierVertex(centerX - innerRadiusX, centerY - iy, 
//                centerX - ix, centerY - innerRadiusY, 
//                centerX, centerY - innerRadiusY);
// Q.bezierVertex(centerX + ix, centerY - innerRadiusY, 
//                centerX + innerRadiusX, centerY - iy, 
//                centerX + innerRadiusX, centerY);

// Q.endContour();
// Q.endShape(CLOSE);
// Q.push();
// Q.beginShape(form_art);
// Q.strokeWeight(strichstaerke_waagerecht);
// Q.strokeCap(SQUARE);
// Q.vertex(O_vnb + (O_schriftbild * 0.66), grundlinie - (O_versalhoehe * 0.33));
// Q.vertex(O_vnb + O_schriftbild - O_vnb, grundlinie);
// Q.endShape();
// Q.pop();
// R
// R.push();
// R.strokeCap(SQUARE);
// R.beginShape(form_art);
// R.strokeWeight(strichstaerke);
// R.vertex(O_vnb, H_linie);
// R.vertex(O_vnb, grundlinie);
// R.endShape();
// R.pop();
// R.push();
// R.strokeWeight(strichstaerke);
// R.beginShape(form_art);
// R.vertex(O_vnb , H_linie + (strichstaerke / 2));
// R.vertex(O_vnb + strichstaerke + (O_schriftbild /3), H_linie + (strichstaerke /2));
// R.endShape();
// R.beginShape(form_art);
// R.vertex(O_vnb , versalien_hilfslinie_1);
// R.vertex(O_vnb + strichstaerke + (O_schriftbild /3), versalien_hilfslinie_1);
// R.endShape();
// R.beginShape(form_art);
// R.strokeCap(PROJECT);
// R.vertex(O_vnb + (strichstaerke / 2) , versalien_hilfslinie_1 + (strichstaerke / 2));
// R.vertex(O_vnb + O_schriftbild - (strichstaerke/2), grundlinie);
// R.endShape();
// R.pop();
// // Rundung gemäss demselben Prinzip wie beim P 
// R.push();
// R.strokeWeight(strichstaerke);
// R.strokeCap(SQUARE);
// R.noFill();
// R.beginShape(form_art);
// R.vertex(O_vnb + strichstaerke + (O_schriftbild / 3), H_linie + (strichstaerke / 2));
// let R_controlX1 = O_vnb + strichstaerke + (O_schriftbild / 2) + 30;
// let R_controlY1 = H_linie + (strichstaerke / 2) ;
// let R_controlX2 = O_vnb + strichstaerke + (O_schriftbild / 2) + 20;
// let R_controlY2 = versalien_hilfslinie_1;
// R.bezierVertex(R_controlX1, R_controlY1, R_controlX2, R_controlY2, O_vnb + strichstaerke + (O_schriftbild / 3), versalien_hilfslinie_1);
// R.endShape();
// R.pop();
// R.push();
// R.fill('white');
// R.noStroke();
// R.rect(0, grundlinie, O_schriftbild + O_vnb + O_vnb, (schriftgrad * 0.95) - grundlinie);
// R.pop();
// S
// S.push();
// S.strokeWeight(strichstaerke);
// S.strokeCap(SQUARE);
// S.noFill();
// S.beginShape();
// S.vertex(O_vnb , mittellinie);
// let S_controlX1 = O_vnb + (strichstaerke/2) + (schriftgrad * 0.35);
// let S_controlY1 = mittellinie;
// let S_controlX2 = O_vnb + (strichstaerke/2)+ (schriftgrad * 0.35);
// let S_controlY2 = grundlinie + (schriftgrad * 0.1);
// S.bezierVertex(S_controlX1, S_controlY1, S_controlX2, S_controlY2, O_vnb , grundlinie );
// S.endShape();
// S.pop();
// S.push();
// S.strokeWeight(strichstaerke);
// S.strokeCap(SQUARE);
// S.noFill();
// S.beginShape();
// S.vertex(Versal_vbn_augenmass + O_schriftbild , H_linie_ueberhang);
// let S2_controlX1 = Versal_vbn_augenmass + O_schriftbild - (schriftgrad * 0.35);
// let S2_controlY1 = H_linie_ueberhang - (schriftgrad * 0.1);
// let S2_controlX2 = Versal_vbn_augenmass + O_schriftbild- (schriftgrad * 0.35);
// let S2_controlY2 = mittellinie;
// S.bezierVertex(S2_controlX1, S2_controlY1, S2_controlX2, S2_controlY2,Versal_vbn_augenmass + O_schriftbild , mittellinie );
// S.endShape();
// S.pop();



// S.push();
// S.strokeWeight(strichstaerke);
// S.strokeCap(ROUND);
// S.noFill();

// // Top half of the "S"
// S.beginShape(form_art);
// S.vertex(Versal_vbn_augenmass + O_schriftbild, H_linie_ueberhang); // Start point of S

// // Control points for the top half of the "S"
// let S_controlX1 = Versal_vbn_augenmass + O_schriftbild - (schriftgrad * 0.35);
// let S_controlY1 = H_linie_ueberhang;
// let S_controlX2 = Versal_vbn_augenmass + O_schriftbild - (schriftgrad * 0.35);
// let S_controlY2 = mittellinie_ueberhang;
// let S_endX1 = Versal_vbn_augenmass + (O_schriftbild / 2);
// let S_endY1 = mittellinie_ueberhang + 30;

// S.bezierVertex(S_controlX1, S_controlY1, S_controlX2, S_controlY2, S_endX1, S_endY1);
// S.endShape();

// // Bottom half of the "S"
// S.beginShape(form_art);
// S.vertex(S_endX1, S_endY1); // Start from the end of the top half

// // Control points for the bottom half of the "S"
// let S_controlX3 = O_vnb + (O_schriftbild / 2) + (schriftgrad * 0.2);
// let S_controlY3 = mittellinie_ueberhang + (schriftgrad* 0.2);
// let S_controlX4 = O_vnb + (O_schriftbild / 2) + (schriftgrad * 0.2);
// let S_controlY4 = grundlinie + (schriftgrad*0.05);
// let S_endX2 = Versal_vbn_augenmass ;
// let S_endY2 = grundlinie;

// S.bezierVertex(S_controlX3, S_controlY3, S_controlX4, S_controlY4, S_endX2, S_endY2);
// S.endShape();

// S.pop();
// T
// T.beginShape(form_art);
// T.strokeWeight(strichstaerke);
// T.strokeCap(SQUARE);
// T.vertex((O_schriftbild + (2 * Versal_vbn_minimal))/2, H_linie+(strichstaerke/2));
// T.vertex((O_schriftbild + (2 * Versal_vbn_minimal))/2, grundlinie);
// T.endShape();
// T.beginShape(form_art);
// T.strokeWeight(strichstaerke_waagerecht);
// T.vertex(Versal_vbn_minimal, H_linie + (strichstaerke/2));
// T.vertex(Versal_vbn_minimal + O_schriftbild, H_linie + (strichstaerke/2));
// T.endShape();
// // U
// U.push();
// U.beginShape(form_art);
// U.strokeWeight(strichstaerke);
// U.strokeCap(SQUARE);
// U.vertex(O_schriftbild + O_vnb, H_linie);
// U.vertex(O_schriftbild + O_vnb, grundlinie);
// U.endShape();
// U.beginShape(form_art);
// U.vertex(O_vnb, H_linie);
// U.vertex(O_vnb, H_linie + (O_versalhoehe * 0.66));
// U.endShape();
// U.pop();


// let startX = O_vnb;
// let startY = H_linie + (O_versalhoehe * 0.66);
// let endX = O_vnb + O_schriftbild;
// let endY = H_linie + (O_versalhoehe * 0.66);
// let U_controlX1 = O_vnb + (O_schriftbild / 4) - 38;
// let U_controlY1 = grundlinie;
// let U_controlX2 = O_vnb + (3 * O_schriftbild / 4) -10;
// let U_controlY2 = grundlinie +38;

// U.push();
// U.strokeWeight(strichstaerke);
// U.strokeCap(SQUARE);


// U.beginShape(form_art);
// U.vertex(O_schriftbild + O_vnb, H_linie);
// U.vertex(O_schriftbild + O_vnb, grundlinie);
// U.endShape();
// U.beginShape(form_art);
// U.vertex(O_vnb, H_linie);
// U.vertex(O_vnb, H_linie + (O_versalhoehe * 0.66));
// U.endShape();


// U.beginShape(form_art);
// U.vertex(startX, startY);
// U.bezierVertex(U_controlX1, U_controlY1, U_controlX2, U_controlY2, endX, endY);
// U.endShape();
// U.pop();
// V
let V_3_x1 = O_vnb;
let V_3_y1 =  H_linie;
let V_3_x2 = O_vnb+ (O_schriftbild/2);
let V_3_y2 = grundlinie ;
V.push();
V.beginShape(form_art);
V.strokeJoin(BEVEL);
V.strokeCap(ROUND);
V.stroke(konturfarbe);
V.fill(fuellfarbe);
V.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(V_3_x1, V_3_x2, t);
    let y = lerp(V_3_y1, V_3_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    V.vertex(x + xOffset, y + yOffset);
  }

V.endShape();
V.pop();
let V2_3_x1 = O_vnb+O_schriftbild;
let V2_3_y1 =  H_linie;
let V2_3_x2 = O_vnb+ (O_schriftbild/2);
let V2_3_y2 = grundlinie ;
V.push();
V.beginShape(form_art);
V.strokeJoin(BEVEL);
V.strokeCap(ROUND);
V.stroke(konturfarbe);
V.fill(fuellfarbe);
V.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(V2_3_x1, V2_3_x2, t);
    let y = lerp(V2_3_y1, V2_3_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    V.vertex(x + xOffset, y + yOffset);
  }

V.endShape();
V.pop();

// V.beginShape(form_art);
// V.stroke(0);
// V.strokeWeight(strichstaerke);
// V.strokeCap(PROJECT);
// V.strokeJoin(BEVEL);
// V.vertex(Versal_vbn_minimal + (strichstaerke/2), H_linie);
// V.vertex((O_schriftbild + (2 * Versal_vbn_minimal))/2, grundlinie);
// V.vertex(Versal_vbn_minimal + O_schriftbild  -(strichstaerke/2), H_linie);
// V.endShape();
// V.beginShape(form_art);
// V.fill('white');
// V.noStroke();
// V.vertex(0, 0);
// V.vertex(0, H_linie);
// V.vertex(O_schriftbild + (2 * O_vnb), H_linie);
// V.vertex(O_schriftbild + (2 * O_vnb), 0);
// V.vertex(0, 0);
// V.endShape();
// V.beginShape(form_art);
// V.vertex(0,grundlinie);
// V.vertex(0, schriftgrad * 0.95);
// V.vertex(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
// V.vertex(O_schriftbild + (2 * O_vnb), grundlinie);
// V.endShape();
// W
let WD_x1 = O_vnb;
let WD_y1 =  H_linie ;
let WD_x2 =((O_vnb + (strichstaerke / 2)) + (((2 * O_vnb) + O_schriftbild) / 2)) / 2;
let WD_y2 = grundlinie ;
W.push();
W.beginShape(form_art);
W.strokeJoin(BEVEL);
W.strokeCap(PROJECT);
W.stroke(konturfarbe);
W.fill(fuellfarbe);
W.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(WD_x1, WD_x2, t);
    let y = lerp(WD_y1, WD_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    W.vertex(x + xOffset, y + yOffset);
  }

W.endShape();
W.pop();

// Diagonale Linie 2
let WD_2_x1 = ((O_vnb + (strichstaerke / 2)) + (((2 * O_vnb) + O_schriftbild) / 2)) / 2;
let WD_2_y1 =  grundlinie ;
let WD_2_x2 = (((2 * O_vnb) + O_schriftbild) / 2);
let WD_2_y2 = mittellinie ;
W.push();
W.beginShape(form_art);
W.strokeJoin(BEVEL);
W.strokeCap(PROJECT);
W.stroke(konturfarbe);
W.fill(fuellfarbe);
W.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) { //0.5
    let x = lerp(WD_2_x1, WD_2_x2, t);
    let y = lerp(WD_2_y1, WD_2_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    W.vertex(x + xOffset, y + yOffset);
  }

W.endShape();
W.pop();

// Diagonale Linie 3
let WD_3_x1 = (((2 * O_vnb) + O_schriftbild) / 2);
let WD_3_y1 =  mittellinie;
let WD_3_x2 = (((2 * O_vnb) + (O_schriftbild) - O_vnb - (strichstaerke / 2)) + (((2 * O_vnb) + O_schriftbild) / 2)) / 2;
let WD_3_y2 = grundlinie ;
W.push();
W.beginShape(form_art);
W.strokeJoin(BEVEL);
W.strokeCap(ROUND);
W.stroke(konturfarbe);
W.fill(fuellfarbe);
W.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(WD_3_x1, WD_3_x2, t);
    let y = lerp(WD_3_y1, WD_3_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    W.vertex(x + xOffset, y + yOffset);
  }

W.endShape();
W.pop();

// Diagonale Linie 4
let WD_4_x1 = (((2 * O_vnb) + (O_schriftbild) - O_vnb - (strichstaerke / 2)) + (((2 * O_vnb) + O_schriftbild) / 2)) / 2;
let WD_4_y1 =  grundlinie ;
let WD_4_x2 = (O_schriftbild) ;
let WD_4_y2 = H_linie ;
W.push();
W.beginShape(form_art);
W.strokeJoin(BEVEL);
W.strokeCap(PROJECT);
W.stroke(konturfarbe);
W.fill(fuellfarbe);
W.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(WD_4_x1, WD_4_x2, t);
    let y = lerp(WD_4_y1, WD_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    W.vertex(x + xOffset, y + yOffset);
  }

W.endShape();
W.pop();

// let G_x1 = O_schriftbild-O_vnb ;
// let G_y1 = H_linie+((versalien_hilfslinie_1-H_linie)/2);
// let G_x2 = (O_schriftbild/2)+O_vnb;
// let G_y2 =  H_linie_ueberhang;
// G.push();
// G.beginShape(form_art);
// G.strokeJoin(BEVEL);
// G.strokeCap(ROUND);
// G.stroke(konturfarbe);
// G.fill(fuellfarbe);
// G.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(G_x1, G_x2, t);
//     let y = lerp(G_y1, G_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
//     G.vertex(x + xOffset, y + yOffset);
//   }

// G.endShape();
// G.pop();
// let G2_x1 = (O_schriftbild/2)+O_vnb;
// let G2_y1 = H_linie_ueberhang;
// let G2_x2 = O_vnb/2;
// let G2_y2 =  versalien_hilfslinie_1;
// G.push();
// G.beginShape(form_art);
// G.strokeJoin(BEVEL);
// G.strokeCap(ROUND);
// G.stroke(0);
// G.fill(fuellfarbe);
// G.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(G2_x1, G2_x2, t);
//     let y = lerp(G2_y1, G2_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -5, 40);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -5, 40);  // Different noise offset for y to make the wiggle more irregular
    
//     G.vertex(x + xOffset, y + yOffset);
//   }

// G.endShape();
// G.pop();
// let G3_x1 = O_vnb/2;
// let G3_y1 = versalien_hilfslinie_1;
// let G3_x2 = (O_schriftbild/2)+O_vnb;
// let G3_y2 =  grundlinie_ueberhang;
// G.push();
// G.beginShape(form_art);
// G.strokeJoin(BEVEL);
// G.strokeCap(ROUND);
// G.stroke(0);
// G.fill(fuellfarbe);
// G.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(G3_x1, G3_x2, t);
//     let y = lerp(G3_y1, G3_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -5, 40);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -5, 40);  // Different noise offset for y to make the wiggle more irregular
    
//     G.vertex(x + xOffset, y + yOffset);
//   }

// G.endShape();
let G4_x1 =(O_schriftbild);
let G4_y1 = grundlinie_ueberhang;
let G4_x2 = O_schriftbild;
let G4_y2 =  versalien_hilfslinie_2;
G.push();
G.beginShape(form_art);
G.strokeJoin(BEVEL);
G.strokeCap(ROUND);
G.stroke(0);
G.fill(fuellfarbe);
G.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(G4_x1, G4_x2, t);
    let y = lerp(G4_y1, G4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    G.vertex(x + xOffset, y + yOffset);
  }

G.endShape();
G.pop();
let G5_x1 =O_schriftbild;
let G5_y1 = versalien_hilfslinie_2;
let G5_x2 = 5*O_vnb;
let G5_y2 =  versalien_hilfslinie_2;
G.push();
G.beginShape(form_art);
G.strokeJoin(BEVEL);
G.strokeCap(ROUND);
G.stroke(0);
G.fill(fuellfarbe);
G.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(G5_x1, G5_x2, t);
    let y = lerp(G5_y1, G5_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    G.vertex(x + xOffset, y + yOffset);
  }

G.endShape();
G.pop();

let G_4_x1 = (O_schriftbild);
let G_4_y1 = H_linie + (strichstaerke/2);
let G_4_x2 =(O_schriftbild);
let G_4_y2 = grundlinie_ueberhang;

// Define the control points for the bezier curve
 let controlGX1 = G_4_x1  - 70;  // Adjust control points as needed
//let control2X1 = P4_4_x1 + 140;  // Adjust control points as needed
let controlGY1 = G_4_y1 - 40;  // Example control point, adjust as needed
 let controlGX2 = G_4_x2 - 80;  // Adjust control points as needed
//let control2X2 = P4_4_x2 + 140;  // Adjust control points as needed
let controlGY2 = G_4_y2 + 40;  // Example control point, adjust as needed

G.push();
G.strokeJoin(BEVEL);
G.strokeCap(PROJECT);
G.stroke(0);
G.fill(fuellfarbe);
G.strokeWeight(strichstaerke_fein);
G.beginShape(form_art);
// Initialize previous points
let prevGX = G_4_x1;
let prevGY = G_4_y1;

for (let t = 0; t <= 1; t += schritt) {
    let x = bezierPoint(G_4_x1, controlGX1, controlGX2, G_4_x2, t);
    let y = bezierPoint(G_4_y1, controlGY1, controlGY2, G_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);

    let currentX = x + xOffset;
    let currentY = y + yOffset;

    if (t > 0) {
        //P.beginShape(form_art);
        G.vertex(prevGX, prevGY);
        G.vertex(currentX, currentY);
        //P.vertex(currentX + 1, currentY + 1); // Small triangle for the line segment
        //P.endShape();
    }

    prevGX = currentX;
    prevGY = currentY;
}
G.endShape();
G.pop();

// X
X.push();
X.beginShape(form_art);
X.strokeCap(PROJECT);
X.strokeWeight(strichstaerke);
X.vertex(Versal_vbn_minimal + (strichstaerke / 2) + Versal_vbn_minimal, H_linie);
X.vertex(Versal_vbn_minimal + O_schriftbild - (strichstaerke / 2) -  Versal_vbn_minimal, grundlinie);
X.endShape();
X.beginShape(form_art);
X.vertex(Versal_vbn_minimal + O_schriftbild - (strichstaerke / 2) - Versal_vbn_minimal, H_linie);
X.vertex(Versal_vbn_minimal + (strichstaerke / 2) +  Versal_vbn_minimal, grundlinie);
X.endShape();
X.pop();
X.push();
X.fill(buchstaben_hintergrund);
X.noStroke();
X.rect(0, 0, (2 * Versal_vbn_minimal) + O_schriftbild, H_linie);
X.rect(0, grundlinie, (2 * Versal_vbn_minimal) + O_schriftbild, (schriftgrad * 0.95) - grundlinie);
X.pop();
// Y 4,minimal
Y.push();
Y.beginShape(form_art);
Y.strokeWeight(strichstaerke);
Y.strokeCap(PROJECT);
Y.vertex(Versal_vbn_minimal + (strichstaerke / 2) + Versal_vbn_minimal, H_linie);
Y.vertex(Versal_vbn_minimal + (O_schriftbild / 2) , versalien_hilfslinie_1);
Y.vertex(Versal_vbn_minimal + O_schriftbild - Versal_vbn_minimal - (strichstaerke / 2), H_linie);
Y.endShape();
Y.beginShape(form_art);
Y.vertex(Versal_vbn_minimal + (O_schriftbild / 2), versalien_hilfslinie_1);
Y.vertex(Versal_vbn_minimal + (O_schriftbild / 2), grundlinie);
Y.endShape();
Y.pop();
Y.push();
Y.fill(fuellfarbe);
Y.noStroke();
Y.rect(0, 0, (2 * Versal_vbn_minimal) + O_schriftbild, H_linie);
Y.rect(0, grundlinie, (2 * Versal_vbn_minimal) + O_schriftbild, (schriftgrad * 0.95) - grundlinie);
Y.pop();


let Z_x1 = 2*O_vnb;
let Z_y1 =  H_linie + (strichstaerke/2);
let Z_x2 = O_schriftbild;
let Z_y2 =  H_linie + (strichstaerke/2) ;
Z.push();
Z.beginShape(form_art);
Z.strokeJoin(BEVEL);
Z.strokeCap(ROUND);
Z.stroke(konturfarbe);
//W.fill(0);
Z.fill(fuellfarbe);
Z.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(Z_x1, Z_x2, t);
    let y = lerp(Z_y1, Z_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    Z.vertex(x + xOffset, y + yOffset);
  }

Z.endShape();
Z.pop();

let Z2_x1 = 2*O_vnb;
let Z2_y1 = grundlinie- (strichstaerke/2);
let Z2_x2 = O_schriftbild;
let Z2_y2 =  grundlinie- (strichstaerke/2) ;
Z.push();
Z.beginShape(form_art);
Z.strokeJoin(BEVEL);
Z.strokeCap(ROUND);
Z.stroke(konturfarbe);
Z.fill(fuellfarbe);
//W.fill(0);
Z.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(Z2_x1, Z2_x2, t);
    let y = lerp(Z2_y1, Z2_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    Z.vertex(x + xOffset, y + yOffset);
  }

Z.endShape();
Z.pop();

Z.push();

// Diagonale Linie
let ZD_x1 =O_schriftbild;
let ZD_y1 =  H_linie ;
let ZD_x2 = 2*O_vnb;
let ZD_y2 = grundlinie ;
Z.push();

//let totalDist = dist(ZD_x1, ZD_y1, ZD_x2, ZD_y2);
  
Z.beginShape(form_art);
Z.stroke(konturfarbe);
Z.strokeWeight(strichstaerke_fein);
Z.strokeCap(ROUND);
Z.strokeJoin(BEVEL);
Z.fill(fuellfarbe);
// Für die for-Schleife  wurde ChatGPT 3.5 zu Hilfe genommen.
  // Step through the line in small increments
  for (let t = 0; t <= 1; t += schritt) {
    // Linear interpolation between the start and end points
    let x = lerp(ZD_x1, ZD_x2, t);
    let y = lerp(ZD_y1, ZD_y2, t);
    
    // Apply noise to x and y coordinates
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    Z.vertex(x + xOffset, y + yOffset);
  }
//////////////////////////////////

Z.endShape();
Z.pop();

let R_x1 = 2*O_vnb ;
let R_y1 = H_linie ;
let R_x2 =  2*O_vnb;
let R_y2 = grundlinie;
R.push();
R.beginShape(form_art);
R.strokeJoin(BEVEL);
R.strokeCap(PROJECT);
R.stroke(konturfarbe);
R.fill(fuellfarbe);
R.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(R_x1, R_x2, t);
    let y = lerp(R_y1, R_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    R.vertex(x + xOffset, y + yOffset);
  }

R.endShape();
R.pop();
let R2_x1 = 2*O_vnb ;
let R2_y1 = versalien_hilfslinie_1;
let R2_x2 =  O_schriftbild-O_vnb;
let R2_y2 = grundlinie;
R.push();
R.beginShape(form_art);
R.strokeJoin(BEVEL);
R.strokeCap(PROJECT);
R.stroke(konturfarbe);
R.fill(fuellfarbe);
R.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(R2_x1, R2_x2, t);
    let y = lerp(R2_y1, R2_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    R.vertex(x + xOffset, y + yOffset);
  }

R.endShape();
// R.pop();
// let R3_x1 = O_vnb ;
// let R3_y1 = H_linie;
// let R3_x2 =  O_schriftbild-O_vnb;
// let R3_y2 = H_linie + ((versalien_hilfslinie_1 - H_linie)/2);
// R.push();
// R.beginShape(form_art);
// R.strokeJoin(BEVEL);
// R.strokeCap(PROJECT);
// R.stroke(konturfarbe);
// R.fill(fuellfarbe);
// R.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(R3_x1, R3_x2, t);
//     let y = lerp(R3_y1, R3_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
//     R.vertex(x + xOffset, y + yOffset);
//   }

// R.endShape();
// R.pop();
// let R4_x1 = O_schriftbild-O_vnb;
// let R4_y1 = H_linie + ((versalien_hilfslinie_1 - H_linie)/2);
// let R4_x2 =  O_vnb;
// let R4_y2 = versalien_hilfslinie_1;
// R.push();
// R.beginShape(form_art);
// R.strokeJoin(BEVEL);
// R.strokeCap(PROJECT);
// R.stroke(konturfarbe);
// R.fill(fuellfarbe);
// R.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(R4_x1, R4_x2, t);
//     let y = lerp(R4_y1, R4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
//     R.vertex(x + xOffset, y + yOffset);
//   }

// R.endShape();
// R.pop();
let R4_4_x1 = 2*O_vnb  ;
let R4_4_y1 = H_linie + (strichstaerke/2);
let R4_4_x2 =2*O_vnb  ;
let R4_4_y2 = versalien_hilfslinie_1;

// Define the control points for the bezier curve
 let controlRX1 = R4_4_x1 + 68;  // Adjust control points as needed
//let control2X1 = P4_4_x1 + 140;  // Adjust control points as needed
let controlRY1 = R4_4_y1 - 10;  // Example control point, adjust as needed
 let controlRX2 = R4_4_x2 + 68;  // Adjust control points as needed
//let control2X2 = P4_4_x2 + 140;  // Adjust control points as needed
let controlRY2 = R4_4_y2 + 10;  // Example control point, adjust as needed

R.push();
R.strokeJoin(BEVEL);
R.strokeCap(PROJECT);
R.stroke(konturfarbe);
R.fill(fuellfarbe);
R.strokeWeight(strichstaerke_fein);
R.beginShape(form_art);
// Initialize previous points
let prevRX = P4_4_x1;
let prevRY = P4_4_y1;

for (let t = 0; t <= 1; t += schritt) {
    let x = bezierPoint(R4_4_x1, controlRX1, controlRX2, R4_4_x2, t);
    let y = bezierPoint(R4_4_y1, controlRY1, controlRY2, R4_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);

    let currentX = x + xOffset;
    let currentY = y + yOffset;

    if (t > 0) {
        //P.beginShape(form_art);
        R.vertex(prevRX, prevRY);
        R.vertex(currentX, currentY);
        //P.vertex(currentX + 1, currentY + 1); // Small triangle for the line segment
        //P.endShape();
    }

    prevRX = currentX;
    prevRY = currentY;
}
R.endShape();
R.pop();


// let O_x1 = 2*O_vnb;
// let O_y1 =  mittellinie ;
// let O_x2 = O_vnb +(O_schriftbild/2);
// let O_y2 = grundlinie_ueberhang ;
// O.push();
// O.beginShape(form_art);
// O.strokeJoin(BEVEL);
// O.strokeCap(PROJECT);
// O.stroke(konturfarbe);
// O.fill(fuellfarbe);
// O.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(O_x1, O_x2, t);
//     let y = lerp(O_y1, O_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
//     O.vertex(x + xOffset, y + yOffset);
//   }

// O.endShape();
// O.pop();
// let O2_x1 = O_vnb +(O_schriftbild/2);
// let O2_y1 =  grundlinie_ueberhang ;
// let O2_x2 = O_schriftbild;
// let O2_y2 = mittellinie ;
// O.push();
// O.beginShape(form_art);
// O.strokeJoin(BEVEL);
// O.strokeCap(PROJECT);
// O.stroke(konturfarbe);
// O.fill(fuellfarbe);
// O.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(O2_x1, O2_x2, t);
//     let y = lerp(O2_y1, O2_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
//     O.vertex(x + xOffset, y + yOffset);
//   }

// O.endShape();
// O.pop();
// let O3_x1 = O_schriftbild;
// let O3_y1 =  mittellinie ;
// let O3_x2 = O_vnb +(O_schriftbild/2);
// let O3_y2 = H_linie_ueberhang ;
// O.push();
// O.beginShape(form_art);
// O.strokeJoin(BEVEL);
// O.strokeCap(PROJECT);
// O.stroke(konturfarbe);
// O.fill(fuellfarbe);
// O.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(O3_x1, O3_x2, t);
//     let y = lerp(O3_y1, O3_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
//     O.vertex(x + xOffset, y + yOffset);
//   }

// O.endShape();
// O.pop();
// let O4_x1 = O_vnb +(O_schriftbild/2);
// let O4_y1 =  H_linie_ueberhang ;
// let O4_x2 = 2*O_vnb;
// let O4_y2 = mittellinie ;
// O.push();
// O.beginShape(form_art);
// O.strokeJoin(BEVEL);
// O.strokeCap(PROJECT);
// O.stroke(konturfarbe);
// O.fill(fuellfarbe);
// O.strokeWeight(strichstaerke_fein);

//   for (let t = 0; t <= 1; t += schritt) {
//     let x = lerp(O4_x1, O4_x2, t);
//     let y = lerp(O4_y1, O4_y2, t);
//     let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
//     let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
//     O.vertex(x + xOffset, y + yOffset);
//   }

// O.endShape();
// O.pop();
let O4_4_x1 = O_vnb + (O_schriftbild/2) ;
let O4_4_y1 = H_linie + (strichstaerke/2);
let O4_4_x2 =O_vnb +(O_schriftbild/2) ;
let O4_4_y2 =grundlinie;

// Define the control points for the bezier curve
 let controlOX1 = O4_4_x1 + 45;  // Adjust control points as needed
//let control2X1 = P4_4_x1 + 140;  // Adjust control points as needed
let controlOY1 = O4_4_y1 - 0;  // Example control point, adjust as needed
 let controlOX2 = O4_4_x2 + 45;  // Adjust control points as needed
//let control2X2 = P4_4_x2 + 140;  // Adjust control points as needed
let controlOY2 = O4_4_y2 + 0;  // Example control point, adjust as needed

O.push();
O.strokeJoin(BEVEL);
O.strokeCap(PROJECT);
O.stroke(konturfarbe);
O.fill(fuellfarbe);
O.strokeWeight(strichstaerke_fein);
O.beginShape(form_art);
// Initialize previous points
let prevOX = O4_4_x1;
let prevOY = O4_4_y1;

for (let t = 0; t <= 1; t += schritt) {
    let x = bezierPoint(O4_4_x1, controlOX1, controlOX2, O4_4_x2, t);
    let y = bezierPoint(O4_4_y1, controlOY1, controlOY2, O4_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);

    let currentOX = x + xOffset;
    let currentOY = y + yOffset;

    if (t > 0) {
        //P.beginShape(form_art);
        O.vertex(prevOX, prevOY);
        O.vertex(currentOX, currentOY);
        //P.vertex(currentX + 1, currentY + 1); // Small triangle for the line segment
        //P.endShape();
    }

    prevOX = currentOX;
    prevOY = currentOY;
}
O.endShape();
O.pop();

let O24_4_x1 = O_vnb + (O_schriftbild/2) ;
let O24_4_y1 = H_linie + (strichstaerke/2);
let O24_4_x2 =O_vnb +(O_schriftbild/2) ;
let O24_4_y2 =grundlinie;

// Define the control points for the bezier curve
 let controlO2X1 = O24_4_x1 - 45;  // Adjust control points as needed
//let control2X1 = P4_4_x1 + 140;  // Adjust control points as needed
let controlO2Y1 = O24_4_y1 - 0;  // Example control point, adjust as needed
 let controlO2X2 = O24_4_x2 - 45;  // Adjust control points as needed
//let control2X2 = P4_4_x2 + 140;  // Adjust control points as needed
let controlO2Y2 = O24_4_y2 + 0;  // Example control point, adjust as needed

O.push();
O.strokeJoin(BEVEL);
O.strokeCap(PROJECT);
O.stroke(konturfarbe);
O.fill(fuellfarbe);
O.strokeWeight(strichstaerke_fein);
O.beginShape(form_art);
// Initialize previous points
let prevO2X = O24_4_x1;
let prevO2Y = O24_4_y1;

for (let t = 0; t <= 1; t += schritt) {
    let x = bezierPoint(O24_4_x1, controlO2X1, controlO2X2, O24_4_x2, t);
    let y = bezierPoint(O24_4_y1, controlO2Y1, controlO2Y2, O24_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);

    let currentO2X = x + xOffset;
    let currentO2Y = y + yOffset;

    if (t > 0) {
        //P.beginShape(form_art);
        O.vertex(prevO2X, prevO2Y);
        O.vertex(currentO2X, currentO2Y);
        //P.vertex(currentX + 1, currentY + 1); // Small triangle for the line segment
        //P.endShape();
    }

    prevO2X = currentO2X;
    prevO2Y = currentO2Y;
}
O.endShape();
O.pop();

let A_x1 = 1.5*O_vnb;
let A_y1 = grundlinie;
let A_x2 = O_vnb+(O_schriftbild/2);
let A_y2 = H_linie;
A.push();
A.beginShape(form_art);
A.strokeJoin(BEVEL);
A.strokeCap(ROUND);
A.stroke(konturfarbe);
A.fill(fuellfarbe);
A.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(A_x1, A_x2, t);
    let y = lerp(A_y1, A_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    A.vertex(x + xOffset, y + yOffset);
  }

A.endShape();
A.pop();
let A2_x1 = O_vnb+(O_schriftbild/2);
let A2_y1 = H_linie;
let A2_x2 = O_schriftbild+O_vnb;
let A2_y2 = grundlinie;
A.push();
A.beginShape(form_art);
A.strokeJoin(BEVEL);
A.strokeCap(ROUND);
A.stroke(konturfarbe);
A.fill(fuellfarbe);
A.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(A2_x1, A2_x2, t);
    let y = lerp(A2_y1, A2_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    A.vertex(x + xOffset, y + yOffset);
  }

A.endShape();
A.pop();

let A3_x1 = O_schriftbild-(O_vnb);
let A3_y1 = versalien_hilfslinie_1;
let A3_x2 = 3*O_vnb;
let A3_y2 = versalien_hilfslinie_1;
A.push();
A.beginShape(form_art);
A.strokeJoin(BEVEL);
A.strokeCap(ROUND);
A.stroke(konturfarbe);
A.fill(fuellfarbe);
A.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(A3_x1, A3_x2, t);
    let y = lerp(A3_y1, A3_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    A.vertex(x + xOffset, y + yOffset);
  }

A.endShape();
A.pop();

let N_x1 = 2*O_vnb;
let N_y1 = grundlinie;
let N_x2 = 2*O_vnb;
let N_y2 = H_linie;
N.push();
N.beginShape(form_art);
N.strokeJoin(BEVEL);
N.strokeCap(ROUND);
N.stroke(konturfarbe);
N.fill(fuellfarbe);
N.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(N_x1, N_x2, t);
    let y = lerp(N_y1, N_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    N.vertex(x + xOffset, y + yOffset);
  }

N.endShape();
N.pop();
let N2_x1 = 2*O_vnb;
let N2_y1 = H_linie;
let N2_x2 = O_schriftbild;
let N2_y2 = grundlinie;
N.push();
N.beginShape(form_art);
N.strokeJoin(BEVEL);
N.strokeCap(ROUND);
N.stroke(konturfarbe);
N.fill(fuellfarbe);
N.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(N2_x1, N2_x2, t);
    let y = lerp(N2_y1, N2_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    N.vertex(x + xOffset, y + yOffset);
  }

N.endShape();
N.pop();
let N3_x1 = O_schriftbild;
let N3_y1 = grundlinie;
let N3_x2 = O_schriftbild;
let N3_y2 = H_linie;
N.push();
N.beginShape(form_art);
N.strokeJoin(BEVEL);
N.strokeCap(ROUND);
N.stroke(konturfarbe);
N.fill(fuellfarbe);
N.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(N3_x1, N3_x2, t);
    let y = lerp(N3_y1, N3_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,  min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,  min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    N.vertex(x + xOffset, y + yOffset);
  }

N.endShape();
N.pop();

// T
let T_x1 = O_vnb;
let T_y1 = H_linie;
let T_x2 = O_schriftbild+O_vnb;
let T_y2 = H_linie;
T.push();
T.beginShape(form_art);
T.strokeJoin(BEVEL);
T.strokeCap(ROUND);
T.stroke(konturfarbe);
T.fill(fuellfarbe);
T.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(T_x1, T_x2, t);
    let y = lerp(T_y1, T_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    T.vertex(x + xOffset, y + yOffset);
  }

T.endShape();
T.pop();
let T2_x1 = O_vnb+(O_schriftbild/2);
let T2_y1 = H_linie;
let T2_x2 = O_vnb+(O_schriftbild/2);
let T2_y2 = grundlinie;
T.push();
T.beginShape(form_art);
T.strokeJoin(BEVEL);
T.strokeCap(ROUND);
T.stroke(konturfarbe);
T.fill(fuellfarbe);
T.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(T2_x1, T2_x2, t);
    let y = lerp(T2_y1, T2_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    T.vertex(x + xOffset, y + yOffset);
  }

T.endShape();
T.pop();

//Y
let Y_x1 = O_vnb;
let Y_y1 = H_linie;
let Y_x2 = O_vnb+(O_schriftbild/2);
let Y_y2 = versalien_hilfslinie_1;
Y.push();
Y.beginShape(form_art);
Y.strokeJoin(BEVEL);
Y.strokeCap(ROUND);
Y.stroke(konturfarbe);
Y.fill(fuellfarbe);
Y.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(Y_x1, Y_x2, t);
    let y = lerp(Y_y1, Y_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    Y.vertex(x + xOffset, y + yOffset);
  }

Y.endShape();
Y.pop();
let Y2_x1 = O_vnb+O_schriftbild;
let Y2_y1 = H_linie;
let Y2_x2 = O_vnb+(O_schriftbild/2);
let Y2_y2 = versalien_hilfslinie_1;
Y.push();
Y.beginShape(form_art);
Y.strokeJoin(BEVEL);
Y.strokeCap(ROUND);
Y.stroke(konturfarbe);
Y.fill(fuellfarbe);
Y.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(Y2_x1, Y2_x2, t);
    let y = lerp(Y2_y1, Y2_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    Y.vertex(x + xOffset, y + yOffset);
  }

Y.endShape();
Y.pop();
let Y3_x1 =  O_vnb+(O_schriftbild/2);
let Y3_y1 = versalien_hilfslinie_1;
let Y3_x2 = O_vnb+(O_schriftbild/2);
let Y3_y2 = grundlinie;
Y.push();
Y.beginShape(form_art);
Y.strokeJoin(BEVEL);
Y.strokeCap(ROUND);
Y.stroke(konturfarbe);
Y.fill(fuellfarbe);
Y.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(Y3_x1, Y3_x2, t);
    let y = lerp(Y3_y1, Y3_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    Y.vertex(x + xOffset, y + yOffset);
  }

Y.endShape();
Y.pop();

// Y.push();
// Y.beginShape(form_art);
// Y.strokeWeight(strichstaerke);
// Y.strokeCap(PROJECT);
// Y.vertex(Versal_vbn_minimal + (strichstaerke / 2) + Versal_vbn_minimal, H_linie);
// Y.vertex(Versal_vbn_minimal + (E_schriftbild_6 / 2) , versalien_hilfslinie_1);
// Y.vertex(Versal_vbn_minimal + E_schriftbild_6 - Versal_vbn_minimal - (strichstaerke / 2), H_linie);
// Y.endShape();
// Y.beginShape(form_art);
// Y.vertex(Versal_vbn_minimal + (E_schriftbild_6 / 2), versalien_hilfslinie_1);
// Y.vertex(Versal_vbn_minimal + (E_schriftbild_6 / 2), grundlinie);
// Y.endShape();
// Y.pop();
// Y.push();
// Y.fill(buchstaben_hintergrund);
// Y.noStroke();
// Y.rect(0, 0, (2 * Versal_vbn_minimal) + E_schriftbild_6, H_linie);
// Y.rect(0, grundlinie, (2 * Versal_vbn_minimal) + E_schriftbild_6, (schriftgrad * 0.95) - grundlinie);
// Y.pop();

// T.beginShape(form_art);
// T.strokeWeight(strichstaerke);
// T.strokeCap(SQUARE);
// T.vertex((E_schriftbild_2 + (2 * Versal_vbn_minimal))/2, H_linie+(strichstaerke/2));
// T.vertex((E_schriftbild_2 + (2 * Versal_vbn_minimal))/2, grundlinie);
// T.endShape();
// T.beginShape(form_art);
// T.strokeWeight(strichstaerke_waagerecht);
// T.vertex(Versal_vbn_minimal, H_linie + (strichstaerke/2));
// T.vertex(Versal_vbn_minimal + E_schriftbild_2, H_linie + (strichstaerke/2));
// T.endShape();

//M
let M_x1 = O_vnb;
let M_y1 = H_linie;
let M_x2 = O_vnb;
let M_y2 = grundlinie;
M.push();
M.beginShape(form_art);
M.strokeJoin(BEVEL);
M.strokeCap(ROUND);
M.stroke(konturfarbe);
M.fill(fuellfarbe);
M.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(M_x1, M_x2, t);
    let y = lerp(M_y1, M_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    M.vertex(x + xOffset, y + yOffset);
  }

M.endShape();
M.pop();
let M2_x1 = O_schriftbild;
let M2_y1 = H_linie;
let M2_x2 = O_schriftbild;
let M2_y2 = grundlinie;
M.push();
M.beginShape(form_art);
M.strokeJoin(BEVEL);
M.strokeCap(ROUND);
M.stroke(konturfarbe);
M.fill(fuellfarbe);
M.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(M2_x1, M2_x2, t);
    let y = lerp(M2_y1, M2_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1,min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    M.vertex(x + xOffset, y + yOffset);
  }

M.endShape();
M.pop();
let M3_x1 = O_vnb;
let M3_y1 = H_linie;
let M3_x2 = O_vnb+(O_schriftbild/2);
let M3_y2 = versalien_hilfslinie_1;
M.push();
M.beginShape(form_art);
M.strokeJoin(BEVEL);
M.strokeCap(ROUND);
M.stroke(konturfarbe);
M.fill(fuellfarbe);
M.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(M3_x1, M3_x2, t);
    let y = lerp(M3_y1, M3_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    M.vertex(x + xOffset, y + yOffset);
  }

M.endShape();
M.pop();
let M4_x1 = O_schriftbild;
let M4_y1 = H_linie;
let M4_x2 = O_vnb+(O_schriftbild/2);
let M4_y2 = versalien_hilfslinie_1;
M.push();
M.beginShape(form_art);
M.strokeJoin(BEVEL);
M.strokeCap(ROUND);
M.stroke(konturfarbe);
M.fill(fuellfarbe);
M.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(M4_x1, M4_x2, t);
    let y = lerp(M4_y1, M4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    M.vertex(x + xOffset, y + yOffset);
  }

M.endShape();
M.pop();

// M.push(); // push und pop stellt sicher, dass die gezeichnete Form (besonders wenn sie nicht geschlossen ist) nicht nachfolgende Formen beeinflusst
// M.beginShape(form_art);
// M.strokeWeight(strichstaerke);
// M.strokeCap(SQUARE);
// M.strokeJoin(BEVEL);
// M.vertex(H_vnb_vermindert , grundlinie);
// M.vertex(H_vnb_vermindert , H_linie);
// M.vertex((H_vnb_vermindert + E_schriftbild_5 + H_vnb_vermindert)/ 2, grundlinie);
// M.vertex(H_vnb_vermindert + E_schriftbild_5 + H_vnb_vermindert - strichstaerke, H_linie);
// M.vertex(H_vnb_vermindert + E_schriftbild_5 + H_vnb_vermindert - strichstaerke, grundlinie);
// M.endShape();
// M.pop();
// M.push();
// M.fill(buchstaben_hintergrund);
// M.noStroke();
// M.rect(0, grundlinie, E_schriftbild_5 + (2 * H_vnb_vermindert), (schriftgrad * 0.95) - grundlinie);
// M.rect(0, 0, E_schriftbild_5 + (2 * H_vnb_vermindert), H_linie);
// M.pop();

// B
let B_x1 = O_vnb;
let B_y1 = H_linie;
let B_x2 = O_vnb;
let B_y2 = grundlinie;
B.push();
B.beginShape(form_art);
B.strokeJoin(BEVEL);
B.strokeCap(ROUND);
B.stroke(konturfarbe);
B.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(B_x1, B_x2, t);
    let y = lerp(B_y1, B_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    B.vertex(x + xOffset, y + yOffset);
  }

B.endShape();
B.pop();
let B2_x1 = O_vnb;
let B2_y1 = grundlinie-O_vnb;
let B2_x2 = O_schriftbild-O_vnb;
let B2_y2 = grundlinie-O_vnb;
B.push();
B.beginShape(form_art);
B.strokeJoin(BEVEL);
B.strokeCap(ROUND);
B.stroke(konturfarbe);
B.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(B2_x1, B2_x2, t);
    let y = lerp(B2_y1, B2_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    B.vertex(x + xOffset, y + yOffset);
  }

B.endShape();
B.pop();
let B3_x1 = O_schriftbild-O_vnb;
let B3_y1 = grundlinie-O_vnb;
let B3_x2 = O_vnb;
let B3_y2 = versalien_hilfslinie_1;
B.push();
B.beginShape(form_art);
B.strokeJoin(BEVEL);
B.strokeCap(ROUND);
B.stroke(konturfarbe);
B.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(B3_x1, B3_x2, t);
    let y = lerp(B3_y1, B3_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1,min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    B.vertex(x + xOffset, y + yOffset);
  }

B.endShape();
B.pop();
let B4_x1 = O_vnb;
let B4_y1 = versalien_hilfslinie_1-O_vnb;
let B4_x2 = O_schriftbild-O_vnb;
let B4_y2 = versalien_hilfslinie_1-O_vnb;
B.push();
B.beginShape(form_art);
B.strokeJoin(BEVEL);
B.strokeCap(ROUND);
B.stroke(konturfarbe);
B.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(B4_x1, B4_x2, t);
    let y = lerp(B4_y1, B4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    B.vertex(x + xOffset, y + yOffset);
  }

B.endShape();
B.pop();
let B5_x1 = O_schriftbild-O_vnb;
let B5_y1 = versalien_hilfslinie_1-O_vnb;
let B5_x2 = O_vnb ;
let B5_y2 = H_linie;
B.push();
B.beginShape(form_art);
B.strokeJoin(BEVEL);
B.strokeCap(ROUND);
B.stroke(konturfarbe);
B.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += schritt) {
    let x = lerp(B5_x1, B5_x2, t);
    let y = lerp(B5_y1, B5_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, min_Wert, max_Wert);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, min_Wert, max_Wert);  // Different noise offset for y to make the wiggle more irregular
    
    B.vertex(x + xOffset, y + yOffset);
  }

B.endShape();
B.pop();
 
///////////////////////////////////////////////////////////////////////////////////////
 noiseOffset += 0.5;   // 0.01,1, 0.0005, 5
//////////////////////////////////////////////////////////////////////////////////////////////
    
}
const fixedWidth = (schriftgrad/2.1) + buchstabenabstand;

function keyTyped() {
    // Gemeine
    if (key === 'a') {
      drawNextLetter(a, x_startwert, y_startwert);
      x_startwert += fixedWidth; 
    } else if (key === 'b') {
      drawNextLetter(b, x_startwert, y_startwert);
      x_startwert += fixedWidth; 
    } else if (key === 'c') {
        drawNextLetter(c, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'd') {
        drawNextLetter(d, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'e') {
        drawNextLetter(e, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'f') {
        drawNextLetter(f, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'g') {
        drawNextLetter(g, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'h') {
        drawNextLetter(h, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'i') {
        drawNextLetter(i, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'j') {
        drawNextLetter(j, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'k') {
        drawNextLetter(k, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'l') {
        drawNextLetter(l, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'm') {
        drawNextLetter(m, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'n') {
        drawNextLetter(n, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'o') {
        drawNextLetter(o, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'p') {
        drawNextLetter(p, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'q') {
        drawNextLetter(q, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'r') {
        drawNextLetter(r, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 's') {
        drawNextLetter(s, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 't') {
        drawNextLetter(t, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'u') {
        drawNextLetter(u, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'v') {
        drawNextLetter(v, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'w') {
        drawNextLetter(w, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'x') {
        drawNextLetter(x, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'y') {
        drawNextLetter(y, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'z') {
        drawNextLetter(z, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    
    // Versalien
    } else if (key === 'A') {
        drawNextLetter(A, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'B') {
        drawNextLetter(B, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'C') {
        drawNextLetter(C, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'D') {
        drawNextLetter(D, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'E') {
        drawNextLetter(E, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'F') {
        drawNextLetter(F, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'G') {
        drawNextLetter(G, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'H') {
        drawNextLetter(H, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'I') {
        drawNextLetter(I, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'J') {
        drawNextLetter(J, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'K') {
        drawNextLetter(K, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'L') {
        drawNextLetter(L, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'M') {
        drawNextLetter(M, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'N') {
        drawNextLetter(N, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'O') {
        drawNextLetter(O, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'P') {
        drawNextLetter(P, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'Q') {
        drawNextLetter(Q, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'R') {
        drawNextLetter(R, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'S') {
        drawNextLetter(S, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'T') {
        drawNextLetter(T, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'U') {
        drawNextLetter(U, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'V') {
        drawNextLetter(V, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'W') {
        drawNextLetter(W, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'X') {
        drawNextLetter(X, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'Y') {
        drawNextLetter(Y, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
    } else if (key === 'Z') {
        drawNextLetter(Z, x_startwert, y_startwert);
        x_startwert += fixedWidth; 
                             
                   
                        
        


    // Abstaende
    } else if (keyCode == "32") {
      x_startwert += wortabstand; 
    
    } else if (keyCode == ENTER) {
        reset();
        y_startwert += durchschuss; // Move to the next line
    }
  
    return false; // Prevent default behavior
}

function drawNextLetter(buchstabe, x_buchstabenposition, y_buchstabenposition) {
    image(buchstabe, x_buchstabenposition, y_buchstabenposition);
}

function reset() {
    x_startwert = 13; 
}
