// Allgemein
let schriftgrad = 350;
let durchschuss = schriftgrad;
let buchstabenabstand = 0; 
let wortabstand = schriftgrad / 2; 
let strichstaerke = 30;
let strichstaerke_waagerecht = strichstaerke * 0.8;
let strichstaerke_fein = 1;

let noiseOffset = 0.1;


// Horizontale Schriftlinien
let grundlinie, ueberhang, grundlinie_ueberhang, k_Linie, H_linie, H_linie_ueberhang, mittellinie, mittellinie_ueberhang, p_linie;

// Horizontale Hilfslinien
let versalien_hilfslinie_1, versalien_hilfslinie_2, versalien_oeffnung_oben, versalien_oeffnung_unten, gemeine_hilfsline_1, gemeine_hilfsline_2, gemeine_oeffnung_oben, gemeine_oeffnung_unten;

// Schriftbild
let O_versalhoehe, O_schriftbild, E_schriftbild, E_schriftbild_1, E_schriftbild_2, E_schriftbild_3, E_schriftbild_4, E_schriftbild_5, x_hoehe, o_schriftbild, o_schriftbild_1, o_schriftbild_2, o_schriftbild_3;

// Zurichtung der Buchstaben
let H_vnb, O_vnb, H_vnb_vermindert, H_vnb_halbiert, Versal_vbn_minimal, Versal_vbn_augenmass, n_vb, n_nb, o_vnb, n_vb_vergroessert, o_vnb_vermindert, Gemeine_vbn_minimal, Gemeine_vbn_augenmass;

// Glyphen
// Versalien
let A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
let a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;

// Positionierung
let x_startwert, y_startwert, spalte_1, spalte_2, x_buchstabenposition, y_buchstabenposition;

/////// von https://editor.p5js.org/amygoodchild/sketches/b4vJFN_Tv
let lines = [];
let numLines = 10;
let wanderNoiseResolution = 0.001; // lower numbers make smoother waves
let maxWanderDistance = 400;        // higher numbers make waves wider 
let yGap = 10; 
                           // higher numbers make bigger difference between each wave 
let xDifference = 0.02;    // xDiff creates incremental difference 
let yDifference = 0.03;    // yDiff shifts the noise pattern in the y axis for each line

let numPoints;
///////
let buchstaben_hintergrund = 255;


function setup() {
    let buchstaben_hintergrund = 255;
createCanvas(windowWidth, windowHeight);
rectMode(CENTER);
ellipseMode(CENTER);
//angleMode(DEGREES);
background(buchstaben_hintergrund);
//blendMode(OVERLAY);

strokeWeight(strichstaerke);
stroke(0);



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
let versalien_hilfslinie_1 = mittellinie * 1.1;

// Wie kann ich die Breite des Schriftbildes der Versalien festlegen? -> von O ausgehen und dann E definieren
let O_versalhoehe = grundlinie_ueberhang - H_linie_ueberhang; // Versalhoehe für den Buchstaben O berechnen
let O_schriftbild = O_versalhoehe * 0.92; // Faktor unterscheidet sich je nach Schrift; hier an Helvetica orientiert
let E_schriftbild = O_schriftbild * 0.62; // Faktor unterscheidet sich je nach Schrift; hier an Helvetica orientiert
// Das Schriftbild der übrigen Versalien orientiert sich an jenem des Buchstaben E. -> Die Buchstaben wurden zur Vereinfachung je einem von fünf Faktoren zugeordnet.
let E_schriftbild_1 = E_schriftbild * 0.95; // F, J, L
let E_schriftbild_2 = E_schriftbild * 1.4; // C, D, T, U
let E_schriftbild_3 = E_schriftbild * 1.1; // H, K, N, S, Z
let E_schriftbild_4 = E_schriftbild * 1.8; // A, G, V, X, Y
let E_schriftbild_5 = E_schriftbild * 1.4; // M, W
let E_schriftbild_6 = E_schriftbild * 1.5; // X
let E_schriftbild_7 = E_schriftbild * 1.25;

// Wie kann ich die Breite des Schriftbildes der Gemeinen festlegen? -> von o ausgehen und dann die übrigen Gemeinen definieren
// Zuerst muss dafür die x-Höhe definiert werden.
let x_hoehe = O_versalhoehe * 0.72; // Faktor unterscheidet sich je nach Schrift -> 60–75% der Versalhöhe; eine höhere x-Höhe kann die Lesbarkeit in kleinen Grössen verbessern
let o_schriftbild = x_hoehe * 0.92; // Der Buchstabe o entspricht nicht einem perfekten Kreis. // a, b, d, e, g, p, q, v, x, y, z
// Das Schriftbild der übrigen Gemeinen orientiert sich an jenem des Buchstaben o. -> Die Buchstaben wurden zur Vereinfachung je einem von drei Faktoren zugeordnet.
let o_schriftbild_1 = o_schriftbild * 0.5; // f, j, r, t
let o_schriftbild_2 = o_schriftbild * 0.8; // c, h, k, n, s, u
let o_schriftbild_3 = o_schriftbild * 1.6; // m, w

// Zurichtung
// Wie können die Grossbuchstaben zugerichtet werden? -> von H und O ausgehen
let H_vnb = E_schriftbild_3 * 0.25; // vnb steht für Vor- und Nachbreite; Die Vor- und Nachbreite des Buchstabens H entspricht 25–50 % von dessen Binnenraum (wobei serifenlose enger zugerichtet werden). (Die Strichdicke wird bei der Berechnung nicht beachtet, dafür wird ein tiefer Prozentwert gewählt.)
// Vorbreite-B, Vorbreite-D, Vorbreite-E, Vorgreite-F, Vorbreite-I-Nachbreite, J-Nachbreite, Vorbreite-K, Vorbreite-L, M-Nachbreite, Vorbreite-P, Vorbreite-R, Vorbreite-U
// Test mit HHHHHH
let O_vnb = H_vnb * 0.3; // Faktor muss je nach Schrift angepasst werden; Die Vor- und Nachbreite des O ist etwas kleiner als jenen des H.
// Test mit HOH, HHOOHH; Die Verteilung des Grauwertes sollte als gleichmässig erscheinen.
let H_vnb_vermindert = H_vnb * 0.95; // G-Nachbreite, Vorbreite-M, Vorbreite-N-Nachbreite, U-Nachbreite
let H_vnb_halbiert = H_vnb * 0.5; // B-Nachbreite, C-Nachbreite, E-Nachbreite, F-Nachbreite, Vorbreite-Z-Nachbreite
let Versal_vbn_minimal = H_vnb * 0.2; // Vorbreit-A-Nachbreite, ...
let Versal_vbn_augenmass = H_vnb * 0.4; // Faktor muss nach Augenmass entschieden werden.

// Wie können die Gemeinen zugerichtet werden? -> von n und o ausgehen
let n_vb = o_schriftbild_2 * 0.25; // Die Vorbreite des Buchstaben n entspricht 25–50 % des Binnenraumes.
let n_nb = n_vb * 0.9; // Faktor muss je nach Schrift angepasst werden; Die Nachbreite des n ist etwas kleiner als dessen Vorbreite.
// Test mit nnn
let o_vnb = n_vb * 0.8; // Faktor muss je nach Schrift angepasst werden; Die Vor- und Nachbreite des o ist etwas kleiner als die des n.
// Test mit non, nnonn, nnonon, nnoonn
let n_vb_vergroessert = n_vb * 1.1; // Faktor muss je nach Schrift angepasst werden.
let o_vnb_vermindert = o_vnb * 0.9; // Faktor muss je nach Schrift angepasst werden.
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
n = createGraphics(o_schriftbild_2 + n_vb + n_nb , schriftgrad * 0.95);
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
  c = createGraphics(o_schriftbild_2 + o_vnb + o_vnb_vermindert, schriftgrad * 0.95);
  c.background(buchstaben_hintergrund);
  d = createGraphics(o_schriftbild + o_vnb + n_vb, schriftgrad * 0.95);
  d.background(buchstaben_hintergrund);
  e = createGraphics(o_schriftbild + o_vnb + o_vnb_vermindert, schriftgrad * 0.95);
  e.background(buchstaben_hintergrund);
  f = createGraphics(o_schriftbild_1 + (2 * Gemeine_vbn_augenmass), schriftgrad * 0.95);
  f.background(buchstaben_hintergrund);
  g = createGraphics(o_schriftbild + (2 * Gemeine_vbn_augenmass), schriftgrad * 0.95);
  g.background(buchstaben_hintergrund);
  h = createGraphics(o_schriftbild_2 + n_vb_vergroessert + n_nb, schriftgrad * 0.95);
  h.background(buchstaben_hintergrund);
  i = createGraphics(strichstaerke + n_vb_vergroessert + n_vb, schriftgrad * 0.95);
  i.background(buchstaben_hintergrund);
  j = createGraphics(o_schriftbild_1 + (2 * n_vb), schriftgrad * 0.95);
  j.background(buchstaben_hintergrund);
  k = createGraphics(o_schriftbild_2 + n_vb_vergroessert + Gemeine_vbn_minimal, schriftgrad * 0.95);
  k.background(buchstaben_hintergrund);
  l = createGraphics(o_schriftbild_1 + n_vb_vergroessert + n_nb, schriftgrad * 0.95);
  l.background(buchstaben_hintergrund);
  m = createGraphics(o_schriftbild_3 + n_vb + n_nb, schriftgrad * 0.95);
  m.background(buchstaben_hintergrund);

  p = createGraphics(o_schriftbild + n_vb_vergroessert + o_vnb, schriftgrad * 0.95);
  p.background(buchstaben_hintergrund);
  q = createGraphics(o_schriftbild + n_vb_vergroessert + o_vnb, schriftgrad * 0.95);
  q.background(buchstaben_hintergrund);
  r = createGraphics(o_schriftbild_1 + n_vb + Gemeine_vbn_minimal, schriftgrad * 0.95);
  r.background(buchstaben_hintergrund);
  s = createGraphics(o_schriftbild_2 + (2 * Gemeine_vbn_augenmass), schriftgrad * 0.95);
  s.background(buchstaben_hintergrund);
  t = createGraphics(o_schriftbild_1 + (2 * Gemeine_vbn_augenmass), schriftgrad * 0.95);
  t.background(buchstaben_hintergrund);
  u = createGraphics(o_schriftbild_2 + (2 * n_nb), schriftgrad * 0.95);
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
  H = createGraphics(E_schriftbild_3 + (2 * H_vnb), schriftgrad * 0.95);
  H.background('white');
  H.strokeWeight(30);
  H.strokeCap(SQUARE);
  O = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);
  O.background('white');
  // Zurichtung testen und allenfalls die Parameter in H_vnb und/oder O_vnb anpassen.
  E = createGraphics(E_schriftbild + H_vnb + H_vnb_halbiert, schriftgrad * 0.95);

  A = createGraphics(E_schriftbild_4 + (2 * Versal_vbn_minimal), schriftgrad * 0.95);

  B = createGraphics(E_schriftbild_3 + H_vnb + H_vnb_halbiert, schriftgrad * 0.95); //angepasst

  C = createGraphics(E_schriftbild_2 + O_vnb + H_vnb_halbiert + O_vnb+O_vnb+O_vnb+O_vnb+200, schriftgrad * 0.95);

  D = createGraphics(E_schriftbild_2 + H_vnb + (3*O_vnb), schriftgrad * 0.95);

  F = createGraphics(E_schriftbild_1 + H_vnb + H_vnb_halbiert, schriftgrad * 0.95);

  G = createGraphics(E_schriftbild_4 + O_vnb + O_vnb, schriftgrad * 0.95);

  I = createGraphics(strichstaerke + (2 * H_vnb), schriftgrad * 0.95);

  J = createGraphics(E_schriftbild_1 + Versal_vbn_minimal + H_vnb, schriftgrad * 0.95);

  K = createGraphics(E_schriftbild_7 + H_vnb + Versal_vbn_minimal, schriftgrad * 0.95);

  L = createGraphics(E_schriftbild_1 + H_vnb + H_vnb, schriftgrad * 0.95);

  M = createGraphics(E_schriftbild_5 + (2 * H_vnb_vermindert), schriftgrad * 0.95); //angepasst

  N = createGraphics(E_schriftbild_5 + (2 * H_vnb_vermindert), schriftgrad * 0.95); //angepasst

  P = createGraphics(E_schriftbild + H_vnb + O_vnb, schriftgrad * 0.95); // angepasst

  Q = createGraphics(O_schriftbild + (2 * O_vnb), schriftgrad * 0.95);

  R = createGraphics(E_schriftbild + H_vnb + O_vnb, schriftgrad * 0.95);

  S = createGraphics(E_schriftbild_7 + (4 * Versal_vbn_augenmass), schriftgrad * 0.95);

  T = createGraphics(E_schriftbild_2 + (2 * Versal_vbn_minimal), schriftgrad * 0.95);

  U = createGraphics(E_schriftbild_7 + H_vnb + H_vnb, schriftgrad * 0.95);

  V = createGraphics(E_schriftbild_4 + (2 * Versal_vbn_minimal), schriftgrad * 0.95);

  W = createGraphics(E_schriftbild_5 + (3 * H_vnb_vermindert), schriftgrad * 0.95); //angepasst

  X = createGraphics(E_schriftbild_6 + (2 * Versal_vbn_minimal), schriftgrad * 0.95); //angepasst

  Y = createGraphics(E_schriftbild_6 + (2 * Versal_vbn_minimal), schriftgrad * 0.95);

  Z = createGraphics(E_schriftbild_3 +(2 * H_vnb_halbiert), schriftgrad * 0.95);





  // Positionierung
  x_startwert = windowWidth / 15;
  y_startwert = windowHeight / 4;

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







   O.beginShape();
