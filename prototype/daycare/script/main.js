
let canvas;

let points = [];
let pr = [];
let splatterCount;
let renderIndex = 0;

let nh = 0;

let paint;
let whirlWidth;

function preload() {
    // paint = loadImage("../assets/img/paint_splatters.png");
    paint = loadImage("script/paint_splatters.png");
}

function deviceTurned() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    // createCanvas(window.width);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1"); // MAKE SURE THIS IS CROSS-PLATFORM!
    canvas.style("position", "fixed");

    // frameRate(30);

    let offset = 300;
    nh = height * 0.93;

    if (width > 600) {
        splatterCount = 50;
        whirlWidth = 570;
    } else {
        splatterCount = 14;
        whirlWidth = 380;
    }
    for (let i = 0; i < splatterCount; i++) {
        points[i] = createVector(random(width / 2 - offset, width / 2 + offset), random(height - nh + nh / 2 - offset, height - nh + nh / 2 + offset));
        pr[i] = createVector(floor(random(0, 8)) * 256, floor(random(0, 2)) * 256);
    }

    background(255, 249, 187);
}

function mouseReleased() {
    if (mouseY < height - nh) {
        return;
    }

    points[splatterCount] = createVector(mouseX, mouseY);
    pr[splatterCount] = createVector(floor(random(0, 8)) * 256, floor(random(0, 2)) * 256);
    splatterCount++;
}

let index = 0;
let frame = 0;
let opacity = 0.0;

function draw() {
    const logo = document.getElementById("logo");

    logo.style.opacity = opacity;
    logo.style.backgroundPosition = (index * -whirlWidth) + "px 0px";

    if (frame % 2 == 0 && index < 9) {
        index++;
    }

    if (opacity < 1.0) {
        opacity += 0.05;
    }

    // background(255, 249, 187);

    for (let i = 0; i < renderIndex; i++) {
        image(paint, points[i].x - 128, points[i].y - 128, 256, 256, pr[i].x, pr[i].y, 256, 256);
    }

    
    if (renderIndex < splatterCount) {
        renderIndex++;
    }

    frame++;
}
