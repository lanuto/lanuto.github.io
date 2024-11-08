
let bg_img;

let train_img;
let trainX = -500;
let trainSpeed = 4;

let bridge_img;

let image_offset;

function preload() {
	bg_img = loadImage("res/img/background.png");
	train_img = loadImage("res/img/train.png");
	bridge_img = loadImage("res/img/bridge.png");
}

function set_things() {
	image_offset = (height - 1080) / 2;
}

function setup() {
    console.log("test");
	// See here for rendering pixel art:
	// https://developer.mozilla.org/en-US/docs/Games/Techniques/Crisp_pixel_art_look
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style("z-index", "-1"); // MAKE SURE THIS IS CROSS-PLATFORM!
	canvas.style("position", "fixed");

	pixelDensity(1);
	// frameRate(30);
	noStroke();

	set_things();

	frameRate(60);
}

function draw() {
	image(bg_img, 0, image_offset);

	// fill(map(mouseY, 0, height, 0, 255), 255, map(mouseX, 0, width, 0, 255));
	// ellipse(mouseX, mouseY, 40, 40);

	// if (trainX < width) image(train_img, trainX, height - 210);//, 306, 114);
	for (let i = 0; i < 3; i++) {
		image(train_img, trainX - (153 * i), image_offset + 1080 - 300);//height - 205);//, 306, 114);
	}

	/*if (mouseY < height - 210 || mouseY > height - 150 || mouseX > trainX + 153 + 50) */trainX += trainSpeed;

	if (trainX > width * 2)
		trainX = -900; // trainX = random(-1700, -700);

	image(bridge_img, 0, image_offset);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	set_things();
}
