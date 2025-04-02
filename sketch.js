// sketch.js - Webbed Cite
// Author: Miles Marsh
// Date: 04/01/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const CANVASRATIO = 1/4;

const VALUE2 = 2;
const timeLimit = 30000

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let seed = 1;
let initialized = false;
let timePos = 0;
let horizonHeight;
let sunSize;
let skyColor;
let date;
let hours;
let timeDisplay;
let nowButton;
let userActive = false;
let timer;


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  
  resizeCanvas(canvasContainer.width(), canvasContainer.width()*CANVASRATIO);
}

// setup() function is called once when the program starts
function setup() {
    initialized = false;

    sunSize = width/2;

    date = new Date();
    hours = date.getHours() + date.getMinutes()/60;
    timePos = hours/24 * 100;

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
  slider.value = timePos;
  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    timePos = this.value;
    userActive = true;
    updateTime();


    clearTimeout(timer);

    // Set a new timer
    timer = setTimeout(() => {
        // This code will execute if no click occurs within the time limit
        userActive = false;
        // Add here the actions to perform if the user doesn't click in time
    }, timeLimit);

    // Add here the actions to perform if the user clicks
    userActive = true;
    }

    timeDisplay = document.getElementById("time_display");
    nowButton = document.getElementById("now_button").addEventListener("click",clickedNow);
    updateTime();

}

function drawOnce(){
    //Only Draw Once
  noStroke();
    horizonHeight = canvasContainer.height()/2
    let fogHeight = 20

    background(color(255, 255, 255));

    //create sky
    // vertGradientRect(0, 0, width, horizonHeight - fogHeight/2, 135, 206, 255, 200, 200, 250);
    fill(color(135, 206, 255));
    rect(0, 0 , width, horizonHeight + fogHeight/2)


    drawSun(timePos);
    drawAMMoon(timePos);
    drawPMMoon(timePos);

    //horizon fog
    vertGradientRect(0, horizonHeight - fogHeight/2, width, fogHeight, 135, 206, 255, 0, 40, 128, 100);
    
    // //create clouds
    // let noiseLevel = 255;
    // let noiseScale = 0.009;
    // let cloudHeight = horizonHeight/2;

    // // Iterate from top to bottom.
    // for (let y = 0; y < horizonHeight; y += 1) {
    //     // Iterate from left to right.
    //     for (let x = 0; x < width; x += 1) {
    //     // Scale the input coordinates.
    //     let nx = noiseScale * x;
    //     let ny = noiseScale * y;
    //     let nt = noiseScale * frameCount;

    //     // Compute the noise value.
    //     let c = noiseLevel * noise(nx, ny);

    //     // Draw the point.
    //     stroke(color(255, 255, 255, c));
    //     point(x, y);
    //     }
    // }
    // noStroke();

    


    //create Ocean
    // vertGradientRect(0, horizonHeight+fogHeight/2, width, height - horizonHeight, 0, 40, 128, 35, 206, 255);
    fill(color(0, 40, 128))
    rect(0, horizonHeight+fogHeight/2, width, height - horizonHeight)
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    if(!userActive){
        date = new Date();
        hours = date.getHours() + date.getMinutes()/60;
        timePos = hours/24 * 100;
        updateTime()
    }
    if(!initialized){
        drawOnce()
        initialized = false;
    }

}

function drawSun(timePos){
    fill(color('orange'))
    let x = width*timePos/50 - width/2;
    let y = horizonHeight*Math.sin((((Math.PI)/width)* x + Math.PI)) + horizonHeight + sunSize/2;
    circle(x, y, sunSize);
    noStroke()
    fill(color("#FACADE"))
}

function drawPMMoon(timePos){
    fill(color('grey'))
    let x = width*timePos/50 - 3*width/2;
    let y = horizonHeight*Math.sin((((Math.PI)/width)* x - Math.PI)) + horizonHeight + sunSize/2;
    circle(x, y, sunSize);
    noStroke()
    fill(color("#FACADE"))
}
function drawAMMoon(timePos){
    fill(color('grey'))
    let x = width*timePos/50 + width/2;
    let y = horizonHeight*Math.sin((((Math.PI)/width)* x - Math.PI)) + horizonHeight + sunSize/2;
    circle(x, y, sunSize);
    noStroke()
    fill(color("#FACADE"))
}

//x: x position, y: y position, w: width, h: height, sr/sg/sb: starting rgb values, er/eg/eb: ending rgb values
function vertGradientRect(x, y, w, h, sr, sg, sb, er, eg, eb, a = 1000){

    noStroke()
    let stepR = (er - sr)/h;
    let stepG = (eg - sg)/h;
    let stepB = (eb - sb)/h;
    for(l = 0; l < h; l += 1){
        fill(color(sr + l*stepR, sg + l*stepG, sb + l*stepB, a));
        rect(x, y+l, w, 1);
    }
    fill(color("#FACADE"))
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

function updateTime(){
    let virtualTime = timePos/100 *24
    let virtualHours = Math.floor(virtualTime)
    let virtualMinutes = Math.round((virtualTime-virtualHours) * 60)
    if(virtualHours < 10){
        if(virtualMinutes < 10){
            timeDisplay.innerHTML = "Time: 0"+virtualHours+":0"+virtualMinutes;
        }
        else{
            timeDisplay.innerHTML = "Time: 0"+virtualHours+":"+virtualMinutes;
        }
    }
    else{
        if(virtualMinutes < 10){
            timeDisplay.innerHTML = "Time: "+virtualHours+":0"+virtualMinutes;
        }
        else{
            timeDisplay.innerHTML = "Time: "+virtualHours+":"+virtualMinutes;
        }
    }

}

function clickedNow(){
    date = new Date();
    hours = date.getHours() + date.getMinutes()/60;
    timePos = hours/24 * 100;
    userActive = false;
    updateTime()
}