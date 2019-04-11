var squares = [];
var csvData = [5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,4];
var showNumbers = true;
var buttons = [];

let upSide = [];
let downSide = [];
let rightSide = [];
let leftSide = [];
let frontSide = [];
let backSide = [];

class cubeColors{
  constructor(){
    this.white =  [0,0,0,0,0,0,0,0,0];
    this.yellow = [1,1,1,1,1,1,1,1,1];
    this.red =    [2,2,2,2,2,2,2,2,2];
    this.blue =   [3,3,3,3,3,3,3,3,3];
    this.orange = [4,4,4,4,4,4,4,4,4];
    this.green =  [5,5,5,5,5,5,5,5,5];
  }
};

class Square{
	constructor(width,x,y,col){
		this.width = width;
		this.x = x;
		this.y = y;
		this.col = col;
		this.num;
	}

	show(){
		rectMode(CORNER);
		fill(this.col);
		noStroke();
		if(this.num >= 0){stroke(0);}
		rect(this.x,this.y,this.width,this.width);
		textSize(20);
		if(showNumbers == true && this.num >= 0){
			var column = this.x/this.width;
			var row = this.y/this.width;

			textAlign(CENTER);
			fill(0);
			noStroke();

			if(round(column) == 4 && row == 1){
				text("Back" , this.x + (this.width/2), this.y + (this.width/2));
			}
			if(round(column) == 4 && round(row) == 7){
				text("Front" , this.x + (this.width/2), this.y + (this.width/2));
			}
			if(round(column) == 10 && round(row) == 4){
				text("Down" , this.x + (this.width/2), this.y + (this.width/2));
			}
			if(round(column) == 7 && round(row) == 4){
				text("Right" , this.x + (this.width/2), this.y + (this.width/2));
			}
			if(round(column) == 4 && round(row) == 4){
				text("Top" , this.x + (this.width/2), this.y + (this.width/2));
			}
			if(round(column) == 1 && round(row) == 4){
				text("Left" , this.x + (this.width/2), this.y + (this.width/2));
			}
			if(this.num != 4){
				text(this.num + "" , this.x + (this.width/2), this.y + (this.width/2));
			}
		}
	}

	change(newCol,num){
		this.num = num;
		this.col = color(newCol);
		stroke(0);
		strokeWeight(3);
		this.show();
		noStroke();

	}
}

function setup() {
	var button1 = createButton("Add CSV Data");
	button1.mousePressed(function(){var data=prompt();var tempArr=[];for(var i=0;i<data.length;i++){if(data[i]!=','){tempArr.push(int(data[i]));}}csvData=tempArr;makeSquares();});
	button1.position(0,0);

	var button2 = createButton("Show Numbers");
	button2.mouseClicked(function(){if(showNumbers == false){showNumbers = true}else{showNumbers = false}makeSquares();});
	button2.position(0,25);


	red = color(255,0,0);
	yellow = color(255,255,0);
	green = color(0,255,0);
	blue = color(0,120,255);
	orange = color(255,128,0);
	white = color(255);
	makeSquares();


	cube = new cubeColors;
  solver(cube);

  let name = ["R", "Ri","L", "Li","F", "Fi","B", "Bi","D", "Di","U", "Ui"];
  let funcs = [turnRight, turnRightInverted, turnLeft, turnLeftInverted, turnFront, turnFrontInverted, turnBack, turnBackInverted, turnDown, turnDownInverted, turnUp, turnUpInverted];
  console.log(name,funcs);
  for (var i = 0; i < name.length; i++) {
    let f = funcs[i];
    easierButtons(name[i],windowWidth/9+(i*30), windowHeight*8/9, function(){f();csvData = CSV().split(',');makeSquares();});
  }

}

