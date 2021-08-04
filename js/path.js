class Path {
    constructor(nodes){
        this.nodes = nodes;
        this.size = 50;
        this.color = "#9b7653";
        this.createRoads();
    }

    draw(){
        for(var node of this.nodes){
            fill(this.color);
            stroke(this.color);
            ellipse(node.x,node.y,this.size,this.size);
            stroke("black");
            strokeWeight(5);
            for(var road of this.roads){
                rect(road.x,road.y,road.w,road.h)
            }
        }
    }

    createRoads(){
        this.roads = [];
        for(var i = 0; i < this.nodes.length-1; i++){
            let node1 = this.nodes[i];
            let node2 = this.nodes[i+1];

            let inverted = node1.x > node2.x || node1.y > node2.y;

            let x = inverted ? node2.x : node1.x;
            let y = inverted ? node2.y : node1.y;

            x -= this.size/2;
            y -= this.size/2;

            let w = this.size + abs(node2.x-node1.x);
            let h = this.size + abs(node2.y-node1.y);
            
            this.roads.push({x: x,y: y,w: w,h: h})
        }
    }
}