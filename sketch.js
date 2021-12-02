var bg,bgImg;
var count=0;
var life=3;
var SERVE=2;
var PLAY=1;
var END=0;
var gameState=SERVE;

function preload(){
bgImg=loadImage("Images/Bg.png");
obs1Img=loadImage("Images/Obs1.png");
obs2Img=loadImage("Images/Obs2.png");
obs3Img=loadImage("Images/Obs3.png");
obs4Img=loadImage("Images/Obs4.png");
obs5Img=loadImage("Images/Obs5.png");
obs6Img=loadImage("Images/Obs6.png");
PCImg=loadImage("Images/PlayerCar.png");
coinImg=loadImage("Images/Coin.png");
scoreImg=loadImage("Images/SCORE.png");
startImg=loadImage("Images/Start.png");
RestartImg=loadImage("Images/Restart.png");
GameOverImg=loadImage("Images/Game Over.png");
CupImg=loadImage("Images/Winner Cup.png");

scoreSound=loadSound("Sounds/mixkit-arcade-score-interface-217.wav");
GameOverSound=loadSound("Sounds/mixkit-retro-game-over-1947.wav");
WinningSound=loadSound("Sounds/mixkit-payout-award-1934.wav");
}
function setup() {
  createCanvas(1200,1200);

  bg=createSprite(600,0,500,500);
  bg.addImage(bgImg);
  bg.scale=2;
  
  
  ob1G=new Group();
  ob2G=new Group();
  ob3G=new Group();
  ob4G=new Group();
  ob5G=new Group();
  ob6G=new Group();
  coinG=new Group();

  pc=createSprite(600,490,30,30);
  pc.addImage(PCImg);
  pc.scale=0.5;
  pc.setCollider("rectangle",0,0,70,190);

  score=createSprite(285,33,30,30);
  score.addImage(scoreImg);
  score.scale=0.2;

  start=createSprite(600,400,40,40);
  start.addImage(startImg);
  start.scale=0.3;
  start.visible=false;

  restart=createSprite(600,300,40,40);
  restart.addImage(RestartImg);
  restart.scale=0.7;
  restart.visible=false;

  GameOver=createSprite(600,200,40,40);
  GameOver.addImage(GameOverImg);
  GameOver.scale=0.7;
  GameOver.visible=false;

  cup=createSprite(600,200,40,40);
  cup.addImage(CupImg);
  cup.scale=0.7;
  cup.visible=false;
}

