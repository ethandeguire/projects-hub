function createIO()
{

	gui = createGui('Settings:');

	sliderRange(1,maxCols,1);
	gui.addGlobals('Columns');

	sliderRange(1,maxRows,1)
	gui.addGlobals('Rows');

	sliderRange(0,255,1);
	gui.addGlobals('Red', 'Green', 'Blue');

    gridToggle = createButton('Toggle Grid');
    gridToggle.position(52,350);
    gridToggle.size(100);
    gridToggle.mousePressed(gridCheck);

    streamToggle = createButton('Toggle Stream');
    streamToggle.position(52,400);
    streamToggle.size(100);
    streamToggle.mousePressed(streamCheck);

    Single = createButton('Single Pen');
    Single.position(52,465);
    Single.size(100);
    Single.mousePressed(setSingle);

    Five = createButton('Five Pen');
    Five.position(52,515);
    Five.size(100);
    Five.mousePressed(setFive);

    Circle = createButton('Circle Pen');
    Circle.position(52,565);
    Circle.size(100);
    Circle.mousePressed(setCircle);

    Callig = createButton('Calligraphy Pen');
    Callig.position(52,615);
    Callig.size(100);
    Callig.mousePressed(setCallig);

	ClearCanv = createButton('Clear Canvas');
    ClearCanv.position(52,680);
    ClearCanv.size(100);
    ClearCanv.mousePressed(ClearCanvas);
}

function setSingle()
{
    brush = 'single';
}

function setFive()
{
    brush = 'five';
}

function setCircle()
{
    brush = 'circle';
}

function setCallig()
{
    brush = 'callig';
}

function streamCheck()
{
    if (streamBool == true)
	{
        streamBool = false;
    }
	else if (streamBool == false)
	{
        streamBool = true;
    }
}

function gridDraw()
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

	stroke(0);
	for (var i=0; i <= Rows; i++) {
		line(x.arrPos,y.arrPos + (i * boxsize), x.arrPos + (Columns * boxsize), y.arrPos + (i * boxsize));
	}
	for (var j=0; j <= Columns; j++) {
		line(x.arrPos + (j * boxsize), y.arrPos, x.arrPos + (j * boxsize), y.arrPos + (Rows * boxsize));
	}
}

function gridCheck()
{
    if (gridBool == true)
	{
        gridBool = false;
    }
	else if (gridBool == false)
	{
        gridBool = true;
    }
}