//   //O.push();
//    O.ellipse(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y, 5);
//    O.ellipse(O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y, 5);
//    O.ellipse(O_mitte_links.x, O_mitte_links.y, 5);
//    O.ellipse(O_mitte_rechts.x, O_mitte_rechts.y, 5);
//   O.curve(O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y, O_mitte_links.x, O_mitte_links.y, O_grundlinie_ueberhang_mitte.x, O_grundlinie_ueberhang_mitte.y, O_mitte_rechts.x, O_mitte_rechts.y, O_H_Linie_ueberhang_mitte.x, O_H_Linie_ueberhang_mitte.y);
//   O.translate(O_vnb, 0);

//   O.rect(0, 0, 40, 40);
  //O.pop();

  O.endShape();
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
    let x_noise = 100 * noise(0.005 * frameCount);
    let y_noise = 100 * noise(0.005 * frameCount + 10000);

    let wiggleFactor = 10; // Change this value to adjust the squiggly effect

// POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, QUAD_STRIP, TESS
let form_art = TESS; 

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
let versalien_hilfslinie_1 = mittellinie * 1.1;
let versalien_hilfslinie_2 = mittellinie * 1.3;

// Wie kann ich die Breite des Schriftbildes der Versalien festlegen? -> von O ausgehen und dann E definieren
let O_versalhoehe = grundlinie_ueberhang - H_linie_ueberhang; // Versalhoehe für den Buchstaben O berechnen
let O_schriftbild = O_versalhoehe * 0.92; // Faktor unterscheidet sich je nach Schrift; hier an Helvetica orientiert
let E_schriftbild = O_schriftbild * 0.62; // Faktor unterscheidet sich je nach Schrift; hier an Helvetica orientiert
// Das Schriftbild der übrigen Versalien orientiert sich an jenem des Buchstaben E. -> Die Buchstaben wurden zur Vereinfachung je einem von fünf Faktoren zugeordnet.
let E_schriftbild_1 = E_schriftbild * 0.95; // F, J, L
let E_schriftbild_2 = E_schriftbild * 1.4; // C, D, T, U
let E_schriftbild_3 = E_schriftbild * 1.1; // H, K, N, S, Z
let E_schriftbild_4 = E_schriftbild * 1.8; // A, G, V, X, Y
let E_schriftbild_5 = E_schriftbild * 1.4; // M, W
let E_schriftbild_6 = E_schriftbild * 1.5; // X
let E_schriftbild_7 = E_schriftbild * 1.25;

// Wie kann ich die Breite des Schriftbildes der Gemeinen festlegen? -> von o ausgehen und dann die übrigen Gemeinen definieren
// Zuerst muss dafür die x-Höhe definiert werden.
let x_hoehe = O_versalhoehe * 0.72; // Faktor unterscheidet sich je nach Schrift -> 60–75% der Versalhöhe; eine höhere x-Höhe kann die Lesbarkeit in kleinen Grössen verbessern
let o_schriftbild = x_hoehe * 0.92; // Der Buchstabe o entspricht nicht einem perfekten Kreis. // a, b, d, e, g, p, q, v, x, y, z
// Das Schriftbild der übrigen Gemeinen orientiert sich an jenem des Buchstaben o. -> Die Buchstaben wurden zur Vereinfachung je einem von drei Faktoren zugeordnet.
let o_schriftbild_1 = o_schriftbild * 0.5; // f, j, r, t
let o_schriftbild_2 = o_schriftbild * 0.8; // c, h, k, n, s, u
let o_schriftbild_3 = o_schriftbild * 1.6; // m, w

// Zurichtung
// Wie können die Grossbuchstaben zugerichtet werden? -> von H und O ausgehen
let H_vnb = E_schriftbild_3 * 0.25; // vnb steht für Vor- und Nachbreite; Die Vor- und Nachbreite des Buchstabens H entspricht 25–50 % von dessen Binnenraum (wobei serifenlose enger zugerichtet werden). (Die Strichdicke wird bei der Berechnung nicht beachtet, dafür wird ein tiefer Prozentwert gewählt.)
// Vorbreite-B, Vorbreite-D, Vorbreite-E, Vorgreite-F, Vorbreite-I-Nachbreite, J-Nachbreite, Vorbreite-K, Vorbreite-L, M-Nachbreite, Vorbreite-P, Vorbreite-R, Vorbreite-U
// Test mit HHHHHH
let O_vnb = H_vnb * 0.3; // Faktor muss je nach Schrift angepasst werden; Die Vor- und Nachbreite des O ist etwas kleiner als jenen des H.
// Test mit HOH, HHOOHH; Die Verteilung des Grauwertes sollte als gleichmässig erscheinen.
let H_vnb_vermindert = H_vnb * 0.95; // G-Nachbreite, Vorbreite-M, Vorbreite-N-Nachbreite, U-Nachbreite
let H_vnb_halbiert = H_vnb * 0.5; // B-Nachbreite, C-Nachbreite, E-Nachbreite, F-Nachbreite, Vorbreite-Z-Nachbreite
let Versal_vbn_minimal = H_vnb * 0.2; // Vorbreit-A-Nachbreite, ...
let Versal_vbn_augenmass = H_vnb * 0.4; // Faktor muss nach Augenmass entschieden werden.

// Wie können die Gemeinen zugerichtet werden? -> von n und o ausgehen
let n_vb = o_schriftbild_2 * 0.25; // Die Vorbreite des Buchstaben n entspricht 25–50 % des Binnenraumes.
let n_nb = n_vb * 0.9; // Faktor muss je nach Schrift angepasst werden; Die Nachbreite des n ist etwas kleiner als dessen Vorbreite.
// Test mit nnn
let o_vnb = n_vb * 0.8; // Faktor muss je nach Schrift angepasst werden; Die Vor- und Nachbreite des o ist etwas kleiner als die des n.
// Test mit non, nnonn, nnonon, nnoonn
let n_vb_vergroessert = n_vb * 1.1; // Faktor muss je nach Schrift angepasst werden.
let o_vnb_vermindert = o_vnb * 0.9; // Faktor muss je nach Schrift angepasst werden.
let Gemeine_vbn_minimal = n_vb * 0.2; // Faktor muss je nach Schrift angepasst werden.
let Gemeine_vbn_augenmass = n_vb * 0.4; // Faktor muss nach Augenmass entschieden werden.


// Buchstabenskelette der Versalien zeichnen.
// H.beginShape();
// H.stroke(0);
// H.vertex(H_vnb , H_linie);
// H.vertex(H_vnb, grundlinie);
// H.endShape();
// H.beginShape();
// H.stroke(0);
// H.vertex(H_vnb + E_schriftbild_3, H_linie);
// H.vertex(H_vnb + E_schriftbild_3, grundlinie);
// H.endShape();
// H.beginShape();
// H.strokeWeight(strichstaerke_waagerecht); // damit die waagerechte Linie geringfügig dünner ist wie die Stämme
// H.stroke(0);
// H.vertex(H_vnb, versalien_hilfslinie_1);
// H.vertex(H_vnb + E_schriftbild_3, versalien_hilfslinie_1);
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

