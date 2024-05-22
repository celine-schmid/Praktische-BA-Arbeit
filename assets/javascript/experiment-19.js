// Allgemein
let strichstaerke = 15;
let buchstaben_hintergrund = 255;

// Buchstaben
let schriftgrad = 400;
let durchschuss = schriftgrad;
let buchstabenabstand = 0; 
let wortabstand = schriftgrad / 2; 
let vor_nach_breite;
let rundungsausgleich = schriftgrad / 50;
let ueberlaenge = rundungsausgleich * 5;

// Glyphen
let a, b;

// Positionierung
let x_startwert, y_startwert, spalte_1, spalte_2, x_buchstabenposition, y_buchstabenposition;
let buchstabe = [];
let k_linie = 0;
let h_linie = (0.1 * schriftgrad) - ueberlaenge;
let mittellinie_rundung = (0.3 * schriftgrad) - rundungsausgleich;
let mittellinie = 0.3 * schriftgrad;
let grundlinie = 0.7 * schriftgrad;
let grundlinie_rundung = (0.7 * schriftgrad) + rundungsausgleich;
let p_linie = 0.9 * schriftgrad;



function setup() {
  createCanvas(windowWidth, windowHeight);
  //angleMode(DEGREES);
  background(50);
  strokeWeight(strichstaerke);
  stroke(0);

  // Koordinaten der Punkte; der buchstabe bezieht sich auf die y-position (linie) und die zahl auf den x-wert (raster)
  let h_2 = createVector(0.2 * schriftgrad, h_linie); 
  let h_3_5 = createVector(0.35 * schriftgrad, h_linie);     
  let h_5 = createVector(0.5 * schriftgrad, h_linie);  
  let h_6_5 = createVector(0.65 * schriftgrad, h_linie);       
  let h_8 = createVector(0.8 * schriftgrad, h_linie);   
  
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



  a = createGraphics(schriftgrad * 0.8, schriftgrad); // breite, hoehe
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
  a.line(0, h_linie, schriftgrad, h_linie);     // h-linie
  a.line(0, mittellinie_rundung, schriftgrad, mittellinie_rundung);     // mittellinie mit optischem Ausgleich fuer rundungen
  a.line(0, mittellinie, schriftgrad, mittellinie);     // mittellinie
  a.line(0, grundlinie, schriftgrad, grundlinie);     // grundlinie
  a.line(0, grundlinie_rundung, schriftgrad, grundlinie_rundung);     // grundlinie mit optischem Ausgleich fuer rundungen
  a.line(0, p_linie, schriftgrad, p_linie);     // p-linie
  a.line(g_2.x, g_2.y, h_5.x,h_5.y);
  a.stroke('red');
  a.fill('red');
  a.ellipse(h_2.x, h_2.y, 5);
  a.ellipse(h_3_5.x, h_3_5.y, 5);
  a.ellipse(h_5.x, h_5.y, 5);
  a.ellipse(h_6_5.x, h_6_5.y, 5);
  a.ellipse(h_8.x, h_8.y, 5);
  a.ellipse(g_2.x, g_2.y, 5);
  a.ellipse(g_3_5.x, g_3_5.y, 5);
  a.ellipse(g_5.x, g_5.y, 5);
  a.ellipse(g_6_5.x, g_6_5.y, 5);
  a.ellipse(g_8.x, g_8.y, 5);
  a.ellipse(m_2.x, m_2.y, 5);
  a.ellipse(m_5.x, m_5.y, 5);
  a.ellipse(m_8.x, m_8.y, 5);
  a.ellipse(schnittpunkt_m_1_5.x, schnittpunkt_m_1_5.y, 5);
  a.ellipse(schnittpunkt_m_3_5.x, schnittpunkt_m_3_5.y, 5);
  a.ellipse(schnittpunkt_m_6_5.x, schnittpunkt_m_6_5.y, 5);
  a.ellipse(schnittpunkt_m_8_5.x, schnittpunkt_m_8_5.y, 5);
  a.ellipse(unter_m_2.x, unter_m_2.y, 5);
  a.ellipse(unter_m_5.x, unter_m_5.y, 5);
  a.ellipse(unter_m_8.x, unter_m_8.y, 5);

  a.noFill();
  a.ellipse(0.5 * schriftgrad, 0.35 * schriftgrad, 0.7 * schriftgrad);
  a.arc(m_5.x, m_5.y, 0.6 * schriftgrad , 0.6 * schriftgrad, -HALF_PI, 0);

  
  b = createGraphics(schriftgrad, schriftgrad);
  b.background(buchstaben_hintergrund);
  c = createGraphics(schriftgrad, schriftgrad);
  c.background(buchstaben_hintergrund);
  d = createGraphics(schriftgrad, schriftgrad);
  d.background(buchstaben_hintergrund);
  e = createGraphics(schriftgrad, schriftgrad);
  e.background(buchstaben_hintergrund);
  f = createGraphics(schriftgrad, schriftgrad);
  f.background(buchstaben_hintergrund);
  g = createGraphics(schriftgrad, schriftgrad);
  g.background(buchstaben_hintergrund);
  h = createGraphics(schriftgrad, schriftgrad);
  h.background(buchstaben_hintergrund);
  i = createGraphics(schriftgrad, schriftgrad);
  i.background(buchstaben_hintergrund);
  j = createGraphics(schriftgrad, schriftgrad);
  j.background(buchstaben_hintergrund);
  k = createGraphics(schriftgrad, schriftgrad);
  k.background(buchstaben_hintergrund);
  l = createGraphics(schriftgrad, schriftgrad);
  l.background(buchstaben_hintergrund);
  m = createGraphics(schriftgrad, schriftgrad);
  m.background(buchstaben_hintergrund);
  n = createGraphics(schriftgrad, schriftgrad);
  n.background(buchstaben_hintergrund);
  o = createGraphics(schriftgrad, schriftgrad);
  o.background(buchstaben_hintergrund);
  p = createGraphics(schriftgrad, schriftgrad);
  p.background(buchstaben_hintergrund);
  q = createGraphics(schriftgrad, schriftgrad);
  q.background(buchstaben_hintergrund);
  r = createGraphics(schriftgrad, schriftgrad);
  r.background(buchstaben_hintergrund);
  s = createGraphics(schriftgrad, schriftgrad);
  s.background(buchstaben_hintergrund);
  t = createGraphics(schriftgrad, schriftgrad);
  t.background(buchstaben_hintergrund);
  u = createGraphics(schriftgrad, schriftgrad);
  u.background(buchstaben_hintergrund);
  v = createGraphics(schriftgrad, schriftgrad);
  v.background(buchstaben_hintergrund);
  w = createGraphics(schriftgrad, schriftgrad);
  w.background(buchstaben_hintergrund);
  x = createGraphics(schriftgrad, schriftgrad);
  x.background(buchstaben_hintergrund);
  y = createGraphics(schriftgrad, schriftgrad);
  y.background(buchstaben_hintergrund);
  z = createGraphics(schriftgrad, schriftgrad);
  z.background(buchstaben_hintergrund);

  // Positionierung
  x_startwert = windowWidth / 13;
  y_startwert = windowHeight / 4;

}

function draw() {
  //background(0);
    // Koordinaten der Punkte; der buchstabe bezieht sich auf die y-position (linie) und die zahl auf den x-wert (raster)
    let h_2 = createVector(0.2 * schriftgrad, h_linie); 
    let h_3_5 = createVector(0.35 * schriftgrad, h_linie);     
    let h_5 = createVector(0.5 * schriftgrad, h_linie);  
    let h_6_5 = createVector(0.65 * schriftgrad, h_linie);       
    let h_8 = createVector(0.8 * schriftgrad, h_linie);   
    
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
}

function keyTyped() {
    // Kleinbuchstaben
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