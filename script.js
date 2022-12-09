const gameState = {};









function preload() {
  //load idle 
  this.load.spritesheet('playeridle', './game/Character/Idle/Idle-Sheet.png', { frameWidth: 64, frameHeight: 80 });
  //load attack
  this.load.spritesheet('playerattack', './game/Character/Attack-01/Attack-01-Sheet.png', { frameWidth: 80, frameHeight: 80 });
  //load runing 
  this.load.spritesheet('playerrun', './game/Character/Run/Run-Sheet.png', { frameWidth: 80, frameHeight: 80 });
  //load jump
  this.load.spritesheet('playerjump', './assets/Knight1/_Jump.png', { frameWidth: 120, frameHeight: 80 });


}



function create() {
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

 var r2 = this.add.rectangle(400, 200, 148, 148, 0x9966ff);


  //load player 
  gameState.player = this.physics.add.sprite(300, 300, 'player').setScale(3);

  //load keys 
  gameState.cursors = this.input.keyboard.createCursorKeys();
  gameState.KeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  gameState.KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  gameState.KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  gameState.KeyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  gameState.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}


function update() {
  //run left 
  if (gameState.KeyA.isDown) {

    gameState.player.setVelocityX(-160);
    //play running animation 
    gameState.player.play('running', true);
    //flip X
    gameState.player.flipX = true;
  }
  //run right 
  else if (gameState.KeyD.isDown) {

    //turn then run 
    gameState.player.setVelocityX(160);
    //play running animation 
    gameState.player.play('running', true);
    //flip X
    gameState.player.flipX = false;

  }

  else {
    //stop moving player  
    gameState.player.setVelocityX(0);
    //play idle animation 
    gameState.player.play('idle', true);
  }

  if (gameState.keySpace.isDown) {
    gameState.player.play('Attack1', true);

  }



}
const config = {
  type: Phaser.AUTO,
  width: 1350,
  height: 700,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
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