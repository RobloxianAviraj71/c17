var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground,inisible_ground;
var score,FruitsCollected;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(665,200);
  
  ground = createSprite(300,195,800,30);
  ground.velocityX = 12;
  ground.x = ground.width /2;
  
  inisible_ground = createSprite(300,200,800,30);
  
  monkey = createSprite(50,190,20,50);
   monkey.addAnimation("running", monkey_running);
   monkey.scale=0.1
  
   score = 0;
  FruitsCollected=0;
  
   obstaclesGroup = createGroup();
  FruitsGroup = createGroup();

}

function draw() {
  background("white");
  
  if(gameState === PLAY){
  text("Survival Time: "+ score, 540,50);
   score = score + Math.round(getFrameRate()/60);
  
    
    if (ground.x < 600){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
     monkey.velocityY = monkey.velocityY + 1
   monkey.collide(inisible_ground);
    
    
    if(monkey.isTouching(obstaclesGroup))
    {
         monkey.velocityY = 0;
        gameState = END;   
    }
  }
    else if (gameState === END) {
        ground.velocityX = 0; 
      obstaclesGroup.setLifetimeEach(-1);
    FruitsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
      FruitsGroup.setVelocityXEach(0);
      
      monkey.collide(inisible_ground);
      monkey.velocityY = 0;
    }
  spawnFruits();
  spawnObstacles();
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 190 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,1));
    switch(rand) {
      case 1: obstacle.addImage(obstaceImage);
              break;
                default: break;
    }
                    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    }
}

function spawnFruits() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var Fruits = createSprite(600,80,120,10);
    Fruits.y = Math.round(random(80,120));
    Fruits.addImage(bananaImage);
    Fruits.scale = 0.05;
    Fruits.velocityX = -3;
    
     //assign lifetime to the variable
    Fruits.lifetime = 200;
    FruitsGroup.add(Fruits);
  }
}