function makeSquares(){
	createCanvas(windowWidth,windowHeight-5);
	background(255);
	noStroke();
	frameRate(60);


	//finds maximum square width;
	var maxWidthX = windowWidth/12;
	var maxWidthY = windowHeight/9;
	if(maxWidthX <= maxWidthY){sqrWidth = maxWidthX}else{var sqrWidth = maxWidthY}

	var squaresX = int(windowWidth/sqrWidth);
	var squaresY = int(windowHeight/sqrWidth);
	for(var i = 0; i<squaresX; i++){
		squares[i] = [];
		for(var j = 0; j<squaresY; j++){
			squares[i][j] = new Square(sqrWidth, i*sqrWidth, j*sqrWidth, 200);
			squares[i][j].show();
		}
	}


	//front
	newSquare(3,6,0,0);
	newSquare(4,6,1,1);
	newSquare(5,6,2,2);
	newSquare(3,7,3,3);
	newSquare(4,7,4,4);
	newSquare(5,7,5,5);
	newSquare(3,8,6,6);
	newSquare(4,8,7,7);
	newSquare(5,8,8,8);

	//top
	newSquare(3,3,9,0);
	newSquare(4,3,10,1);
	newSquare(5,3,11,2);
	newSquare(3,4,12,3);
	newSquare(4,4,13,4);
	newSquare(5,4,14,5);
	newSquare(3,5,15,6);
	newSquare(4,5,16,7);
	newSquare(5,5,17,8);

	//back
	newSquare(3,2,18,0);
	newSquare(4,2,19,1);
	newSquare(5,2,20,2);
	newSquare(3,1,21,3);
	newSquare(4,1,22,4);
	newSquare(5,1,23,5);
	newSquare(3,0,24,6);
	newSquare(4,0,25,7);
	newSquare(5,0,26,8);

	//bottom
	newSquare(11,5,27,0);
	newSquare(10,5,28,1);
	newSquare(9,5,29,2);
	newSquare(11,4,30,3);
	newSquare(10,4,31,4);
	newSquare(9,4,32,5);
	newSquare(11,3,33,6);
	newSquare(10,3,34,7);
	newSquare(9,3,35,8);

	//right
	newSquare(6,5,36,0);
	newSquare(6,4,37,1);
	newSquare(6,3,38,2);
	newSquare(7,5,39,3);
	newSquare(7,4,40,4);
	newSquare(7,3,41,5);
	newSquare(8,5,42,6);
	newSquare(8,4,43,7);
	newSquare(8,3,44,8);

	//left
	newSquare(2,3,45,0);
	newSquare(2,4,46,1);
	newSquare(2,5,47,2);
	newSquare(1,3,48,3);
	newSquare(1,4,49,4);
	newSquare(1,5,50,5);
	newSquare(0,3,51,6);
	newSquare(0,4,52,7);
	newSquare(0,5,53,8);



	noFill();
	stroke(0);
	strokeWeight(10);
	rect(sqrWidth*3,0,sqrWidth*3,sqrWidth*9);
	rect(0,sqrWidth*3,sqrWidth*12,sqrWidth*3);
	rect(0,sqrWidth*3,sqrWidth*9,sqrWidth*3);


}

function newSquare(x,y,arrPos,num){
	if(csvData[arrPos] == 0){col = white}
	if(csvData[arrPos] == 1){col = yellow}
	if(csvData[arrPos] == 2){col = red}
	if(csvData[arrPos] == 3){col = blue}
	if(csvData[arrPos] == 4){col = orange}
	if(csvData[arrPos] == 5){col = green}
	squares[x][y].change(col,num);
}

function draw() {
  csvData = CSV().split(',');
  makeSquares();
}

function solver(cube){
  for (let i = 0; i<9; i++){
    //sets up the sides for the proper color movements
    //the camera data should determine all of these
    //make sure these states are valid
    upSide[i] = cube.white[i];
    downSide[i] = cube.yellow[i];
    rightSide[i] = cube.red[i];
    leftSide[i] = cube.orange[i];
    frontSide[i] = cube.green[i];
    backSide[i] = cube.blue[i];
  }


  print(CSV());
  csvData = CSV().split(',');
  makeSquares();

  /*
  //randomizes cube
  srand(time(NULL)); //seeds rng with current time
  for (let i = 0; i<(200+rand()%30); i++){//runs scrambler a random amount of times
    let random = rand()%6;
    if (random == 0){turnRight();}
    if (random == 1){turnLeft();}
    if (random == 2){turnUp();}
    if (random == 3){turnDown();}
    if (random == 4){turnFront();}
    if (random == 5){turnBack();}
  }
  */


}

//prints values in the order of  (front,up,back,down,right,left)
function CSV(){
  let str = '';
  for (let i = 0; i<9; i++){
    str += frontSide[i]+',';
  }
  for (let i = 0; i<9; i++){
    str += upSide[i]+',';
  }
  for (let i = 0; i<9; i++){
    str += backSide[i]+',';
  }
  for (let i = 0; i<9; i++){
    str += downSide[i]+',';
  }
  for (let i = 0; i<9; i++){
    str += rightSide[i]+',';
  }
  for (let i = 0; i<9; i++){
    str += leftSide[i]+',';
  }
  return str;
}

