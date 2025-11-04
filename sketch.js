let ball;

function setup() {
  createCanvas(400, 200);

  ball = new Particle();
}


function draw() {
  background(220);

//   let gravity = createVector(0, 0.3);
//   ball.addForce(gravity);


  ball.update();
  ball.show();
}

function mouseReleased() {
    let d = dist(ball.pos.x, ball.pos.y, mouseX, mouseY);
    if (d < ball.w/2){
      let ff = p5.Vector.sub(ball.pos, createVector(mouseX,mouseY));
      ff.mult(0.3);
      ball.addForce(ff);
    }
}