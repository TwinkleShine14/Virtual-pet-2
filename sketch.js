var dog
var happyDog
var database
var foodS
var foodstock

function preload()
{
	dog=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 400);
  database=firebase.database();

  foodobj= new Food()

  dog1= createSprite(800,200,5,5)
  dog1.addImage(dog)
dog1.scale= 0.2
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)

  feed= createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood= createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}


function draw() {  

  background (46,139,87)

  foodobj.display()
  

  drawSprites();
}

function feedDog(){
  dog1.addImage (happyDog)
  foodobj.updateFoodStock(foodobj. getFoodStock()- 1)
  database.ref('/').update({
    Food:foodobj.getFoodStock()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function readStock (data){
  foodS = data.val();
  foodobj.updateFoodStock(foodS)
}

function writeStock(x){
  if (x>0){
    x=x-1
  }
  else {
    x=0
  }
  database.ref('/').update({Food:x})
}

