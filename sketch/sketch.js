/*
참고자료

픽셀관련
https://processing.org/tutorials/pixels/

메소드 잘 나와있는 사이트
http://processingjs.org/reference/PImage/

Can't use SVG loadPixels
https://processing.org/reference/libraries/svg/index.html


text draw 프로그램
Particles text effects

Uses particles with a seek behavior to make up a word.
The word is loaded into memory so that each particle can figure out their own position they need to seek.
Inspired by Daniel Shiffman's arrival explantion from The Nature of Code. (natureofcode.com)

Controls:
    - Left-click for a new word.
    - Drag & right-click over particles to interact with them.
    - Press any key to toggle draw styles.

Author:
	Jason Labbe

Site:
	jasonlabbe3d.com
*/


// 전역 변수
let particles = new Array();
let pixelSteps = 50; // Amount of pixels to skip
let drawAsPoints = false;
let images = new Array();
let imageIndex = 0;
let bgColor;
let fontName;
let audioPlay;

let img00;
let img01;
let img02;
var preload = function() {
    img00 = loadImage("assets/img/img00.png");
    img01 = loadImage("assets/img/img01.png");
    img02 = loadImage("assets/img/img02.png");
    audioPlay = loadSound('test.mp3');
}

let w;
let h;


// Jquery 스크립트
$(document).ready(function() {
    // 화면 크기 변수인 w, h 값 입력
    w = window.innerWidth;
    h = window.innerHeight;
    if(w < 800) {
        pixelSteps = 100; // 모바일 사양 최적화를 위한 파티클 조절
    }
    // 화면 크기 변경 시 작동
    window.onresize = function(event) {
        w = window.innerWidth;
        h = window.innerHeight;
        if(w < 800) {
            pixelSteps = 100; // 모바일 사양 최적화를 위한 파티클 조절
        }
        setup();
    }
});


// setup 부분
var setup = function() {
    particles = new Array();
    pixelSteps;
    drawAsPoints = false;
    images = new Array();
    imageIndex = 0;
    bgColor = color(255, 255, 255);
    fontName = loadFont('assets/font/Roboto.ttf');

    createCanvas(w, h);
    background(255);
    
    soundFormats('mp3');
    audioPlay.play();

    images.push("00");
    images.push("01");
    images.push("02");

    nextWord(images[imageIndex]);
}


// draw 부분
var draw = function() {
    // 배경 칠하기
    fill(bgColor);
    noStroke();
    rect(0, 0, width*2, height*2);

    // 파티클 실행 부분
    for (let x = particles.length-1; x > -1; x--) {
        // 파티클 이동 및 그리기
        particle = particles[x];
        particle.move();
        particle.draw();

        // 테두리 밖으로 나오면 파티클 삭제
        if (particle.isKilled) {
            if (particle.pos.x < 0 || particle.pos.x > width || particle.pos.y < 0 || particle.pos.y > height) {
                particles.splice(x, 1); // 이거 오브젝트라 숫자로 변경해야함
            }
        }
    }

    // 조작 힌트 표시
    fill(255-red(bgColor));
    textSize(9);
    let tipText = "Left-click for a new word.";
    tipText += "\nDrag right-click over particles to interact with them.";
    tipText += "\nPress any key to toggle draw styles.";
    text(tipText, 10, height-40);
}


// 다음 단어로 변환
var mousePressed = function() {
    if (mouseButton == LEFT) {
        imageIndex += 1;
        if (imageIndex > images.length-1) { 
            imageIndex = 0;
        }
        nextWord(images[imageIndex]);
    }
}


// 마우스 우클릭 시 mouse 근처 particle kill
var mouseDragged = function() {
    if (mouseButton == RIGHT) {
        for (i = 0; i < particles.length; i++) {
            particle = particles[i];
            if (dist(particle.pos.x, particle.pos.y, mouseX, mouseY) < 50) {
                particle.kill();
            }
        }
    }
}


// 키 누르면 배경색 변환
var keyPressed = function() {
    drawAsPoints = (! drawAsPoints);
    if (drawAsPoints) {
        background(0);
        bgColor = color(0, 40);
    } else {
        background(255);
        bgColor = color(255, 100);
    }
}


// 화면 중앙에서 (width+height)/2 의 거리를 가진 랜덤 장소를 골라줌
var generateRandomPos = function(x, y, mag) {
    let randomDir = createVector(random(0, width), random(0, height));
    
    let pos = createVector(x, y);
    pos.sub(randomDir);
    pos.normalize();
    pos.mult(mag);
    pos.add(x, y);
    
    return pos;
}


