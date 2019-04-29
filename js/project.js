/////////////////////////////////////////////////////////////////
///////////////	Global Variables  //////////////////////////////
///////////////////////////////////////////////////////////////
var player;
cookie = document.cookie
console.log(cookie);
cookie = cookie.split('=')
var points = cookie[1]
points = parseInt(points, 10);
console.log(points)
document.cookie = cookie;
var keyboard, left, right, space;
var game = new Game(1000, 650, "Tutorial 3");
var pickedUp = false;
var heldItem = null;
var counter;
var nItems = 6;
var dead = false

/////////////////////////////////////////////////////////////////
///////////////	Functions /////////////////// ///////////////////
///////////////////////////////////////////////////////////////

function preload() {
	
	game.loadBackgroundImage('background', 'img/background.jpg', 1000, 650);
	player = new Sprite("img/mario-sprite.png", 17, 32);
	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	space = keyboard.createSpaceKey();
	down = keyboard.createDownKey();
	platforms = new Sprite('img/platform.png')
	
	cardboardbins = new Sprite('img/cardboardBin.png')
	cardboardbins.type = 'cardboard'
	plasticbins = new Sprite('img/plasticBin.png')
	plasticbins.type = 'plastic'
	glassbins = new Sprite('img/glassBin.png')
	glassbins.type = 'glass'
	
	coins = new Sprite('img/coin.png', 15, 15)
	
	cardboards = new Sprite('img/cardboard.png', 30, 30)
	cardboards.type = 'cardboard'
	
	plastics = new Sprite('img/plastic.png', 20, 40)
	plastics.type = 'plastic'
	
	glasses = new Sprite('img/glass.png', 20, 50)
	glasses.type = 'glass'
	
	purpledoors = new Sprite('img/purpledoor.png')
	purpledoors.isOpen = false
	yellowdoors = new Sprite('img/yellowdoor.png')
	yellowdoors.isOpen = false
	purplekeys = new Sprite('img/purplekey.png')
	yellowkeys = new Sprite('img/yellowkey.png')
	
	spikes = new Sprite('img/spikes.png', 60, 20)
	
}

function create() {
	game.setBackgroundImage('background')
	counter = 0;
	
	player.create(490, 100);
	player.addAnimation('left', [7,8,9,10], 10);
	player.addAnimation('right', [0,1,2,3], 10);
	player.setStopFrame(5);	
	player.setGravityY(200);
	
	platform1 = platforms.create(0, 120, 200, 15);
	platform2 = platforms.create(800, 120, 200, 15);
	stepLeft = platforms.create(250, 160, 50, 15);
	stepRight = platforms.create(700, 160, 50, 15);
	stepMiddle = platforms.create(430, 130, 140, 20);
	divider = platforms.create(490, 150, 20, 500);
	tunnelTop = platforms.create(510, 500, 380, 15);
	rightLedge = platforms.create(510, 420, 75, 15);
	rightDivider = platforms.create(740, 300, 20, 210);
	rightFloater = platforms.create(630, 375, 25, 15);
	rightFloater2 = platforms.create(680, 340, 25, 15);
	rightWall = platforms.create(630, 460, 20, 50);
	rightPlat1 = platforms.create(750, 355, 60, 10);
	rightPlat2 = platforms.create(750, 405, 100, 10);
	rightPlat3 = platforms.create(900, 310, 100, 20);
	rightFloater3 = platforms.create(820, 265, 50, 15);
	rightFloater4 = platforms.create(510, 265, 150, 15);
	rightLedge2 = platforms.create(925, 450, 100, 15);
	rightStep1 = platforms.create(580, 215, 30, 15);
	rightStep2 = platforms.create(635, 190, 30, 15);
	rightStep3 = platforms.create(970, 545, 15, 10);
	rightStep4 = platforms.create(970, 590, 15, 10);
	rightBump = platforms.create(760, 335, 20, 20); 
	leftEntry1 = platforms.create(20, 210, 200, 15);
	leftEntry1 = platforms.create(290, 210, 200, 15);
	square = platforms.create(230, 260, 50, 50);
	archLeft = platforms.create(160, 225, 15, 40);
	archRight = platforms.create(330, 225, 15, 40);
	base1 = platforms.create(80, 310, 345, 15);
	base1WallLeft = platforms.create(90, 290, 15, 30);
	base1WallRight = platforms.create(400, 290, 15, 30);
	leftEntry2 = platforms.create(20, 410, 150, 15);
	rightEntry2 = platforms.create(340, 410, 150, 15);
	leftDivider = platforms.create(245, 325, 20, 185);
	base2 = platforms.create(80, 510, 345, 15);
	leftLedge1 = platforms.create(20, 560, 20, 15);
	leftLedge2 = platforms.create(470, 560, 20, 15);
	bottomStep1 = platforms.create(90, 580, 50, 15);
	bottomStep2 = platforms.create(215, 580, 80, 15);
	bottomStep3 = platforms.create(370, 580, 50, 15);
	stepsUp = platforms.create(230, 460, 50, 15);
	
	floor = platforms.create(0, 630, 1000, 20);
	leftwall = platforms.create(0, 0, 20, 650);
	rightwall = platforms.create(980, 0, 20, 650);
	ceiling = platforms.create(0, 0, 1000, 20);
	platforms.setImmovable(true);
	//
	
	
	spike1 = spikes.create(650, 480);
	spike2 = spikes.create(20, 610);
	spike3 = spikes.create(150, 610);
	spike4 = spikes.create(300, 610);
	spike5 = spikes.create(600, 610);
	spike6 = spikes.create(750, 610);
	spikes.addAnimation('flash', [0, 1], 3);
	spikes.setImmovable(true)
	//
	
	
	scoreText = new Text('Enviro-Points = ' + points, 400, 50, '24px', 'Arial', 'blue')
	
	cardboardBin = cardboardbins.create(525, 365)
	cardboardbins.setImmovable(true);
	plasticBin = plasticbins.create(900, 65)
	plasticbins.setImmovable(true);
	glassBin = glassbins.create(40, 65)
	glassbins.setImmovable(true);
	
	coin1 = coins.create(267, 140);
	coin2 = coins.create(588, 195);
	coin3 = coins.create(90, 270);
	coin4 = coins.create(400, 270);
	
	coins.setImmovable(true);
	coins.addAnimation('spin', [0,1,2,3], 3);
	
	cardboard1 = cardboards.create(770, 370);
	cardboard2 = cardboards.create(90, 175);
	
	cardboards.addAnimation('flash', [0, 1], 3);
	cardboards.setGravityY(200)
	
	plastic1 = plastics.create(450, 165);
	plastic2 = plastics.create(160, 460);
	
	plastics.addAnimation('flash', [0, 1], 3);
	plastics.setGravityY(200)
	
	glass1 = glasses.create(50, 355);
	glass2 = glasses.create(525, 440);
	
	glasses.addAnimation('flash', [0, 1], 3);
	glasses.setGravityY(200)
	
	purpledoor = purpledoors.create(160, 20, 20, 100)
	purpledoors.setImmovable(true)
	yellowdoor = yellowdoors.create(820, 20, 20, 100)
	yellowdoors.setImmovable(true)
	
	purplekey = purplekeys.create(240, 550)
	purplekeys.setGravityY(200)
	yellowkey = yellowkeys.create(550, 590)
	yellowkeys.setGravityY(200)
	
}	