O.beginShape();
O.fill('black');

// Outer ellipse
O.vertex(centerX + outerRadiusX, centerY);
O.bezierVertex(centerX + outerRadiusX, centerY - oy, 
               centerX + ox, centerY - outerRadiusY, 
               centerX, centerY - outerRadiusY);
O.bezierVertex(centerX - ox, centerY - outerRadiusY, 
               centerX - outerRadiusX, centerY - oy, 
               centerX - outerRadiusX, centerY);
O.bezierVertex(centerX - outerRadiusX, centerY + oy, 
               centerX - ox, centerY + outerRadiusY, 
               centerX, centerY + outerRadiusY);
O.bezierVertex(centerX + ox, centerY + outerRadiusY, 
               centerX + outerRadiusX, centerY + oy, 
               centerX + outerRadiusX, centerY);

O.beginContour();

// Inner ellipse
O.vertex(centerX + innerRadiusX, centerY);
O.bezierVertex(centerX + innerRadiusX, centerY + iy, 
               centerX + ix, centerY + innerRadiusY, 
               centerX, centerY + innerRadiusY);
O.bezierVertex(centerX - ix, centerY + innerRadiusY, 
               centerX - innerRadiusX, centerY + iy, 
               centerX - innerRadiusX, centerY);
O.bezierVertex(centerX - innerRadiusX, centerY - iy, 
               centerX - ix, centerY - innerRadiusY, 
               centerX, centerY - innerRadiusY);
O.bezierVertex(centerX + ix, centerY - innerRadiusY, 
               centerX + innerRadiusX, centerY - iy, 
               centerX + innerRadiusX, centerY);

O.endContour();
O.endShape(CLOSE);
///////////////////////////////////////////////////////////////////////////////////////

E.beginShape();
E.strokeWeight(strichstaerke);
E.strokeCap(SQUARE);
E.vertex(E_schriftbild + H_vnb, H_linie + (strichstaerke/2));
E.vertex(H_vnb, H_linie + (strichstaerke/2));
E.vertex(H_vnb, versalien_hilfslinie_1);
E.vertex(H_vnb, grundlinie - (strichstaerke/2));
E.vertex(E_schriftbild + H_vnb, grundlinie - (strichstaerke/2));
E.endShape();
E.beginShape();
E.strokeWeight(strichstaerke_waagerecht);
E.strokeCap(SQUARE);

E.vertex(H_vnb, versalien_hilfslinie_1);
E.vertex(H_vnb + E_schriftbild - (E_schriftbild * 0.1), versalien_hilfslinie_1);

E.endShape();

A.beginShape();
A.noFill();
A.strokeCap(PROJECT);
A.strokeJoin(BEVEL);
A.strokeWeight(strichstaerke);
A.vertex(Versal_vbn_minimal + (strichstaerke/2 ), grundlinie);
A.vertex(Versal_vbn_minimal + (E_schriftbild_4 / 2), H_linie);
A.vertex(Versal_vbn_minimal + E_schriftbild_4 - (strichstaerke /2), grundlinie);
A.endShape();
A.beginShape();
A.strokeCap(SQUARE);
A.strokeWeight(strichstaerke_waagerecht);
A.vertex(Versal_vbn_minimal + (E_schriftbild_4 * 0.24), versalien_hilfslinie_2);
A.vertex(Versal_vbn_minimal + (E_schriftbild_4 * 0.74 ), versalien_hilfslinie_2);
A.endShape();
A.beginShape();
A.fill('white');
A.noStroke();
A.vertex(0, grundlinie);
A.vertex(E_schriftbild_4 + (2 * Versal_vbn_minimal), grundlinie);
A.vertex(E_schriftbild_4 + (2 * Versal_vbn_minimal), schriftgrad * 0.95);
A.vertex(0, schriftgrad * 0.95);
A.endShape();

// B
B.push();
B.beginShape();
B.strokeWeight(strichstaerke);
B.strokeCap(SQUARE);
B.vertex(H_vnb + (strichstaerke /2), H_linie);
B.vertex(H_vnb + (strichstaerke /2), grundlinie);
B.endShape();
B.beginShape();
B.vertex(H_vnb + (strichstaerke /2), H_linie + (strichstaerke/2));
B.vertex(H_vnb + (strichstaerke /2) + (E_schriftbild_3 * 0.5), H_linie + (strichstaerke/2));
B.endShape();
B.beginShape();
B.vertex(H_vnb + (strichstaerke /2), versalien_hilfslinie_1);
B.vertex(H_vnb + (strichstaerke /2) + (E_schriftbild_3 * 0.5), versalien_hilfslinie_1);
B.endShape();
B.beginShape();
B.vertex(H_vnb + (strichstaerke /2), grundlinie -(strichstaerke/2));
B.vertex(H_vnb + (strichstaerke /2) + (E_schriftbild_3 * 0.5), grundlinie -(strichstaerke/2));
B.endShape();
B.pop();
B.push();
B.strokeWeight(strichstaerke);
B.strokeCap(SQUARE);
B.noFill();
B.beginShape();
B.vertex(H_vnb + strichstaerke + (E_schriftbild_3 / 3), H_linie + (strichstaerke / 2));

let B_controlX1 = H_vnb + strichstaerke + (E_schriftbild / 2) + 40;
let B_controlY1 = H_linie + (strichstaerke / 2) ;
let B_controlX2 = H_vnb + strichstaerke + (E_schriftbild / 2) + 40;
let B_controlY2 = versalien_hilfslinie_1;
B.bezierVertex(B_controlX1, B_controlY1, B_controlX2, B_controlY2, H_vnb + strichstaerke + (E_schriftbild_3 / 3), versalien_hilfslinie_1);
B.endShape();
B.pop();
B.push();
B.strokeWeight(strichstaerke);
B.strokeCap(SQUARE);
B.noFill();
B.beginShape();
B.vertex(H_vnb + strichstaerke + (E_schriftbild_3 / 3), grundlinie - (strichstaerke / 2));
let B2_controlX1 = H_vnb + strichstaerke + (E_schriftbild_3 / 2) + 55;
let B2_controlY1 = grundlinie- (strichstaerke / 2) ;
let B2_controlX2 = H_vnb + strichstaerke + (E_schriftbild_3 / 2) + 55;
let B2_controlY2 = versalien_hilfslinie_1;
B.bezierVertex(B2_controlX1, B2_controlY1, B2_controlX2, B2_controlY2, H_vnb + strichstaerke + (E_schriftbild_3 / 3), versalien_hilfslinie_1);
B.endShape();
B.pop();
// C
// let C_outerRadiusX = O_schriftbild / 2.3; 
// let C_outerRadiusY = O_versalhoehe / 2; 
// let C_innerRadiusX = C_outerRadiusX - 30; 
// let C_innerRadiusY = C_outerRadiusY - 25; 

// // Control point offsets for outer ellipse
// let C_ox = outerRadiusX * kappa;
// let C_oy = outerRadiusY * kappa;

// // Control point offsets for inner ellipse
// let C_ix = innerRadiusX * kappa;
// let C_iy = innerRadiusY * kappa;



// C.push();
// C.beginShape();
// C.fill('black');
// // Outer ellipse
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
// C.endShape(CLOSE);
// C.pop();
// C.push();
// C.fill(buchstaben_hintergrund);
// C.noStroke();
// C.rect(O_vnb + E_schriftbild, H_linie + (O_versalhoehe * 0.25), E_schriftbild * 0.6, O_versalhoehe * 0.4);
// C.pop();


// F
F.push();
F.beginShape();
F.strokeWeight(strichstaerke);
F.strokeCap(SQUARE);
F.vertex(H_vnb + E_schriftbild_1, H_linie + (strichstaerke / 2));
F.vertex(H_vnb, H_linie + (strichstaerke / 2));
F.vertex(H_vnb, grundlinie);
F.endShape();
F.beginShape();
F.strokeWeight(strichstaerke_waagerecht);
F.vertex(H_vnb,  versalien_hilfslinie_1);
F.vertex(H_vnb + E_schriftbild_1 - (E_schriftbild_1 * 0.1), versalien_hilfslinie_1);
F.endShape();
F.pop();
// G
let G_centerX = (O_schriftbild + O_vnb+ H_vnb) / 2;
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



G.push();
G.beginShape();
G.fill('black');

// Outer ellipse
G.vertex(G_centerX + G_outerRadiusX, centerY);
G.bezierVertex(G_centerX + G_outerRadiusX, centerY - G_oy, 
               G_centerX + G_ox, centerY - G_outerRadiusY, 
               G_centerX, centerY - G_outerRadiusY);
G.bezierVertex(G_centerX - G_ox, centerY - G_outerRadiusY, 
               G_centerX - G_outerRadiusX, centerY - G_oy, 
               G_centerX - G_outerRadiusX, centerY);
G.bezierVertex(G_centerX - G_outerRadiusX, centerY + G_oy, 
               G_centerX - G_ox, centerY + G_outerRadiusY, 
               G_centerX, centerY + G_outerRadiusY);
G.bezierVertex(G_centerX + G_ox, centerY + G_outerRadiusY, 
               G_centerX + G_outerRadiusX, centerY + G_oy, 
               G_centerX + G_outerRadiusX, centerY);

G.beginContour();

// Inner ellipse
G.vertex(G_centerX + G_innerRadiusX, centerY);
G.bezierVertex(G_centerX + G_innerRadiusX, centerY + G_iy, 
               G_centerX + G_ix, centerY + G_innerRadiusY, 
               G_centerX, centerY + G_innerRadiusY);
G.bezierVertex(G_centerX - G_ix, centerY + G_innerRadiusY, 
               G_centerX - G_innerRadiusX, centerY + G_iy, 
               G_centerX - G_innerRadiusX, centerY);
G.bezierVertex(G_centerX - G_innerRadiusX, centerY - G_iy, 
               G_centerX - G_ix, centerY - G_innerRadiusY, 
               G_centerX, centerY - G_innerRadiusY);
