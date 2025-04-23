
let points = [];
let pr = [];
let tints = [];
let tintIndex = 0;

let visible = true;

let a = 255;

let renderIndex = 0;

let splatterCount;

let nh = 0;

let canvas;

let paint;

// const VISIBLE = 0, FADE_OUT = 1, HIDDEN = 2, FADE_IN = 3;
// let state = VISIBLE;

// function hideStuff() {
//     state = FADE_OUT;
// }

function preload() {
    // paint = loadImage("../assets/img/paint_splatters.png");
    paint = loadImage("paint_splatters.png");
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

    // splatterCount = (width > 600) ? 50 : 20;
    if (width > 600) {
        splatterCount = 50;
        // offset = 300;
        // nh = height * 0.93;
    } else {
        splatterCount = 14;
        // offset = 150;
        // nh = height;
    }
    for (let i = 0; i < splatterCount; i++) {
        // points[i] = createVector(random(0, width), random(0, height));
        points[i] = createVector(random(width / 2 - offset, width / 2 + offset), random(height - nh + nh / 2 - offset, height - nh + nh / 2 + offset));
        pr[i] = createVector(floor(random(0, 8)) * 256, floor(random(0, 2)) * 256);
        tints[i] = 0;
    }
}

function mouseReleased() {
    if (mouseY < height - nh) {
        return;
    }

    points[splatterCount] = createVector(mouseX, mouseY);
    pr[splatterCount] = createVector(floor(random(0, 8)) * 256, floor(random(0, 2)) * 256);
    splatterCount++;
}

function draw() {
    // clear(); // warning, may remove <img> bg
    background(255, 249, 187);
    // image(bg, 0, 0);
    // rect(mouseX - 25, mouseY - 25, 50, 50);

    // switch (state) {
    // case FADE_OUT:
    //     if (a > 0) {
    //         a -= 51;
    //     } else {
    //         state == HIDDEN;
    //     }
    // case FADE_IN:
    //     tint(255, a);
    // case VISIBLE:
        for (let i = 0; i < renderIndex; i++) {
            // tint(255, tints[i]);
            image(paint, points[i].x - 128, points[i].y - 128, 256, 256, pr[i].x, pr[i].y, 256, 256);
        }

        if (tints[tintIndex] < 255) {
            for (let i = tintIndex; i < tintIndex + 10; i++) {
                tints[i] += 51;
            }
        } else
        if (tintIndex < 19) {
            tintIndex += 10;
        }
    // }

    if (renderIndex < splatterCount) {
        renderIndex++;
    }
}
