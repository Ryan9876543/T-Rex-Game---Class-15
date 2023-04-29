var PLAY = 1
var END = 0
var gameState = PLAY
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var life = 3
var score = 0
var obstaclesGroup = createGroup()
var cloudsGroup = new Group()




var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage =loadImage ("cloud.png")
  obstacle1 = loadImage ("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
  console.log("hello"+"world")

}

function draw() {
  //set background color
  background(180);
  
  //console.log(trex.y)
  
  text ("Score: " + score, 500,50)
  score = score + Math.round(frameCount/60)

  if(gameState == PLAY) {
  // jump when the space key is pressed
      if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -10;
      }

      trex.velocityY = trex.velocityY + 0.8
      
      if (ground.x < 0){
        ground.x = ground.width/2;
      }

      //stop trex from falling down
     trex.collide(invisibleGround);

      //Spawn Clouds
      spawnClouds() 
      spawnObstacles()

  }

  else if(gameState == END) {
    ground.velocityX = 0
    obstaclesGroup.setVelocityXEach (0)
    cloudsGroup.setVelocityXEach (0)
  }

  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if (frameCount % 60 == 0) {
  var cloud
  cloud = createSprite (600,100,40,10)
  cloud.addImage(cloudImage)
  cloud.y = Math.round (random (10,100))
  cloud.velocityX= -4
  cloud.lifetime = 150
  cloud.scale = 0.4
  cloud.depth = trex.depth
  trex.depth = trex.depth + 1
  cloudsGroup.add(cloud)
 }
}

function spawnObstacles () {
  if (frameCount % 60 == 0) {
    var obstacles
    obstacles = createSprite (200,160,50,50)
    obstacles.velocityX = -4
    obstacles.scale = 0.55
    rand = Math.round (random (1,6))
    switch(rand){
      case 1:
      obstacles.addImage(obstacle1);
      break;

      case 2:
      obstacles.addImage(obstacle2);
      break;

      case 3:
      obstacles.addImage(obstacle3);
      break;

      case 4:
      obstacles.addImage(obstacle4);
      break;
  
      case 5:
      obstacles.addImage(obstacle5);
      break;

      case 6:
      obstacles.addImage(obstacle6);
      break;

      default:break;
    }

  obstacles.lifetime = 150
  obstaclesGroup.add (obstacles)
  }
}


