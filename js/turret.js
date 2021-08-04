class Turret{
    constructor(roads){
        this.roads = roads;
        this.x = 150;
        this.y = 150;
        this.size = 50;
        this.gunSize = 37.5;
        this.range = 100;
        this.lookAngle = 0;
        this.placed = false;
        this.selected = false;
        this.projectileSpeed = 10;
        this.projectileStrength = 3;
        this.shootCooldown = 30;
        this.shootingTimer = 30;
        this.targetMode = 0;
        this.upgrades = 0;
        this.maxUpgrades = 3;
    }

    draw() {
        if(!this.placed || this.selected){
            strokeWeight(1);
            stroke('black');
            fill(255, 255, 0, 50)
            ellipse(this.x, this.y, this.range * 2, this.range * 2);
        }

        strokeWeight(5);
        stroke(this.chooseColor());
        var x = this.gunSize * cos(this.lookAngle);
        var y = this.gunSize * sin(this.lookAngle);
        line(this.x, this.y, this.x + x, this.y + y);

        strokeWeight(1);
        stroke('black');
        fill(this.chooseColor());
        ellipse(this.x, this.y, this.size, this.size);

        if(this.selected){
            fill("white");
            textAlign(CENTER, CENTER);
            textSize(15);
            text(this.targetMode,this.x,this.y);
        }
    }

    getEnemyClosestToTurret(){
        var closestDistance = Infinity;
        var closestEnemy = null;
        for(var enemy of enemies){
            var distance = dist(this.x,this.y,enemy.x,enemy.y);
            if(distance > this.range + this.size/2){
                continue;
            }
            if(distance < closestDistance){
                closestDistance = distance;
                closestEnemy = enemy;
            }
        }
        return closestEnemy;
    }

    getStrongestEnemyInTurretRange(){
        var strongest = 0;
        var strongestEnemy = null;
        for(var enemy of enemies){
            var distance = dist(this.x,this.y,enemy.x,enemy.y);
            if(distance > this.range + this.size/2){
                continue;
            }
            if(enemy.strength > strongest){
                strongest = enemy.strength;
                strongestEnemy = enemy;
            }
        }
        return strongestEnemy;
    }

  

    getEnemyFurthestFromTheStart(){
        var furthestDistance = 0;
        var furthestEnemy = null;
        for(var enemy of enemies){
            var distance = dist(this.x,this.y,enemy.x,enemy.y);
            if(distance > this.range + this.size/2){
                continue;
            }
            var travel = enemy.distanceTraveled();

            if(travel > furthestDistance){
                furthestDistance = travel;
                furthestEnemy = enemy;
            }

        }
        return furthestEnemy;
    }
    
    upgrade(){
        let upgradePrice = (this.upgrades+2)*100;
        if(this.upgrades < this.maxUpgrades && money >= upgradePrice){
            money -= upgradePrice;
            updateText();
            this.upgrades++;
            this.shootCooldown -= 7;
            this.projectileStrength += 2;
            this.projectileSpeed += 3;
            this.range += 100;
        }
    }

    shootProjectile(){
        if(this.shootingTimer < this.shootCooldown){
            this.shootingTimer++;
        }else{
            this.shootingTimer = 0;
            let x = this.x +(this.gunSize * cos(this.lookAngle));
            let y = this.y +(this.gunSize * sin(this.lookAngle));

            let xSpeed = this.projectileSpeed * cos(this.lookAngle);
            let ySpeed = this.projectileSpeed * sin(this.lookAngle);

            projectiles.push(new Projectile(x,y,xSpeed,ySpeed,this.projectileStrength));
        }
    }
    
    followMouse(){
        this.x = mouseX;
        this.y = mouseY;
    }

    onRoad(){
        for(var road of this.roads){
            if(CircleInRect(this,road)){
                return true;
            }
        }
        return false;
    }

    onTurret(){
        for(var turret of turrets){
            if(CircleInCircle(this, turret) && turret.placed){
                return true;
            }
        }
        return false;
    }

    targetEnemy(){
        var enemy = (this.targetMode === 0) ? this.getEnemyClosestToTurret() : (this.targetMode === 1) ? this.getStrongestEnemyInTurretRange() : this.getEnemyFurthestFromTheStart();
        if(enemy == null){
            return false;
        }

        this.lookAngle = atan2(enemy.y - this.y, enemy.x-this.x)
        this.shootProjectile();
    }

    isValid(){
        if(this.x < 0 || this.x > 500 || this.y < 0 || this.y > 500){
            return false;
        }
        if(this.onTurret()){
            return false;
        }
        if(this.onRoad()){
            return false;
        }
        return true;
    }

    chooseColor(){
        if(this.selected){
            return "#dfdfff";
        }
        else if(this.placed || this.isValid()){
            return "white";
        } else{
            return "red";
        }
    }

    update() {
        this.draw();
        if(!this.placed){
            this.followMouse();
        }else{
            this.targetEnemy();
        }
    }
    
}

function CircleInCircle(c1,c2){
    distance = dist(c1.x,c1.y,c2.x,c2.y);
    closestPossible = c1.size/2 + c2.size/2;
    return (distance > closestPossible) ? false : true;
}

function CircleInRect(c, r) {
    closeX = c.x;
    let closeY = c.y;
    if (c.x < r.x) {
        closeX = r.x;
    } else if (c.x > r.x + r.w) {
        closeX = r.x + r.w;
    }
    if (c.y < r.y) {
        closeY = r.y;
    } else if (c.y > r.y + r.h) {
        closeY = r.y + r.h;
    }
    if (dist(c.x, c.y, closeX, closeY) < c.size / 2) {
        return true;
    } else {
        return false;
    }
}

function getTurretBeingPlaced(){
    for(var turret of turrets){
        if(turret.placed == false){
            return turret;
        }
    }
    return null;
}

function getTurretBeingSelected(){
    for(var turret of turrets){
        if(turret.selected == true){
            return turret;
        }
    }
    return null; 
}

function unselectAllTurrets(){
    for(var turret of turrets){
        turret.selected = false;
    }
}


function keyPressed(){
    let turret = getTurretBeingSelected();
    console.log(turret)
    if(turret != null){
        if(keyCode == 37){
            if(turret.targetMode > 0){
                turret.targetMode -= 1;
            }
        } else if (keyCode == 39){
            if(turret.targetMode < 2){
                turret.targetMode += 1;
            }
        }

    }
}

function mousePressed(){
    if(mouseX > 0 && mouseX < 500 && mouseY > 0 && mouseY < 500){
        unselectAllTurrets()
    }
    let turret = getTurretBeingPlaced();
    if(turret != null){
        if(turret.isValid()){
            turret.placed = true;
            // turrets.push(new Turret(path.roads))
            // for(var i of turrets){
            //     i.update();
            // }
        }
    }
    else{
        turret = getTurretBeingClicked();
        if(turret != null){
            turret.selected = true;
        }
    }
    
}

function getTurretBeingClicked(){
    for(var turret of turrets){
        if(dist(mouseX,mouseY,turret.x,turret.y) < turret.size/2){
            return turret;
        }
    }
    return null;
}

function buyTurret(){
    let turret = getTurretBeingPlaced();
    if(money >= 100 && turret == null){
        money -= 100;
        updateText();
        turrets.push(new Turret(path.roads));
        updateAll()
    }
}
function updateText(){
    document.getElementById("money").innerHTML = money;
    document.getElementById("lives").innerHTML = health;
    document.getElementById("wave").innerHTML = wave.number;
}
function upgradeTurret(){
    let turret = getTurretBeingSelected();
    if(turret != null){
        turret.upgrade();
    }
}