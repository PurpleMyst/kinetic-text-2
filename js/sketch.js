/* jshint esnext: true, browser: true */

let balls, mouseVelocity, lastMouseX, lastMouseY;

class Ball {
  constructor() {
    this.radius = 50;
    this.maxVelocity = 30;

    do {
      this.pos = createVector(random(width), random(height));
    } while (this.outOfBounds());
    this.vel = createVector();
    this.acc = createVector();

    this.wasHittingMouseLastFrame = false;
  }

  outOfBounds() {
    return this.pos.x < 0 ||
           this.pos.y < 0 ||
           this.pos.x + this.radius > width ||
           this.pos.y + this.radius > height;
  }

  update() {
    if (this.pos.dist(createVector(mouseX, mouseY)) < this.radius) {
      if (!this.wasHittingMouseLastFrame) this.acc.add(mouseVelocity);
      this.wasHittingMouseLastFrame = true;
    } else {
      this.wasHittingMouseLastFrame = false;
    }

    this.vel.add(this.acc);
    this.acc.mult(0);
    this.vel.limit(this.maxVelocity);
    this.pos.add(this.vel);
    this.vel.mult(0.9); // friction

    if (this.outOfBounds()) this.vel.mult(-1);
  }

  draw() {
    fill(lerpColor(color(0, 255, 0), color(255, 0, 0), this.vel.mag() / this.maxVelocity));
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }
}

function setup() {
  createCanvas(512, 512);
  angleMode(DEGREES);
  balls = [];
  for (let i = 0; i < 10; ++i) balls.push(new Ball());
}

function draw() {
  background(0);
  stroke(255);

  balls.forEach(ball => {
    ball.update();
    ball.draw();
  });

  if (mouseVelocity !== undefined) {
    translate(width / 2, height / 2);
    rotate(-45);
    rotate(mouseVelocity.heading());
    let m = mouseVelocity.mag();
    line(0, 0, m, m);
  }

}

function mouseMoved() {
  if (lastMouseX !== undefined && lastMouseY !== undefined) {
    mouseVelocity = createVector(mouseX - lastMouseX, mouseY - lastMouseY);
  }
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}
