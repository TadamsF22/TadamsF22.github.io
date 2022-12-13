const gameState = {};









function preload() {
  // load zombie 
   this.load.image('zombie', './assets/images/zombie.png');
  //load plate form 
  this.load.image('platform', './assets/images/platform.png');
// load road
   this.load.image('road', './assets/images/road.png');
  //load idle 
  this.load.spritesheet('playeridle', './game/Character/Idle/Idle-Sheet.png', { frameWidth: 64, frameHeight: 80 });
  //load attack
  this.load.spritesheet('playerattack', './game/Character/Attack-01/Attack-01-Sheet.png', { frameWidth: 96, frameHeight: 80 });
  //load runing 
  this.load.spritesheet('playerrun', './game/Character/Run/Run-Sheet.png', { frameWidth: 80, frameHeight: 80 });
  //load jump
  this.load.spritesheet('playerjump', './assets/Knight1/_Jump.png', { frameWidth: 120, frameHeight: 80 });

  //load back ground 
  this.load.image('bg', './bg.jpg')

  
  //load images for tile map 
  this.load.image('tiles_', 'tiles/trees.tsx')
  this.load.image('tiles_2', 'tiles/floor.tsx')
  this.load.image('tiles_3', 'tiles/background.tsx')
  //load tile map 
  this.load.tilemapTiledJSON('map', './background.tmj')

}


 
function create() {

  //this.background = this.add.image(0, 0, "bg")
        //.setOrigin(.5, .5) ;
        // Based on your game size, it may "stretch" and distort.
  //this.background.displayWidth = this.sys.canvas.width;
 // this.background.displayHeight = this.sys.canvas.height;
   

  
  // create tile map 
/* const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('tiles_', 'layer3');
  const tileset2 = map.addTilesetImage('tiles_2','layer2');
  const tileset3 = map.addTilesetImage('tiles_3','layer1');

  const all_layers = [layer2,layer1,layer3  ]

  
  this.background = map.createDynamicLayer('background', all_layers, 0, 0).setScale(this.assetsScaleFactor) */
  
  /*const layer2 = map.createDynamicLayer('layer 2', all_layers, 0, 0).setScale(this.assetsScaleFactor)
 
  const TileLayer3 = map.createDynamicLayer('TileLayer3', all_layers, 0, 0).setScale(this.assetsScaleFactor)
  
  const TileLayer4 = map.createDynamicLayer('TileLayer4', all_layers, 0, 0).setScale(this.assetsScaleFactor)*/

  //add road 
const road = this.physics.add.staticGroup();
  road.create(400, 590, 'road').setScale(4, .3).refreshBody();
//add floor

 const platforms = this.physics.add.staticGroup();
  platforms.create(400, 500, 'platform').setScale(5, .3).refreshBody().setVisible(false);
  
 
 

  
  



  
  
  
  var graphics = this.add.graphics();
  //idle animtion 
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('playeridle', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }),
    frameRate: 6,
    repeat: -1
  });


  //Attack animation 
  this.anims.create({
    key: 'Attack1',
    frames: this.anims.generateFrameNumbers('playerattack', { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
    frameRate: 8,
    repeat: -1
  });


  // runing animation 

  this.anims.create({
    key: 'running',
    frames: this.anims.generateFrameNumbers('playerrun', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }),
    frameRate: 16,
    repeat: -1
  });

  // load jump animation 
  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('playerjump', { frames: [0, 1, 2] }),
    frameRate: 8,
  });


  //load player 
  gameState.player = this.physics.add.sprite(300, 300, 'player').setScale(3);

  //load keys 
  gameState.cursors = this.input.keyboard.createCursorKeys();
  gameState.KeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  gameState.KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  gameState.KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  gameState.KeyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  gameState.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  //add player coliders 
 gameState.player.setCollideWorldBounds(true);
  
this.physics.add.collider(gameState.player, platforms);

  




  
}//end preload 


function update() {
// movement 
  if (gameState.KeyA.isDown){
gameState.player.setVelocityX(-160);
    
  }
  else if (gameState.KeyD.isDown) {

    gameState.player.setVelocityX(160)
  }
    
  else {
    //stop moving player  
    gameState.player.setVelocityX(0);
     
  }

  
  //animation 
  if (gameState.KeyA.isDown) {
   //play running animation 
    gameState.player.play('running', true);
    //flip X
    gameState.player.flipX = true;
  }
  //run right 
  else if (gameState.KeyD.isDown) {    
    //play running animation 
    gameState.player.play('running', true);
    //flip X
    gameState.player.flipX = false;

  }
    else if (gameState.keySpace.isDown) {
    gameState.player.play('Attack1', true);

  }

  else {  
   
    //play idle animation 
    gameState.player.play('idle', true);
  }

  



}//end create 
const config = {
  type: Phaser.AUTO,
  width: 1220,
  height: 600,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true
    }
  },
  scene: {
    preload,
    create,
    update
  },

  /* Scale: {
        mode: Phaser.Scale.FIT ,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "thegame"
       
    },
    autoRound: false*/







};





const game = new Phaser.Game(config);