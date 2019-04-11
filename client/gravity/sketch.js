var zoom = 1.00;
var zMin = 0.05;
var zMax = 9.00;
var sensitivity = 0.0005;

const pi = 3.14159265358979323846

var centerToCenter = 384400000
var period = 2372630.4
var earthMass

function setup() {
  earthMass = 5.972 * pow(10,24)
  createCanvas(windowWidth,windowHeight);
  rectMode(CENTER);
	frameRate(60)

	earth = new Body(0,0,color(0,100,150),6379100,5.972 * pow(10,24))
	moon = new Body(200,0,color(230,230,230), 1737000 ,7.34767*pow(10,22))

  createSliders()
}
function draw() {
  createCanvas(windowWidth,windowHeight);
	background(20,20,20)
  translate(width/2,height/2);
  scale(zoom);
  moon.animate();
	earth.show();
	moon.show();

  earth.mass = earthMass.value()
  centerToCenter = distBetween.value()
  period = orbitalTime.value()

  if (earthMassLock.checked() && distBetweenLock.checked() && !orbitalTimeLock.checked()){
    period = findPeriod(earth.mass, centerToCenter)
    orbitalTime.elt.value = period
  }
  if (!earthMassLock.checked() && distBetweenLock.checked() && orbitalTimeLock.checked()){
    earth.mass = findMass(period, centerToCenter)
    print(earth.mass)
    earthMass.elt.value = earth.mass
  }
  if (earthMassLock.checked() && !distBetweenLock.checked() && orbitalTimeLock.checked()){
    centerToCenter = findRadius(earth.mass, period)
    distBetween.elt.value = centerToCenter
  }
  // earth.mass = earthMass.value() * pow(10,24);
  // centerToCenter = distBetween.value() * pow(10,6)
  showMass.html("Earth's Mass     " + earth.mass + " kg")
  showPeriod.html("Period     " + int(period / 24 / 3600 * 1000) / 1000 + " days")
  showDistance.html("Distance     " + centerToCenter/1000 + " kilometers")

  fill(0)
  textAlign(CENTER,CENTER)
  textSize(20)
  text("Earth", 0, 0)
  text("Moon", moon.x, moon.y)
}

function mouseWheel(event) {
  zoom -= sensitivity * event.delta;
  zoom = constrain(zoom, zMin, zMax);
  return false;
}

class Body{
	constructor(x,y,color,radius,mass){
		this.x = x
		this.y = y
		this.color = color
		this.radius = radius
		this.mass = mass
	}

	show(){
		fill(this.color)
		ellipse(this.x,this.y,pow(this.radius*100,1/4))
	}

  animate(){
    let period = findPeriod(earth.mass, centerToCenter)
    let theta = ((frameCount/10 % period) / period) * 2 * pi * pow(10,5)
    this.x = centerToCenter * .85 * cos(theta) / pow(10,6)
    this.y = centerToCenter * .85 * sin(theta) / pow(10,6)
  }
}

function findPeriod(mass,radius){
  let g = 6.67 * pow(10,-11)
  let piSqrd = pow(pi,2)
	return sqrt( (4 * piSqrd * pow(radius,3)) / (g * mass))
}

function findMass(time,radius){
  let g = 6.67 * pow(10,-11)
  let piSqrd = pow(pi,2)
  return (4 * piSqrd * pow(radius,3)) / (g * pow(time,2))
}

function findRadius(mass,time){
  let g = 6.67 * pow(10,-11)
  let piSqrd = pow(pi,2)
  return pow((g * mass * pow(time,2)/(4 * pow(pi,2))),1/3)
}

function createSliders(){
  earthMass = createSlider(1 * pow(10,24),30 * pow(10,24) ,5.972 * pow(10,24),.01 * pow(10,24))
  earthMass.position(10,30)
  earthMass.style('width','200px')
  earthMassLock = createCheckbox('Lock Earth Mass', true)
  earthMassLock.position(220,25)
  earthMassLock.style('color','white')

  distBetween = createSlider(100000000,800000000,384400000,100)
  distBetween.position(10,60)
  distBetween.style('width','200px')
  distBetweenLock = createCheckbox('Lock Distance', true)
  distBetweenLock.position(220,55)
  distBetweenLock.style('color','white')

  orbitalTime = createSlider(1000000,10000000,2372630,1000)
  orbitalTime.position(10,90)
  orbitalTime.style('width','200px')
  orbitalTimeLock = createCheckbox('Lock Orbital Time', false)
  orbitalTimeLock.position(220,85)
  orbitalTimeLock.style('color','white')

  showMass = createDiv('Mass of Earth');
  showMass.position(400, 25);
  showMass.style('color','white')

  showDistance = createDiv('Distance Between Planets');
  showDistance.position(400, 55);
  showDistance.style('color','white')

  showPeriod = createDiv('Period of Orbit');
  showPeriod.position(400, 85);
  showPeriod.style('color','white')

  info = createDiv('Not drawn to scale. Must have 2 boxes checked at a time.');
  info.position(windowWidth/8, windowHeight * 7/8);
  info.style('color','white')
}
