var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var jungle ,jungle_Image 
var bananaCatch ,monkeyJump ,obstacleTouch; 

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  jungle_Image = loadImage("jungle.jpg");
   
  bananaCatch = loadSound("bananaCatch.wav");
  
  obstacleTouch = loadSound("obstacleTouch.wav");
  
  monkeyJump = loadSound("jump.wav");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(700,600);
  
  jungle = createSprite(200,300,300,10)
  jungle.addImage(jungle_Image);
  jungle.x = jungle.width /2;
  
  ground = createSprite(100,560,800,10);
  ground.x = ground.width /2;
  ground.shapeColor = "gray";
  ground.visible = false;

  monkey = createSprite (80,520, 20, 20)
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.2;
  monkey.debug = false;
  monkey.setCollider("rectangle",0,0,500,600);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  score = 0;
}

function draw() {
background ("white");
  
   jungle.velocityX = -(7 + 3* score/10);
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if (jungle.x <200){
    jungle.x = jungle.width /2;
    }
  
    if (monkey.isTouching(bananaGroup)){
      score = score + 1;
      
      bananaGroup.destroyEach();
      bananaCatch.play();
      
      switch(score){
        case 5: monkey.scale = 0.22;
               break;
        case 10: monkey.scale = 0.24;
                break;
        case 15: monkey.scale = 0.26;
                break;
        case 20: monkey.scale = 0.28;
                break;
        default:break;
      }
    }  
  
    spawnObstacles();
    spawnBanana();
  
    if(obstacleGroup.isTouching(monkey)){
      monkey.scale = 0.2;
      obstacleTouch.play();
      obstacleGroup.destroyEach();
      score = score -1;
    }
  
    if(keyDown("space") && monkey.y >350) {
      monkey.velocityY = -(16 +(score/10));
      monkeyJump.play();
    }
  
   monkey.velocityY = monkey.velocityY + 0.8

   monkey.collide(ground); 
  
   drawSprites();
   
   textSize(15);
   fill("white");
   stroke("black");
   strokeWeight(2);
   text("Score: "+ score,570,50);
}

function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(710,500,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX =  -(7 + 3* score/10);
   obstacle.debug = false;
   obstacle.setCollider("rectangle",0,0,200,400,40);
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.28;
    obstacle.lifetime = 400;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    banana = createSprite(710,50,40,10);
    banana.y = Math.round(random(400,200));
    banana.addImage(bananaImage);
    banana.scale = 0.13;
    banana.velocityX = -(5 +(score/10));
    banana.debug = false;
    banana.setCollider("rectangle",0,0,550,300)
    
     //assign lifetime to the variable
    banana.lifetime = 500;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
    bananaGroup.add(banana);
    }
}