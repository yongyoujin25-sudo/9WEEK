class Walker {
  constructor(x, y, w, emotion = "yellow") {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-5,5), random(-5,0));
    this.w = w;
    this.emotion = emotion;  
    this.lifeTime = 0;       
  }

  move() {
  if (this.emotion === "neutral") {
    
    this.pos.x = width / 2;
    this.pos.y = height / 2;
    this.vel.set(0, 0); 
    this.w = 60; 
    return; 
  }

  
  let g = createVector(0, 0.3);
  
  if (this.emotion === "red") {
    this.vel.mult(1.2);
    g.mult(1.2);
  } else if (this.emotion === "blue") {
    this.vel.mult(0.8);
    this.pos.x += random(-0.5, 0.5);
    g.mult(0.8);
  } else if (this.emotion === "yellow") {
    this.lifeTime++;
  }

  this.vel.add(g);
  this.pos.add(this.vel);
}

  
  bongGround() {
    if (this.pos.y + this.w/2 >= height) {
      this.pos.y = height - this.w/2;
      this.vel.y *= -1;
      this.spawnNew(this.pos.x, height - this.w/2);
      return true;
    }
    return false;
  }

 
  bongCeiling() {
    if (this.pos.y - this.w/2 <= 0) {
      this.pos.y = this.w/2;
      this.vel.y *= -1;
      this.spawnNew(this.pos.x, this.w/2);
      return true;
    }
    return false;
  }

  
  bongWall() {
    let collided = false;
    if (this.pos.x + this.w/2 > width) {
      this.pos.x = width - this.w/2;
      this.vel.x *= -1;
      this.spawnNew(width - this.w/2, this.pos.y);
      collided = true;
    }
    if (this.pos.x - this.w/2 < 0) {
      this.pos.x = this.w/2;
      this.vel.x *= -1;
      this.spawnNew(this.w/2, this.pos.y);
      collided = true;
    }
    return collided;
  }

  spawnNew(x, y) {
    if (this.w <= 5) return; 
    for (let i = 0; i < 4; i++) {
      if (balls.length < maxBalls) {
        let angle = random(TWO_PI);
        let speed = random(2, 5);
        let newVel = p5.Vector.fromAngle(angle).mult(speed);
        let newBall = new Walker(x, y, this.w * 0.8, this.emotion);
        newBall.vel = newVel;
        balls.push(newBall);
      }
    }
  }

  show() {
  if (keyIsDown(65) && keyIsDown(83)) { 
    fill(lerpColor(color(255,0,0), color(0,0,255), random(1)));
    this.emotion = "mixed";
  } else if (keyIsDown(65) && keyIsDown(74)) { 
    fill(lerpColor(color(255,0,0), color(255,255,0), random(1)));
    this.emotion = "mixed";
  } else if (keyIsDown(74) && keyIsDown(83)) { 
    fill(lerpColor(color(255,255,0), color(0,0,255), random(1)));
    this.emotion = "mixed";
  } else if (keyIsDown(65)) { 
    fill("red");
    this.emotion = "red";
  } else if (keyIsDown(83)) { 
    fill("blue");
    this.emotion = "blue";
  } else if (keyIsDown(74)) { 
    fill("yellow");
    this.emotion = "yellow";
  } else { 
    fill(200);
    this.emotion = "neutral";
  }

  noStroke();
  circle(this.pos.x, this.pos.y, this.w);
}
}