class Projectile{
    constructor(x,y,xSpeed,ySpeed,strength){
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.strength = strength;
        this.size = 10;
    }
    
    draw(){
        fill(0,255,0);
        ellipse(this.x,this.y,this.size,this.size);
    }

    move(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    update(){
        this.draw();
        this.move();
    }
}