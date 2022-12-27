var balloon,balloonImage1,balloonImage2;
var balloon2;
var database;
var height;
var height2;
var choice = 1;
var choicepicker;
var scale, scale2;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

//Function to set initial environment
function setup() {

  database = firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);

  balloon2=createSprite(250,650,150,150);
  balloon2.addAnimation("hotAirBalloon",balloonImage1);

  readScale()
  readScale2()

  choicepicker=createSprite(width * 0.68,35,width/6,50);

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);

  var balloonHeight2 = database.ref('balloon2/height');
  balloonHeight2.on("value",readHeight2, showError);

  

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

if(choice === 1){
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }
}else if(choice === 2){
    if(keyDown(LEFT_ARROW)){
    updateHeight2(-10,0);
    balloon2.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight2(10,0);
    balloon2.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight2(0,-10);
    balloon2.addAnimation("hotAirBalloon",balloonImage2);
    balloon2.scale=balloon.scale -0.010;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight2(0,+10);
    balloon2.addAnimation("hotAirBalloon",balloonImage2);
    balloon2.scale=balloon.scale+0.010;
  }
}

  //(width * 0.68,35,width/6,50)
  if(mouseIsPressed && mouseX > (width * 0.68) - width/12 && mouseX < (width * 0.68) + width/12 && mouseY > 35 && mouseY < 85){
    if(choice === 1){
      choice = 2;
    }else if(choice === 2){
      choice = 1;
    }
  }

  if(balloon.scale != 1){
    updateScale(balloon.scale)
  updateScale2(balloon2.scale)
  }
  

  console.log(balloon2.scale)

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  text("Control other balloon",width * 0.60,40);
}

function updateScale(size){
  database.ref('balloon').update({
    'size': size
  })
}
function updateScale2(size){
  database.ref('balloon2').update({
    'size': size
  })
}

 function updateHeight(x,y){
   database.ref('balloon/height').update({
     'x': height.x + x ,
     'y': height.y + y
   })
 }

 function updateHeight2(x,y){
   database.ref('balloon2/height').update({
     'x': height2.x + x ,
     'y': height2.y + y
   })
 }

function readScale(data){
  database.ref('balloon/size').on('value',function(data){
    balloon.scale = data.val()
  })
 }

 function readScale2(data){
  database.ref('balloon2/size').on('value',function(data){
    balloon2.scale = data.val()
  })
 }


 function readHeight(data){
   height = data.val();
   balloon.x = height.x;
   balloon.y = height.y;
}

 function readHeight2(data){
   height2 = data.val();
   balloon2.x = height2.x;
   balloon2.y = height2.y;
}

function showError(){
  console.log("Error in writing to the database");
}