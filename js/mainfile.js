/////////////////////////////////////////////////////////////////
///////////////	Global Variables  //////////////////////////////
///////////////////////////////////////////////////////////////
	document.location = 'project.html'

	var player;
	var points = 0;
	document.cookie = 'Enviro-Points = ' + points;
	
	var keyboard, left, right, space, down;
	var game = new Game(1000, 650, "Envirogame");
	var platforms, background, camera, binOne, binTwo, enterbinOne, enterbinTwo, counter, lvlone, lvltwo, coins;
/////////////////////////////////////////////////////////////////
///////////////	Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////
function preload() {
	player = new Sprite("img/mario-sprite.png", 17, 32);
	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	space = keyboard.createSpaceKey();
	down = keyboard.createDownKey();
	platforms = new Sprite("img/platform_Three.png");
	binOne = new Sprite("img/binOne.png");
	binTwo = new Sprite("img/binTwo.png");
	game.loadBackgroundImage("background", "img/download.jpg");
	coins = new Sprite("img/coin.png", 15, 15)
}

function create() {
	
	game.setBackgroundImage("background");
	player.create(50, 565);
	player.collideWorldBounds(true);
	player.addAnimation('left', [7,8,9,10], 10);
	player.addAnimation('right', [0,1,2,3], 10);
	player.setStopFrame(5);
	player.setGravityY(110);
	PlatformOne = platforms.create(0, 620, 300, 25);
	PlatformTwo = platforms.create(375, 620, 250, 25);
	PlatformThree = platforms.create(670, 580, 200, 25);
	PlatformFour = platforms.create(420, 525, 195, 25);
	PlatformFive = platforms.create(275, 470, 120, 25);
	PlatformSix = platforms.create(25, 442, 160, 25);
	PlatformSeven = platforms.create(0, 380, 50, 25);
	PlatformEight = platforms.create(110, 335, 100, 25);
	PlatformBinOne = platforms.create (235, 285, 110, 25);
	PlatformNine = platforms.create(370, 360, 100, 25);
	PlatformTen = platforms.create(580, 350, 100, 25);
	PlatformEleven = platforms.create(760, 375, 150, 25);
	PlatformBinTwo = platforms.create(890, 525, 110, 25);
	platforms.setImmovable(true);
	BinFirst = binOne.create(270, 258);
	BinSeond = binTwo.create(930, 500);
	binOne.setImmovable(true);
	binTwo.setImmovable(true);
	enterbinOne = new Text("Press down to enter the bin", 195, 220, "20px", "Courier New", "white");
	enterbinTwo = new Text("Press down to enter the bin", 780, 460, "20px", "Courier New", "white");
	enterbinOne.setVisible(false);
	enterbinTwo.setVisible(false);
	lvlone = new Text("Level One", 5, 5, "20px", "Courier New", "white");
	lvltwo = new Text("Level Two", 5, 5, "20px", "Courier New", "white");
	lvlone.setVisible(false);
	lvltwo.setVisible(false);
	counter = 0;

	coin1 = coins.create(5, 350);
	coin2 = coins.create(440, 335);
	coin3 = coins.create(369, 450);
	coin4 = coins.create(300, 520);
	coin5 = coins.create(660, 480);
	coin6 = coins.create(800, 350);
	coins.setImmovable(true);
	coins.addAnimation('spin', [0,1,2,3], 3);
	scoreText = new Text(document.cookie, 725, 5, '24px', 'Courier New', 'white');
} 


function update() {
	counter--;
	if(left.isDown()) {
		player.setVelocityX(-75);
		player.playAnimation('left');

	} else if(right.isDown()) {
		player.setVelocityX(75);
		player.playAnimation('right');

	} else {
		player.setVelocityX(0);
		player.stop();
	}
	 
	if(player.children[0].getY() == 618) {
		player.setX(50);
		player.setY(580);
		points = points - 1;
	}

	game.checkCollision(player, coins, collectCoin);

	game.checkCollision(player, platforms);

	if(space.justPressed() && counter <= 0 ) {
		counter = 110;
		if(left.isDown()) {
			player.setVelocityX(-10);
			player.setVelocityY(-115);
		}
		else if(right.isDown()) {
			player.setVelocityX(10);
			player.setVelocityY(-115);
		}
		else {
			player.setVelocityY(-115);
		}
	} else if(space.justPressed() && counter >= 0 ) {
		null;
	}

	if(game.checkOverlap(player, binOne)) {
		enterbinOne.setVisible(true);	
		lvlone.setVisible(true);
	}
	else {
		enterbinOne.setVisible(false);
		lvlone.setVisible(false);
	}

	if(game.checkOverlap(player, binTwo)) {
		enterbinTwo.setVisible(true);
		lvltwo.setVisible(true);	
	}
	else {
		enterbinTwo.setVisible(false);
		lvltwo.setVisible(false);
	}

	if(down.isDown()) {
		game.checkOverlap(player, binOne, overlapOne);
	}

	if(down.isDown()) {
		game.checkOverlap(player, binTwo, overlapTwo);
	}

	coins.playAnimation('spin');
	scoreText.changeText('Enviro-Points = ' + points);
}

function collectCoin(player, coin) {
	coin.kill();
	points = points + 1;

}

function overlapOne() {

	document.cookie = "Enviro-Points = " + points;
	document.location = "project.html";
}

function overlapTwo() {
	document.cookie = "Enviro-Points = " + points;
	document.location = "mariojumpingame.html";
}