G.bezierVertex(G_centerX + G_ix, centerY - G_innerRadiusY, 
               G_centerX + G_innerRadiusX, centerY - G_iy, 
               G_centerX + G_innerRadiusX, centerY);

G.endContour();
G.endShape(CLOSE);
G.pop();
G.push();
G.fill(buchstaben_hintergrund);
G.noStroke();
G.rect(E_schriftbild_4 * 0.8, H_linie + (O_versalhoehe * 0.25), strichstaerke * 16, O_versalhoehe * 0.4);
G.pop();

G.push();
G.beginShape();
G.noFill();
G.strokeWeight(strichstaerke *1.125);
G.strokeCap(SQUARE);
G.stroke('black');
// G.vertex(O_vnb + E_schriftbild_4 - (strichstaerke *0.81),  H_linie + (O_versalhoehe * 0.25) + (O_versalhoehe * 0.41));
G.vertex(O_vnb + E_schriftbild_4 - (strichstaerke *0.6),   H_linie + (O_versalhoehe * 0.25) + (O_versalhoehe * 0.33));

G.vertex(O_vnb + E_schriftbild_4 - (strichstaerke *3.7),    H_linie + (O_versalhoehe * 0.25) + (O_versalhoehe * 0.33));
G.endShape();
G.pop();

// J
J.push();
J.beginShape();
J.strokeWeight(strichstaerke);
J.strokeCap(SQUARE);
J.vertex(H_vnb + strichstaerke + (E_schriftbild_1 / 2), H_linie);
J.vertex(H_vnb + strichstaerke + (E_schriftbild_1 / 2), grundlinie);
J.endShape();
J.pop();
J.push();
J.strokeWeight(strichstaerke);
J.strokeCap(SQUARE);
J.noFill();
J.beginShape();
J.vertex(H_vnb + strichstaerke + (E_schriftbild_1 / 2), grundlinie);
let J_controlX1 = H_vnb + strichstaerke + (E_schriftbild_1 / 2);
let J_controlY1 = p_linie ;
let J_controlX2 = Versal_vbn_minimal + (strichstaerke/2);
let J_controlY2 = p_linie;
J.bezierVertex(J_controlX1, J_controlY1, J_controlX2, J_controlY2, Versal_vbn_minimal + (strichstaerke/2), grundlinie );
J.endShape();
J.pop();
// J.push();
// J.fill('white');
// J.noStroke();
// J.rect(0, grundlinie, E_schriftbild + H_vnb + O_vnb, (schriftgrad * 0.95) - grundlinie);
// J.pop();
// K
K.push();
K.beginShape();
K.strokeWeight(strichstaerke);
K.strokeCap(PROJECT);

K.vertex(H_vnb + (strichstaerke / 2), H_linie);
K.vertex(H_vnb + (strichstaerke / 2), grundlinie);
K.endShape();
K.beginShape();
K.strokeWeight(strichstaerke_waagerecht);
K.vertex(H_vnb + E_schriftbild_7 - (strichstaerke / 2) , H_linie);
K.vertex(H_vnb + (strichstaerke ) , versalien_hilfslinie_1);
K.vertex(H_vnb + E_schriftbild_7 - (strichstaerke / 2), grundlinie);
K.endShape();
K.pop();
K.push();
K.fill(buchstaben_hintergrund);
K.noStroke();
K.rect(0, 0, H_vnb + E_schriftbild_7 + Versal_vbn_minimal, H_linie);
K.rect(0, grundlinie, H_vnb + E_schriftbild_7 + Versal_vbn_minimal, (schriftgrad * 0.95) - grundlinie);
K.pop();

// M
M.push(); // push und pop stellt sicher, dass die gezeichnete Form (besonders wenn sie nicht geschlossen ist) nicht nachfolgende Formen beeinflusst
M.beginShape();
M.strokeWeight(strichstaerke);
M.strokeCap(SQUARE);
M.strokeJoin(BEVEL);
M.vertex(H_vnb_vermindert , grundlinie);
M.vertex(H_vnb_vermindert , H_linie);
M.vertex((H_vnb_vermindert + E_schriftbild_5 + H_vnb_vermindert)/ 2, grundlinie);
M.vertex(H_vnb_vermindert + E_schriftbild_5 + H_vnb_vermindert - strichstaerke, H_linie);
M.vertex(H_vnb_vermindert + E_schriftbild_5 + H_vnb_vermindert - strichstaerke, grundlinie);
M.endShape();
M.pop();
M.push();
M.fill(buchstaben_hintergrund);
M.noStroke();
M.rect(0, grundlinie, E_schriftbild_5 + (2 * H_vnb_vermindert), (schriftgrad * 0.95) - grundlinie);
M.rect(0, 0, E_schriftbild_5 + (2 * H_vnb_vermindert), H_linie);
M.pop();
// M.beginShape(QUADS);
// M.fill('red');
// M.noStroke();
// M.vertex(0, grundlinie);
// M.vertex(0, schriftgrad * 0.95);
// M.vertex(E_schriftbild_5 + (2 * H_vnb_vermindert), schriftgrad * 0.95);
// M.vertex(E_schriftbild_5 + (2 * H_vnb_vermindert), grundlinie);
// M.endShape();
// M.beginShape();
// M.vertex(E_schriftbild_5 + (2 * H_vnb_vermindert) - (strichstaerke), H_linie);
// M.vertex(E_schriftbild_5 + (2 * H_vnb_vermindert) - (strichstaerke), grundlinie);
// M.endShape();
// N
N.push();
N.beginShape();
N.strokeWeight(strichstaerke);
N.strokeCap(PROJECT);
N.strokeJoin(ROUND);
N.vertex(H_vnb_vermindert + (strichstaerke / 2), grundlinie);
N.vertex(H_vnb_vermindert + (strichstaerke / 2), H_linie);
N.vertex(H_vnb_vermindert + E_schriftbild_5 - (strichstaerke / 2), grundlinie);
N.vertex(H_vnb_vermindert + E_schriftbild_5 - (strichstaerke / 2), H_linie);
N.endShape();
N.pop();
N.push();
N.fill(buchstaben_hintergrund);
N.noStroke();
N.rect(0, 0, (2 * H_vnb_vermindert) + E_schriftbild_5, H_linie);
N.rect(0, grundlinie, (2 * H_vnb_vermindert) + E_schriftbild_5, (schriftgrad * 0.95) - grundlinie);
N.pop();
// P
P.push();
P.beginShape();
P.strokeWeight(strichstaerke);
P.strokeCap(SQUARE);
P.vertex(H_vnb , H_linie);
P.vertex(H_vnb , grundlinie);
P.endShape();
P.pop();
P.push();
P.strokeWeight(strichstaerke);
P.beginShape();
P.vertex(H_vnb , H_linie + (strichstaerke / 2));
P.vertex(H_vnb + strichstaerke + (E_schriftbild_7 /3), H_linie + (strichstaerke /2));
P.endShape();
P.beginShape();
P.vertex(H_vnb , versalien_hilfslinie_1);
P.vertex(H_vnb + strichstaerke + (E_schriftbild_7 /3), versalien_hilfslinie_1);
P.endShape();
P.pop();

// Die Bézier-Kurve wurde mithilfe von ChatGPT 3.5 erstellt.
////////////////////////////////////////////////////////////////////////////////////
P.push();
P.strokeWeight(strichstaerke);
P.strokeCap(SQUARE);
P.noFill();
P.beginShape();
P.vertex(H_vnb + strichstaerke + (E_schriftbild_7 / 3), H_linie + (strichstaerke / 2));
// Control points for bezier curve - adjust as needed for desired curvature
let controlX1 = H_vnb + strichstaerke + (E_schriftbild_7 / 2) + 30;
let controlY1 = H_linie + (strichstaerke / 2) ;
let controlX2 = H_vnb + strichstaerke + (E_schriftbild_7 / 2) + 20;
let controlY2 = versalien_hilfslinie_1;
P.bezierVertex(controlX1, controlY1, controlX2, controlY2, H_vnb + strichstaerke + (E_schriftbild_7 / 3), versalien_hilfslinie_1);
P.endShape();
P.pop();
/////////////////////////////////////////////////////////////////////////////////////


// Q
// Gemäss der Erstellung des O
Q.beginShape();
Q.fill('black');

// Outer ellipse
Q.vertex(centerX + outerRadiusX, centerY);
Q.bezierVertex(centerX + outerRadiusX, centerY - oy, 
               centerX + ox, centerY - outerRadiusY, 
               centerX, centerY - outerRadiusY);
Q.bezierVertex(centerX - ox, centerY - outerRadiusY, 
               centerX - outerRadiusX, centerY - oy, 
               centerX - outerRadiusX, centerY);
Q.bezierVertex(centerX - outerRadiusX, centerY + oy, 
               centerX - ox, centerY + outerRadiusY, 
               centerX, centerY + outerRadiusY);
Q.bezierVertex(centerX + ox, centerY + outerRadiusY, 
               centerX + outerRadiusX, centerY + oy, 
               centerX + outerRadiusX, centerY);

Q.beginContour();

// Inner ellipse
Q.vertex(centerX + innerRadiusX, centerY);
Q.bezierVertex(centerX + innerRadiusX, centerY + iy, 
               centerX + ix, centerY + innerRadiusY, 
               centerX, centerY + innerRadiusY);
Q.bezierVertex(centerX - ix, centerY + innerRadiusY, 
               centerX - innerRadiusX, centerY + iy, 
               centerX - innerRadiusX, centerY);
Q.bezierVertex(centerX - innerRadiusX, centerY - iy, 
               centerX - ix, centerY - innerRadiusY, 
               centerX, centerY - innerRadiusY);
Q.bezierVertex(centerX + ix, centerY - innerRadiusY, 
               centerX + innerRadiusX, centerY - iy, 
               centerX + innerRadiusX, centerY);

Q.endContour();
Q.endShape(CLOSE);
Q.push();
Q.beginShape();
Q.strokeWeight(strichstaerke_waagerecht);
Q.strokeCap(SQUARE);
Q.vertex(O_vnb + (O_schriftbild * 0.66), grundlinie - (O_versalhoehe * 0.33));
Q.vertex(O_vnb + O_schriftbild - O_vnb, grundlinie);
Q.endShape();
Q.pop();

