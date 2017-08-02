/* jshint browser: true, esnext: true */

class MouseBall {
  constructor() {
    this.pos = null;
    this.vel = null;
  }

  update() {}

  draw() {
    fill(200);
    stroke(150);

    if (this.pos !== null) {
      ellipse(this.pos.x, this.pos.y, MOUSE_RADIUS * 2);
    }
  }
}

let mouseVelocity, lastMouseX, lastMouseY;

function mouseMoved() {
  if (mouseBalls !== undefined && lastMouseX !== undefined && lastMouseY !== undefined) {
    mouseBalls.forEach(ball => {
      ball.pos = createVector(mouseX, mouseY);
      ball.vel = createVector(mouseX - lastMouseX, mouseY - lastMouseY);
    });
  }
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}
