let balls = [];
let maxBalls = 100;
let neutralBall;
let orbitingBalls = [];

function setup() {
  createCanvas(400, 400);
  balls.push(new Walker(random(width), random(height), 100));
  
  neutralBall = new Walker(width/2, height/2, 60, "neutral");

  // OrbitingEmotion 공전 구슬 생성
  orbitingBalls.push(new OrbitingEmotion(neutralBall, 50, 0.03, 10, "red"));
  orbitingBalls.push(new OrbitingEmotion(neutralBall, 60, 0.02, 10, "blue"));
  orbitingBalls.push(new OrbitingEmotion(neutralBall, 70, 0.015, 10, "yellow"));
}

function draw() {
  background(0);
  


  if (neutralBall.emotion === "neutral") {
    neutralBall.show();
    for (let o of orbitingBalls) {
      o.update();
      o.show();
    }
  }
  neutralBall.show();

  let toRemove = [];

  for (let i = balls.length - 1; i >= 0; i--) {
    let ball = balls[i];
    ball.move();
    ball.show();

    if (ball.bongGround() || ball.bongCeiling() || ball.bongWall()) {
      toRemove.push(i);
    }
  }

  for (let i of toRemove) {
    balls.splice(i, 1);
  }
}

function mousePressed() {
  
  if (balls.length > 0 && balls[0].emotion === "neutral") return;

  if (balls.length < maxBalls) {
    balls.push(new Walker(random(width), random(height), 100));
  }
}

function keyPressed() {
  
  if (balls.length > 0 && balls[0].emotion === "neutral") return;

  if (balls.length < maxBalls) {
    balls.push(new Walker(random(width), random(height), 100));
  }
}