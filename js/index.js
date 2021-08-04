var grassImg;

var levelOneNodes = [
    {x: -100, y: 50},
    {x: 100,  y: 50},
    {x: 100,  y: 400},
    {x: 400,  y: 400},
    {x: 400,  y: 200},
    {x: 200,  y: 200},
    {x: 200,  y: 100},
    {x: 600,  y: 100}
]

var path;
var enemies;
var turrets;
var projectiles;
var money = 1000;
var health = 100;
var wave;
var playing = true;


function setup(){
    createCanvas(500,500).parent("gameCanvas")
    grassImg = loadImage("img/background.jpg") 
    path = new Path(levelOneNodes)
    enemies = [];
    turrets = [];
    projectiles = [];
    wave = new Wave();
    //setInterval(function(){enemies.push(new Enemy(Math.round(random(2,6)),Math.round(random(3,7)),levelOneNodes,"red"))},1000)
    updateText()
}



function draw(){
    image(grassImg,0,0,500,500);
    path.draw();
    updateAll();
    filterArrays();
    checkCollision();
}

function updateAll(){
    for(var enemy of enemies){
        enemy.update();
    }
    for(var turret of turrets){
        turret.update();
    }
    for(var projectile of projectiles){
        projectile.update();
    }
    wave.update();
}
function startWave(){
    wave.start();
    updateText();
}



function filterArrays(){
    projectiles = projectiles.filter(p => p.inWorld() && p.strength > 0);
    enemies = enemies.filter(e => e.finished == false && e.strength > 0);
}

function checkCollision(){
    for(var enemy of enemies){
        for(var projectile of projectiles){
            if(CircleInCircle(enemy,projectile)){
                var damage = min(enemy.strength,projectile.strength);
                enemy.strength -= damage;
                projectile.strength -= damage;
                money += damage;
                updateText();
                filterArrays();
            }
        }
    }
}
