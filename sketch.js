// sketch.js - Webbed Cite
// Author: Miles Marsh
// Date: 04/01/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const CANVASRATIO = 1/4;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let seed = 1;
let initialized = false;
let sunPos = 0;


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  
  resizeCanvas(canvasContainer.width(), canvasContainer.width()*CANVASRATIO);
}

// setup() function is called once when the program starts
function setup() {
    initialized = false;
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas_container");
  let canvas = createCanvas(100, 100);
  canvas.parent("canvas_container");

  // resize canvas is the page is resized
  $(window).resize(function() {
    initialized = false;
    resizeScreen();
  });
  resizeScreen();

  createButton("reimagine").mousePressed(() => seed++);


  randomSeed(seed); // Seed the random number generator
  var slider = document.getElementById("myRange");
  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    sunPos = this.value;
  }

}

function drawOnce(){
    //Only Draw Once
  noStroke();
    let horizonHeight = canvasContainer.height()/2
    let fogHeight = 20

    background(color(250, 30, 200));
    fill(color(255, 255, 255));
    rect(0, 0, width, horizonHeight)

    //create sky
    vertGradientRect(0, 0, width, horizonHeight - fogHeight/2, 135, 206, 255, 200, 200, 250);

    //horizon fog
    vertGradientRect(0, horizonHeight - fogHeight/2, width, fogHeight, 200, 200, 250, 0, 40, 128);
    
    //create clouds
    let noiseLevel = 255;
    let noiseScale = 0.009;
    let cloudHeight = horizonHeight/2;

    // Iterate from top to bottom.
    for (let y = 0; y < horizonHeight; y += 1) {
        // Iterate from left to right.
        for (let x = 0; x < width; x += 1) {
        // Scale the input coordinates.
        let nx = noiseScale * x;
        let ny = noiseScale * y;
        let nt = noiseScale * frameCount;

        // Compute the noise value.
        let c = noiseLevel * noise(nx, ny);

        // Draw the point.
        stroke(color(255, 255, 255, c));
        point(x, y);
        }
    }
    noStroke();

    


    //create Ocean
    vertGradientRect(0, horizonHeight+fogHeight/2, width, height - horizonHeight, 0, 40, 128, 35, 206, 255);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    if(!initialized){
        drawOnce()
        initialized = true;
    }
    drawSun(width*sunPos/100, 50);

}

function drawSun(x, y){
    fill(color('orange'))
    circle(x, y, 40);
    noStroke()
    fill(color("#FACADE"))
}
//x: x position, y: y position, w: width, h: height, sr/sg/sb: starting rgb values, er/eg/eb: ending rgb values
function vertGradientRect(x, y, w, h, sr, sg, sb, er, eg, eb){

    noStroke()
    let stepR = (er - sr)/h;
    let stepG = (eg - sg)/h;
    let stepB = (eb - sb)/h;
    for(l = 0; l < h; l += 1){
        fill(color(sr + l*stepR, sg + l*stepG, sb + l*stepB));
        rect(x, y+l, w, 1);
    }
    fill(color("#FACADE"))
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}