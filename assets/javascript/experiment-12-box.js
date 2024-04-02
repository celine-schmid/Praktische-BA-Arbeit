class Box {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.isLetter = false;
      this.angle = 0;
      this.depth = 0;
    }
    
    display() {
      stroke(255, 100);
      noFill();
      if (this.isLetter == true) {
        stroke(255);
        strokeWeight(1);
        //strokeWeight(0.5);
     
        //stroke(0, 0, 255);
        this.depth += 2*cos(this.angle);
        this.angle += 1;
      } else {
        this.angle -= 1;
        strokeWeight(0.5);
        // fill(0, 0, 255);
        // stroke(255);
      }
    
      push();
      //translate(this.x, this.y);
      translate(this.x, this.y, this.depth);
      rotateX(this.angle);
      rotateZ(this.angle);
      box(size - 1/100*size);
      pop();
    }
  }