// S
// S.push();
// S.strokeWeight(strichstaerke);
// S.strokeCap(SQUARE);
// S.noFill();
// S.beginShape();
// S.vertex(H_vnb , mittellinie);
// let S_controlX1 = H_vnb + (strichstaerke/2) + (schriftgrad * 0.35);
// let S_controlY1 = mittellinie;
// let S_controlX2 = H_vnb + (strichstaerke/2)+ (schriftgrad * 0.35);
// let S_controlY2 = grundlinie + (schriftgrad * 0.1);
// S.bezierVertex(S_controlX1, S_controlY1, S_controlX2, S_controlY2, H_vnb , grundlinie );
// S.endShape();
// S.pop();
// S.push();
// S.strokeWeight(strichstaerke);
// S.strokeCap(SQUARE);
// S.noFill();
// S.beginShape();
// S.vertex(Versal_vbn_augenmass + E_schriftbild_7 , H_linie_ueberhang);
// let S2_controlX1 = Versal_vbn_augenmass + E_schriftbild_7 - (schriftgrad * 0.35);
// let S2_controlY1 = H_linie_ueberhang - (schriftgrad * 0.1);
// let S2_controlX2 = Versal_vbn_augenmass + E_schriftbild_7- (schriftgrad * 0.35);
// let S2_controlY2 = mittellinie;
// S.bezierVertex(S2_controlX1, S2_controlY1, S2_controlX2, S2_controlY2,Versal_vbn_augenmass + E_schriftbild_7 , mittellinie );
// S.endShape();
// S.pop();



// S.push();
// S.strokeWeight(strichstaerke);
// S.strokeCap(ROUND);
// S.noFill();

// // Top half of the "S"
// S.beginShape();
// S.vertex(Versal_vbn_augenmass + E_schriftbild_7, H_linie_ueberhang); // Start point of S

// Control points for the top half of the "S"
// let S_controlX1 = Versal_vbn_augenmass + E_schriftbild_7 - (schriftgrad * 0.35);
// let S_controlY1 = H_linie_ueberhang;
// let S_controlX2 = Versal_vbn_augenmass + E_schriftbild_7 - (schriftgrad * 0.35);
// let S_controlY2 = mittellinie_ueberhang;
// let S_endX1 = Versal_vbn_augenmass + (E_schriftbild_7 / 2);
// let S_endY1 = mittellinie_ueberhang + 30;

// S.bezierVertex(S_controlX1, S_controlY1, S_controlX2, S_controlY2, S_endX1, S_endY1);
// S.endShape();

// Bottom half of the "S"
// S.beginShape();
// S.vertex(S_endX1, S_endY1); // Start from the end of the top half

// // Control points for the bottom half of the "S"
// let S_controlX3 = H_vnb + (E_schriftbild_7 / 2) + (schriftgrad * 0.2);
// let S_controlY3 = mittellinie_ueberhang + (schriftgrad* 0.2);
// let S_controlX4 = H_vnb + (E_schriftbild_7 / 2) + (schriftgrad * 0.2);
// let S_controlY4 = grundlinie + (schriftgrad*0.05);
// let S_endX2 = Versal_vbn_augenmass ;
// let S_endY2 = grundlinie;

// S.bezierVertex(S_controlX3, S_controlY3, S_controlX4, S_controlY4, S_endX2, S_endY2);
// S.endShape();

// S.pop();
// T
T.beginShape();
T.strokeWeight(strichstaerke);
T.strokeCap(SQUARE);
T.vertex((E_schriftbild_2 + (2 * Versal_vbn_minimal))/2, H_linie+(strichstaerke/2));
T.vertex((E_schriftbild_2 + (2 * Versal_vbn_minimal))/2, grundlinie);
T.endShape();
T.beginShape();
T.strokeWeight(strichstaerke_waagerecht);
T.vertex(Versal_vbn_minimal, H_linie + (strichstaerke/2));
T.vertex(Versal_vbn_minimal + E_schriftbild_2, H_linie + (strichstaerke/2));
T.endShape();
// U
// U.push();
// U.beginShape();
// U.strokeWeight(strichstaerke);
// U.strokeCap(SQUARE);
// U.vertex(E_schriftbild_7 + H_vnb, H_linie);
// U.vertex(E_schriftbild_7 + H_vnb, grundlinie);
// U.endShape();
// U.beginShape();
// U.vertex(H_vnb, H_linie);
// U.vertex(H_vnb, H_linie + (O_versalhoehe * 0.66));
// U.endShape();
// U.pop();



// U.push();
// U.strokeWeight(strichstaerke);
// U.strokeCap(SQUARE);


// U.beginShape();
// U.vertex(E_schriftbild_7 + H_vnb, H_linie);
// U.vertex(E_schriftbild_7 + H_vnb, grundlinie);
// U.endShape();
// U.beginShape();
// U.vertex(H_vnb, H_linie);
// U.vertex(H_vnb, H_linie + (O_versalhoehe * 0.66));
// U.endShape();


// U.beginShape();
// U.vertex(startX, startY);
// U.bezierVertex(U_controlX1, U_controlY1, U_controlX2, U_controlY2, endX, endY);
// U.endShape();
// U.pop();
// V

V.beginShape();
V.stroke(0);
V.strokeWeight(strichstaerke);
V.strokeCap(PROJECT);
V.strokeJoin(BEVEL);
V.vertex(Versal_vbn_minimal + (strichstaerke/2), H_linie);
V.vertex((E_schriftbild_4 + (2 * Versal_vbn_minimal))/2, grundlinie);
V.vertex(Versal_vbn_minimal + E_schriftbild_4  -(strichstaerke/2), H_linie);
V.endShape();
V.beginShape();
V.fill('white');
V.noStroke();
V.vertex(0, 0);
V.vertex(0, H_linie);
V.vertex(E_schriftbild_4 + (2 * Versal_vbn_minimal), H_linie);
V.vertex(E_schriftbild_4 + (2 * Versal_vbn_minimal), 0);
V.vertex(0, 0);
V.endShape();
V.beginShape();
V.vertex(0,grundlinie);
V.vertex(0, schriftgrad * 0.95);
V.vertex(E_schriftbild_4 + (2 * Versal_vbn_minimal), schriftgrad * 0.95);
V.vertex(E_schriftbild_4 + (2 * Versal_vbn_minimal), grundlinie);
V.endShape();

// X
X.push();
X.beginShape();
X.strokeCap(PROJECT);
X.strokeWeight(strichstaerke);
X.vertex(Versal_vbn_minimal + (strichstaerke / 2) + Versal_vbn_minimal, H_linie);
X.vertex(Versal_vbn_minimal + E_schriftbild_6 - (strichstaerke / 2) -  Versal_vbn_minimal, grundlinie);
X.endShape();
X.beginShape();
X.vertex(Versal_vbn_minimal + E_schriftbild_6 - (strichstaerke / 2) - Versal_vbn_minimal, H_linie);
X.vertex(Versal_vbn_minimal + (strichstaerke / 2) +  Versal_vbn_minimal, grundlinie);
X.endShape();
X.pop();
X.push();
X.fill(buchstaben_hintergrund);
X.noStroke();
X.rect(0, 0, (2 * Versal_vbn_minimal) + E_schriftbild_6, H_linie);
X.rect(0, grundlinie, (2 * Versal_vbn_minimal) + E_schriftbild_6, (schriftgrad * 0.95) - grundlinie);
X.pop();
// Y 4,minimal
Y.push();
Y.beginShape();
Y.strokeWeight(strichstaerke);
Y.strokeCap(PROJECT);
Y.vertex(Versal_vbn_minimal + (strichstaerke / 2) + Versal_vbn_minimal, H_linie);
Y.vertex(Versal_vbn_minimal + (E_schriftbild_6 / 2) , versalien_hilfslinie_1);
Y.vertex(Versal_vbn_minimal + E_schriftbild_6 - Versal_vbn_minimal - (strichstaerke / 2), H_linie);
Y.endShape();
Y.beginShape();
Y.vertex(Versal_vbn_minimal + (E_schriftbild_6 / 2), versalien_hilfslinie_1);
Y.vertex(Versal_vbn_minimal + (E_schriftbild_6 / 2), grundlinie);
Y.endShape();
Y.pop();
Y.push();
Y.fill(buchstaben_hintergrund);
Y.noStroke();
Y.rect(0, 0, (2 * Versal_vbn_minimal) + E_schriftbild_6, H_linie);
Y.rect(0, grundlinie, (2 * Versal_vbn_minimal) + E_schriftbild_6, (schriftgrad * 0.95) - grundlinie);
Y.pop();





////////////////////////////////////////////////////////
// Das Rauschen wurde mithilfe von ChatGPT 3.5 erstellt.   
///////////////////////////////////////////////////////////////////////////////////////
//Wiggly vertical line
// H.beginShape(form_art);
// H.stroke(0);
// H.strokeCap(ROUND);
// H.strokeJoin(BEVEL);
// H.strokeWeight(strichstaerke_fein);
// let y1 = H_linie;
// let y2 = grundlinie;
// for (let y = y1; y <= y2; y += 5) {
//     let x = H_vnb + map(noise(noiseOffset, y * 0.05), 0, 1, -10, 40);
//     H.vertex(x, y);
// }
// H.endShape();
  
// //Wiggly vertical line on the right
// H.beginShape(form_art);
// H.stroke(0);
// for (let y = y1; y <= y2; y += 5) {
//     let x =  E_schriftbild_3 + map(noise(noiseOffset, y * (-0.1)), 0, 1, -10, 40);
//     H.vertex(x, y);
// }
// H.endShape();
  
// //Wiggly horizontal line
// H.beginShape(form_art);
// H.strokeWeight(strichstaerke_fein);
// H.stroke(0);
// let x1 = H_vnb;
// let x2 = H_vnb + E_schriftbild_3;
// for (let x = x1; x <= x2; x += 5) {
//     let y = versalien_hilfslinie_1 + map(noise(noiseOffset, x * 0.05), 0, 1, -10, 40);
//     H.vertex(x, y);
// }
// H.endShape();
  
 noiseOffset += 100;  // Increment noise offset for animation effect -> spannende Zahlen; 500, 0.1, 0.01, 0.02
//////////////////////////////////////////////////////////////////////////////////////////////
 
