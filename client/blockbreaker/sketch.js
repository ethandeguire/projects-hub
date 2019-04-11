var colors = {}; //not an array, object
var rows;
var columns;
var xBoardOffset;
var yBoardOffset;
var squareWidth;
var grid;
var wands;
var score;

var scores;
var baseURL = '/api/'

function sendScore(name,score,callback){
  var obj = {"name":name,"score":score,"date":new Date()}
  obj = JSON.stringify(obj);
  var url = baseURL+"newScore/"+obj;
  httpGet(url,'text',false,function(data){
    callback(data);
  })
}

function setup(){
  rows = 15;
	columns = 15;
	xBoardOffset = 10;
	yBoardOffset = 40;
	squareWidth = 30;
	grid = [];
	wands = 5;
	score = 0;

	colors[1] = color(255,0,0);
	colors[2] = color(0,0,255);
	colors[3] = color(255,255,0);
	colors[4] = color(240);

	grid = populateGrid(rows,columns); //random nums 1,2,3

	createCanvas(windowWidth,windowHeight);

  // var url = baseURL + 'getTop'
  // loadJSON(url,function(data){
  //   scores = data.scores;
  // });
  updateHTML();
}

function draw(){
	background(255);
	if (wands > 0){
		displayGrid(grid);
	}
	if (wands == 0){
		fill(0);
		textAlign(CENTER);
		textSize(14);
		text("AHHH, YOU LOSE",windowWidth/2,windowHeight/4);
		textSize(24);
		text("PRESS R TO RESTART",windowWidth/2,windowHeight/4+50);

    //SERVER SIDED STUFF BROKEN
    // textSize(16);
    // text("SCORE: "+score+"  (you will be prompted for your name if your score is >2100)",windowWidth/2,windowHeight/4+100);
    // textSize(14)
    // text("Top Scores: (not sorted (for now))",windowWidth/2,windowHeight/4+120);
    // textSize(12);
    // if (scores != null && scores.length > 0){
    //   for (let i = 0; i<scores.length; i++){
    //     var str = "Name: "+scores[i].name+"     Score: "+scores[i].score;
    //     text(str,windowWidth/2,windowHeight/4+140+(20*i));
    //   }
    // }
    //
    // if(frameCount % 1000 == 0){
    //   var url = baseURL + 'getTop'
    //   loadJSON(url,function(data){
    //     scores = data.scores;
    //   });
    // }
	}
}

function keyPressed(){
  if (keyCode === 82){
    setup();
  }
}

function mouseClicked(){
	if (wands <= 0)return;
	//find grid spot in which click occured:
	row = ((mouseX - ((mouseX-xBoardOffset) % squareWidth))- xBoardOffset) / squareWidth;
	col = ((mouseY - ((mouseY-yBoardOffset) % squareWidth)) - yBoardOffset) / squareWidth;

  grid = killTheBoys(row,col,grid);

	grid = gravityAndShift(grid);
	if (allEmpty(grid)) grid = populateGrid(15, 15);
  checkIfDeadAndRecordScore();
  updateHTML();
}

function killTheBoys(row,col,grid){
  var arrayGroups = getGroups(grid);
	var key = arrayGroups[col+","+row];
	var clearedSpots = spotsWithKey(key,arrayGroups);
	if (clearedSpots.length > 0){
		nums = clearedSpots[0].split(",").map(Number);
		if(grid[nums[0]][nums[1]] != 4){
			grid = clearSpots(grid,clearedSpots);
			if(clearedSpots.length == 1)wands -= 1;
			score += int((clearedSpots.length * clearedSpots.length * .1)+clearedSpots.length);
    }
  }
  return grid;
}

function checkIfDeadAndRecordScore(){
  if(wands == 0){
    if(score > 2100){
      var name = prompt("whats your name");
      if(name != null && name.length > 0 ){
        sendScore(name,score,function(confirmation){
          if (confirmation){
            var url = baseURL + 'getTop'
            loadJSON(url,function(data){
              scores = data.scores;
            });
          }
        });
      }
    }
  }
}

function gravityAndShift(grid){
	var columns = turnArray(grid); //turns array sideways
	var columnsWithOutFours = exludingList(columns, 4); //removes 4s
	var gravitydColumns = fillInArray(columnsWithOutFours, 4) //adds 4s
	var rows = turnArray(gravitydColumns); //turns array sideways
	grid = rows; //update array

	var columns = turnArray(grid);
	var emptyCols = whichAreEmpty(columns);
	var cleanedCols = removeCols(columns,emptyCols);
	var shiftedCols = addCols(cleanedCols, emptyCols.length);

	var rows = turnArray(shiftedCols);
	grid = rows;
	return grid;
}

