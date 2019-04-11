const k = 9000; // 9E3

var points = [];
var amount_of_points = 50;

function Point(x,y,charge,size,color,id){
	this.x = x;
	this.y = y;
	this.charge = charge;
	this.size = abs(20*charge);
	this.color = color;
	this.id = id;

	this.show = function(){
		stroke(this.color);
		fill(this.color);
		ellipse(this.x,this.y,this.size,this.size);
		fill(255);
		text(round(100*this.charge)/100,this.x,this.y);
	}

	this.update = function(){
		angleMode(DEGREES);
		this.vecX = 0;
		this.vecY = 0;
		for(var i = 0; i<amount_of_points; i++){
			if (i != id){
				var distX = points[i].x - this.x;
				var distY = points[i].y - this.y;
				var distBetween = sqrt((distX * distX) + (distY * distY));

				//polar vector right here - convert to rect next
				var forceBetween = (k * (this.charge * points[i].charge)) / (distBetween * distBetween);
				var angleBetween = atan2(distY,distX);

				//conversion to rect vector
				var tempVecX = forceBetween * cos(angleBetween);
				var tempVecY = forceBetween * sin(angleBetween);

				this.vecX += tempVecX;
				this.vecY += tempVecY;
			}
		}

		this.x += this.vecX;
		this.y += this.vecY;
	}
}



function setup(){
	createCanvas(windowWidth, windowHeight-4);
	background(120);
	frameRate(15);

	for(var i = 0; i<amount_of_points; i++){
		var tempX = random(0 + windowWidth/20, windowWidth - windowWidth/20);
		var tempY = random(0 + windowHeight/20, windowHeight - windowHeight/20);
		var tempCharge = random(.2,1.5);
		var tempSize = int(random(15,45));
		var tempColor = color(random(120,255),random(0,120),random(60,200));
		points.push(new Point(tempX,tempY,tempCharge,tempSize,tempColor,i));
		points[i].show();
	}
}

function draw(){
	frameRate(60);
	background(120);
	for(var i = 0; i<amount_of_points; i++){
		points[i].update();
		points[i].show();
	}
}