function turnRight(){
  let oldRight = [];
  for (let i = 0; i<9; i++){
    oldRight[i] = rightSide[i];
  }
  //right corners
  rightSide[0] = oldRight[6];
  rightSide[2] = oldRight[0];
  rightSide[8] = oldRight[2];
  rightSide[6] = oldRight[8];
  //right sides
  rightSide[1] = oldRight[3];
  rightSide[5] = oldRight[1];
  rightSide[7] = oldRight[5];
  rightSide[3] = oldRight[7];

  let oldUp = [], oldBack = [], oldDown = [], oldFront = [];
  for(let i = 0; i<3; i++){
    oldUp[i] = upSide[(i*3)+2];
    oldBack[i] = backSide[(i*3)+2];
    oldDown[i] = downSide[(i*3)+2];
    oldFront[i] = frontSide[(i*3)+2];
  }
  for(let i = 0; i<3; i++){
    upSide[(i*3)+2] = oldFront[i];
    backSide[(i*3)+2] = oldUp[2-i];
    downSide[(i*3)+2] = oldBack[2-i];
    frontSide[(i*3)+2] = oldDown[i];
  }
}
function turnRightInverted(){
  let oldRight = [];
  for (let i = 0; i<9; i++){
    oldRight[i] = rightSide[i];
  }
  //right corners
  rightSide[0] = oldRight[2];
  rightSide[2] = oldRight[8];
  rightSide[8] = oldRight[6];
  rightSide[6] = oldRight[0];
  //right sides
  rightSide[1] = oldRight[5];
  rightSide[5] = oldRight[7];
  rightSide[7] = oldRight[3];
  rightSide[3] = oldRight[1];

  let oldUp = [], oldBack = [], oldDown = [], oldFront = [];
  for(let i = 0; i<3; i++){
    oldUp[i] = upSide[(i*3)+2];
    oldBack[i] = backSide[(i*3)+2];
    oldDown[i] = downSide[(i*3)+2];
    oldFront[i] = frontSide[(i*3)+2];
  }
  for(let i = 0; i<3; i++){
    upSide[(i*3)+2] = oldBack[2-i];
    backSide[(i*3)+2] = oldDown[2-i];
    downSide[(i*3)+2] = oldFront[i];
    frontSide[(i*3)+2] = oldUp[i];
  }
}
function turnLeft(){
  let oldLeft = [];;
  for (let i = 0; i<9; i++){
    oldLeft[i] = leftSide[i];
  }
  //left corners
  leftSide[0] = oldLeft[6];
  leftSide[6] = oldLeft[8];
  leftSide[8] = oldLeft[2];
  leftSide[2] = oldLeft[0];
  //left sides
  leftSide[1] = oldLeft[3];
  leftSide[5] = oldLeft[1];
  leftSide[7] = oldLeft[5];
  leftSide[3] = oldLeft[7];

  let oldUp = [], oldBack = [], oldDown = [], oldFront = [];
  for(let i = 0; i<3; i++){
    oldUp[i] = upSide[(i*3)];
    oldBack[i] = backSide[(i*3)];
    oldDown[i] = downSide[(i*3)];
    oldFront[i] = frontSide[(i*3)];
  }
  for(let i = 0; i<3; i++){
    upSide[(i*3)] = oldBack[2-i];
    backSide[(i*3)] = oldDown[2-i];
    downSide[(i*3)] = oldFront[i];
    frontSide[(i*3)] = oldUp[i];
  }
}
function turnLeftInverted(){
  let oldLeft = [];;
  for (let i = 0; i<9; i++){
    oldLeft[i] = leftSide[i];
  }
  //left corners
  leftSide[0] = oldLeft[2];
  leftSide[6] = oldLeft[0];
  leftSide[8] = oldLeft[6];
  leftSide[2] = oldLeft[8];
  //left sides
  leftSide[1] = oldLeft[5];
  leftSide[5] = oldLeft[7];
  leftSide[7] = oldLeft[3];
  leftSide[3] = oldLeft[1];

  let oldUp = [], oldBack = [], oldDown = [], oldFront = [];
  for(let i = 0; i<3; i++){
    oldUp[i] = upSide[(i*3)];
    oldBack[i] = backSide[(i*3)];
    oldDown[i] = downSide[(i*3)];
    oldFront[i] = frontSide[(i*3)];
  }
  for(let i = 0; i<3; i++){
    upSide[(i*3)] = oldFront[i];
    backSide[(i*3)] = oldUp[2-i];
    downSide[(i*3)] = oldBack[2-i];
    frontSide[(i*3)] = oldDown[i];
  }
}
function turnFront(){
  let oldFront = [];
  for (let i = 0; i<9; i++){
    oldFront[i] = frontSide[i];
  }
  //left corners
  frontSide[0] = oldFront[6];
  frontSide[6] = oldFront[8];
  frontSide[8] = oldFront[2];
  frontSide[2] = oldFront[0];
  //left sides
  frontSide[1] = oldFront[3];
  frontSide[5] = oldFront[1];
  frontSide[7] = oldFront[5];
  frontSide[3] = oldFront[7];

  let oldRight = [], oldLeft = [], oldDown = [], oldUp = [];
  for(let i = 0; i<3; i++){
    oldUp[i] = upSide[i+6];
    oldDown[i] = downSide[i];
    oldLeft[i] = leftSide[(i*3)+2];
    oldRight[i] = rightSide[i*3];
  }
  for(let i = 0; i<3; i++){
    upSide[i+6] = oldLeft[2-i];
    downSide[i] = oldRight[2-i];
    leftSide[(i*3)+2] = oldDown[i];
    rightSide[i*3] = oldUp[i];
  }
}
function turnFrontInverted(){
  let oldFront = [];
  for (let i = 0; i<9; i++){
    oldFront[i] = frontSide[i];
  }
  //left corners
  frontSide[0] = oldFront[2];
  frontSide[6] = oldFront[0];
  frontSide[8] = oldFront[6];
  frontSide[2] = oldFront[8];
  //left sides
  frontSide[1] = oldFront[5];
  frontSide[5] = oldFront[7];
  frontSide[7] = oldFront[3];
  frontSide[3] = oldFront[1];

  let oldRight = [], oldLeft = [], oldDown = [], oldUp = [];
  for(let i = 0; i<3; i++){
    oldUp[i] = upSide[i+6];
    oldDown[i] = downSide[i];
    oldLeft[i] = leftSide[(i*3)+2];
    oldRight[i] = rightSide[i*3];
  }
  for(let i = 0; i<3; i++){
    upSide[i+6] = oldRight[i];
    downSide[i] = oldLeft[i];
    leftSide[(i*3)+2] = oldUp[2-i];
    rightSide[i*3] = oldDown[2-i];
  }
}
function turnUp(){
  let oldUp = [];
  for (let i = 0; i<9; i++){
    oldUp[i] = upSide[i];
  }
  //left corners
  upSide[0] = oldUp[6];
  upSide[2] = oldUp[0];
  upSide[8] = oldUp[2];
  upSide[6] = oldUp[8];
  //left sides
  upSide[1] = oldUp[3];
  upSide[5] = oldUp[1];
  upSide[7] = oldUp[5];
  upSide[3] = oldUp[7];

  let oldFront = [], oldLeft = [], oldBack = [], oldRight = [];
  for(let i = 0; i<3; i++){
    oldFront[i] = frontSide[i];
    oldLeft[i] = leftSide[i];
    oldBack[i] = backSide[i];
    oldRight[i] = rightSide[i];
  }
  for(let i = 0; i<3; i++){
    frontSide[i] = oldRight[i];
    rightSide[i] = oldBack[2-i];
    backSide[i] = oldLeft[2-i];
    leftSide[i] = oldFront[i];
  }
}
function turnUpInverted(){
  let oldUp = [];
  for (let i = 0; i<9; i++){
    oldUp[i] = upSide[i];
  }
  //left corners
  upSide[0] = oldUp[2];
  upSide[2] = oldUp[8];
  upSide[8] = oldUp[6];
  upSide[6] = oldUp[0];
  //left sides
  upSide[1] = oldUp[5];
  upSide[5] = oldUp[7];
  upSide[7] = oldUp[3];
  upSide[3] = oldUp[1];

  let oldFront = [], oldLeft = [], oldBack = [], oldRight = [];
  for(let i = 0; i<3; i++){
    oldFront[i] = frontSide[i];
    oldLeft[i] = leftSide[i];
    oldBack[i] = backSide[i];
    oldRight[i] = rightSide[i];
  }
  for(let i = 0; i<3; i++){
    frontSide[i] = oldLeft[i];
    rightSide[i] = oldFront[i];
    backSide[i] = oldRight[2-i];
    leftSide[i] = oldBack[2-i];
  }
}
function turnBack(){
  let oldBack = [];
  for (let i = 0; i<9; i++){
    oldBack[i] = backSide[i];
  }
  //corners
  backSide[0] = oldBack[2];
  backSide[2] = oldBack[8];
  backSide[8] = oldBack[6];
  backSide[6] = oldBack[0];
  //sides
  backSide[1] = oldBack[5];
  backSide[5] = oldBack[7];
  backSide[7] = oldBack[3];
  backSide[3] = oldBack[1];

  let oldLeft = [], oldUp = [], oldRight = [], oldDown = [];
  for(let i = 0; i<3; i++){
    oldLeft[i] = leftSide[3*i];
    oldUp[i] = upSide[i];
    oldRight[i] = rightSide[(i*3)+2];
    oldDown[i] = downSide[i+6];
  }
  for(let i = 0; i<3; i++){
    leftSide[3*i] = oldUp[2-i];
    upSide[i] = oldRight[i];
    rightSide[(i*3)+2] = oldDown[2-i];
    downSide[i+6] = oldLeft[i];
  }
}
function turnBackInverted(){
  let oldBack = [];
  for (let i = 0; i<9; i++){
    oldBack[i] = backSide[i];
  }
  //corners
  backSide[0] = oldBack[6];
  backSide[2] = oldBack[0];
  backSide[8] = oldBack[2];
  backSide[6] = oldBack[8];
  //sides
  backSide[1] = oldBack[3];
  backSide[5] = oldBack[1];
  backSide[7] = oldBack[5];
  backSide[3] = oldBack[7];

  let oldLeft = [], oldUp = [], oldRight = [], oldDown = [];
  for(let i = 0; i<3; i++){
    oldLeft[i] = leftSide[3*i];
    oldUp[i] = upSide[i];
    oldRight[i] = rightSide[(i*3)+2];
    oldDown[i] = downSide[i+6];
  }
  for(let i = 0; i<3; i++){
    leftSide[3*i] = oldDown[i];
    upSide[i] = oldLeft[2-i];
    rightSide[(i*3)+2] = oldUp[i];
    downSide[i+6] = oldRight[2-i];
  }
}
function turnDown(){
  let oldDown = [];
  for (let i = 0; i<9; i++){
    oldDown[i] = downSide[i];
  }
  //left corners
  downSide[0] = oldDown[6];
  downSide[6] = oldDown[8];
  downSide[8] = oldDown[2];
  downSide[2] = oldDown[0];
  //left sides
  downSide[1] = oldDown[3];
  downSide[5] = oldDown[1];
  downSide[7] = oldDown[5];
  downSide[3] = oldDown[7];

  let oldFront = [], oldLeft = [], oldBack = [], oldRight = [];
  for(let i = 0; i<3; i++){
    oldFront[i] = frontSide[i+6];
    oldLeft[i] = leftSide[i+6];
    oldBack[i] = backSide[i+6];
    oldRight[i] = rightSide[i+6];
  }
  for(let i = 0; i<3; i++){
    frontSide[i+6] = oldLeft[i];
    rightSide[i+6] = oldFront[i];
    backSide[i+6] = oldRight[2-i];
    leftSide[i+6] = oldBack[2-i];
  }
}
function turnDownInverted(){
  let oldDown = [];
  for (let i = 0; i<9; i++){
    oldDown[i] = downSide[i];
  }
  //left corners
  downSide[0] = oldDown[2];
  downSide[6] = oldDown[0];
  downSide[8] = oldDown[6];
  downSide[2] = oldDown[8];
  //left sides
  downSide[1] = oldDown[5];
  downSide[5] = oldDown[7];
  downSide[7] = oldDown[3];
  downSide[3] = oldDown[1];

  let oldFront = [], oldLeft = [], oldBack = [], oldRight = [];
  for(let i = 0; i<3; i++){
    oldFront[i] = frontSide[i+6];
    oldLeft[i] = leftSide[i+6];
    oldBack[i] = backSide[i+6];
    oldRight[i] = rightSide[i+6];
  }
  for(let i = 0; i<3; i++){
    frontSide[i+6] = oldRight[i];
    rightSide[i+6] = oldBack[2-i];
    backSide[i+6] = oldLeft[2-i];
    leftSide[i+6] = oldFront[i];
  }
}

function easierButtons(buttonName, x, y, func){
	buttons.push(createButton(buttonName));
	buttons[buttons.length-1].position(x,y);
	buttons[buttons.length-1].mousePressed(func);
}
