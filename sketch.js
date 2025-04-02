// sketch.js - Webbed Cite
// Author: Miles Marsh
// Date: 04/01/2025


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
let timePos = 0;
let horizonHeight;
let sunSize;
let dawnColor
let dayColor;
let duskcolor;
let nightColor;
let date;
let hours;
let timeDisplay;
let nowButton;
let userActive = false;
let timer;
let slider;
let fogHeight;
let oceanColor;
let skyColor;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  
  resizeCanvas(canvasContainer.width(), canvasContainer.width()*CANVASRATIO);
}

// setup() function is called once when the program starts
function setup() {
    
    fogHeight = 20
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
        resizeScreen();
    });
    resizeScreen();

    createButton("reimagine").mousePressed(() => seed++);

    randomSeed(seed); // Seed the random number generator


    slider = document.getElementById("myRange");
    slider.value = timePos;
    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        timePos = this.value;
        userActive = true;
        updateTime();


        clearTimeout(timer);
        timer = setTimeout(() => {
            userActive = false;
        }, timeLimit);
        userActive = true;
    }

    timeDisplay = document.getElementById("time_display");
    nowButton = document.getElementById("now_button").addEventListener("click",clickedNow);
    updateTime();

    dawnColor = "#FEE7BB";
    dayColor = "#87CEEB";
    duskColor = "D8B4B4";
    nightColor = "#220032";
    skyColor = dayColor;
    oceanColor = "#000080";

}

// draw() function is called repeatedly, it's the main animation loop
function draw() {

    horizonHeight = canvasContainer.height()/1.5
    if(!userActive){
        date = new Date();
        hours = date.getHours() + date.getMinutes()/60;
        timePos = hours/24 * 100;
        slider.value = timePos;
        updateTime()
    }
    noStroke();

    background(color(255, 255, 255));

    //create sky
    // vertGradientRect(0, 0, width, horizonHeight - fogHeight/2, 135, 206, 255, 200, 200, 250);
    DrawSky();


    drawSun(timePos);
    drawAMMoon(timePos);
    drawPMMoon(timePos);

    //horizon fog
    vertGradientRect(0, horizonHeight - fogHeight/2, width, fogHeight, skyColor, "#202080", 150);
    
    //create clouds


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
    fill(color(oceanColor))
    rect(0, horizonHeight+fogHeight/2, width, height - horizonHeight)

}

function drawSun(timePos){

    noStroke()
    fill(color('#FFA500'))
    let x = width*timePos/50 - width/2;
    let y = horizonHeight*Math.sin((((Math.PI)/width)* x + Math.PI)) + horizonHeight + sunSize/2;
    circle(x, y, sunSize);
    fill(color("#FFD53064"));
    circle(x, y, sunSize*2);
    fill(color("#FACADE"))
}

function drawPMMoon(timePos){

    noStroke()
    fill(color(200, 200, 200));
    let x = width*timePos/50 - 3*width/2;
    let y = horizonHeight*Math.sin((((Math.PI)/width)* x - Math.PI)) + horizonHeight + sunSize/2;
    circle(x, y, sunSize);
    fill(color(230, 230, 230, 100));
    circle(x, y, sunSize*2);
    fill(color("#FACADE"));
}
function drawAMMoon(timePos){

    noStroke()
    fill(color(200, 200, 200));
    let x = width*timePos/50 + width/2;
    let y = horizonHeight*Math.sin((((Math.PI)/width)* x - Math.PI)) + horizonHeight + sunSize/2;
    circle(x, y, sunSize);
    fill(color(230, 230, 230, 100));
    circle(x, y, sunSize*2);
    fill(color("#FACADE"))
}

//x: x position, y: y position, w: width, h: height, sr/sg/sb: starting rgb values, er/eg/eb: ending rgb values
function vertGradientRect(x, y, w, h, start, end, a = 255){

    noStroke();
    for(l = 0; l < h; l += 1){
        let currentColor = TweenColors(start, end, l/h) + intToHex(a);
        fill(color(currentColor));
        rect(x, y+l, w, 1);
    }
    fill(color("#FACADE"));
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
    slider.value = timePos;
    updateTime()
}

function TweenColors(start, end, perc){
    //remove # from hex string 
    start = start.replace("#", "");

    //#xxx edge case
    if (start.length === 3) {
        start = start[0] + start[0] + start[1] + start[1] + start[2] + start[2];
    }

    // Parse the start value for red, green, and blue components
    const r1 = parseInt(start.substring(0, 2), 16);
    const g1 = parseInt(start.substring(2, 4), 16);
    const b1 = parseInt(start.substring(4, 6), 16);

    //remove # from hex string
    end = end.replace("#", "");

    //#xxx edge case 
    if (end.length === 3) {
        end = end[0] + end[0] + end[1] + end[1] + end[2] + end[2];
    }

    // Parse the end value for red, green, and blue components
    const r2 = parseInt(end.substring(0, 2), 16);
    const g2 = parseInt(end.substring(2, 4), 16);
    const b2 = parseInt(end.substring(4, 6), 16);


    //wheighted percents - I take the majority percent from the starting color. Percents must add up to 1
    a1 = 1 - perc;
    a2 = perc;

    //the RGB values are averaged using their weighted percents
    let tr = Math.round((r1 * a1 + r2 * a2) * (a1 + a2));

    let tg = Math.round((g1 * a1 + g2 * a2) * (a1 + a2));

    let tb = Math.round((b1 * a1 + b2 * a2) * (a1 + a2));


    //reconverted into HEX
    return "#"+intToHex(tr)+intToHex(tg)+intToHex(tb)

}

function DrawSky(){
    let startColor;
    let endColor;
    let percent;
    if(timePos < 25){
        startColor = nightColor;
        endColor = dawnColor;
    }else if(timePos < 50){
        startColor=dawnColor;
        endColor=dayColor;
    }else if(timePos < 75){
        startColor=dayColor;
        endColor=duskColor;
    }else if(timePos < 100){
        startColor=duskColor;
        endColor=nightColor;
    }else{
        startColor = nightColor;
        endColor = nightColor;
    }


    percent = ((timePos)%25)/25;
    let currentColor = TweenColors(startColor, endColor, percent);
    skyColor = currentColor;
    fill(currentColor);
    //vertGradientRect(0, 0, width, horizonHeight + fogHeight/2, currentColor, oceanColor);
    rect(0, 0 , width, horizonHeight + fogHeight/2)

}

const intToHex = (integer, length = 2) => {
    return integer.toString(16).padStart(length, '0');
  };


