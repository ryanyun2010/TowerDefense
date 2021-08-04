class Wave{
    constructor(){
        this.number = 10000000000;
        this.active = false;
        this.groupAmount = 10;
        this.groupSize = 1;
        this.timer = 0;
        this.groupDelay = 80;
        this.memberDelay = 5;
        this.currentGroup = 0;
        this.currentMember = 0;
        this.enemyStrength = 1;
    }

    start(){
        if(this.active == false && enemies.length == 0){
            this.number ++;
            this.active = true;
            this.timer = 0;
            this.updateDifficulty();
        }
    }

    updateDifficulty(){
        this.groupSize = this.number % 10;
        this.enemyStrength = floor(this.number/10) + 1;
        if(this.groupSize == 0){
            this.groupSize = 10;
            this.enemyStrength -= 1;
        }
    }

    timeToSpawn(group,member){
        var groupDuration = this.memberDelay * (this.groupSize - 1);
        var groupStart = group * (this.groupDelay + groupDuration);
        var memberStart = member * this.memberDelay;
        if(this.timer == groupStart + memberStart) { 
            return true; 
        }else{
            return false; 
        }
    }

    spawnEnemies(){
        if(this.timeToSpawn(this.currentGroup,this.currentMember)){
            enemies.push(new Enemy(this.enemyStrength,3,levelOneNodes,findColor(this.enemyStrength)))   
            this.currentMember++;
            if(this.currentMember >= this.groupSize){
                this.currentGroup++;
                this.currentMember = 0;
                if(this.currentGroup >= this.groupAmount){
                    this.currentGroup = 0;
                    this.active = false;
                }
            }
        }
    }

    update(){
        if(this.active){
            this.spawnEnemies();
            this.timer++;
        }
    }
}
function findColor(strength){
    if(strength == 1){
        return "#FF7F7F";
    } else if (strength > 1 && strength < 4){
        return "#ff726f";
    } else if (strength >= 4 && strength < 7){
        return "crimson";
    } else if(strength >= 7){
        return "black";
    }
}