var PLAY = 1;
var END = 0;
var gameState = PLAY;
var boy,boy_running;
var background ,backgroundImage;
var ground;
var car1,bike1,bike2;
var BikeNCarGroup;
var restart,restartImage,gameOver,gameOverImage;
var score = 0;
function preload(){
  backgroundImage = loadImage ("background.jpg");
boy_running = loadAnimation ("running 1.png","running 2.png","running 3.png","running 4.png","running 5.png","running 7.png","running 8.png","running 9.png");
  
  car1 = loadImage("Car.png");
  bike2 = loadImage("bike3.png");
  bike1 = loadImage("bike2.png");
  restartImage = loadImage("tryagian.jpg");
  gameOverImage = loadImage("GameOver.png");
}

function setup() {
  createCanvas(600,400);
 
  
  
  ground = createSprite(100,450,100,10);

  background = createSprite(200,150,400,20);
  background.addImage(backgroundImage);
  background.scale = 1;
  background.x = background.width /2;
  
 boy = createSprite (70,380,20,20);
  boy.addAnimation ("running",boy_running);
  boy.scale = 0.4;
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImage);
  restart.scale = 0.2;
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.2;
  
  gameOver.visible = false;
  restart.visible = false;
  
  BikeNCarGroup = new Group();
 
} 

function draw() {
  if (gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
  background.velocityX = -(6 + 3*score/100);
  if (background.x < 0){ 
background.x = background.width/2;
  }
 if((touches.length > 0 || keyDown("SPACE")) && boy.y  >= height-240) {
      boy.velocityY = -17;
       touches = [];
    }
  boy.velocityY = boy.velocityY + 0.8;
 boy.collide(ground);
  spawnBikeNCar();
    
    if(BikeNCarGroup.isTouching(boy)){
   gameOver.visible = true;
  restart.visible = true;
      gameState = END
    }
  }
  else if (gameState === END) {

    background.velocityX = 0;
    boy.velocityY = 0;
    BikeNCarGroup.setVelocityXEach(0);
    

    BikeNCarGroup.setLifetimeEach(-1);
    
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }

  }
  
 drawSprites();
  textSize(20);
  fill("black");
  text("Score: "+ score, 500,50);
}

function spawnBikeNCar(){
 if (frameCount % 120 === 0){
   var obstacle = createSprite(600,380,20,20);
   obstacle.scale = 0.2;
   obstacle.velocityX = -7;

  var rand = Math.round(random(1,3));
  switch(rand) {
  case 1: obstacle.addImage(car1);
      break;
      case 2: obstacle.addImage(bike1);
      break;
      case 3: obstacle.addImage(bike2);
      break;
      
  default: break; 
}
   BikeNCarGroup.add(obstacle);
   obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
}
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  BikeNCarGroup.destroyEach();
  
  score = 0;
  
}