function update() {
	counter--;
	if(nItems == 0) {
		dead = true
		player.children[0].kill
		document.cookie = 'Enviro-Points = ' + points
		document.location = 'mainfile.html';
		return
	}
		
	if(left.isDown()) {
		player.setVelocityX(-100);
		player.playAnimation('left');
	} else if(right.isDown()) {
		player.setVelocityX(100);
		player.playAnimation('right');
	} else {
		player.setVelocityX(0);
		player.stop();
	}
	
	if(pickedUp) {
		heldItem.setX(player.children[0].getX())
		heldItem.setY(player.children[0].getY())
	}
	
	game.checkCollision(player, platforms);
	game.checkCollision(player, purpledoors);
	game.checkCollision(player, yellowdoors);
	game.checkCollision(cardboards, platforms);
	game.checkCollision(plastics, platforms);
	game.checkCollision(glasses, platforms);
	game.checkCollision(player, coins, collectCoin);
	game.checkCollision(purplekeys, platforms);
	game.checkCollision(yellowkeys, platforms);
	
	game.checkCollision(player, spikes, spiked);
	
	game.checkOverlap(cardboards, cardboardbins, depositCorrect);
	game.checkOverlap(plastics, plasticbins, depositCorrect);
	game.checkOverlap(glasses, glassbins, depositCorrect);
	game.checkOverlap(cardboards, glassbins, depositIncorrect);
	game.checkOverlap(cardboards, plasticbins, depositIncorrect);
	game.checkOverlap(plastics, glassbins, depositIncorrect);
	game.checkOverlap(plastics, cardboardbins, depositIncorrect);
	game.checkOverlap(glasses, cardboardbins, depositIncorrect);
	game.checkOverlap(glasses, plasticbins, depositIncorrect);
	
	game.checkOverlap(purplekeys, purpledoors, unlock);
	game.checkOverlap(yellowkeys, yellowdoors, unlock);
	
	if(space.justPressed() && counter <= 0 ) {
		counter = 60;
		player.setVelocityY(-150);
		if(pickedUp) {
			heldItem.setVelocityY(-150);
		}
	} else if(space.justPressed() && counter >= 0 ) {
		null;
	}
	
	scoreText.changeText('Enviro-Points = ' + points);
	coins.playAnimation('spin');
	cardboards.playAnimation('flash');
	plastics.playAnimation('flash');
	glasses.playAnimation('flash');
	spikes.playAnimation('flash');
	
	if(pickedUp == false) {
		if(heldItem == null) {
			game.checkOverlap(player, cardboards, pickUp);
			game.checkOverlap(player, plastics, pickUp);
			game.checkOverlap(player, glasses, pickUp);
			
			game.checkOverlap(player, purplekeys, pickUp);
			game.checkOverlap(player, yellowkeys, pickUp);
		}
	} else if(down.justPressed()) {
		if(pickedUp) {
			heldItem.setVelocityX(0);
			heldItem = null;
			pickedUp = false;
			
		}
	}
}

function collectCoin(player, coin) {
	coin.kill();
	points = points + 1
	
	document.cookie = 'Enviro-Points = ' + points
		
}

function pickUp(player, item) {
	if(down.justPressed()) {
		//pick up item
		pickedUp = true;
		heldItem = item;
		
	}
}

function depositCorrect(item, bin) {
	if(pickedUp == false) {
		item.kill()
		nItems = nItems - 1
		points = points + 5
	
		document.cookie = 'Enviro-Points = ' + points
	}
}

function depositIncorrect(item, bin) {
	if(pickedUp == false) {
		item.kill();
		nItems = nItems - 1
		points = points - 5
	
		document.cookie = 'Enviro-Points = ' + points
	}
}

function unlock(door, key) {
	door.kill();
	key.kill();
}

function spiked(player, spike) {
	player.setX(490)
	player.setY(100)
	
	points = points -1
	document.cookie = 'Enviro-Points = ' + points
}
	
