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



function setup(){
    createCanvas(500,500).parent("gameCanvas")
    grassImg = loadImage("img/background.jpg") 
    path = new Path(levelOneNodes)
    enemies = [];
    turrets = [];
    projectiles = [];
    turrets.push(new Turret(path.roads));
    setInterval(function(){enemies.push(new Enemy(1,3,levelOneNodes,"red"))},1000)
}



function draw(){
    image(grassImg,0,0,500,500);
    path.draw();
    for(var enemy of enemies){
        enemy.update();
    }
    enemies = enemies.filter(e => e.finished == false)
    for(var turret of turrets){
        turret.update();
    }
    for(var projectile of projectiles){
        projectile.update();
    }
}