// Z E_schriftbild_3 +(2 * H_vnb_halbiert)
Z.push();
// Horizontale Linie oben
Z.beginShape(form_art);
Z.strokeWeight(strichstaerke_fein);
Z.strokeCap(SQUARE);
Z.strokeJoin(ROUND);
let Z_x1 = H_vnb_halbiert;
let Z_x2 = H_vnb_halbiert + E_schriftbild_3;
for (let x = Z_x1; x <= Z_x2; x += 5) {
    let y = H_linie + (strichstaerke / 2) + map(noise(noiseOffset, x * 0.05), 0, 1, -10, 40);
    Z.vertex(x, y);
}
Z.endShape();
Z.pop();
// Horizontale Linie unten
Z.push();
Z.strokeWeight(strichstaerke_fein);
Z.beginShape(form_art);
for (let x = Z_x1; x <= Z_x2; x += 5) {
    let y = grundlinie - (strichstaerke / 2) + map(noise(noiseOffset, x * 0.05), 0, 1, -10, 40);
    Z.vertex(x, y);}
Z.endShape();
Z.pop();

// Diagonale Linie
let ZD_x1 = H_vnb_halbiert + E_schriftbild_3;
let ZD_y1 =  H_linie ;
let ZD_x2 = H_vnb_halbiert;
let ZD_y2 = grundlinie ;
Z.push();

//let totalDist = dist(ZD_x1, ZD_y1, ZD_x2, ZD_y2);
  
Z.beginShape(form_art);
Z.stroke(0);
Z.strokeWeight(strichstaerke_fein);
Z.strokeCap(ROUND);
Z.strokeJoin(BEVEL);

// Für die for-Schleife  wurde ChatGPT 3.5 zu Hilfe genommen.
  // Step through the line in small increments
  for (let t = 0; t <= 1; t += 0.02) {
    // Linear interpolation between the start and end points
    let x = lerp(ZD_x1, ZD_x2, t);
    let y = lerp(ZD_y1, ZD_y2, t);
    
    // Apply noise to x and y coordinates
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    Z.vertex(x + xOffset, y + yOffset);
  }
//////////////////////////////////

Z.endShape();
Z.pop();

// Z.vertex(H_vnb_halbiert, H_linie + (strichstaerke / 2));
// Z.vertex(H_vnb_halbiert + E_schriftbild_3, H_linie + (strichstaerke / 2));
// Z.vertex(H_vnb_halbiert, grundlinie - (strichstaerke / 2));
// Z.vertex(H_vnb_halbiert + E_schriftbild_3,grundlinie - (strichstaerke / 2));
// Z.endShape();
//Z.pop();
// Z.push();
// Z.fill(buchstaben_hintergrund);
// Z.noStroke();
// Z.rect(0, 0, H_vnb_halbiert, schriftgrad * 0.95);
// Z.rect(H_vnb_halbiert + E_schriftbild_3, 0, H_vnb_halbiert, schriftgrad * 0.95);
// Z.pop();

// W
// Diagonale Linie 1
let WD_x1 = Versal_vbn_minimal + (strichstaerke / 2);
let WD_y1 =  H_linie ;
let WD_x2 =((Versal_vbn_minimal + (strichstaerke / 2)) + (((2 * H_vnb_vermindert) + E_schriftbild_5) / 2)) / 2;
let WD_y2 = grundlinie ;
W.push();
W.beginShape(form_art);
W.strokeJoin(BEVEL);
W.strokeCap(PROJECT);
W.stroke(255);
W.fill(0);
W.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(WD_x1, WD_x2, t);
    let y = lerp(WD_y1, WD_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    W.vertex(x + xOffset, y + yOffset);
  }

W.endShape();
W.pop();

// Diagonale Linie 2
let WD_2_x1 = ((Versal_vbn_minimal + (strichstaerke / 2)) + (((2 * H_vnb_vermindert) + E_schriftbild_5) / 2)) / 2;
let WD_2_y1 =  grundlinie ;
let WD_2_x2 = (((2 * H_vnb_vermindert) + E_schriftbild_5) / 2);
let WD_2_y2 = H_linie ;
W.push();
W.beginShape(form_art);
W.strokeJoin(BEVEL);
W.strokeCap(PROJECT);
W.stroke(0);
W.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(WD_2_x1, WD_2_x2, t);
    let y = lerp(WD_2_y1, WD_2_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    W.vertex(x + xOffset, y + yOffset);
  }

W.endShape();
W.pop();

// Diagonale Linie 3
let WD_3_x1 = (((2 * H_vnb_vermindert) + E_schriftbild_5) / 2);
let WD_3_y1 =  H_linie ;
let WD_3_x2 = (((2 * H_vnb_vermindert) + (E_schriftbild_5) - Versal_vbn_minimal - (strichstaerke / 2)) + (((2 * H_vnb_vermindert) + E_schriftbild_5) / 2)) / 2;
let WD_3_y2 = grundlinie ;
W.push();
W.beginShape(form_art);
W.strokeJoin(BEVEL);
W.strokeCap(ROUND);
W.stroke(0);
//W.fill(0);
W.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(WD_3_x1, WD_3_x2, t);
    let y = lerp(WD_3_y1, WD_3_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    W.vertex(x + xOffset, y + yOffset);
  }

W.endShape();
W.pop();

// Diagonale Linie 4
let WD_4_x1 = (((2 * H_vnb_vermindert) + (E_schriftbild_5) - Versal_vbn_minimal - (strichstaerke / 2)) + (((2 * H_vnb_vermindert) + E_schriftbild_5) / 2)) / 2;
let WD_4_y1 =  grundlinie ;
let WD_4_x2 = (2 * H_vnb_vermindert) + (E_schriftbild_5) - Versal_vbn_minimal - (strichstaerke / 2);
let WD_4_y2 = H_linie ;
W.push();
W.beginShape(form_art);
W.strokeJoin(BEVEL);
W.strokeCap(PROJECT);
W.stroke(255);
W.fill(0);
W.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(WD_4_x1, WD_4_x2, t);
    let y = lerp(WD_4_y1, WD_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    W.vertex(x + xOffset, y + yOffset);
  }

W.endShape();
W.pop();

// W.vertex(Versal_vbn_minimal + (strichstaerke / 2), H_linie);
// W.vertex(((Versal_vbn_minimal + (strichstaerke / 2)) + (((2 * H_vnb_vermindert) + E_schriftbild_5) / 2)) / 2, grundlinie);
// W.vertex((((2 * H_vnb_vermindert) + E_schriftbild_5) / 2), H_linie);
// W.vertex((((2 * H_vnb_vermindert) + (E_schriftbild_5) - Versal_vbn_minimal - (strichstaerke / 2)) + (((2 * H_vnb_vermindert) + E_schriftbild_5) / 2)) / 2, grundlinie);
// W.vertex((2 * H_vnb_vermindert) + (E_schriftbild_5) - Versal_vbn_minimal - (strichstaerke / 2) , H_linie);
// W.endShape();
// W.pop();
// W.push();
// W.fill(buchstaben_hintergrund);
// W.noStroke();
// W.rect(0, 0, E_schriftbild_5 + ( 2 * H_vnb_vermindert), H_linie);
// W.pop();



// // U
// let startX = H_vnb + (strichstaerke);
// let startY = H_linie + (O_versalhoehe * 0.66);
// let endX = H_vnb + E_schriftbild_7;
// let endY = H_linie + (O_versalhoehe * 0.66);
// let U_controlX1 = H_vnb + (E_schriftbild_7 / 4) - 38;
// let U_controlY1 = grundlinie;
// let U_controlX2 = H_vnb + (3 * E_schriftbild_7 / 4) -10;
// let U_controlY2 = grundlinie +38;
// // Vertikale Linie rechts
// U.push();

// U.beginShape(form_art);
// U.strokeWeight(strichstaerke_fein);
// U.strokeCap(SQUARE);
// U.stroke(0);
// for (let y = H_linie; y <= grundlinie; y += 0.05) {
//   let x = E_schriftbild_7 + H_vnb + map(noise(noiseOffset, y * 5), 0, 1, -30, 40);
//   U.vertex(x, y);
// }
// U.endShape();
// U.pop();

// // Vertikale Linie links
// U.push();
// U.beginShape(form_art);
// U.strokeWeight(strichstaerke_fein);
// U.strokeCap(SQUARE);
// U.stroke(0);
// for (let y = H_linie; y <= H_linie + (O_versalhoehe * 0.66); y += 3) {
//   let x = H_vnb + (strichstaerke) + map(noise(noiseOffset, y * 0.5), 0, 1, -30, 30);
//   U.vertex(x, y);
// }
// U.endShape();
// U.pop();

// // Für die Bézier Kurve und ihren Noise wurde ChatGPT 3.5 verwendet.
// U.push();
// U.beginShape(form_art);
// U.strokeWeight(strichstaerke_fein);
// U.strokeCap(SQUARE);
// U.stroke(0);

// for (let t = 0; t <= 1; t += 0.5) {
//   let x = bezierPoint(startX, U_controlX1, U_controlX2, endX, t);
//   let y = bezierPoint(startY, U_controlY1, U_controlY2, endY, t);

//   x += map(noise(noiseOffset, t * 5), 0, 1, -25, 40);
//   y += map(noise(noiseOffset + 1000, t * 0.05), 0, 1, -30, 40);

//   U.vertex(x, y);
// }
// U.endShape();
// U.pop();
/////////////////////////////////////////////////////////////



// I
// I.beginShape(form_art);
// I.stroke(0);
// I.strokeCap(ROUND);
// I.strokeJoin(BEVEL);
// I.strokeWeight(strichstaerke_fein);
// let I_y1 = H_linie;
// let I_y2 = grundlinie;
// for (let y = I_y1; y <= I_y2; y += 8) {
//     let x =H_vnb + (strichstaerke / 2) + map(noise(noiseOffset, y * 0.05), 0, 1, -10, 100);
//     I.vertex(x, y);
// }
// I.endShape();
let I_4_x1 = H_vnb + (strichstaerke / 2);
let I_4_y1 =  grundlinie ;
let I_4_x2 = H_vnb + (strichstaerke / 2);
let I_4_y2 = H_linie ;
I.push();
I.beginShape(form_art);
I.strokeJoin(BEVEL);
I.strokeCap(PROJECT);
I.stroke(255);
I.fill(0);
I.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(I_4_x1, I_4_x2, t);
    let y = lerp(I_4_y1, I_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    I.vertex(x + xOffset, y + yOffset);
  }

