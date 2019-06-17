// // import processing.svg.*;
// /* @pjs preload="test.png"; */
// /* @pjs preload="test.svg"; */
// /* @pjs preload="jeju.png"; */

// justify global variable
let img;
// preload section
var preload = function() {
  // load image
  img = loadImage('jeju.png');
}

var setup = function() {
  // create canvas
  createCanvas(500, 500);
  // draw rect
  fill(255);
  stroke(0);
  strokeWeight(5);
  rect(10,340,150,150);
  // draw image
  tint(0, 0, 0, 126);
  image(img, 0, 0); // image(source, positionX, positionY, width, height);
  noTint();
}

var draw = function() {
  // edit pixel
  img.loadPixels();
  // alert(pixels);
  // alert(img.pixels[1]);
  // alert(color(0,50,100,255));
  for (let i = 0; i < img.pixels.length; i += 4) {
    if(img.pixels[i+3] != 0) {
      $(".test").text(img.pixels[i]);
    }
    img.pixels[i] = random(0,255);
    img.pixels[i+1] = random(0,255);
    img.pixels[i+2] = random(0,255);
    // if (i > img.pixels.length/2) {
    //   let rand = random(255);
    //   let c = color(rand);
    //   if(hex(img.pixels[i]).toString().substring(0, 2).equals("00")) {
    //     img.pixels[i] = color(0,50,100,50);
    //     // color(R, G, B, Alpha);
    //     // hex(color) // Alpha/R/G/B
    //   };
    //   // tetImg.pixels[i] = tetImg.pixels[i - (width * height) / 2];
    // }
  }
  img.updatePixels();
  image(img, 50, 50, 300, 300);
}


// let pg;

// function setup() {
//   createCanvas(640, 360);
//   pg = createGraphics(400, 200);
// }

// function draw() {
//   fill(0, 12);
//   rect(0, 0, width, height);
//   fill(255);
//   noStroke();
//   ellipse(mouseX, mouseY, 60, 60);
  
// //   pg.beginDraw();
//   pg.background(51);
//   pg.noFill();
//   pg.stroke(255);
//   pg.ellipse(mouseX-120, mouseY-60, 60, 60);
// //   pg.endDraw();
  
//   // Draw the offscreen buffer to the screen with image() 
//   image(pg, 120, 60); 
// }

// function draw() {
//     background(240);
  
//     let v0 = createVector(50, 50);
//     let v1 = createVector(mouseX - 50, mouseY - 50);
  
//     drawArrow(v0, v1, 'red');
//     v1.normalize();
//     drawArrow(v0, v1.mult(35), 'blue');
  
//     noFill();
//     ellipse(50, 50, 35 * 2);
//   }
  
//   // draw an arrow for a vector at a given base position
//   function drawArrow(base, vec, myColor) {
//     push();
//     stroke(myColor);
//     strokeWeight(3);
//     fill(myColor);
//     translate(base.x, base.y);
//     line(0, 0, vec.x, vec.y);
//     rotate(vec.heading());
//     let arrowSize = 7;
//     translate(vec.mag() - arrowSize, 0);
//     triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
//     pop();
//   }

// 마우스 인식 프로그램

// function setup() {
//     createCanvas(720, 400);
//     strokeWeight(15);
// }

// function draw() {
//     rectMode(CORNER);
//     noStroke();
//     fill(240, 30);
//     rect(0, 0, width, height);
//     if (mouseIsPressed) {
//         stroke(122);
//     } else {
//         stroke(237, 34, 93);
//     }
//     line(mouseX - 66, mouseY, mouseX + 66, mouseY);
//     line(mouseX, mouseY - 66, mouseX, mouseY + 66);
// }


// 3D 도형 + 라이팅 프로그램

// var back_img;
// var images01 = [];
// var images02 = [];
// var images03 = [];
// var images04 = [];
// var brands01 = [];
// var brands02 = [];
// var brands03 = [];
// var brands04 = [];
// var bubbles = [];
// var targetx;
// var targety;
// var rotx = 0.0;
// var roty = 0.0;
// let octahedron;

// function setup () {
// 	pixelDensity (displayDensity ());
// 	createCanvas (windowWidth, windowHeight, WEBGL);
// 	colorMode (RGB, 256);
// 	background (0);
// }
// //function preload() {
// //  octahedron = loadModel('icosahedron.obj');
// //}

// function draw () {
// 	background (50);
// 	ambientLight (30, 20, 80);
//   	pointLight (255, 0, 0, 200.0, 0.0, 200.0);
//   	pointLight (255, 0, 0, -200.0, 0.0, -200.0);
//   	pointLight (0, 255, 0, 0.0, 200.0, 200.0);
//   	pointLight (0, 255, 0, 0.0, -200.0, -200.0);
//   	pointLight (100, 0, 0, 200.0, 0.0, 200.0);
//   	pointLight (100, 0, 0, -200.0, 0.0, -200.0);
//   	pointLight (0, 100, 0, 0.0, 200.0, 200.0);
//   	pointLight (0, 100, 0, 0.0, -200.0, -200.0);
// 	camera (0.0, 0.0, -1000.0,
// 			0.0, 0.0, 0.0,
// 			0.0, 1.0, 0.0);
//   	targetx = mouseY;
//   	targety = mouseX;
//   	rotx += (targetx - rotx) * 0.04;
//   	roty += (targety - roty) * 0.04;
//   	rotateX (rotx * 0.01);
//   	rotateY (roty * 0.01);
// 	bubbles.push (new BubblesBase (random (width), height + 80.0, random (-1000.0, 1000.0), random (40,0), random (0.1, 20.0)));
// 	for (var i = 0; i < bubbles.length; i++) {
// 		bubbles[i].update ();
// 		bubbles[i].render ();
// 		if (bubbles[i].by < 0) {
// 			bubbles.splice (i, 1);
// 		}
// 	}
// }
// function BubblesBase (x, y, z, r, up) {
// 	this.bx = x;
// 	this.by = y;
// 	this.bz = z;
// 	this.br = r;
// 	this.update = function () {
// 		this.by -= up;
// 	}
// 	this.render = function () {
// 		noStroke ();
// 		push ();
// 		translate (this.bx - width / 2.0, this.by - height / 2.0, this.bz);
// 	//	model(octahedron);
// 		box (this.br * 6.0);
// 		translate (this.bx - width / 4.0, this.by - height / 4.0, this.bz);		
// 		box (this.br * 4.0);
// 		translate (this.bx - width / 6.0, this.by - height / 6.0, this.bz);	
// 		box (this.br * 2.0);
		
// 		pop ();
// 	}
// }