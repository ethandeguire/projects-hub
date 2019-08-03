var deck1 = [];
var deck2 = [];

var fullDeck = [];

var deck1Wins = 0;
var deck2Wins = 0;
var ties = 0;
var doubleTies = 0;
var tripleTies = 0;

var tiesThisRound = 0;
var tiesPerRound = [];
var tiesPerMatch = [];

continueGame = true;

var buttons = [];
var oldWidth, oldHeight;

function setup(){
	createCanvas(windowWidth-2,windowHeight-0);
	background(120);
	frameRate(60);
	shuffleAndDeck();
  curWidth = windowWidth-2;
  curHeight = windowHeight;
	//easierButtons("Download '.txt' containing the number of ties in each game", 2, 4);
}

function canvasSize(newX, newY){
  if (newX != oldWidth || newY != oldHeight){
    oldWidth = newX;
    oldHeight = newY;
    createCanvas(windowWidth-2,windowHeight);
    background(120);
  }

}

function draw(){
  canvasSize(windowWidth-2, windowHeight);

	if (deck1.length <= 0){
		if (continueGame == true){
		win('deck2');
		}
	}
	if (deck2.length <= 0){
		if (continueGame == true){
		win('deck1');
		}
	}
	if (continueGame == true){
		drawCards();
		declareWar();
	}

	//drawGraph();

	//restarts game as soon as previous one is over, can be changed
	if (continueGame == false){
		restartGame();
	}
}

function easierButtons(buttonName, x, y){
	buttons.push(createButton(buttonName));
	buttons[buttons.length-1].position(x,y);
	buttons[buttons.length-1].mousePressed(function(){

	saveStrings(CSV(), "Ties");

	});
}

//used only to type into console and reveal current standings
function wins(){
	console.log("Matches Played:", deck1Wins + deck2Wins);
	console.log("Deck 1 Wins", deck1Wins);
	console.log("Deck 2 Wins", deck2Wins);
	console.log("Ties:", ties);
	console.log("Double Ties:", doubleTies);
	console.log("Triple Ties:", tripleTies);
}

//this function takes the shuffled deck and sorts it into two piles
function shuffleAndDeck(){
	shuffledDeck = listOfCards();

	for (var i = 0; i<shuffledDeck.length; i++){
		if (i % 2 == 1){
			deck1.push(new Card(shuffledDeck[i]).value);
		}else{
			deck2.push(new Card(shuffledDeck[i]).value);
		}
	}

}

function shuffleArr(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function listOfCards(){
	for (var j = 0; j<4; j++){
		for (var i = 2; i<15; i++){
			fullDeck.push(i);
		}
	}

	for (var i = 0; i < int(random(4,11)); i++){
		fullDeck = shuffleArr(fullDeck);
		//console.log("shuffled");
		//shuffles the deck randomly between 4 and 10 times
	}

	var tempArr = [];
	for (var i = 0; i<fullDeck.length; i++){
		tempArr[i] = new Card(fullDeck[i]);
	}

	return tempArr;
}



function restartGame(){
	tiesPerRound.push(tiesThisRound);
	tiesPerMatch.push(ties/(deck1Wins + deck2Wins));
	drawGraph();

	tiesThisRound = 0;
	fullDeck = [];
	deck1 = [];
	deck2 = [];
	shuffleAndDeck();
	continueGame = true;
	return 'done'
}

function softRestart(){
	fullDeck = [];
	deck1 = [];
	deck2 = [];
	shuffleAndDeck();
}

function drawGraph(){
	fill(120);
	rect(0,0,windowWidth,windowHeight * (2/7));
	fill(255);
	rect(windowWidth * (1/2) +5, 5, windowWidth * (1/2) -15, windowHeight * (2/7));

	//matches = x axis
	//ties per match = y axis
	var matches = (deck1Wins + deck2Wins);

	var graphWidth = windowWidth * (1/2) + 5;
	var graphHeight = windowHeight * (2/7);

	var dist = (graphWidth-15) / matches;
	var h = graphHeight / max(tiesPerMatch) /4 * 3;

	for (var i = 0; i<matches; i++){
		fill(0);
		ellipse(graphWidth + (dist * i), 5 + (h * tiesPerMatch[i]), 5, 5);
	}
	text(round(100 * tiesPerMatch[tiesPerMatch.length-1])/100 + " Ties/m", windowWidth-60, windowHeight * (2/7) -10);
	text("Matches Played", (windowWidth * (1/2)) + (windowWidth * (1/4)) - 10, windowHeight * (2/7) -4);
	text("Ties / Match", (windowWidth * (1/2))+4, windowHeight * (2/11) -4);

}

function CSV(){
	var vals = "";
	for (var i = 0; i<tiesPerRound.length; i++){
		vals += tiesPerRound[i] + ',';
	}
	return vals;
}

function drawCards(){
	noStroke();
	fill(120);
	rect(0,windowHeight * (2/7), windowWidth, windowHeight);
	fill(255);
	textSize(10);
	for (var i = 0; i<deck1.length; i++){
		text(deck1[i].value, windowWidth * (1/3), windowHeight * (1/3) + ((windowHeight * (2/3) / deck1.length) * i));
	}
	for (var i = 0; i<deck2.length; i++){
		text(deck2[i].value, windowWidth * (2/3), windowHeight * (1/3) + ((windowHeight * (2/3) / deck2.length) * i));
	}

}

function Append(deck, value, endValue = 0){
	for (var i = 0; i<= endValue; i++){
		//picks random 0 or 1 to decide which order cards are picked up in
		var rand = int(random(2));
		if (rand == 1){
			deck[deck.length] = (new Card(deck1[value+i].value));
			deck[deck.length] = (new Card(deck2[value+i].value));
		}if (rand == 0){
			deck[deck.length] = (new Card(deck2[value+i].value));
			deck[deck.length] = (new Card(deck1[value+i].value));
		}

	}
	for (var i = 0; i<= endValue; i++){
		deck1.splice(0,1);
		deck2.splice(0,1);
	}
}

function declareWar(){
	if (deck1[0].value > deck2[0].value){
		Append(deck1, 0);
	}
	else if (deck1[0].value < deck2[0].value){
		Append(deck2, 0);
	}

	else if (deck1[0].value == deck2[0].value){
		ties++;
		tiesThisRound++;
		if (checkLengthTo(5)){
			if(deck1[4].value == deck2[4].value){
				doubleTies++;
				if (checkLengthTo(9)){
					if(deck1[8].value == deck2[8].value){
						console.log("triple tie");
						tripleTies++;
						softRestart();
					}
					else if(deck1[8].value > deck2[8].value){
						Append(deck1, 0, 8);
					}
					else if(deck1[8].value < deck2[8].value){
						Append(deck2, 0, 8);
					}
				}
			}

			else if(deck1[4].value > deck2[4].value){
				Append(deck1, 0, 4);
			}
			else if(deck1[4].value < deck2[4].value){
				Append(deck2, 0, 4);
			}
		}

	}
}

function checkLengthTo(length){
	if (deck1.length < length){

		if (continueGame == true){
			win('deck2');
			return false;
		}
	}
	if (deck2.length < length){

		if (continueGame == true){
			win('deck1');
			return false;
		}
	}
	else{return true;}
}

function win(deck){
	//console.log(deck, 'wins');
	if(deck == 'deck1'){deck1Wins++;}
	if(deck == 'deck2'){deck2Wins++;}
	continueGame = false;
}

function keyPressed(){
	restartGame();
}

class Card {
	constructor(position){
		this.value = position;
	}
}