I.endShape();
I.pop();

// I.push();
// I.beginShape();
// I.strokeWeight(strichstaerke);
// I.strokeCap(SQUARE);
// I.vertex(H_vnb + (strichstaerke / 2), H_linie);
// I.vertex(H_vnb + (strichstaerke / 2), grundlinie);
// I.endShape();
// I.pop();

// L
// L.beginShape();
// L.strokeCap(SQUARE);
// L.strokeWeight(strichstaerke);
// L.vertex(H_vnb + (strichstaerke / 2), H_linie);
// L.vertex(H_vnb + (strichstaerke / 2), grundlinie-(strichstaerke/2));
// L.endShape();
// L.beginShape();
// L.strokeWeight(strichstaerke_waagerecht);
// L.vertex(H_vnb , grundlinie - (strichstaerke/2));
// L.vertex(H_vnb + E_schriftbild_1, grundlinie- (strichstaerke/2));
// L.endShape();

let L_4_x1 = H_vnb + (strichstaerke / 2);
let L_4_y1 =  H_linie ;
let L_4_x2 = H_vnb + (strichstaerke / 2);
let L_4_y2 = grundlinie ;
L.push();
L.beginShape(form_art);
L.strokeJoin(BEVEL);
L.strokeCap(PROJECT);
L.stroke(255);
L.fill(0);
L.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(L_4_x1, L_4_x2, t);
    let y = lerp(L_4_y1, L_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    L.vertex(x + xOffset, y + yOffset);
  }

L.endShape();
L.pop();
let L2_4_x1 = H_vnb + (strichstaerke);
let L2_4_y1 =  grundlinie -(strichstaerke/2) ;
let L2_4_x2 = H_vnb + E_schriftbild_1;
let L2_4_y2 = grundlinie - (strichstaerke/2);
L.push();
L.beginShape(form_art);
L.strokeJoin(BEVEL);
L.strokeCap(PROJECT);
L.stroke(0);
L.fill(255);
L.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(L2_4_x1, L2_4_x2, t);
    let y = lerp(L2_4_y1, L2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    L.vertex(x + xOffset, y + yOffset);
  }

L.endShape();
L.pop();

// D
// D.push();
// D.beginShape();
// D.strokeWeight(strichstaerke);
// D.strokeCap(SQUARE);
// D.vertex(H_vnb + (strichstaerke/2), H_linie);
// D.vertex(H_vnb + (strichstaerke/2), grundlinie);
// D.endShape();
// D.pop();

// D.push();
// D.strokeWeight(strichstaerke_fein);
// D.strokeCap(SQUARE);
// D.stroke(0);
// D.noFill();
// D.beginShape();
// D.vertex(H_vnb , H_linie);
// let D_controlX1 = H_vnb + (strichstaerke/2) + (schriftgrad * 0.5);
// let D_controlY1 = H_linie - (schriftgrad * 0.05);
// let D_controlX2 = H_vnb + (strichstaerke/2)+ (schriftgrad * 0.5);
// let D_controlY2 = grundlinie + + (schriftgrad * 0.05);
// D.bezierVertex(D_controlX1, D_controlY1, D_controlX2, D_controlY2, H_vnb , grundlinie );
// D.endShape();
// D.pop();
D.push();
D.noStroke();
D.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
D.pop();
let D_4_x1 = H_vnb + (strichstaerke/2);
let D_4_y1 = H_linie ;
let D_4_x2 = H_vnb + (strichstaerke/2);
let D_4_y2 = grundlinie;
D.push();
D.beginShape(form_art);
D.strokeJoin(BEVEL);
D.strokeCap(PROJECT);
D.stroke(255);
D.fill(0);
D.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(D_4_x1, D_4_x2, t);
    let y = lerp(D_4_y1, D_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    D.vertex(x + xOffset, y + yOffset);
  }

D.endShape();
D.pop();

D.push();
D.noStroke();
D.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
D.pop();
let D2_4_x1 = H_vnb + (strichstaerke/2);
let D2_4_y1 = grundlinie ;
let D2_4_x2 = H_vnb + E_schriftbild_2;
let D2_4_y2 = mittellinie;
D.push();
D.beginShape(form_art);
D.strokeJoin(BEVEL);
D.strokeCap(PROJECT);
D.stroke(0);
D.fill(255);
D.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(D2_4_x1, D2_4_x2, t);
    let y = lerp(D2_4_y1, D2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    D.vertex(x + xOffset, y + yOffset);
  }

D.endShape();
D.pop();

D.push();
D.noStroke();
D.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
D.pop();
let D3_4_x1 = H_vnb + E_schriftbild_2;
let D3_4_y1 = mittellinie ;
let D3_4_x2 = H_vnb + (strichstaerke/2);
let D3_4_y2 = H_linie;
D.push();
D.beginShape(form_art);
D.strokeJoin(BEVEL);
D.strokeCap(PROJECT);
D.stroke(0);
D.fill(255);
D.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(D3_4_x1, D3_4_x2, t);
    let y = lerp(D3_4_y1, D3_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    D.vertex(x + xOffset, y + yOffset);
  }

D.endShape();
D.pop();

// U
U.push();
U.noStroke();
U.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
U.pop();
let U_4_x1 = H_vnb + (strichstaerke);
let U_4_y1 = H_linie ;
let U_4_x2 = H_vnb + (strichstaerke);
let U_4_y2 = grundlinie;
U.push();
U.beginShape(form_art);
U.strokeJoin(BEVEL);
U.strokeCap(PROJECT);
U.stroke(255);
U.fill(0);
U.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(U_4_x1, U_4_x2, t);
    let y = lerp(U_4_y1, U_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    U.vertex(x + xOffset, y + yOffset);
  }

U.endShape();
U.pop();

U.push();
U.noStroke();
//U.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
U.pop();
let U2_4_x1 = E_schriftbild_7 + H_vnb;
let U2_4_y1 = H_linie ;
let U2_4_x2 = E_schriftbild_7 + H_vnb;
let U2_4_y2 = grundlinie;
U.push();
U.beginShape(form_art);
U.strokeJoin(BEVEL);
U.strokeCap(PROJECT);
U.stroke(255);
U.fill(0);
U.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(U2_4_x1, U2_4_x2, t);
    let y = lerp(U2_4_y1, U2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    U.vertex(x + xOffset, y + yOffset);
  }

U.endShape();
U.pop();

U.push();
U.noStroke();
//U.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
U.pop();
let U3_4_x1 = H_vnb + (strichstaerke);
let U3_4_y1 = grundlinie ;
let U3_4_x2 = E_schriftbild_7 + H_vnb;
let U3_4_y2 = grundlinie - (O_versalhoehe* 0.33);
U.push();
U.beginShape(form_art);
U.strokeJoin(BEVEL);
U.strokeCap(PROJECT);
U.stroke(0);
U.fill(255);
U.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(U3_4_x1, U3_4_x2, t);
    let y = lerp(U3_4_y1, U3_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    U.vertex(x + xOffset, y + yOffset);
  }

U.endShape();
U.pop();

// E_schriftbild_2 + O_vnb + H_vnb_halbiert
// C
C.push();
C.noStroke();
C.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
C.pop();
let C_4_x1 = O_vnb + E_schriftbild_2 +40;
let C_4_y1 = H_linie ;
let C_4_x2 = O_vnb +40;
let C_4_y2 = mittellinie;
C.push();
C.beginShape(form_art);
C.strokeJoin(BEVEL);
C.strokeCap(PROJECT);
C.stroke(0);
C.fill(255);
C.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(C_4_x1, C_4_x2, t);
    let y = lerp(C_4_y1, C_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    C.vertex(x + xOffset, y + yOffset);
  }

C.endShape();
C.pop();

C.push();
C.noStroke();
C.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
C.pop();
let C2_4_x1 = O_vnb+40 ;
let C2_4_y1 = mittellinie ;
let C2_4_x2 =  E_schriftbild_2;
let C2_4_y2 = grundlinie;
C.push();
C.beginShape(form_art);
C.strokeJoin(BEVEL);
C.strokeCap(PROJECT);
C.stroke(0);
C.fill(255);
C.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(C2_4_x1, C2_4_x2, t);
    let y = lerp(C2_4_y1, C2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    C.vertex(x + xOffset, y + yOffset);
  }

C.endShape();
C.pop();

// H
H.push();
H.noStroke();
H.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
H.pop();
let H_4_x1 = H_vnb ;
let H_4_y1 = H_linie ;
let H_4_x2 =  H_vnb;
let H_4_y2 = grundlinie;
H.push();
H.beginShape(form_art);
H.strokeJoin(BEVEL);
H.strokeCap(PROJECT);
H.stroke(255);
H.fill(0);
H.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(H_4_x1, H_4_x2, t);
    let y = lerp(H_4_y1, H_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    H.vertex(x + xOffset, y + yOffset);
  }

H.endShape();
H.pop();

H.push();
H.noStroke();
H.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
H.pop();
let H2_4_x1 = H_vnb + E_schriftbild_3;
let H2_4_y1 = H_linie ;
let H2_4_x2 =  H_vnb + E_schriftbild_3;
let H2_4_y2 = grundlinie;
H.push();
H.beginShape(form_art);
H.strokeJoin(BEVEL);
H.strokeCap(PROJECT);
H.stroke(255);
H.fill(0);
H.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(H2_4_x1, H2_4_x2, t);
    let y = lerp(H2_4_y1, H2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    H.vertex(x + xOffset, y + yOffset);
  }

H.endShape();
H.pop();

H.push();
H.noStroke();
H.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
H.pop();
let H3_4_x1 = H_vnb ;
let H3_4_y1 = versalien_hilfslinie_1 ;
let H3_4_x2 =  H_vnb + E_schriftbild_3;
let H3_4_y2 = versalien_hilfslinie_1;
H.push();
H.beginShape(form_art);
H.strokeJoin(BEVEL);
H.strokeCap(PROJECT);
H.stroke(0);
H.fill(255);
H.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(H3_4_x1, H3_4_x2, t);
    let y = lerp(H3_4_y1, H3_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    H.vertex(x + xOffset, y + yOffset);
  }

H.endShape();
H.pop();

