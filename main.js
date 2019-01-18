const game = new Phaser.Game(720, 480, Phaser.CANVAS, null, {preload: preload, create: create, update: update});

let platforma;
let min;
let gason;
let movements;
let banans;
let score = 0;
let scoreText;
let playing = false;
let startButton;
let winner = false;
let replayButton;

function preload() {
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
	game.load.image('banan', 'img/banan.png');
	game.load.image('brick1', 'img/brick1.png');
	game.load.image('beton', 'img/beton.png');
	game.load.image('beton1', 'img/beton1.png');
	game.load.image('beton2', 'img/beton2.png');
	game.load.image('beton3', 'img/beton3.png');
    game.load.image('block', 'img/block.png');
	game.load.image('min', 'img/min.png');
	game.load.spritesheet('run', 'img/run.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
    min = game.add.sprite(700, 425, 'min');
    game.physics.arcade.enable(min);
    min.body.bounce.y = 0.5;
    min.body.gravity.y = 1000;
    min.body.collideWorldBounds = true;
    gason = game.add.sprite(593, 135, 'beton3');
    gason = game.add.sprite(593, 337, 'beton3');
    platforma = game.add.group();
    platforma.enableBody = true;
    let wall = platforma.create(100, 373, 'brick1');
    wall.body.immovable = true;
    wall = platforma.create(-100, 270, 'brick1');
    wall.body.immovable = true;
    wall = platforma.create(100, 170, 'brick1');
    wall.body.immovable = true;
    wall = platforma.create(-100, 70, 'brick1');
    wall.body.immovable = true;
    let betonVertically = platforma.create(630, 18, 'beton');
    betonVertically.body.immovable = true;
    betonVertically = platforma.create(630, 220, 'beton');
    betonVertically.body.immovable = true;
    let betonHorizontally = platforma.create(-35, 418, 'beton1');
    betonHorizontally.body.immovable = true;
    betonHorizontally = platforma.create(593, 321, 'beton1');
    betonHorizontally.body.immovable = true;
    betonHorizontally = platforma.create(-35, 216, 'beton1');
    betonHorizontally.body.immovable = true;
    betonHorizontally = platforma.create(593, 118, 'beton1');
    betonHorizontally.body.immovable = true;
    betonHorizontally = platforma.create(180, 0, 'beton2');
    betonHorizontally.body.immovable = true;
    let block = platforma.create(593, 135, 'block');
    block = platforma.create(593, 338, 'block');
    banans = game.add.group();
    banans.enableBody = true;
    for (var i = 0; i < 4; i++){
    	banans.create(i *220, 40, 'banan');
  	    banans.create(i *180, 140, 'banan');
  	    banans.create(i *220, 240, 'banan');
  	    banans.create(i *100, 340, 'banan');
  	    banans.create(i *380, 440, 'banan');
  	}
    movements = game.input.keyboard.createCursorKeys();
    scoreText = game.add.text(5, 5, 'BANANS:  0', {font: '20px Arial', fill: '#fff'});
    startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'run', startGame);
    startButton.anchor.set(0.5);
}   

function update(){
    game.physics.arcade.collide(min, platforma);
    game.physics.arcade.collide(banans, platforma);
    game.physics.arcade.overlap(min, banans, collectBanan, null, this);
    min.body.velocity.x = 0;
     if (playing) {
    if (movements.left.isDown) {
    	min.body.velocity.x = -250;
    	min.scale.x = 1;
    	min.animations.play('left');
    }
    else if (movements.right.isDown){
    	min.body.velocity.x = 250;
    	min.scale.x = -1;
    	min.animations.play('right');
    }
    if (movements.up.isDown) {
        min.body.velocity.y = -350;
        min.scale.y = -1;
        min.animations.play('up');
    }else if(movements.down.isDown) 
        min.body.velocity.y = 200;
        min.scale.y = 1;
        min.animations.play('down');
    } 
}

function collectBanan(min, banans) {
	banans.kill();
	score +=1;
	scoreText.text = 'Score:' +score;
	if(score === 18) {
    	alert('YOU WINNER!!!')
    	location.reload();
	}
}

function startGame() {
	startButton.destroy();
	playing = true;
}
