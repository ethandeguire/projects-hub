var col;
var brush = 'single';

var boxsize = 24;

var maxCols = 64;
var maxRows = 64;

var Columns = 32;
var Rows = 32;

var Red = 0;
var Green = 0;
var Blue = 0;
var gridToggle, single, five, circle, callig;
var gridBool = true;
var streamBool = true;

arrPos = [];
saveSquares = [];

var x = {arrPos:240};
var y = {arrPos:40};

var lastJ = -1;
var lastI = -1;

var frameCheck = false;

function setup()
{
	stroke(1);
    createCanvas(windowWidth-5,windowHeight-5);
    frameRate(60);


    createIO();

    ClearCanvas();

}

function draw()
{
	if (mouseHeldCheck() == false) {
		lastI = -1;
		lastJ = -1;
	}

    var r = Red;
    var g = Green;
    var b = Blue;

	background(r,g,b);

    col = color(r,g,b);

	if (mouseIsPressed == true) {
		frameCheck = true;
	} else if (mouseIsPressed == false) {
		frameCheck = false;
	}

    if (gridBool == true)
	{
		gridDraw();
    }
	else
	{
        noStroke();
        for (var i=0; i < Columns; i++)
		{
            for (var j=0; j < Rows; j++)
			{
				fill(arrPos[i][j].tell());
				arrPos[i][j].show();
            }
        }


    }
    if (streamBool == true && mouseIsPressed)
	{
        changeColors();
    }

	noFill();
	stroke(0);
	rect(240,40,Columns*boxsize,Rows*boxsize);
}


function mousePressed()
{
	noStroke();
    if (streamBool == false)
	{
		changeColors();
    }
}
