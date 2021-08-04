class Enemy{
    constructor(strength,speed,nodes,color){
        this.strength = strength;
        this.speed = speed;
        this.nodes = nodes;
        this.x = nodes[0].x;
        this.y = nodes[0].y;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.size = 30;
        this.targetNode = 0;
        this.color = color;
        this.finished = false;
    }
    
    distanceTraveled() {
        var distance = 0;
        var i = 1;
        while (i < this.nodes.length && i < this.targetNode) {
            let node1 = this.nodes[i - 1];
            let node2 = this.nodes[i];
            distance += dist(node1.x, node1.y, node2.x, node2.y);
            i += 1;
        }
        var lastNode = this.nodes[i - 1];
        distance += dist(this.x, this.y, lastNode.x, lastNode.y);
        return distance;
    }

    draw(){
        fill(this.color);
        ellipse(this.x,this.y,this.size,this.size);
        fill("black");
        strokeWeight(2);
        textAlign(CENTER, CENTER);
        textSize(15);
        if(this.color == "black"){fill("white")}
        text(this.strength,this.x,this.y)
        strokeWeight(5);
    }

    move(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    findTarget(){
        if(this.xSpeed === 0 && this.ySpeed === 0){
            this.targetNode++;
            let target = this.nodes[this.targetNode]
            let xDifference = target.x - this.x;
            let yDifference = target.y - this.y;
            let angle = atan2(yDifference,xDifference);
            this.xSpeed = this.speed * cos(angle);
            this.ySpeed = this.speed * sin(angle);
        }
    }

    checkTarget(){
        let target = this.nodes[this.targetNode];
        let distance = dist(this.x,this.y,target.x,target.y);

        if(distance < this.speed){
            this.xSpeed = 0;
            this.ySpeed = 0;

            if(this.targetNode == this.nodes.length-1){
                this.finished = true;
            }
        }
    }

    update(){
        this.findTarget();
        this.move();
        this.draw();
        this.checkTarget();
    }
}