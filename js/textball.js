/* jshint browser: true, esnext: true */

class TextBall {
  constructor(target) {
    this.radius = 5;
    this.maxVelocity = 30;

    do {
      this.pos = createVector(random(width), random(height));
    } while (this.outOfBounds());
    this.vel = createVector();
    this.acc = createVector();

    this.target = target;

    this.wasHittingMouseLastFrame = false;
  }

  outOfBounds() {
    return this.pos.x < 0 ||
           this.pos.y < 0 ||
           this.pos.x + this.radius > width ||
           this.pos.y + this.radius > height;
  }

  collideWithMouse() {
    mouseBalls.forEach(ball => {
      if (ball.pos !== null && this.pos.dist(ball.pos) < this.radius + MOUSE_RADIUS) {
        if (!this.wasHittingMouseLastFrame && ball.vel !== null) {
          let a = ball.vel.copy();
          a.mult(MOUSE_VELOCITY_INFLATION);
          a.add(p5.Vector.random2D());

          this.acc.add(a);
        }
        this.wasHittingMouseLastFrame = true;
      } else {
        this.wasHittingMouseLastFrame = false;
      }
    });
  }

  seekTarget() {
    let d = p5.Vector.sub(this.target, this.pos);

    if (d.mag() > 1) {
      d.normalize();
      this.acc.add(d);
    }
  }

  update() {
    this.collideWithMouse();
    this.seekTarget();

    this.vel.add(this.acc);
    this.acc.mult(0);
    this.vel.limit(this.maxVelocity);
    this.pos.add(this.vel);
    this.vel.mult(0.5); // friction
  }

  draw() {
    fill(lerpColor(color(0, 255, 0), color(255, 0, 0), this.vel.mag() / this.maxVelocity));
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }
}
