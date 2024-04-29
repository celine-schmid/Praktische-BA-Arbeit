//Allometrisches Wachstum
/////////////////////////
let segment = 100;
let rasterbreite = 20;      //20
let rasterhoehe = 20;
let buchstabenabstand = rasterbreite*2;
let unterschneidung = rasterbreite;

function setup() {
    //createCanvas(1600, 320);
    createCanvas(windowWidth, windowHeight);
    //stroke(255);
    stroke(0);
    //strokeWeight(1);
    strokeCap(SQUARE); //ROUND, SQUARE, PROJECT
    //noFill();
    //fill(0);
    angleMode(DEGREES);
    frameRate(15);

    //background('#000');
    background(255);

    for (var x = 0; x < width; x += rasterbreite) {
		for (var y = 0; y < height; y += rasterhoehe) {
			stroke('gray');
            //stroke(0);
			strokeWeight(1);
			//line(x, 0, x, height);
			//line(0, y, width, y);
		}
	}
    //Hilfslinien
    //H-Linie
    stroke('green');
    //line(0, 2*rasterhoehe, width, 2*rasterhoehe);
    //Mittellinie
    stroke('blue');
    //line(0, height/2, width, height/2);
    //Grundlinie
    stroke('red');
    //line(0, 6*rasterhoehe, width, 6*rasterhoehe);

    //Buchstaben
    let wachstumsrate_1 = int(random(1,3))*rasterbreite;
    let wachstumsrate_2 = wachstumsrate_1*2;    //*5
    let wachstumsrate_3 = int(random(1,3))*int(sqrt((rasterhoehe*rasterhoehe)+(rasterbreite*rasterbreite)));  //diagonalen  //es rastet nicht immer auf dem raster ein; fix
    let y_MittelLinie = 4*rasterhoehe;
    let y_HLinie = y_MittelLinie-2*rasterhoehe; //+dynamischeRate       //2
    let y_GrundLinie = y_MittelLinie+2*rasterhoehe;                     //2
    let strichstaerke = strokeWeight(38); //strokeWeight(random(1, 13));    //2, 36, 38
    //A
    stroke(0);
    strokeWeight(strichstaerke);
    let A_1 = [2*rasterbreite, y_GrundLinie+wachstumsrate_2]; //let A_1 = [rasterbreite, y_GrundLinie+wachstumsrate_2];
    let A_2 = [2*rasterbreite, y_MittelLinie+wachstumsrate_3];
    line(A_1[0], A_1[1], A_2[0], A_2[1]);
    let A_3 = [2.5*rasterbreite+wachstumsrate_2, y_HLinie];
    line(A_2[0], A_2[1], A_3[0], A_3[1]);
    let A_4 = [2.5*rasterbreite+wachstumsrate_2, y_HLinie];
    //line(A_3[0], A_3[1], A_4[0], A_4[1]);
    let A_5 = [4*rasterbreite+wachstumsrate_2, y_MittelLinie+wachstumsrate_3];  //let A_5 = [4*rasterbreite+wachstumsrate_1, y_MittelLinie];
    line(A_4[0], A_4[1], A_5[0], A_5[1]);
    line(A_2[0], A_2[1], A_5[0], A_5[1]);
    let A_6 = [4*rasterbreite+wachstumsrate_2, y_GrundLinie+wachstumsrate_2];   //let A_6 = [5*rasterbreite, y_GrundLinie+wachstumsrate_2];
    line(A_5[0], A_5[1], A_6[0], A_6[1]);
    //L1
    let L_1 = [A_6[0]+buchstabenabstand, y_HLinie];
    let L_2 = [A_5[0]+buchstabenabstand, y_MittelLinie+wachstumsrate_1];
    let L_3 = [A_6[0]+buchstabenabstand, y_GrundLinie+wachstumsrate_1];
    let L_4 = [L_3[0]+2*rasterbreite+wachstumsrate_2, y_GrundLinie+wachstumsrate_1];
    line(L_1[0], L_1[1], L_2[0], L_2[1]);
    line(L_2[0], L_2[1], L_3[0], L_3[1]);
    line(L_3[0], L_3[1], L_4[0], L_4[1]);
    //L
    let L2_1 = [L_1[0]+buchstabenabstand, y_HLinie];
    let L2_2 = [L_1[0]+buchstabenabstand, y_MittelLinie-wachstumsrate_1];
    let L2_3 = [L_1[0]+buchstabenabstand, y_GrundLinie-wachstumsrate_1];
    let L2_4 = [L_4[0], y_GrundLinie-wachstumsrate_1];
    line(L2_1[0], L2_1[1], L2_2[0], L2_2[1]);
    line(L2_2[0], L2_2[1], L2_3[0], L2_3[1]);
    line(L2_3[0], L2_3[1], L2_4[0], L2_4[1]);
    //O
    let O_1 = [L2_4[0]+1.2*rasterbreite, y_HLinie];
    let O_2 = [L2_4[0]+1.2*rasterbreite, y_MittelLinie+wachstumsrate_1];
    let O_3 = [L2_4[0]+1.2*rasterbreite, y_GrundLinie+wachstumsrate_1];
    let O_4 = [L2_4[0]+unterschneidung+2*rasterbreite+wachstumsrate_2, y_GrundLinie+wachstumsrate_1];
    let O_5 = [L2_4[0]+unterschneidung+2*rasterbreite+wachstumsrate_2, y_MittelLinie+wachstumsrate_1];
    let O_6 = [L2_4[0]+unterschneidung+2*rasterbreite+wachstumsrate_2, y_HLinie];
    line(O_1[0], O_1[1], O_2[0], O_2[1]);
    line(O_2[0], O_2[1], O_3[0], O_3[1]);
    line(O_3[0], O_3[1], O_4[0], O_4[1]);
    line(O_4[0], O_4[1], O_5[0], O_5[1]);
    line(O_5[0], O_5[1], O_6[0], O_6[1]);
    line(O_6[0], O_6[1], O_1[0], O_1[1]);
    //M
    let M_1 = [O_6[0]+buchstabenabstand, y_GrundLinie+wachstumsrate_1];
    let M_2 = [O_6[0]+buchstabenabstand, y_MittelLinie+wachstumsrate_1];
    let M_3 = [O_6[0]+buchstabenabstand, y_HLinie];
    let M_4 = [O_6[0]+buchstabenabstand+wachstumsrate_3, y_MittelLinie];
    //let M_5 = [18*rasterbreite, y_MittelLinie];
    let M_6 = [O_6[0]+buchstabenabstand+3*rasterbreite+wachstumsrate_3, y_HLinie];
    let M_7 = [O_6[0]+buchstabenabstand+3*rasterbreite+wachstumsrate_3, y_MittelLinie+wachstumsrate_1];
    let M_8 = [O_6[0]+buchstabenabstand+3*rasterbreite+wachstumsrate_3, y_GrundLinie+wachstumsrate_1];
    line(M_1[0], M_1[1], M_2[0], M_2[1]);
    line(M_2[0], M_2[1], M_3[0], M_3[1]);
    line(M_3[0], M_3[1], M_4[0], M_4[1]);
    //line(M_4[0], M_4[1], M_5[0], M_5[1]);
    line(M_4[0], M_4[1], M_6[0], M_6[1]);
    line(M_6[0], M_6[1], M_7[0], M_7[1]);
    line(M_7[0], M_7[1], M_8[0], M_8[1]);
    //E
    let E_1 = [M_7[0]+buchstabenabstand+2*rasterbreite+wachstumsrate_2, y_HLinie];
    let E_2 = [M_7[0]+buchstabenabstand, y_HLinie];
    let E_3 = [M_7[0]+buchstabenabstand, y_MittelLinie];
    let E_4 = [M_7[0]+buchstabenabstand+2*rasterbreite+wachstumsrate_2, y_MittelLinie];
    let E_5 = [M_7[0]+buchstabenabstand, y_GrundLinie+wachstumsrate_1];
    let E_6 = [M_7[0]+buchstabenabstand+2*rasterbreite+wachstumsrate_2, y_GrundLinie+wachstumsrate_1];
    line(E_1[0], E_1[1], E_2[0], E_2[1]);
    line(E_2[0], E_2[1], E_3[0], E_3[1]);
    line(E_3[0], E_3[1], E_4[0], E_4[1]);
    line(E_3[0], E_3[1], E_5[0], E_5[1]);
    line(E_5[0], E_5[1], E_6[0], E_6[1]);
    //T
    let T_1 = [E_6[0], y_HLinie];
    let T_2 = [E_6[0]+unterschneidung+rasterbreite+wachstumsrate_1, y_HLinie];
    let T_3 = [T_2[0]+rasterbreite+wachstumsrate_1, y_HLinie];
    let T_4 = [E_6[0]+unterschneidung+rasterbreite+wachstumsrate_1, y_MittelLinie];
    let T_5 = [E_6[0]+unterschneidung+rasterbreite+wachstumsrate_1, y_GrundLinie+wachstumsrate_2];
    line(T_1[0], T_1[1], T_2[0], T_2[1]);
    line(T_2[0], T_2[1], T_3[0], T_3[1]);
    line(T_2[0], T_2[1], T_4[0], T_4[1]);
    line(T_4[0], T_4[1], T_5[0], T_5[1]);
    //R
    let R_1 = [T_3[0]+unterschneidung+0.1*rasterbreite, y_GrundLinie+wachstumsrate_1];
    let R_2 = [T_3[0]+unterschneidung+0.1*rasterbreite, y_MittelLinie];
    let R_3 = [T_3[0]+unterschneidung+0.1*rasterbreite, y_HLinie];
    let R_4 = [R_3[0]+2*rasterbreite+wachstumsrate_2, y_HLinie];
    let R_5 = [R_3[0]+2*rasterbreite+wachstumsrate_2, y_MittelLinie];
    let R_6 = [R_3[0]+2*rasterbreite+wachstumsrate_2, y_GrundLinie+wachstumsrate_1];
    let R_7 = [R_2[0]+rasterbreite, y_MittelLinie];
    line(R_1[0], R_1[1], R_2[0], R_2[1]);
    line(R_2[0], R_2[1], R_3[0], R_3[1]);
    line(R_3[0], R_3[1], R_4[0], R_4[1]);
    line(R_4[0], R_4[1], R_5[0], R_5[1]);
    line(R_7[0], R_7[1], R_6[0], R_6[1]);
    line(R_2[0], R_2[1], R_5[0], R_5[1]);
    //I
    let I_1 = [R_4[0]+buchstabenabstand, y_HLinie];
    let I_2 = [R_4[0]+buchstabenabstand, y_MittelLinie+wachstumsrate_1];
    let I_3 = [R_4[0]+buchstabenabstand, y_GrundLinie+wachstumsrate_2];
    line(I_1[0], I_1[1], I_2[0], I_2[1]);
    line(I_2[0], I_2[1], I_3[0], I_3[1]);
    //E
    let E2_1 = [I_1[0]+buchstabenabstand+2*rasterbreite+wachstumsrate_2, y_HLinie];
    let E2_2 = [I_1[0]+buchstabenabstand, y_HLinie];
    let E2_3 = [I_1[0]+buchstabenabstand, y_MittelLinie];
    let E2_4 = [E2_1[0], y_MittelLinie];
    let E2_5 = [I_1[0]+buchstabenabstand, y_GrundLinie+wachstumsrate_1];
    let E2_6 = [E2_1[0], y_GrundLinie+wachstumsrate_1];
    line(E2_1[0], E2_1[1], E2_2[0], E2_2[1]);
    line(E2_2[0], E2_2[1], E2_3[0], E2_3[1]);
    line(E2_3[0], E2_3[1], E2_4[0], E2_4[1]);
    line(E2_3[0], E2_3[1], E2_5[0], E2_5[1]);
    line(E2_5[0], E2_5[1], E2_6[0], E2_6[1]);




  }
  
  function draw() {
    

  }


