var sky, skyImage
var plane, planeImage
var coin, coinImage
var gameOver, gameOverImg
var reload, reloadImg
var thunder, thunderImg
var groupThunder
var groupCoins
var planeCrash, planeCrashImg
var gameState="PLAY"
var score=0





function preload(){
 
skyImage=loadImage("Pictures/sky.jpg ")

planeImage=loadAnimation("Pictures/Plane.png")
coinImage=loadImage("Pictures/coins.png")
gameOverImg=loadImage("Pictures/game over.png")
reloadImg=loadImage("Pictures/restart.png")
thunderImg=loadImage("Pictures/thunder.png")
planeCrashImg=loadAnimation("Pictures/Plane Crash.png")




  
}

function setup() {
  createCanvas(350, 600);

  sky=createSprite(175, 300)
  sky.addImage(skyImage)
  sky.scale=3.5
  sky.visible=true
  

  plane=createSprite(175,525)
  plane.addAnimation("flying", planeImage)
  plane.scale=0.2
  plane.addAnimation("crash", planeCrashImg)

  gameOver=createSprite(175, 300)
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.5
  gameOver.visible=false




  groupCoins=createGroup()

  groupThunder=createGroup()
  
  
 plane.setCollider("rectangle",0,0,plane.width-1,plane.heigth-1)
 plane.debug=false
  
}

function draw() {
  background(0);
    
 
  

  
  
    
 
 
  

   

  
     
   

   if(gameState === "PLAY"){

    sky.velocityY=4

    if(sky.y>600){
      sky.y=50
    }

    if(keyDown(RIGHT_ARROW)){
      plane.x=plane.x+3
     }

     if(keyDown(LEFT_ARROW)){
      plane.x=plane.x-3
    }

    spawnThunderClouds()

    spawnCoins()
    if(plane.isTouching(groupCoins)){
      groupCoins.destroyEach()
      score+=10

    }

    if(plane.isTouching(groupThunder)){
      gameState = "END"
     
    }

   

  }

  else if(gameState === "END"){
    plane.changeAnimation("crash",planeCrashImg)
    groupThunder.destroyEach()
    gameOver.visible=true
    groupCoins.destroyEach()
    groupThunder.destroyEach()
    groupThunder.setVelocityYEach(0)
    groupCoins.setVelocityYEach(0)
    sky.velocityY=0
  }

   

 

  drawSprites()
  textSize(20)
  fill("red")
  text("SCORE = " +score, 10, 25)
  
}



function spawnThunderClouds(){
 
   if(frameCount%75==0){
    thunder=createSprite(175,0)
    thunder.addImage(thunderImg)
    thunder.scale=0.1
    thunder.velocityY=4
    thunder.x=Math.round(random(25, 300))

    groupThunder.add(thunder)

    
   }

  

}

function spawnCoins(){
 
   if(frameCount%100==0){
    coin=createSprite(175,0)
    coin.addImage(coinImage)
    coin.scale=0.05
    coin.velocityY=4
    coin.x=Math.round(random(25,300))

    groupCoins.add(coin)
   }
  
  }
