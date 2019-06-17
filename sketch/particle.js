var Particle = class {
    constructor(pos, vel, acc, target, closeEnoughTarget, maxSpeed, maxForce, particleSize, isKilled, startColor, targetColor, colorWeight, colorBlendRate) {
        this.pos = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.target = createVector(0, 0);
      
        this.closeEnoughTarget = 50;
        this.maxSpeed = 4.0;
        this.maxForce = 0.1;
        this.particleSize = 5;
        this.isKilled = false;
      
        this.startColor = color(0);
        this.targetColor = color(0);
        this.colorWeight = 0;
        this.colorBlendRate = 0.025;
    }
  
    move() {
        // Check if particle is close enough to its target to slow down
        let proximityMult = 1.0;
        let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
        if (distance < this.closeEnoughTarget) {
            proximityMult = distance/this.closeEnoughTarget;
        }
    
        // Add force towards target
        let towardsTarget = createVector(this.target.x, this.target.y);
        towardsTarget.sub(this.pos);
        towardsTarget.normalize();
        towardsTarget.mult(this.maxSpeed*proximityMult);
    
        let steer = createVector(towardsTarget.x, towardsTarget.y);
        steer.sub(this.vel);
        steer.normalize();
        steer.mult(this.maxForce);
        this.acc.add(steer);
    
        // Move particle
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
  
    draw() {
        // Draw particle
        let currentColor = lerpColor(this.startColor, this.targetColor, this.colorWeight);
        if (drawAsPoints) {
            stroke(currentColor);
            point(this.pos.x, this.pos.y);
        } else {
            noStroke();
            fill(currentColor);
            ellipse(this.pos.x, this.pos.y, this.particleSize, this.particleSize);
        }
    
        // Blend towards its target color
        if (this.colorWeight < 1.0) {
            this.colorWeight = min(this.colorWeight+this.colorBlendRate, 1.0);
        }
    }
  
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