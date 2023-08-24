var balls, floor, clicks, which, temp;
function setup() {
	noStroke();
	colorMode(HSB);
	noFill();
	createCanvas(windowWidth,windowHeight);
	mouse = {
	  clicked:false,
		released:false
	};
  balls = [];
	for (var i = 0; i < 20; i++) {
		balls.push({
		  x:windowWidth/2,
			y:windowHeight/2,
			xVel:floor(random(0,3))*3-3,
			yVel:floor(random(0,3))*3-3
		});
	}
}

function draw() {
	background(0);
	/*if(mouseX > balls[0].x) {
		balls[0].xVel += 10;
	} else if(mouseX < balls[0].x) {
		balls[0].xVel -= 10;
	}
	if(mouseY > balls[0].y) {
		balls[0].yVel += 10;
	} else if(mouseY < balls[0].y) {
		balls[0].yVel -= 10;
	}*/
	for(var i = 0; i < 20; i++) {
		if(dist(balls[i].x,balls[i].y,mouseX,mouseY) < 30 && mouse.clicked) {
			which = i;
		}
		if(mouse.released) {
			which = undefined;
		}
		if(which !== undefined) {
		  balls[which].x += (mouseX - pmouseX)/20;
		  balls[which].y += (mouseY - pmouseY)/20;
		  balls[which].xVel = 0;
		  balls[which].yVel = 0;
		}
	  stroke(i*18,100,70,1);
		strokeWeight(60);
		if(i < 18 && i > 0) {
    	curve(balls[i-1].x, balls[i-1].y,balls[i].x,balls[i].y,balls[i+1].x, balls[i+1].y,balls[i+2].x,balls[i+2].y);
		}
		for(var q = 0; q < abs(balls[i].xVel); q ++) {
		  balls[i].x += 1*balls[i].xVel/abs(balls[i].xVel);
		  if((balls[i].x <= 30 || balls[i].x >= windowWidth-30)) {
				balls[i].xVel *= -1;
			}
		}
		floor = 0;
		for(var q = 0; q < abs(balls[i].yVel); q ++) {
		  balls[i].y += 1*balls[i].yVel/abs(balls[i].yVel);
		  if((balls[i].y <= 30 || balls[i].y >= windowHeight-30)) {
				balls[i].yVel *= -1;
			}
		  if(balls[i].y >= windowHeight-31) {
			  floor = 1;
		  }
		}
		if(floor && balls[i].xVel > 0) {
			balls[i].xVel -= .01;
		} else if(floor && balls[i].xVel < 0) {
			balls[i].xVel += .01;
		}
		//balls[i].yVel += .2;
		balls[i].x = constrain(balls[i].x,30,windowWidth-30);
		balls[i].y = constrain(balls[i].y,30,windowHeight-30);
		for(var o = 0; o < 20; o++) {
			if (i !== o && dist(balls[i].x,balls[i].y,balls[o].x,balls[o].y) <= 60 && i != which) {
				balls[i].xVel += 1*cos(atan2(balls[i].y-balls[o].y,balls[i].x-balls[o].x));
				balls[i].yVel += 1*sin(atan2(balls[i].y-balls[o].y,balls[i].x-balls[o].x));
			 	balls[o].xVel += -1*cos(atan2(balls[i].y-balls[o].y,balls[i].x-balls[o].x));
				balls[o].yVel += -1*sin(atan2(balls[i].y-balls[o].y,balls[i].x-balls[o].x));
				balls[i].x += 1*cos(atan2(balls[i].y-balls[o].y,balls[i].x-balls[o].x));
				balls[i].y += 1*sin(atan2(balls[i].y-balls[o].y,balls[i].x-balls[o].x));
				balls[o].x += -1*cos(atan2(balls[i].y-balls[o].y,balls[i].x-balls[o].x));
				balls[o].y += -1*sin(atan2(balls[i].y-balls[o].y,balls[i].x-balls[o].x));
			}
		}
		if(i < 19) {
			if(dist(balls[i].x,balls[i].y,balls[i+1].x,balls[i+1].y) >= 80 && i != which) {
				balls[i].xVel += (balls[i+1].x - balls[i].x)/40000*dist(balls[i].x,balls[i].y,balls[i+1].x,balls[i+1].y);
				balls[i].yVel += (balls[i+1].y - balls[i].y)/40000*dist(balls[i].x,balls[i].y,balls[i+1].x,balls[i+1].y);
				balls[i].x += (balls[i+1].x - balls[i].x)/20;
				balls[i].y += (balls[i+1].y - balls[i].y)/20;
			}
		}
		if(i > 0) {
			if(dist(balls[i].x,balls[i].y,balls[i-1].x,balls[i-1].y) >= 80 && i != which) {
				balls[i].xVel += (balls[i-1].x - balls[i].x)/40000*dist(balls[i].x,balls[i].y,balls[i-1].x,balls[i-1].y);
				balls[i].yVel += (balls[i-1].y - balls[i].y)/40000*dist(balls[i].x,balls[i].y,balls[i-1].x,balls[i-1].y);
				balls[i].x += (balls[i-1].x - balls[i].x)/20;
				balls[i].y += (balls[i-1].y - balls[i].y)/20;
			}
		}
	}
	if(mouse.clicked) { mouse.clicked = false; }
	if(mouse.released) { mouse.released = false; }
}
function mousePressed() {
	mouse.clicked = true;
}
function mouseReleased() {
	mouse.released = true;
}
