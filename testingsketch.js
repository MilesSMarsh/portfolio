// sketch.js - Webbed Cite
// Author: Miles Marsh
// Date: 04/01/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const CANVASRATIO = 1/4;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let seed = 1;
let base9 = [
    "#000000", "#111111", "#222222", 
    "#333333", "#444444", "#555555", 
    "#666666", "#777777", "#888888"
]
let mountainArray = ["#e3dfff", "#c6aeb9", "#a97c73", "#735b5f", "#3d3a4b"]

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  
  resizeCanvas(canvasContainer.width(), canvasContainer.width()*CANVASRATIO);
}

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas_container");
    let canvas = createCanvas(200, 400);
    canvas.parent("canvas_container");

    // resize canvas is the page is resized
    $(window).resize(function() {
        resizeScreen();
    });
    resizeScreen();

    createButton("reimagine").mousePressed(() => seed++);

    randomSeed(seed); // Seed the random number generator

    fill(color(255, 255, 255));
    rect(0,0,width,height);
    
    let myColorArray = CreateColorArray("#00ff00", "#0000ff", 10); //["#ff0000", TweenColors("#ff0000", "#0000ff", 0.5), "#0000ff"]
   
    DisplayColorArray(12, myColorArray);

}



// draw() function is called repeatedly, it's the main animation loop
function draw() {

    }


function DisplayColorArray(cols, colors){
    noStroke();
    let currentColor;
    let x = 0;
    let y = 0;
    let cellWidth = width/cols;
    let cellHeight = height/(Math.ceil(colors.length/cols));
    let i = 1;

    colors.forEach(element => {
        currentColor = element;
        fill(color(currentColor));
        rect(x, y, cellWidth, cellHeight);
        // fill(color("#ffffff"));
        // text(currentColor, x, y+ cellHeight/2);
        x += cellWidth-1;
        if(i%cols == 0){
            x = 0;
            y += cellHeight
        }
        i++;
    });

}

function CreateColorArray(start, end, splits){
    let colorArray = [start];
    if(splits == 0){
        return [start, end];
    }
    for(let i = 1; i <= splits; i++){
        colorArray.push(TweenColors(start, end, i/(splits+1)));
    }
    colorArray.push(end);
    return colorArray;
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


  const intToHex = (integer, length = 2) => {
    return integer.toString(16).padStart(length, '0');
  };