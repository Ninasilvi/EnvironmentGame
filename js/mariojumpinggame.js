/////////////////////////////////////////////////////////////////
///////////////	Global Variables  //////////////////////////////
///////////////////////////////////////////////////////////////
var game = new Game(600, 400, "Tutorial 6");
// Player
var player;
// Input
var keyboard, space;
//Bottom platform
var platform; 
// Trees
var trees;
// Colliders
var colliders;
// Used to set a delay between spawning trees
var lastTreeSpawn = 0;

var scoreText;

var coins;

var v=-100


/////////////////////////////////////////////////////////////////
///////////////	Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////

function preload() {

	//set the background image
    game.loadBackgroundImage('background', "src/img/pollution.png",230,150);
	//load in the player
	player = new Sprite("src/img/mario-sprite.png", 16, 32);
	//load in the trees
    trees = new Sprite("src/img/evilgas.png",20,40);
	//load in the platform
    platform = new Sprite("src/img/level1.png",1,10);
    //load in the jump sound
    //jumpSound = new Sound("sounds/jump.mp3");
    //load in colliders
    colliders = new Sprite("src/img/treeCollider.png");
	
	coin = new Sprite("src/img/coin.png");

	// Input

	// Input
	keyboard = new Keyboard();
	space = keyboard.createSpaceKey();
}

function create() { 

	//set the background image
	game.setBackgroundImage('background');

	//create the player
	currentPlayer = player.create(50, game.gameHeight() - 100);
	//create running animation
	currentPlayer.addAnimation('right', [0,1,2], 10);
	//make the player fall
	currentPlayer.setGravityY(100);
	//play the running animation
	currentPlayer.playAnimation('right');
	//create a platform at the bottom
	platform.create(0, "130", "100", 35);
	//prevent it from moving
	platform.setImmovable(true);


	scoreText = new Text(document.cookie, game.gameWidth()-250,40,"24px","Arial","red");

}


function update() {

	//scroll the background
    game.scrollBackgroundX(-1);
	

	//allow the player to be on top of the platform
    game.checkCollision(platform, player);
 
	//check if player hit a tree
    game.checkCollision(trees, player, hitTree);

	//check if player jumped over a tree
    game.checkOverlap(colliders, player, hitOverTree);

	//spawn a tree
    if(game.getGameTime() > lastTreeSpawn) {


      //create tree
      var tree = trees.create(game.gameWidth()+10, game.gameHeight()-70);
      tree.setVelocityX(v);
	  
	//coin = coin.create(game.gameWidth()+10, game.gameHeight()-70);
     //coin.setVelocityX(-100);
	  	  
      //create collider over tree
      var collider = colliders.create(game.gameWidth()+10, game.gameHeight()-180);
      collider.setVelocityX(v);

      lastTreeSpawn = game.getGameTime() + 2500;

  	}

	//only jump is the player is on the ground
	if((space.isDown()) && (currentPlayer.onGround())) {

	  	player.setVelocityY(-100);

	}
		v=v-0.5


}

//pause the game when the player hits a tree
function hitTree(tree, player) {

	document.append("<button type='reset' onclick='document.location.reload()'>RESET</button>");
    game.setPaused(true);
	

	

}

function hitOverTree(collider, player) {

	//used to prevent multiple collisions causing higher scores
	collider.kill();
	//increase score
	score++;
	//"score" + score;
	document.cookie = 'Enviro-Points = ' + score
	scoreText.changeText(document.cookie);
}
