/* jshint esnext: true, browser: true */

let ball, mouseVelocity, lastMouseX, lastMouseY;

class Ball {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector();
    this.acc = createVector();

    this.radius = 50;

    this.wasHittingMouseLastFrame = false;
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
    this.pos.add(this.vel);
    this.vel.mult(0.9); // friction
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }
}

function setup() {
  createCanvas(512, 512);
  angleMode(DEGREES);
  ball = new Ball();
}

function draw() {
  background(0);
  stroke(255);

  ball.update();
  ball.draw();

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

function mouseClicked() {
  ball.pos = createVector(mouseX, mouseY);
}