function allEmpty(arr){
	empty = true;
	for (var i = 0; i < arr.length; i++){
		for (var j = 0; j < arr[i].length; j++){
			if (arr[i][j] != 4){
				empty = false;
				break;
			}
		}
	}
	return empty;
}

function clearSpots(arr,spots){
	for (var i = 0; i < spots.length; i++){
		nums = spots[i].split(",").map(Number);
		arr[nums[0]][nums[1]] = 4;
	}
  return arr;
}

function turnArray(arr){
	columns = [];
	for (var i = 0; i < arr.length; i++){
		columns[i] = [];
		for (var j = 0; j < arr[i].length; j++){
			columns[i][j] = arr[j][i];
		}
	}
	return columns;
}

function updateHTML(){
  document.getElementById("score").innerHTML = 'Score:'+score;
  var str = 'Lives: ';
  for (let i = 0; i< wands; i++){
    str+='♥️';
  }
  document.getElementById("lives").innerHTML = str;
}

function exludingList(arr, element){
	list = [];
	for (var i = 0; i < arr.length; i++){
		list[i] = [];
		for (var j = 0; j < arr[i].length; j++){
			if (arr[i][j] != element){
				list[i].push(arr[i][j])
			}
		}
	}
	return list;
}

function fillInArray(arr, element){
	for (var i = 0; i < arr.length; i++){
		toAdd = 15 - arr[i].length;
		for (var j = 0; j < toAdd; j++){
			arr[i].unshift(element);
		}
	}
	return arr;
}

function whichAreEmpty(arr){
	list = []
	for (var i = 0; i < arr.length; i++){
		if(arr[i].every(j => j == 4)){
			list.push(i);
		}
	}
	return list
}

function removeCols(arr,toRemove){
	for (var i = toRemove.length-1; i >= 0; i--){
		arr.splice(toRemove[i],1);
	}
	return arr;
}

function addCols(arr,toAdd){
	for (var i = 0; i < toAdd; i++){
		arr.push([4,4,4,4,4,4,4,4,4,4,4,4,4,4,4])
	}
	return arr;
}

function populateGrid(x,y){
	var arr = []
	for (var i = 0; i < x; i++) {
		arr[i] = [];
		for (var j = 0; j < y; j++) {
			arr[i][j] = int(random(1,4))
		}
	}
	return arr
}

function displayGrid(arr){
	for (var i = 0; i < arr.length; i++){
		for (var j = 0; j < arr[0].length; j++){
			rectMode(CORNERS)
			fill(colors[arr[i][j]]);
			xi = (j * squareWidth) + xBoardOffset;
			xf = ((j+1) * squareWidth) + xBoardOffset;
			yi = (i * squareWidth) + yBoardOffset;
			yf = ((i+1) * squareWidth) + yBoardOffset;
			rect(xi,yi,xf,yf);

		}
	}
}

function getGroups(array) {
  const graph = buildGraph(array);
  const components = getConnectedComponents(graph);
  return components;
}

function getConnectedComponents(graph) {
  let componentId = 0,
    vertexComponent = {},
    marked = new Set();

  let dfs = function(source) {
    marked.add(source);
    vertexComponent[source] = componentId;
    for (let u of graph[source]) {
      if (!marked.has(u)) dfs(u);
    }
  }

  for (let v in graph) {
    if (!marked.has(v)) {
      dfs(v); // start dfs from an unmarked vertex
      componentId++; // dfs must have "touched" every vertex in that component, so change componentId for the next dfs
    }
  }
  return vertexComponent;
}

function buildGraph(grid) {
  // builds an adjacency list (set) graph representation from a 2d grid
  let g = {};
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      let v = i + ',' + j; // vertex label ( e.g 0,1 )
      if (!(v in g)) g[v] = new Set();
      getNeighbors(grid, i, j).forEach(n => {
        if (!(n in g)) g[n] = new Set();
        g[v].add(n);
        g[n].add(v);
      });
    });
  });
  return g;
}

function getNeighbors(grid, i, j) {
  // returns neighboring cells of the same type as grid[i][j]
  let n = [];
  let color = grid[i][j];
  if (i - 1 >= 0 && grid[i - 1][j] === color) n.push([i - 1, j].join());
  if (j - 1 >= 0 && grid[i][j - 1] === color) n.push([i, j - 1].join());
  if (i + 1 < grid.length && grid[i + 1][j] === color) n.push([i + 1, j].join());
  if (j + 1 < grid[0].length && grid[i][j + 1] === color) n.push([i, j + 1].join());
  return n;
}

function spotsWithKey(findVal,array){
	var arr = [];
	Object.keys(array).forEach(function(key){
		if (array[key] == findVal){
			append(arr,key);
		}
	});
	return arr;
}