// S
// E_schriftbild_7 + (2 * Versal_vbn_augenmass)
S.push();
S.noStroke();
S.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
S.pop();
let S_4_x1 = Versal_vbn_augenmass + E_schriftbild_7 ;
let S_4_y1 = H_linie ;
let S_4_x2 =  Versal_vbn_augenmass +40;
let S_4_y2 = versalien_hilfslinie_1 - (O_versalhoehe * 0.33);
S.push();
S.beginShape(form_art);
S.strokeJoin(BEVEL);
S.strokeCap(PROJECT);
S.stroke(255);
S.fill(0);
S.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(S_4_x1, S_4_x2, t);
    let y = lerp(S_4_y1, S_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    S.vertex(x + xOffset, y + yOffset);
  }

S.endShape();
S.pop();

S.push();
S.noStroke();
S.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
S.pop();
let S2_4_x1 = Versal_vbn_augenmass +40 ;
let S2_4_y1 = versalien_hilfslinie_1 - (O_versalhoehe * 0.33) ;
let S2_4_x2 =  Versal_vbn_augenmass + E_schriftbild_7;
let S2_4_y2 = grundlinie - (O_versalhoehe * 0.33);
S.push();
S.beginShape(form_art);
S.strokeJoin(BEVEL);
S.strokeCap(PROJECT);
S.stroke(0);
S.fill(255);
S.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(S2_4_x1, S2_4_x2, t);
    let y = lerp(S2_4_y1, S2_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    S.vertex(x + xOffset, y + yOffset);
  }

S.endShape();
S.pop();

S.push();
S.noStroke();
S.fill(buchstaben_hintergrund);
// D.rect(0, 0, H_vnb, schriftgrad * 0.95);
S.pop();
let S3_4_x1 = Versal_vbn_augenmass + E_schriftbild_7 ;
let S3_4_y1 = grundlinie - (O_versalhoehe * 0.33) ;
let S3_4_x2 =  Versal_vbn_augenmass +40;
let S3_4_y2 = grundlinie;
S.push();
S.beginShape(form_art);
S.strokeJoin(BEVEL);
S.strokeCap(PROJECT);
S.stroke(255);
S.fill(0);
S.strokeWeight(strichstaerke_fein);

  for (let t = 0; t <= 1; t += 0.5) {
    let x = lerp(S3_4_x1, S3_4_x2, t);
    let y = lerp(S3_4_y1, S3_4_y2, t);
    let xOffset = map(noise(noiseOffset, t * 5), 0, 1, -30, 40);
    let yOffset = map(noise(noiseOffset + 1000, t * 5), 0, 1, -10, 40);  // Different noise offset for y to make the wiggle more irregular
    
    S.vertex(x + xOffset, y + yOffset);
  }

S.endShape();
S.pop();

// H.beginShape(form_art);
// H.stroke(0);
// H.strokeCap(ROUND);
// H.strokeJoin(BEVEL);
// H.strokeWeight(strichstaerke_fein);
// let y1 = H_linie;
// let y2 = grundlinie;
// for (let y = y1; y <= y2; y += 5) {
//     let x = H_vnb + map(noise(noiseOffset, y * 0.05), 0, 1, -10, 40);
//     H.vertex(x, y);
// }
// H.endShape();
  
// //Wiggly vertical line on the right
// H.beginShape(form_art);
// H.stroke(0);
// for (let y = y1; y <= y2; y += 5) {
//     let x =  E_schriftbild_3 + map(noise(noiseOffset, y * (-0.1)), 0, 1, -10, 40);
//     H.vertex(x, y);
// }
// H.endShape();
  
// //Wiggly horizontal line
// H.beginShape(form_art);
// H.strokeWeight(strichstaerke_fein);
// H.stroke(0);
// let x1 = H_vnb;
// let x2 = H_vnb + E_schriftbild_3;
// for (let x = x1; x <= x2; x += 5) {
//     let y = versalien_hilfslinie_1 + map(noise(noiseOffset, x * 0.05), 0, 1, -10, 40);
//     H.vertex(x, y);
// }
// H.endShape();

// R
R.push();
R.strokeCap(SQUARE);
R.beginShape();
R.strokeWeight(strichstaerke_fein);




R.vertex(H_vnb, H_linie);
R.vertex(H_vnb, grundlinie);
R.endShape();
R.pop();
R.push();
R.strokeWeight(strichstaerke);
R.beginShape();
R.vertex(H_vnb , H_linie + (strichstaerke / 2));
R.vertex(H_vnb + strichstaerke + (E_schriftbild_7 /3), H_linie + (strichstaerke /2));
R.endShape();
R.beginShape();
R.vertex(H_vnb , versalien_hilfslinie_1);
R.vertex(H_vnb + strichstaerke + (E_schriftbild_7 /3), versalien_hilfslinie_1);
R.endShape();
R.beginShape();
R.strokeCap(PROJECT);
R.vertex(H_vnb + (strichstaerke / 2) , versalien_hilfslinie_1 + (strichstaerke / 2));
R.vertex(H_vnb + E_schriftbild - (strichstaerke/2), grundlinie);
R.endShape();
R.pop();
// Rundung gemäss demselben Prinzip wie beim P 
R.push();
R.strokeWeight(strichstaerke);
R.strokeCap(SQUARE);
R.noFill();
R.beginShape();
R.vertex(H_vnb + strichstaerke + (E_schriftbild_7 / 3), H_linie + (strichstaerke / 2));
let R_controlX1 = H_vnb + strichstaerke + (E_schriftbild_7 / 2) + 30;
let R_controlY1 = H_linie + (strichstaerke / 2) ;
let R_controlX2 = H_vnb + strichstaerke + (E_schriftbild_7 / 2) + 20;
let R_controlY2 = versalien_hilfslinie_1;
R.bezierVertex(R_controlX1, R_controlY1, R_controlX2, R_controlY2, H_vnb + strichstaerke + (E_schriftbild_7 / 3), versalien_hilfslinie_1);
R.endShape();
R.pop();
R.push();
R.fill('white');
R.noStroke();
R.rect(0, grundlinie, E_schriftbild + H_vnb + O_vnb, (schriftgrad * 0.95) - grundlinie);
R.pop();

}

function keyTyped() {
    // Gemeine
    if (key === 'a') {
      drawNextLetter(a, x_startwert, y_startwert);
      x_startwert += (schriftgrad * 0.8) + buchstabenabstand; 
    } else if (key === 'b') {
      drawNextLetter(b, x_startwert, y_startwert);
      x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'c') {
        drawNextLetter(c, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'd') {
        drawNextLetter(d, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'e') {
        drawNextLetter(e, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'f') {
        drawNextLetter(f, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'g') {
        drawNextLetter(g, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'h') {
        drawNextLetter(h, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'i') {
        drawNextLetter(i, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'j') {
        drawNextLetter(j, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'k') {
        drawNextLetter(k, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'l') {
        drawNextLetter(l, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'm') {
        drawNextLetter(m, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'n') {
        drawNextLetter(n, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'o') {
        drawNextLetter(o, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'p') {
        drawNextLetter(p, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'q') {
        drawNextLetter(q, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'r') {
        drawNextLetter(r, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 's') {
        drawNextLetter(s, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 't') {
        drawNextLetter(t, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'u') {
        drawNextLetter(u, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'v') {
        drawNextLetter(v, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'w') {
        drawNextLetter(w, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'x') {
        drawNextLetter(x, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'y') {
        drawNextLetter(y, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    } else if (key === 'z') {
        drawNextLetter(z, x_startwert, y_startwert);
        x_startwert += schriftgrad + buchstabenabstand; 
    
    // Versalien
    } else if (key === 'A') {
        drawNextLetter(A, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.621; 
    } else if (key === 'B') {
        drawNextLetter(B, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.49; 
    } else if (key === 'C') {
        drawNextLetter(C, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.7; 
    } else if (key === 'D') {
        drawNextLetter(D, x_startwert, y_startwert);
         x_startwert += schriftgrad * 0.62; 
        //x_startwert += schriftgrad * 0.35; 
    } else if (key === 'E') {
        drawNextLetter(E, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.459; 
    } else if (key === 'F') {
        drawNextLetter(F, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.443; 
    } else if (key === 'G') {
        drawNextLetter(G, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.639; 
    } else if (key === 'H') {
        drawNextLetter(H, x_startwert, y_startwert);
         x_startwert += schriftgrad * 0.55; 
        //x_startwert += schriftgrad * 0.4; 
    } else if (key === 'I') {
        drawNextLetter(I, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.25; 
    } else if (key === 'J') {
        drawNextLetter(J, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.415; 
    } else if (key === 'K') {
        drawNextLetter(K, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.514; 
    } else if (key === 'L') {
        drawNextLetter(L, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.43; 
        //x_startwert += schriftgrad * 0.25; 
    } else if (key === 'M') {
        drawNextLetter(M, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.626; 
    } else if (key === 'N') {
        drawNextLetter(N, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.626; 
    } else if (key === 'O') {
        drawNextLetter(O, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.57; 
    } else if (key === 'P') {
        drawNextLetter(P, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.442; 
    } else if (key === 'Q') {
        drawNextLetter(Q, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.57; 
    } else if (key === 'R') {
        drawNextLetter(R, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.442; 
    } else if (key === 'S') {
        drawNextLetter(S, x_startwert, y_startwert);
         x_startwert += schriftgrad * 0.52; 
        //x_startwert += schriftgrad * 0.32;
    } else if (key === 'T') {
        drawNextLetter(T, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.491; 
    } else if (key === 'U') {
        drawNextLetter(U, x_startwert, y_startwert);
         x_startwert += schriftgrad * 0.55; 
        //x_startwert += schriftgrad * 0.45; 
    } else if (key === 'V') {
        drawNextLetter(V, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.621; 
    } else if (key === 'W') {
        drawNextLetter(W, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.59; 
        //x_startwert += schriftgrad * 0.59; 
    } else if (key === 'X') {
        drawNextLetter(X, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.524; 
    } else if (key === 'Y') {
        drawNextLetter(Y, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.524; 
    } else if (key === 'Z') {
        drawNextLetter(Z, x_startwert, y_startwert);
        x_startwert += schriftgrad * 0.44; 
                             
                   
                        
        


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
    x_startwert = windowWidth / 13; 
}