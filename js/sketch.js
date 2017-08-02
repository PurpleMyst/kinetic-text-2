/* jshint esnext: true, browser: true */

let font;

let textBalls, mouseBalls;

const MOUSE_RADIUS = 10;
const MOUSE_VELOCITY_INFLATION = 2;

function preload() {
  font = loadFont("assets/AvenirNextLTPro-Demi.otf");
}

function setup() {
  angleMode(DEGREES);

  textSize(192);
  points = font.textToPoints("8banana", 10, 200);
  textBalls = [];
  createCanvas(textWidth("8banana") + 10, 256);

  for (let i = 0; i < points.length; ++i) {
    let p = points[i];
    textBalls.push(new TextBall(createVector(p.x, p.y)));
  }

  mouseBalls = [];
  mouseBalls.push(new MouseBall());
}

function draw() {
  background(0);
  stroke(255);

  mouseBalls.forEach(ball => {
    ball.update();
    ball.draw();
  });

  textBalls.forEach(ball => {
    ball.update();
    ball.draw();
  });
}