function draw() {

 background("white");
 
  if (gameState === SERVE){
   //bg.velocityY=0;
   //coinG.velocityY=0;
   //ob1G.velocityY=0;
   //ob2G.velocityY=0;
   //ob3G.velocityY=0;
   //ob4G.velocityY=0;
   //ob5G.velocityY=0;
   //ob6G.velocityY=0;
    pc.visible=false;
    start.visible=true;
    if(mousePressedOver(start)){
      gameState=PLAY;
    }
  } 
   if (gameState===PLAY) {

  bg.velocityY = 3 

    if (bg.y > 300){
      bg.y =299;
    }

    if (World.frameCount % 100 == 0) {

         Coin();

    } 
    pc.visible=true;
    start.visible=false;
    GameOver.visible=false;
    restart.visible=false;
    
    if(coinG.isTouching(pc)){
     coinG[0].destroy();
     count=count+1;
     scoreSound.play();
    }
    if(ob1G.isTouching(pc)){
      ob1G[0].destroy();
      life=life-1
     }
    if(ob2G.isTouching(pc)){
      ob2G[0].destroy();
      life=life-1
     }
     if(ob3G.isTouching(pc)){
      ob3G[0].destroy();
      life=life-1
     }
     if(ob4G.isTouching(pc)){
      ob4G[0].destroy();
      life=life-1
     }
     if(ob5G.isTouching(pc)){
      ob5G[0].destroy();
      life=life-1
     }
     if(ob6G.isTouching(pc)){
      ob6G[0].destroy();
      life=life-1
     }

   if(keyDown("left")){
     pc.x=pc.x-3;
   }
   if(keyDown("right")){
    pc.x=pc.x+3;
  }

    var select_obs = Math.round(random(1,6));
    // console.log(select_balloon)
     
     if (World.frameCount % 80 == 0) {
       if (select_obs== 1) {
         Obs1();
        } else if (select_obs == 2) {
         Obs2();
        } else if (select_obs == 3) {
         Obs3();
        } else if (select_obs == 4) {
         Obs4();
        } else if (select_obs == 5) {
         Obs5();
        } else {
         Obs6();
        }

        if(count===100){
          cup.visible=true;
          bg.y=1200;
          bg.velocityY=0;
          WinningSound.play();
          ob1G.setVelocityYEach(0);
          ob2G.setVelocityYEach(0);
          ob3G.setVelocityYEach(0);
          ob4G.setVelocityYEach(0);
          ob5G.setVelocityYEach(0);
          ob6G.setVelocityYEach(0);
          ob1G.setLifetimeEach(-1);
          ob2G.setLifetimeEach(-1);
          ob3G.setLifetimeEach(-1);
          ob4G.setLifetimeEach(-1);
          ob5G.setLifetimeEach(-1);
          ob6G.setLifetimeEach(-1);
          coinG.setVelocityYEach(0);
          coinG.setLifetimeEach(-1);
          pc.x=600;
          pc.y=400;
    }
  }
    if (life===0){
      gameState=END;
    }
  }
   if (gameState===END) {
      pc.visible=false;
      GameOver.visible=true;
      GameOverSound.play();
      restart.visible=true;
      if(mousePressedOver(restart)) {
        reset();
      }
  }
  drawSprites();

  textSize(75);
  fill("blue");
  text(":",275,100);
  textSize(55);
  fill("red");
  text(count,260,165);
  textSize(35);
  fill("blue");
  text("LIFE",870,50);
  textSize(75);
  fill("red");
  text(":",895,100);
  textSize(55);
  fill("red");
  text(life,890,165);

  textSize(45);
  fill("black");
  text("GET 50 SCORE TO",10,400);
  text(" WIN!!!",80,470);
}
function Obs1() {
  var obs1 = createSprite(Math.round(random(500, 700)),0, 10, 10);
  obs1.addImage(obs1Img);
  obs1.velocityY = 12;
  obs1.lifetime=38;
  obs1.scale = 0.6
  ob1G.add(obs1)
  return obs1;
}
function Obs2() {
  var obs2 = createSprite(Math.round(random(500, 700)),0, 10, 10);
  obs2.addImage(obs2Img);
  obs2.velocityY = 12;
  obs2.lifetime=38;
  obs2.scale = 0.6
  ob2G.add(obs2)
  return obs2;
}
function Obs3() {
  var obs3 = createSprite(Math.round(random(500, 700)),0, 10, 10);
  obs3.addImage(obs3Img);
  obs3.velocityY = 12;
  obs3.lifetime=38;
  obs3.scale = 0.6
  ob3G.add(obs3)
  return obs3;
}
function Obs4() {
  var obs4 = createSprite(Math.round(random(500, 700)),0, 10, 10);
  obs4.addImage(obs4Img);
  obs4.velocityY = 12;
  obs4.lifetime=38;
  obs4.scale = 0.6
  ob4G.add(obs4)
  return obs4;
}
function Obs5() {
  var obs5 = createSprite(Math.round(random(500, 700)),0, 10, 10);
  obs5.addImage(obs5Img);
  obs5.velocityY = 12;
  obs5.lifetime=38;
  obs5.scale = 0.6
  ob5G.add(obs5)
  return obs5;
}
function Obs6() {
  var obs6 = createSprite(Math.round(random(500, 700)),0, 10, 10);
  obs6.addImage(obs6Img);
  obs6.velocityY = 12;
  obs6.lifetime=38;
  obs6.scale = 0.6
  ob6G.add(obs6)
  return obs6;
}
function Coin() {
  var coin = createSprite(Math.round(random(500, 700)),0, 10, 10);
  coin.addImage(coinImg);
  coin.velocityY = 6;
  coin.lifetime=89;
  coin.scale = 0.06
  coinG.add(coin)
  return coin;
}
function reset() {
  gameState=SERVE;
  bg.y=0;
  bg.velocityY=0;
  GameOver.visible=false;
  restart.visible=false;
  life=3;
  count=0;
}