// 다음 단어 그리기
var nextWord = function(imageNumber) {
    let pg = createGraphics(width, height);
    pg.fill(0);
    // 매개변수에 따라 이미지 변화
    if (imageNumber == 0) {
        pg.image(img00, 30, 30, w-60, h-60);
    }
    else if (imageNumber == 1) {
        pg.image(img01, 30, 30, w-60, h-60);
    }
    else if (imageNumber == 2) {
        pg.image(img02, 30, 30, w-60, h-60);
    }
    // 매개변수 에러 시, 사각형 출력
    else {
        rect(50, 50, w-100, h-100);
    }
    // 픽셀로 로딩
    pg.loadPixels();

    // 컬러 랜덤 지정
    let newColor = color(random(0.0, 255.0), random(0.0, 255.0), random(0.0, 255.0));

    let particleCount = particles.length;
    let particleIndex = 0;

    let coordsIndexes = new Array();
    for (let i = 0; i < (width*height)-1; i+= pixelSteps) {
        coordsIndexes.push(i);
    }

    for (let i = 0; i < coordsIndexes.length; i++) {
        let randomIndex = Math.floor(random(0, coordsIndexes.length));
        let coordIndex = coordsIndexes[randomIndex];
        coordsIndexes.splice(randomIndex, 1);
        
        let x;
        let y;
        // 불투명 픽셀만 선택
        if (pg.pixels[coordIndex * 4 + 3] != 0) {
            x = coordIndex % width;
            y = coordIndex / width;

            if (particleIndex < particleCount) {
                newParticle = particles[particleIndex];
                newParticle.isKilled = false;
                particleIndex += 1;
        } else {
            newParticle = new Particle();
            
            let randomPos = generateRandomPos(width/2, height/2, (width+height)/2);
            newParticle.pos.x = randomPos.x;
            newParticle.pos.y = randomPos.y;
            
            newParticle.maxSpeed = random(2.0, 5.0);
            newParticle.maxForce = newParticle.maxSpeed*0.025;
            newParticle.particleSize = random(5, 10);
            newParticle.colorBlendRate = random(0.0025, 0.03);
            
            particles.push(newParticle);
        }
        
        newParticle.startColor = lerpColor(newParticle.startColor, newParticle.targetColor, newParticle.colorWeight);
        newParticle.targetColor = newColor;
        newParticle.colorWeight = 0;
        
        newParticle.target.x = x;
        newParticle.target.y = y;
        }
    }

    // 다음 그림에 쓰일 파티클이 현재 파티클보다 적으면 삭제
    if (particleIndex < particleCount) {
        for (let i = particleIndex; i < particleCount; i++) {
            particle = new Array();
            particle = particles[i];
            particle.kill();
        }
    }
} 


// 파티클 클래스
var Particle = class {
  constructor(pos, vel, acc, target, closeEnoughTarget, maxSpeed, maxForce, particleSize, isKilled, startColor, targetColor, colorWeight, colorBlendRate) {
      this.pos = createVector(0, 0);
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.target = createVector(0, 0);
    
      this.closeEnoughTarget = 50;
      this.maxSpeed = 10.0;
      this.maxForce = 1.0;
      this.particleSize = 10;
      this.isKilled = false;
    
      this.startColor = color(0);
      this.targetColor = color(0);
      this.colorWeight = 0;
      this.colorBlendRate = 0.025;
  }

  move() {
      let proximityMult = 1.0;
      let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
      if (distance < this.closeEnoughTarget) {
          proximityMult = distance/this.closeEnoughTarget;
      }
  
      let towardsTarget = createVector(this.target.x, this.target.y);
      towardsTarget.sub(this.pos);
      towardsTarget.normalize();
      towardsTarget.mult(this.maxSpeed*proximityMult);
  
      let steer = createVector(towardsTarget.x, towardsTarget.y);
      steer.sub(this.vel);
      steer.normalize();
      steer.mult(this.maxForce);
      this.acc.add(steer);
  
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
  }

  draw() {
      let currentColor = lerpColor(this.startColor, this.targetColor, this.colorWeight);
      // drawAsPoints는 keyPressed() 함수와 관련. 점으로 그려줌
      if (drawAsPoints) {
          stroke(currentColor);
          point(this.pos.x, this.pos.y);
      } else {
          noStroke();
          fill(currentColor);
          ellipse(this.pos.x, this.pos.y, this.particleSize, this.particleSize);
      }
  
      if (this.colorWeight < 1.0) {
          this.colorWeight = min(this.colorWeight+this.colorBlendRate, 1.0);
      }
  }

  // 파티클 삭제
  kill() {
      if (!this.isKilled) {
          // Set its target outside the scene
          let randomPos = generateRandomPos(width/2, height/2, (width+height)/2);
          this.target.x = randomPos.x;
          this.target.y = randomPos.y;
  
          // Begin blending its color to black
          this.startColor = lerpColor(this.startColor, this.targetColor, this.colorWeight);
          this.targetColor = color(0);
          this.colorWeight = 0;
  
          this.isKilled = true;
      }
  }
}