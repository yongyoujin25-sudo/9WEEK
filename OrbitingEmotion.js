class OrbitingEmotion {
  constructor(centerObj, orbitRadius, speed, size, color) {
    this.centerObj = centerObj;    
    this.orbitRadius = orbitRadius; 
    this.angle = random(TWO_PI);   
    this.speed = speed;            
    this.size = size;              
    this.color = color;            
  }

  update() {
    this.angle += this.speed;      
  }

  show() {
    
    let x = this.centerObj.pos.x + cos(this.angle) * this.orbitRadius;
    let y = this.centerObj.pos.y + sin(this.angle) * this.orbitRadius;
    
    fill(this.color);
    noStroke();
    circle(x, y, this.size);
  }
}